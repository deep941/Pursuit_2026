import { useNavigate } from "react-router-dom";
import "../styles/gallery.css";
import "../styles/events.css";
import bgVideo from "../assets/bgpursuit.webm";

// Importing Event Images
import Junoon from "../assets/Events/Junnon.png";
import GenAI from "../assets/Events/genAI.png";
import AIML from "../assets/Events/aiml.png";
import Latex from "../assets/Events/latex_code.png";
import VideoEditing from "../assets/Events/Video_Editing.png";
import CloudByte from "../assets/Events/Cloudbyte.png";
import EV from "../assets/Events/ev.png";

const Workshops = () => {
  const navigate = useNavigate();

  const workshopList = [
    { name: "Junoon", image: Junoon },
    { name: "Generative AI", image: GenAI },
    { name: "AIML", image: AIML },
    { name: "Mastering LaTeX: Type Smart, Not Hard", image: Latex },
    { name: "Video Editing", image: VideoEditing },
    { name: "Cloud Byte", image: CloudByte },
    { name: "Electric Vehicle", image: EV },
    { name: "AIML Bootcamp", image: AIML },
  ];

  const handleWorkshopClick = (workshopName) => {
    navigate("/register", { state: { workshop: workshopName } });
  };

  return (
    <section className="gallery-section">
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
              <button className="register-btn">Register Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workshops;
