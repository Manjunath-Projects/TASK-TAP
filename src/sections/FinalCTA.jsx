import React from "react";
import { motion } from "framer-motion";
import "../sections/FinalCTA.css";
import BG4 from "../assets/bg4.jpg"
import { useEffect, useState } from "react";
import { registerIdleCallback } from "../utils/backgroundTasks";
import { useNavigate } from "react-router-dom";


const FinalCTA = () => {
  const navigate = useNavigate();

  useEffect(() => {
    registerIdleCallback(() => {
      console.log("Syncing visited places...");
    });
  }, []);

  const handleExplore = () => {
    navigate("/nearby");
  };

  return (
    <section className="cta-section" id="cta">
      <img src={BG4} alt="Final Call Background" className="cta-bg" />
      <motion.div
        className="cta-content"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2>Ready to Explore?</h2>
        <p>Begin your journey through Bangalore — offline or online, your guide is ready.</p>
        <button onClick={handleExplore}>Start Exploring</button>
      </motion.div>
    </section>
  );
};


export default FinalCTA;