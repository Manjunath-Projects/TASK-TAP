import React, { useState, useEffect } from "react";
import { getCurrentLocation } from "../utils/geolocation";
import { findNearby } from "../utils/nearby";
import { saveVisit, getVisited } from "../utils/storage";
import "../sections/Explore.css";

function Explore() {
  const [places, setPlaces] = useState([]);
  const [visited, setVisited] = useState([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    getCurrentLocation()
      .then(coords => {
        const list = findNearby(coords, /* your JSON data */);
        setPlaces(list);
        setVisited(getVisited());
      })
      .catch(console.error);
  }, []);

  const filtered = places.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="explore">
      <div className="search-bar">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search places..." />
      </div>
      <div className="grid">
        {filtered.map(p => (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.name} />
            <div className="card-body">
              <h3>{p.name}</h3>
              <button
                className={visited.includes(p.id) ? "visited" : "mark"}
                onClick={() => {
                  saveVisit(p.id);
                  setVisited(getVisited());
                }}
              >
                {visited.includes(p.id) ? "Visited" : "Mark"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
