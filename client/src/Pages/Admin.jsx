import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import "../styles/admin.css";
import bgVideo from "../assets/bgpursuit.webm";

const Admin = () => {
    const [registrations, setRegistrations] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState("dashboard"); // "dashboard" or "details"
    const [selectedCategory, setSelectedCategory] = useState(null); // Either a workshop name or "Stay"
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
                
                // Fetch registrations
                const regRes = await fetch(`${baseUrl}/api/registrations`);
                if (!regRes.ok) throw new Error("Failed to fetch registrations");
                const regData = await regRes.json();
                
                // Fetch accommodations
                const accRes = await fetch(`${baseUrl}/api/accommodations`);
                let accData = [];
                if (accRes.ok) {
                    accData = await accRes.json();
                } else {
                    console.warn("Failed to fetch accommodations");
                }
                
                setRegistrations(regData);
                setAccommodations(accData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const workshopNames = [
        "Mastering LaTeX:Type Smart, Not Hard",
        "AI/ML Bootcamp",
        "Introduction to VLSI and Its Applications",
        "Introduction to Agentic Ai",
        "Cybersecurity Workshop",
        "Electric Vehicle Workshop",
        "Cloud Byte",
        "Web Development Workshop",
        "Autodesk Workshop",
        "Prototype to Product: ESP32 & Raspberry Pi"
    ];

    const getWorkshopCount = (workshopName) => {
        return registrations.filter(r => r.workshop === workshopName).length;
    };

    const handleCardClick = (category) => {
        setSelectedCategory(category);
        setViewMode("details");
    };

    const handleExportCSV = () => {
        let headers = [];
        let dataToExport = [];
        let filename = "export.csv";

        if (viewMode === "details" && selectedCategory === "Stay") {
            headers = ["Name", "College", "Gender", "Date", "Request Time"];
            dataToExport = accommodations.map(acc => [
                acc.name,
                acc.college,
                acc.gender,
                acc.date,
                new Date(acc.createdAt).toLocaleString()
            ]);
            filename = "stay_accommodations.csv";
        } else {
            headers = ["Name", "Email", "Phone", "College", "Workshop", "Team Members", "UTR/Status"];
            
            const filtered = (viewMode === "details" && selectedCategory !== "All" && selectedCategory !== "Stay")
                ? registrations.filter(r => r.workshop === selectedCategory)
                : registrations;
                
            dataToExport = filtered.map(reg => [
                reg.name,
                reg.email,
                reg.phone,
                `${reg.college} (${reg.year})`,
                reg.workshop,
                reg.teamMembers && reg.teamMembers.length > 0 ? reg.teamMembers.map(m => m.name).join("; ") : "Solo",
                reg.utr === "0" || !reg.utr ? "Free" : reg.utr
            ]);
            
            filename = (viewMode === "details" && selectedCategory && selectedCategory !== "All" && selectedCategory !== "Stay")
                ? `${selectedCategory.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_registrations.csv` 
                : "all_registrations.csv";
        }

        // Convert to CSV string, handling embedded quotes and commas safely
        const csvContent = [
            headers.join(","),
            ...dataToExport.map(row => row.map(item => `"${(item || "").toString().replace(/"/g, '""')}"`).join(","))
        ].join("\n");

        // Trigger file download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const renderDashboard = () => {
        const sortedWorkshops = [...workshopNames].sort((a, b) => getWorkshopCount(b) - getWorkshopCount(a));

        return (
        <div className="admin-grid">
            {sortedWorkshops.map(ws => (
                <div key={ws} className="admin-card" onClick={() => handleCardClick(ws)}>
                    <div className="admin-card-bg-icon">💻</div>
                    <div className="admin-card-content">
                        <h3 className="admin-card-title">{ws.length > 20 ? ws.substring(0, 20) + "..." : ws}</h3>
                        <div className="admin-card-subtitle">WORKSHOP</div>
                        <div className="admin-card-count">{getWorkshopCount(ws)}</div>
                        <div className="admin-card-footer">ACCESS STREAM</div>
                    </div>
                </div>
            ))}
            
            <div className="admin-card" onClick={() => handleCardClick("Stay")} style={{ borderColor: 'rgba(255, 100, 150, 0.4)' }}>
                <div className="admin-card-bg-icon">🏨</div>
                <div className="admin-card-content">
                    <h3 className="admin-card-title" style={{ color: '#ffb3c6' }}>Stay</h3>
                    <div className="admin-card-subtitle">ACCOMMODATIONS</div>
                    <div className="admin-card-count">{accommodations.length}</div>
                    <div className="admin-card-footer">ACCESS STREAM</div>
                </div>
            </div>
            
            <div className="admin-card" onClick={() => handleCardClick("All")} style={{ borderColor: 'rgba(100, 255, 200, 0.4)' }}>
                <div className="admin-card-bg-icon">📊</div>
                <div className="admin-card-content">
                    <h3 className="admin-card-title" style={{ color: '#b3ffe6' }}>All Registrations</h3>
                    <div className="admin-card-subtitle">OVERVIEW</div>
                    <div className="admin-card-count">{registrations.length}</div>
                    <div className="admin-card-footer">ACCESS STREAM</div>
                </div>
            </div>
        </div>
        );
    };

    const renderDetails = () => {
        if (selectedCategory === "Stay") {
            return (
                <div className="admin-details-view">
                    <div className="admin-details-header">
                        <h3>Stay Requisitions (Accommodations)</h3>
                        <span style={{color: '#ffb3c6', fontWeight: 'bold'}}>Total: {accommodations.length}</span>
                    </div>
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>College</th>
                                    <th>Gender</th>
                                    <th>Date</th>
                                    <th>Request Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accommodations.length > 0 ? (
                                    accommodations.map((acc, index) => (
                                        <tr key={index}>
                                            <td>{acc.name}</td>
                                            <td>{acc.college}</td>
                                            <td>{acc.gender}</td>
                                            <td>{acc.date}</td>
                                            <td>{new Date(acc.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>No accommodation requests found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        const filteredRegistrations = selectedCategory === "All" 
            ? registrations 
            : registrations.filter(r => r.workshop === selectedCategory);

        return (
            <div className="admin-details-view">
                <div className="admin-details-header">
                    <h3>{selectedCategory === "All" ? "All Registrations" : selectedCategory}</h3>
                    <span style={{color: '#b3ffe6', fontWeight: 'bold'}}>Total: {filteredRegistrations.length}</span>
                </div>
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>College</th>
                                <th>Workshop</th>
                                <th>Team</th>
                                <th>UTR/Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRegistrations.length > 0 ? (
                                filteredRegistrations.map((reg, index) => (
                                    <tr key={index}>
                                        <td>{reg.name}</td>
                                        <td>{reg.email}</td>
                                        <td>{reg.phone}</td>
                                        <td>{reg.college} ({reg.year})</td>
                                        <td>{reg.workshop}</td>
                                        <td>
                                            {reg.teamMembers && reg.teamMembers.length > 0 ? (
                                                <ul style={{ paddingLeft: '15px', margin: 0 }}>
                                                    {reg.teamMembers.map((m, i) => (
                                                        <li key={i}>{m.name}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span style={{ color: "rgba(255,255,255,0.5)" }}>Solo</span>
                                            )}
                                        </td>
                                        <td>
                                            {reg.utr === "0" || !reg.utr ? <span style={{ color: '#00ff88' }}>Free</span> : <span style={{ color: '#ffd700' }}>{reg.utr}</span>}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>No registrations found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <section className="admin-section auth-section">
            <video
                className="gallery-bg-video"
                src={bgVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto' }}>
                <div className="admin-header">
                    <div className="admin-title-area">
                        <div className="admin-system-access">SYSTEM ACCESS GRANTED</div>
                        <h1 className="admin-main-title">Admin Portal</h1>
                        <div className="admin-subtitle">PURSUIT COMMAND CENTRAL V2.6</div>
                    </div>
                    <div className="admin-nav-buttons">
                        <button 
                            className={`admin-btn ${viewMode === 'dashboard' ? 'active' : ''}`}
                            onClick={() => setViewMode("dashboard")}
                        >
                            DASHBOARD
                        </button>
                        <button 
                            className="admin-btn"
                            onClick={handleExportCSV}
                        >
                            EXPORT DATA
                        </button>
                        <button className="admin-btn" onClick={() => window.location.reload()}>
                            REFRESH
                        </button>
                        <button 
                            className="admin-btn danger" 
                            onClick={() => navigate("/")}
                        >
                            EXIT SYSTEM
                        </button>
                    </div>
                </div>

                {loading && <p style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>INITIALIZING DATA STREAMS...</p>}
                {error && <p style={{ color: '#ff4d4d', textAlign: 'center', marginTop: '50px' }}>SYSTEM ERROR: {error}</p>}

                {!loading && !error && (
                    <div style={{ marginTop: '30px' }}>
                        {viewMode === "dashboard" ? renderDashboard() : renderDetails()}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Admin;
