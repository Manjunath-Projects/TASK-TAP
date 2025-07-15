import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../sections/Hero.css";
import BG1 from "../assets/bg1.jpg";
import { getCurrentLocation } from "../utils/geolocation";
import { getCityFromCoords } from "../utils/geocode";

const Hero = () => {
  const [city, setCity] = useState("...");
  const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentLocation()
      .then(async (coords) => {
        const cityName = await getCityFromCoords(coords.latitude, coords.longitude);
        setCity(cityName);
      })
      .catch((err) => {
        console.warn("Location error:", err);
        setError("Permission denied or location unavailable");
      });
  }, []);

  return (
    <section className="hero-section" id="hero">
      <img src={BG1} alt="Hero Background" className="hero-bg" />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Welcome to {city}</h1>
        <p>Explore stories of history and culture as you walk through the city.</p>

        {error && <p className="error-tag">⚠️ {error}</p>}
      </motion.div>
    </section>
  );
};

export default Hero;
