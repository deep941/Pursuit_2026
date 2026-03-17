import { useState } from "react";
import "../styles/gallery.css";
import "../styles/accommodation.css";
import bgVideo from "../assets/bgpursuit.webm";
import Rocket from "../assets/Roketpng.png";

const Accomodation = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    date: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/accommodation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      const data = await response.json();
      alert("Accommodation requested successfully!");
      console.log(data);

      setShowForm(false);
      setIsLaunching(false);
      setFormData({ name: "", college: "", date: "", gender: "" });
    } catch (error) {
      console.error("Error submitting accommodation form:", error);
      alert("There was an error submitting your request. Please try again.");
    }
  };

  const handleRocketClick = () => {
    if (isLaunching) return; // Prevent double clicks

    setIsLaunching(true);

    // Show form after animation (800ms)
    setTimeout(() => {
      setShowForm(true);
    }, 800);
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
        <span className="gallery-title-text">Accomodation</span>
      </div>
      <div className="accommodation-cards">
        <div className="accommodation-card">
          <h3>CHARGES</h3>
          <p>
            THE ACCOMMODATION IS FREE <br />
            FOR 2 DAYS & 2 NIGHTS AT <br />
            SSGMCE CAMPUS
          </p>
        </div>

        <div className="accommodation-card">
          <h3>LOCATION</h3>
          <p>
            STAY WILL BE PROVIDED <br />
            INSIDE SSGMCE CAMPUS
          </p>
        </div>

        <div className="accommodation-card">
          <h3>DURATION</h3>
          <p>
            ACCOMMODATION WILL BE PROVIDED <br />
            FROM MARCH 24th, 06 AM UNTIL <br />
            MARCH 28th, 10 PM
          </p>
        </div>
      </div>
      {/* 🚀 Rocket Animation */}
      <div
        className={`accommodation-rocket ${isLaunching ? "rocket-launch" : ""}`}
        onClick={handleRocketClick}
      >
        <img src={Rocket} alt="Rocket" />
      </div>

      {/* Accommodation Form Modal */}
      {showForm && (
        <div className="acc-modal-overlay">
          <div className="acc-modal-content">
            <button
              className="acc-modal-close"
              onClick={() => {
                setShowForm(false);
                setIsLaunching(false);
              }}
            >
              &times;
            </button>
            <h2 className="acc-modal-title">Accommodation Form</h2>
            <form className="acc-form" onSubmit={handleSubmit}>
              <div className="acc-form-group">
                <label className="acc-form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="acc-form-input"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="acc-form-group">
                <label className="acc-form-label">College</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="acc-form-input"
                  placeholder="Enter your college name"
                  required
                />
              </div>
              <div className="acc-form-group">
                <label className="acc-form-label">Date of Accommodation</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="acc-form-input"
                  required
                  min="2026-03-24"
                  max="2026-03-28"
                />
              </div>
              <div className="acc-form-group">
                <label className="acc-form-label">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="acc-form-select"
                  required
                >
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button type="submit" className="acc-form-submit">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Accomodation;
