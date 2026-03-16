import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/gallery.css";
import "../styles/events.css";
import bgVideo from "../assets/bgpursuit.webm";

// Importing New Event Images
import AI from "../assets/Events/AI.png";
import AIML from "../assets/Events/AIML copy.png";
import Cloud from "../assets/Events/CLOUD.png";
import Cyber from "../assets/Events/CYBER.png";
import Latex from "../assets/Events/LATEX.png";
import VLSI from "../assets/Events/VLSI.png";
import EV from "../assets/Events/EV.png";
import Web from "../assets/Events/web.png";
import Autodesk from "../assets/Events/AUTODESK.png";
import IEEE from "../assets/Events/IEEE.png";
import TechBackground from "../assets/Technical events background (1).png";

const Workshops = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  const workshopList = [
    { id: "cloud-byte", name: "Cloud Byte", image: Cloud, fee: "₹ 49" },
    { id: "mastering-latex", name: "Mastering LaTeX:Type Smart, Not Hard", image: Latex, fee: "Free" },
    { id: "ai-ml-bootcamp", name: "AI/ML Bootcamp", image: AIML, fee: "₹ 100" },
    { id: "vlsi-applications", name: "Introduction to VLSI and Its Applications", image: VLSI, fee: "₹ 60" },
    { id: "agentic-ai", name: "Introduction to Agentic Ai", image: AI, fee: "₹ 100" },
    { id: "electric-vehicle", name: "Electric Vehicle Workshop", image: EV, fee: "₹ 150" },
    { id: "cybersecurity", name: "Cybersecurity Workshop", image: Cyber, fee: "₹ 50" },
    { id: "web-development", name: "Web Development Workshop", image: Web, fee: "₹ 100" },
    { id: "autodesk", name: "Autodesk Workshop", image: Autodesk, fee: "₹ 100" },
    { id: "esp32-raspberry-pi", name: "Prototype to Product: ESP32 & Raspberry Pi", image: IEEE, fee: "₹ 50 / 250" }
  ];

  const handleWorkshopClick = (workshopId) => {
    navigate(`/workshops/${workshopId}`);
  };

  return (
    <section className="gallery-section">
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-btn" onClick={closePopup}>X</button>
            <img src={TechBackground} alt="Technical Events Details" className="popup-image" />
          </div>
        </div>
      )}
      <video
        className="gallery-bg-video"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="gallery-title-card">
        <span className="gallery-title-text">Workshops</span>
      </div>

      <div className="workshops-container">
        <div className="workshops-grid">
          {workshopList.map((workshop, index) => (
            <div
              className="event-card"
              key={index}
              onClick={() => handleWorkshopClick(workshop.id)}
              style={{ cursor: "pointer" }}
            >
              <img src={workshop.image} alt={workshop.name} className="event-poster" />
              <div className="event-fee">{workshop.fee}</div>
              <button className="register-btn">Explore</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workshops;
