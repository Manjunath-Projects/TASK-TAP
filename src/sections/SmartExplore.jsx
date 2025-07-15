// src/sections/SmartExplore.jsx
import React, { useEffect, useState, useRef } from "react";
import { getCurrentLocation } from "../utils/geolocation";
import { getNetworkInfo } from "../utils/network";
import { registerIdleCallback } from "../utils/backgroundTasks";
import { findNearby } from "../utils/nearby";
import { getVisited, saveVisit } from "../utils/storage";
import "../sections/SmartExplore.css";

const SmartExplore = () => {
  const [location, setLocation] = useState(null);
  const [network, setNetwork] = useState(null);
  const [places, setPlaces] = useState([]);
  const [visited, setVisited] = useState([]);
  const canvasRef = useRef();

  useEffect(() => {
    getCurrentLocation().then(coords => {
      setLocation(coords);
      fetch("/data/bangalore.json")
        .then(res => res.json())
        .then(data => {
          const nearby = findNearby(coords, data);
          setPlaces(nearby);
        });
    });

    const net = getNetworkInfo();
    if (net) setNetwork(net);

    setVisited(getVisited());

    registerIdleCallback(() => {
      console.log("Background sync of visited data...");
      // Placeholder for future sync logic
    });
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 400, 200);

    places.forEach((place, i) => {
      const count = visited.includes(place.id) ? 1 : 0;
      ctx.fillStyle = "#fcbf49";
      ctx.fillRect(i * 60 + 20, 180 - count * 100, 40, count * 100);
      ctx.fillStyle = "#fff";
      ctx.fillText(place.name.split(" ")[0], i * 60 + 20, 195);
    });
  }, [places, visited]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    const elements = document.querySelectorAll(".observed");
    elements.forEach(el => observer.observe(el));
  }, [places]);

  return (
    <section className="smart-explore" id="smart-explore">
      <div className="network-bar">
        Network: {network?.type || "unknown"} / {network?.downlink || "?"} Mbps
      </div>

      <div className="explore-grid">
        {places.map(place => (
          <div className="place-card observed" key={place.id}>
            <h3>{place.name}</h3>
            <p>{place.description}</p>
            {place.audio && <audio controls src={place.audio} />}
            <button
              onClick={() => {
                saveVisit(place.id);
                setVisited(getVisited());
              }}
            >
              {visited.includes(place.id) ? "Visited ✅" : "Mark as Visited"}
            </button>
          </div>
        ))}
      </div>

      <canvas ref={canvasRef} width={400} height={200} className="visit-chart" />
    </section>
  );
};

export default SmartExplore;
