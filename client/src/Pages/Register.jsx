
import { useState, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import emailjs from "@emailjs/browser"; // Top-level import
import "../styles/auth.css";
import "../styles/events.css"; // Ensure gallery styles are loaded
import "../styles/register-full.css"; // New extended styles
import bgVideo from "../assets/bgpursuit.webm";

// --- ASSET IMPORTS ---
import Qr100 from "../assets/qr/qr100.jpeg";
import Qr50 from "../assets/qr/qr50.jpeg";
import Qr60 from "../assets/qr/qr60.jpeg";
import Qr150 from "../assets/qr/qr150.jpeg";
import Qr250 from "../assets/qr/qr250.jpeg";
const placeholderQr = null;
// ---------------------

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get pre-selected workshop from navigation state if available
  const selectedWorkshop = location.state?.workshop || "";

  // --- MULTI-FORM CONFIGURATION ---

  // Common Google Form Configuration for ALL Workshops
  const COMMON_FORM_CONFIG = {
    actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeAY_DQZajjRFcpuXYxXyv3ZvrNRS3AfwVrxd70rHr2JPCmwg/formResponse",
    fields: {
      NAME: "entry.1573953420",
      EMAIL: "entry.1828436597",
      PHONE: "entry.718941675",
      BRANCH: "entry.500464337",
      YEAR: "entry.989911391",
      COLLEGE: "entry.1991804511",
      WORKSHOP: "entry.1789172296",
      UTR: "entry.284114100"
    }
  };

  // Helper to check if payment is required
  const isPaymentRequired = (fee) => {
    return fee && fee !== "Free" && fee !== "₹ 0";
  };

  // Define configuration for EACH workshop.
  // Keys must match the values in your "Select Workshop" dropdown exactly.
  const WORKSHOP_FORMS = {
    "Mastering LaTeX:Type Smart, Not Hard": {
      ...COMMON_FORM_CONFIG,
      fee: "Free",
      qrCode: placeholderQr,
    },
    "AI/ML Bootcamp": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 100",
      qrCode: Qr100, // Updated
    },
    "Introduction to VLSI and Its Applications": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 60",
      qrCode: Qr60, // Updated
    },
    "Introduction to Agentic Ai": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 100",
      qrCode: Qr100, // Updated
    },
    "Cybersecurity Workshop": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 50",
      qrCode: Qr50, // Updated
    },
    "Electric Vehicle Workshop": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 150",
      qrCode: Qr150,
    },
    "Cloud Byte": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 49",
      qrCode: Qr50, // Updated to match 49 (using 50 QR)
    },
    "Web Development Workshop": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 100",
      qrCode: Qr100,
    },
    "Autodesk Workshop": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 100", // Placeholder if not provided
      qrCode: Qr100,
    },
    "Prototype to Product: ESP32 & Raspberry Pi": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 250",
      qrCode: Qr250,
      allowTeam: true,
    },
    // Fallback/Default if needed
    "DEFAULT": {
      actionUrl: "",
      fee: "₹ 0",
      qrCode: null,
      fields: {}
    }
  };
  // ---------------------

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
    college: "",
    type: "Workshop",
    workshop: selectedWorkshop,
    utr: "",
    teamMembers: [
      { name: "", email: "", phone: "" },
      { name: "", email: "", phone: "" },
      { name: "", email: "", phone: "" },
      { name: "", email: "", phone: "" }
    ]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to get current configuration
  const currentConfig = WORKSHOP_FORMS[formData.workshop] || WORKSHOP_FORMS["DEFAULT"];
  let currentFee = currentConfig.fee;
  let currentQr = currentConfig.qrCode;

  // Dynamic fee calculation for ESP32
  if (formData.workshop === "Prototype to Product: ESP32 & Raspberry Pi") {
    const hasTeamMembers = formData.teamMembers.some(m => m.name.trim() !== "");
    if (!hasTeamMembers) {
      currentFee = "₹ 50";
      currentQr = Qr50;
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedTeam = [...formData.teamMembers];
    updatedTeam[index][field] = value;
    setFormData((prev) => ({ ...prev, teamMembers: updatedTeam }));
  };

  // --- EMAIL JS CONFIGURATION ---
  // Credentials provided by user
  const EMAILJS_SERVICE_ID = "service_8kf3w5i";
  const EMAILJS_TEMPLATE_ID = "template_m9npo5r";
  const EMAILJS_PUBLIC_KEY = "rKZy1_B1LrPbQV6Pp";

  const sendConfirmationEmail = (data) => {
    console.log("Attempting to send email to:", data.email);

    // Check if keys are configured properly
    if (!EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID") {
      console.warn("EmailJS not configured correctly.");
      return;
    }

    const templateParams = {
      email: data.email,
      to_name: data.name,
      workshop_name: data.workshop,
      transaction_id: data.utr,
      amount: WORKSHOP_FORMS[data.workshop]?.fee || "Paid",
      message: "Thank you for registering for Pursuit 2026!"
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS! Email sent.', response.status, response.text);
      }, (err) => {
        console.error('FAILED to send email...', err);
        alert("Email failed to send. Please check console for details.\nError: " + JSON.stringify(err));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.workshop === "Mastering LaTeX:Type Smart, Not Hard") {
      alert("Registration for Mastering LaTeX is closed as entries are full.");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const config = WORKSHOP_FORMS[formData.workshop] || WORKSHOP_FORMS["DEFAULT"];

    const backendApiUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/register` : "http://localhost:5000/api/register";

    const handleSuccess = () => {
      // Trigger Email Sending
      sendConfirmationEmail(formData);

      alert(`Registration Submitted Successfully for ${formData.workshop}!\n\nCheck your email for confirmation.`);
      navigate("/workshops");
    };

    // Prepare JSON payload for our MongoDB backend
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      branch: formData.branch,
      year: formData.year,
      college: formData.college,
      type: formData.type,
      workshop: formData.workshop,
      utr: isPaymentRequired(currentFee) ? formData.utr : "0",
      fee: currentFee,
      teamMembers: config.allowTeam ? formData.teamMembers.filter(m => m.name.trim() !== "") : []
    };

    console.log("Submitting to MongoDB backend:", backendApiUrl);
    console.log("Payload:", payload);

    // Send POST request to backend API
    fetch(backendApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Submission error");
        }
        console.log("Form successfully saved to the database:", data);
        handleSuccess();
      })
      .catch((err) => {
        console.error("Database submission error:", err);
        alert(`Error: ${err.message}. \n\nCheck your backend console for more details.`);
        setIsSubmitting(false);
        // Note: For actual production, you might not want to call handleSuccess on failure.
      });
  };

  return (
    <section className="gallery-section auth-section">
      <video
        className="gallery-bg-video"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <button className="auth-back" type="button" onClick={() => navigate("/workshops")}>
        <FaArrowLeft /> Back
      </button>

      <div className="auth-wrapper wide">
        <div className="auth-card">
          <div className="auth-card-header" style={{ justifyContent: 'center' }}>
            <div className="auth-title-stack">
              <h2 className="auth-heading">Registration Form</h2>
              <p className="auth-subtext">Join the Tech Odyssey</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            {/* PERSONAL DETAILS */}
            <div className="auth-section-title">Personal Details</div>

            <div className="form-row">
              <div className="form-group">
                <label className="auth-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="auth-input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="auth-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="auth-input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="auth-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="auth-input"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="auth-label">Branch</label>
                <input
                  type="text"
                  name="branch"
                  className="auth-input"
                  placeholder="CSE/IT/ECE..."
                  value={formData.branch}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="auth-label">Year</label>
                <select
                  name="year"
                  className="auth-input auth-select"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1ST YEAR">1st Year</option>
                  <option value="2ND YEAR">2nd Year</option>
                  <option value="3RD YEAR">3rd Year</option>
                  <option value="4TH YEAR">4th Year</option>
                </select>
              </div>
              <div className="form-group">
                <label className="auth-label">College</label>
                <input
                  type="text"
                  name="college"
                  className="auth-input"
                  placeholder="College Name"
                  value={formData.college}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* WORKSHOP DETAILS */}
            <div className="auth-section-title">Workshop Details</div>

            <div className="form-row">
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="auth-label">Select Workshop</label>
                <select
                  name="workshop"
                  className="auth-input auth-select"
                  value={formData.workshop}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Option</option>
                  <option value="Mastering LaTeX:Type Smart, Not Hard" disabled>Mastering LaTeX:Type Smart, Not Hard (Entry Full)</option>
                  <option value="AI/ML Bootcamp">AI/ML Bootcamp</option>
                  <option value="Introduction to VLSI and Its Applications">Introduction to VLSI and Its Applications</option>
                  <option value="Introduction to Agentic Ai">Introduction to Agentic Ai</option>
                  <option value="Electric Vehicle Workshop">Electric Vehicle Workshop</option>
                  <option value="Cybersecurity Workshop">Cybersecurity Workshop</option>
                  <option value="Cloud Byte">Cloud Byte</option>
                  <option value="Web Development Workshop">Web Development Workshop</option>
                  <option value="Autodesk Workshop">Autodesk Workshop</option>
                  <option value="Prototype to Product: ESP32 & Raspberry Pi">Prototype to Product: ESP32 & Raspberry Pi</option>
                </select>
              </div>
            </div>

            {/* TEAM REGISTRATION - Conditionally Rendered */}
            {currentConfig.allowTeam && (
              <>
                <div className="auth-section-title">Team Members (Optional)</div>
                <p className="auth-subtext" style={{ fontSize: '12px', textAlign: 'center', marginBottom: '15px', marginTop: '-15px' }}>
                  A team can have up to 5 members. You are the Team Leader (Member 1). Add up to 4 more members below.<br />
                  <span style={{ color: '#ffdd57' }}>Fee is ₹ 50 for Individuals and ₹ 250 for a Team.</span> Add a team member's name below to automatically switch to Team Registration.
                </p>
                {formData.teamMembers.map((member, index) => (
                  <div key={index} style={{ marginBottom: "20px", padding: "15px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ color: "#c5c9ff", marginBottom: "10px", fontWeight: "bold" }}>Member {index + 2}</div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="auth-label">Name</label>
                        <input
                          type="text"
                          className="auth-input"
                          placeholder={`Member ${index + 2} Name`}
                          value={member.name}
                          onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="auth-label">Email</label>
                        <input
                          type="email"
                          className="auth-input"
                          placeholder={`Member ${index + 2} Email`}
                          value={member.email}
                          onChange={(e) => handleTeamMemberChange(index, "email", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="auth-label">Phone</label>
                        <input
                          type="tel"
                          className="auth-input"
                          placeholder={`Member ${index + 2} Phone`}
                          value={member.phone}
                          onChange={(e) => handleTeamMemberChange(index, "phone", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* PAYMENT - Conditionally Rendered */}
            {isPaymentRequired(currentFee) && (
              <>
                <div className="auth-section-title">Payment Details</div>

                <div className="payment-box">
                  <div className="payment-fee">Fee: {currentFee}</div>
                  <div className="payment-qr-container">
                    {currentQr ? (
                      <img src={currentQr} alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <div className="payment-qr-placeholder">QR Code Not Available</div>
                    )}
                  </div>
                  <p style={{ color: '#c5c9ff', fontSize: '12px', marginTop: '8px' }}>Scan to Pay</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="auth-label">UTR Number</label>
                    <input
                      type="text"
                      name="utr"
                      className="auth-input"
                      placeholder="Transaction ID"
                      value={formData.utr}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <label className="terms-label">
              <input type="checkbox" className="terms-checkbox" required />
              <span>I agree to the terms and conditions</span>
            </label>

            <button type="submit" className="auth-button primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Complete Registration"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;

