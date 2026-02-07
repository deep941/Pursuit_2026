
import { useState, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import emailjs from "@emailjs/browser"; // Top-level import
import "../styles/auth.css";
import "../styles/register-full.css"; // New extended styles
import bgVideo from "../assets/bgpursuit.webm";

// --- ASSET IMPORTS ---
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

  // Define configuration for EACH workshop.
  // Keys must match the values in your "Select Workshop" dropdown exactly.
  const WORKSHOP_FORMS = {
    "Junoon": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 149",
      qrCode: placeholderQr,
    },
    "Generative AI": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 199",
      qrCode: placeholderQr,
    },
    "AIML": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 149",
      qrCode: placeholderQr,
    },
    "Mastering LaTeX: Type Smart, Not Hard": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 99",
      qrCode: placeholderQr,
    },
    "Video Editing": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 149",
      qrCode: placeholderQr,
    },
    "Cloud Byte": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 149",
      qrCode: placeholderQr,
    },
    "Electric Vehicle": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 249",
      qrCode: placeholderQr,
    },
    "AIML Bootcamp": {
      ...COMMON_FORM_CONFIG,
      fee: "₹ 499",
      qrCode: placeholderQr,
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
    utr: ""
  });

  // Helper to get current configuration
  const currentConfig = WORKSHOP_FORMS[formData.workshop] || WORKSHOP_FORMS["DEFAULT"];
  const currentFee = currentConfig.fee;
  const currentQr = currentConfig.qrCode;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    // 1. Determine which config to use based on selected workshop
    const config = WORKSHOP_FORMS[formData.workshop] || WORKSHOP_FORMS["DEFAULT"];
    const submitUrl = config?.actionUrl || "";

    // Check if configuration is missing or uses placeholders
    if (!config || !submitUrl || submitUrl.includes("YOUR_GOOGLE_FORM")) {
      const confirmDemo = window.confirm(
        `Configuration missing for ${formData.workshop}.\n\nDo you want to run a DEMO submission to test the Email & UI flow?`
      );
      if (!confirmDemo) return;
    }

    // --- FORM SUBMISSION (Background Fetch) ---
    // Submits data directly to Google Forms without redirecting the user.
    // IMPORTANT: For this to work, the Google Form MUST be Public (Log-in not required).



    const handleSuccess = () => {
      // Trigger Email Sending
      sendConfirmationEmail(formData);

      alert(`Registration Submitted Successfully for ${formData.workshop}!\n\nCheck your email for confirmation.`);
      navigate("/workshops");
    };

    const fids = config.fields;
    const formPayload = new URLSearchParams();

    // Map Workshop Names to Google Form Options (EXACT MATCH REQUIRED)
    // Based on your screenshot:
    const workshopMapping = {
      "Junoon": "JUNNON", // Matches typo in Google Form screenshot
      "Generative AI": "GENERATIVE AI",
      "AIML": "AIML",
      "Mastering LaTeX: Type Smart, Not Hard": "MASTERING LaTeX: Type Smart, Not Hard",
      "Video Editing": "VIDEO EDITING",
      "Cloud Byte": "CLOUD BYTE",
      "Electric Vehicle": "ELECTRIC VEHICLE",
      "AIML Bootcamp": "AIML BOOTCAMP"
    };

    const googleFormWorkshopValue = workshopMapping[formData.workshop] || formData.workshop.toUpperCase();

    if (fids) {
      if (fids.NAME) formPayload.append(fids.NAME, formData.name);
      if (fids.EMAIL) formPayload.append(fids.EMAIL, formData.email);
      if (fids.PHONE) formPayload.append(fids.PHONE, formData.phone);
      if (fids.BRANCH) formPayload.append(fids.BRANCH, formData.branch);
      if (fids.YEAR) formPayload.append(fids.YEAR, formData.year); // Ensure select options match "1ST YEAR" etc.
      if (fids.COLLEGE) formPayload.append(fids.COLLEGE, formData.college);
      if (fids.TYPE) formPayload.append(fids.TYPE, formData.type);
      if (fids.WORKSHOP) formPayload.append(fids.WORKSHOP, googleFormWorkshopValue);
      if (fids.UTR) formPayload.append(fids.UTR, formData.utr);
    }

    // Use fetch with no-cors mode to bypass CORS policies
    fetch(submitUrl, {
      method: "POST",
      mode: "no-cors",
      body: formPayload,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(() => {
        console.log("Form submitted via fetch (no-cors).");
        handleSuccess();
      })
      .catch((err) => {
        console.error("Form submission error:", err);
        alert("Network error. Submitting via email only.");
        handleSuccess(); // Fallback to at least send the email/navigate
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
                  <option value="Junoon">Junoon</option>
                  <option value="Generative AI">Generative AI</option>
                  <option value="AIML">AIML</option>
                  <option value="Mastering LaTeX: Type Smart, Not Hard">Mastering LaTeX: Type Smart, Not Hard</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Cloud Byte">Cloud Byte</option>
                  <option value="Electric Vehicle">Electric Vehicle</option>
                  <option value="AIML Bootcamp">AIML Bootcamp</option>
                </select>
              </div>
            </div>

            {/* PAYMENT */}
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

            <label className="terms-label">
              <input type="checkbox" className="terms-checkbox" required />
              <span>I agree to the terms and conditions</span>
            </label>

            <button type="submit" className="auth-button primary">
              Complete Registration
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;

