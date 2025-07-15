import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../sections/History.css";
import BG2 from "../assets/bg2.jpg";
import { getCurrentLocation } from "../utils/geolocation";
import { getCityFromCoords } from "../utils/geolocation";

const History = () => {
  const [city, setCity] = useState("your city");

  useEffect(() => {
    getCurrentLocation()
      .then(async (coords) => {
        const name = await getCityFromCoords(coords.latitude, coords.longitude);
        setCity(name);
      })
      .catch(() => {
        setCity("your city");
      });
  }, []);

  return (
    <section className="history-section" id="history">
      <motion.img
        src={BG2}
        alt="History Background"
        className="history-bg"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      <motion.div
        className="history-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          The Historical Roots
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          {city}'s roots trace back to the 16th century with Kempe Gowda's vision.
          Discover forts, temples, and tales that have shaped the city's legacy.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default History;
