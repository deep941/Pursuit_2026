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
import TechBackground from "../assets/Technical events background (1).png";

const Workshops = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  const workshopList = [
    { name: "Cloud Byte", image: Cloud, fee: "₹ 49" },
    { name: "Mastering LaTeX:Type Smart, Not Hard", image: Latex, fee: "Free" },
    { name: "AI/ML Bootcamp", image: AIML, fee: "₹ 100" },
    { name: "Introduction to VLSI and Its Applications", image: VLSI, fee: "₹ 100" },
    { name: "Introduction to Agentic Ai", image: AI, fee: "₹ 100" },
    { name: "Electric Vehicle Workshop", image: EV, fee: "₹ 150" },
    { name: "Cybersecurity Workshop", image: Cyber, fee: "₹ 50" },
    { name: "Web Development Workshop", image: Web, fee: "₹ 100" },
    { name: "Autodesk Workshop", image: Autodesk, fee: "₹ 100" }
  ];

  const handleWorkshopClick = (workshopName) => {
    navigate("/register", { state: { workshop: workshopName } });
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
              onClick={() => handleWorkshopClick(workshop.name)}
              style={{ cursor: "pointer" }}
            >
              <img src={workshop.image} alt={workshop.name} className="event-poster" />
              <div className="event-fee">{workshop.fee}</div>
              <button className="register-btn">Register Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workshops;
