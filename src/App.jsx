import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./sections/Hero";
import History from "./sections/History";
import Culture from "./sections/Culture";
import FinalCTA from "./sections/FinalCTA";
import Nearby from "./sections/Nearby";
import Explore from "./sections/Explore";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <Hero />
              <History />
              <Culture />
              <FinalCTA />
            </div>
          }
        />
        <Route path="/nearby" element={<Nearby />} />
        <Route path="/explorer" element={<Explore />} />
      </Routes>
    </>
  );
};

export default App;
