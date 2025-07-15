import React, { useEffect, useState } from "react";
import { getCurrentLocation } from "../utils/geolocation";
import { getCityFromCoords } from "../utils/geocode";
import { findNearby } from "../utils/nearby";
import { saveVisit, getVisited } from "../utils/storage";
import placeData from "../../public/data/bangalore.json"; // if dynamic, load via fetch()
import "../sections/Nearby.css";
import { useNavigate } from "react-router-dom";


const Nearby = () => {

  const navigate = useNavigate();

const handleBack = () => {
  navigate("/");
};

  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [userCity, setUserCity] = useState("...");
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    getCurrentLocation()
      .then(async (loc) => {
        setCoords(loc);
        const cityName = await getCityFromCoords(loc.latitude, loc.longitude);
        setUserCity(cityName);

        const matched = findNearby(loc, placeData);
        setNearbyPlaces(matched);
        setVisitedPlaces(getVisited());
      })
      .catch((err) => {
        console.warn(err);
        setUserCity("Location unavailable");
      });
  }, []);

  const handleVisit = (id) => {
    saveVisit(id);
    setVisitedPlaces(getVisited());
  };

  return (
    <section className="nearby-section" id="nearby">
      <button className="back-button" onClick={handleBack}>
  ← Back to Home
</button>

      <div className="nearby-header">
        <h2>Nearby Attractions</h2>
        <p>Showing places near <strong>{userCity}</strong></p>
        {coords && (
          <p className="coord-text">
            Your Coordinates: {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
          </p>
        )}
      </div>


      <div className="places-list">
        {nearbyPlaces.length > 0 ? (
          nearbyPlaces.map((place) => (
            <div key={place.id} className="place-card">
              <div className="place-text">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
                <button
                  className={visitedPlaces.includes(place.id) ? "visited" : "mark"}
                  onClick={() => handleVisit(place.id)}
                >
                  {visitedPlaces.includes(place.id) ? "Visited ✅" : "Mark as Visited"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No nearby places found in this range.</p>
        )}
      </div>
    </section>
  );
};

export default Nearby;
