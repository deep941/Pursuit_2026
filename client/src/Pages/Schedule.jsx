import React from "react";
import "../styles/schedule.css";
import bgVideo from "../assets/bgpursuit.webm";

const scheduleData = [
    {
        day: "Day 1",
        date: "Wednesday, March 25",
        events: [
            { time: "09:00 AM - 01:00 PM", title: "AL/ML Bootcamp (CSESA)", venue: "DBMS Lab", details: "Day 1 • 1 hr lunch" },
            { time: "11:00 AM - 02:30 PM", title: "AUTODESK REVIT (IEI_MECH)", venue: "AI-ML Lab", details: "Day 1 • 30 min break" }
        ]
    },
    {
        day: "Day 2",
        date: "Thursday, March 26",
        events: [
            { time: "09:00 AM - 01:00 PM", title: "AL/ML Bootcamp (CSESA)", venue: "DBMS Lab", details: "Day 2 • 1 hr lunch" },
            { time: "11:00 AM - 02:30 PM", title: "AUTODESK REVIT (IEI_MECH)", venue: "AI-ML Lab", details: "Day 2 • 30 min break" }
        ]
    },
    {
        day: "Day 3",
        date: "Friday, March 27",
        events: [
            { time: "08:00 AM - 01:00 PM", title: "AUTODESK REVIT (IEI_MECH)", venue: "AI-ML Lab", details: "Day 3 • 1 hr lunch" },
            { time: "09:00 AM - 03:00 PM", title: "Electric Vehicle (IEI_ELPO)", venue: "Swadhyay Kaksha", details: "Day 1 • 1 hr lunch" },
            { time: "09:00 AM - 02:00 PM", title: "Cloud Byte (Mozilla Open-Source)", venue: "Web Tech Lab", details: "1 hr lunch" },
            { time: "09:00 AM - 01:00 PM", title: "AL/ML Bootcamp (CSESA)", venue: "DBMS Lab", details: "Day 3 • 1 hr lunch" },
            { time: "02:30 PM - 07:00 PM", title: "Cybersecurity Workshop (ITSA)", venue: "Web Tech Lab", details: "30 min break" },
            { time: "02:30 PM - 07:00 PM", title: "Web Development (E-CELL)", venue: "AI-ML Lab", details: "Day 1 • 30 min break" },
            { time: "03:30 PM - 07:00 PM", title: "Mastering LaTeX (ISTE)", venue: "Swadhyay Kaksha", details: "Day 1 • 30 min break" }
        ]
    },
    {
        day: "Day 4",
        date: "Saturday, March 28",
        events: [
            { time: "08:00 AM - 02:00 PM", title: "Electric Vehicle (IEI_ELPO)", venue: "Swadhyay Kaksha", details: "Day 2 • 1 hr lunch" },
            { time: "09:00 AM - 03:00 PM", title: "Introduction to VLSI (ESSA)", venue: "Cadence Lab", details: "1 hr lunch" },
            { time: "09:00 AM - 01:00 PM", title: "Web Development (E-CELL)", venue: "AI-ML Lab", details: "Day 2 • 1 hr break" },
            { time: "10:00 AM - 03:00 PM", title: "Introduction to Agentic AI (ACM)", venue: "Web Tech Lab", details: "1 hr lunch" },
            { time: "02:00 PM - 06:00 PM", title: "AUTODESK REVIT (IEI_MECH)", venue: "AI-ML Lab", details: "Day 4 • 30 min break" },
            { time: "03:00 PM - 06:30 PM", title: "Mastering LaTeX (ISTE)", venue: "Swadhyay Kaksha", details: "Day 2 • 30 min break" }
        ]
    }
];

const Schedule = () => {
    return (
        <>
            <video className="video-bg" autoPlay loop muted playsInline>
                <source src={bgVideo} type="video/webm" />
            </video>
            <div className="schedule-container">
                <header className="schedule-header">
                    <h1 className="schedule-title">Workshop Schedule</h1>
                    <p className="schedule-subtitle">Pursuit 2026 • March 25 - 28</p>
                </header>

                <div className="schedule-list">
                    {scheduleData.map((dayObj, idx) => (
                        <div key={idx} className="day-schedule-block">
                            <div className="day-header">
                                <h2 className="day-title">{dayObj.day}</h2>
                                <span className="day-date">{dayObj.date}</span>
                            </div>

                            <div className="events-grid">
                                {dayObj.events.map((evt, eIdx) => (
                                    <div key={eIdx} className="event-card">
                                        <div className="event-time">
                                            <span role="img" aria-label="time">🕒</span> {evt.time}
                                        </div>
                                        <h3 className="event-title">
                                            {evt.title}
                                        </h3>
                                        <div className="event-venue">
                                            <span role="img" aria-label="venue">📍</span> {evt.venue}
                                        </div>
                                        {evt.details && (
                                            <div className="event-details">
                                                <span role="img" aria-label="details">ℹ️</span> {evt.details}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Schedule;
