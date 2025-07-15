import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../sections/Culture.css";
import BG3 from "../assets/bg3.jpg";
import { getCurrentLocation } from "../utils/geolocation";
import { getCityFromCoords } from "../utils/geolocation"; // or '../utils/geocode' if separate

const Culture = () => {
  const [city, setCity] = useState("your area");
  const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentLocation()
      .then(async (coords) => {
        const cityName = await getCityFromCoords(coords.latitude, coords.longitude);
        setCity(cityName);
      })
      .catch((err) => {
        console.warn("Location error:", err);
        setError("⚠️ Location access denied");
      });
  }, []);

  return (
    <section className="culture-section" id="culture">
      <img src={BG3} alt="Culture Background" className="culture-bg" />
      <motion.div
        className="culture-content"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2>Culture & People</h2>
        <p>
          In <strong>{city}</strong>, from classical music and dance to cutting-edge tech and food fests,
          tradition meets innovation. Experience the city's rich diversity!
        </p>
        {error && <p className="error-tag">{error}</p>}
      </motion.div>
    </section>
  );
};

export default Culture;
