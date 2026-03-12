import { useParams, useNavigate } from "react-router-dom";
import "../styles/workshopDetail.css";
import bgVideo from "../assets/bgpursuit.webm";

// No Icons needed

const workshopData = {
    "cloud-byte": {
        name: "Cloud Byte",
        overview: "Explore the fascinating world of Cloud Computing and open-source contributions. Learn to build, deploy, and manage scalable cloud applications.",
        time: "09:00 AM - 02:00 PM",
        date: "Friday, March 27",
        schedule: "Registration starts at 8:30 AM, followed by basics of Cloud Setup, Lunch Break (1 hr), and Hands-on Cloud Deployments.",
        fee: "₹ 49",
        resourcePerson: "Mr. Amit Molke",
        coordinator: "Ashish Ingle (CP), Divya Sangle (VCP) | Contact: +91 72185 22510",
        color: "#00f0ff"
    },
    "mastering-latex": {
        name: "Mastering LaTeX: Type Smart, Not Hard",
        overview: "Master LaTeX for professional document preparation. A must-attend workshop for writing research papers, reports, and beautiful technical documentation.",
        time: "03:30 PM - 07:00 PM",
        date: "Friday, March 27 & Saturday, March 28",
        schedule: "Day 1 (3:30 PM - 7:00 PM) - Basics of LaTeX, Day 2 (3:00 PM - 6:30 PM) - Advanced Typesetting.",
        fee: "Free",
        resourcePerson: "Dr.R.S.Mahamune",
        coordinator: "Shrushti Deshmukh (CP), Vansh Jaiswal (VCP) | Contact: +91 74992 96763",
        color: "#ff00e5"
    },
    "ai-ml-bootcamp": {
        name: "AI/ML Bootcamp",
        overview: "Kickstart your AI and ML journey. In this extended intensive bootcamp, build neural networks, train image classifiers, and learn modern ML frameworks.",
        time: "09:00 AM - 01:00 PM",
        date: "March 25, 26, 27",
        schedule: "3 Days Workshop - Morning Sessions covering Data Processing, Deep Learning & Deployment.",
        fee: "₹ 100",
        resourcePerson: "Dr.Roshan Karwa",
        coordinator: "Yash Mali (CP), Sakshi Deshmukh (VCP) | Contact: +91 88306 51820",
        color: "#a78bfa"
    },
    "vlsi-applications": {
        name: "Introduction to VLSI and Its Applications",
        overview: "Dive into the world of VLSI design. Learn the fundamentals of digital circuits, chip manufacturing processes, and HDL programming.",
        time: "09:00 AM - 03:00 PM",
        date: "Saturday, March 28",
        schedule: "Full day event including theoretical concepts, Cadence Lab hands-on, and 1 Hr Lunch.",
        fee: "₹ 100",
        resourcePerson: "Pranav Kheldar",
        coordinator: "Pranav Jadhav (CP), Pranjal Patil (WCP) | Contact: +91 73509 74162",
        color: "#60a5fa"
    },
    "agentic-ai": {
        name: "Introduction to Agentic Ai",
        overview: "Design and deploy autonomous AI agents capable of executing complex instructions and problem-solving without human intervention.",
        time: "10:00 AM - 03:00 PM",
        date: "Saturday, March 28",
        schedule: "Session starts at 10 AM, covering LLMs, Agent Architectures using Langchain, and live bot deployments.",
        fee: "₹ 100",
        resourcePerson: "Nakul Deshmukh",
        coordinator: "Satyam Mishra (CP), Deep Rathod (WCP) | Contact: +91 91129 58683",
        color: "#22c55e"
    },
    "electric-vehicle": {
        name: "Electric Vehicle Workshop",
        overview: "Understand the core engineering of Electric Vehicles. Explore battery management systems, EV drivetrains, and modern mobility solutions.",
        time: "09:00 AM - 03:00 PM",
        date: "Friday, March 27 & Saturday, March 28",
        schedule: "2 Days Session (09:00 AM - 03:00 PM on Day 1, 08:00 AM - 02:00 PM on Day 2).",
        fee: "₹ 150",
        resourcePerson: "Chetan Tajane",
        coordinator: "Tejas Pande, Dipali Purane | Contact: +91 74981 30919",
        color: "#f59e0b"
    },
    "cybersecurity": {
        name: "Cybersecurity Workshop",
        overview: "Protect, detect, and exploit. Learn practical ethical hacking, network defense methodologies, and vulnerability assessments.",
        time: "02:30 PM - 07:00 PM",
        date: "Friday, March 27",
        schedule: "Session runs through the afternoon, spanning network basics to advanced penetrations with a 30m break.",
        fee: "₹ 50",
        resourcePerson: "Riya Dangra",
        coordinator: "Sanchit Dangra (CP), Sakshi Rajankar (WCP) | Contact: +91 93093 91688",
        color: "#ef4444"
    },
    "web-development": {
        name: "Web Development Workshop",
        overview: "A comprehensive course on modern Web Development. Learn how to architect, develop, and deploy a responsive high-end web application.",
        time: "02:30 PM - 07:00 PM",
        date: "Friday, March 27 & Saturday, March 28",
        schedule: "Day 1 (2:30 PM - 7:00 PM) Frontend Basics, Day 2 (09:00 AM - 01:00 PM) Backend integration.",
        fee: "₹ 100",
        resourcePerson: "DEVESH BADGUJAR",
        coordinator: "Rutuja Deshmukh, Nihal Kankal | Contact: +91 87678 19508",
        color: "#3b82f6"
    },
    "autodesk": {
        name: "Autodesk Workshop",
        overview: "Shape the physical world. Gain heavy hands-on experience using Autodesk Revit for architectural and mechanical engineering designs.",
        time: "11:00 AM - 02:30 PM",
        date: "March 25, 26 & 28",
        schedule: "11:00 AM to 02:30 PM on Day 1 & 2. 02:00 PM to 06:00 PM on Day 4.",
        fee: "₹ 100",
        resourcePerson: "IEI_MECH Professionals",
        coordinator: "Shrinit Chavan | Contact: +91 77749 00204",
        color: "#10b981"
    }
};

const WorkshopDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const workshop = workshopData[id];

    if (!workshop) {
        return (
            <div className="workshop-not-found">
                <h2>Workshop not found</h2>
                <button onClick={() => navigate("/workshops")} className="back-btn">Go Back</button>
            </div>
        );
    }

    const handleRegister = () => {
        navigate("/register", { state: { workshop: workshop.name } });
    };

    return (
        <div className="ws-detail-page">
            <video className="ws-bg-video" src={bgVideo} autoPlay loop muted playsInline />
            <div className="ws-overlay"></div>

            <div className="ws-content-wrapper">
                <button
                    className="ws-back-btn"
                    onClick={() => navigate("/workshops")}
                    style={{ borderColor: workshop.color, color: workshop.color }}
                >
                    &#8592; BACK TO EVENTS
                </button>

                <div className="ws-card" style={{ boxShadow: `0 0 30px ${workshop.color}40`, border: `1px solid ${workshop.color}50` }}>
                    <div className="ws-card-header">
                        <h1 className="ws-title">{workshop.name}</h1>
                    </div>

                    <div className="ws-body">
                        <div className="ws-section">
                            <h2 className="ws-section-title" style={{ color: workshop.color }}>MISSION OBJECTIVE</h2>
                            <p className="ws-section-text">{workshop.overview}</p>
                        </div>

                        <div className="ws-section">
                            <h2 className="ws-section-title" style={{ color: workshop.color }}>EVENT DETAILS</h2>

                            <div className="ws-details-grid">
                                <div className="ws-detail-item">
                                    <span className="ws-detail-label">Date:</span>
                                    <span className="ws-detail-val">{workshop.date}</span>
                                </div>
                                <div className="ws-detail-item">
                                    <span className="ws-detail-label">Time:</span>
                                    <span className="ws-detail-val">{workshop.time}</span>
                                </div>
                                <div className="ws-detail-item">
                                    <span className="ws-detail-label">Fee:</span>
                                    <span className="ws-detail-val fee-highlight">{workshop.fee}</span>
                                </div>
                                <div className="ws-detail-item">
                                    <span className="ws-detail-label">Resource Person:</span>
                                    <span className="ws-detail-val">{workshop.resourcePerson}</span>
                                </div>
                            </div>

                            <div className="ws-schedule-block">
                                <div className="ws-detail-label">Schedule Summary:</div>
                                <div className="ws-detail-val">{workshop.schedule}</div>
                            </div>

                            <div className="ws-coordinator-block">
                                <span className="ws-detail-label">Coordinator:</span>
                                <span className="ws-detail-val">{workshop.coordinator}</span>
                            </div>
                        </div>
                    </div>

                    <div className="ws-footer">
                        <button
                            className="ws-register-btn"
                            onClick={handleRegister}
                            style={{ background: workshop.color, boxShadow: `0 0 20px ${workshop.color}60` }}
                        >
                            REGISTER NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkshopDetail;
