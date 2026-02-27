import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import MainLayout from "./Layout/MainLayout";
import bgVideo from "./assets/bgpursuit.webm";
import Loader from "./Components/Loader";

import Home from "./Pages/Home";
import Gallery from "./Pages/Gallery";
import Accomodation from "./Pages/Accomodation";

import Workshops from "./Pages/Workshops";
import WorkshopDetail from "./Pages/WorkshopDetail";
import Speakers from "./Pages/Speakers";

import ContactUs from "./Pages/ConstactUs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import About from "./Pages/About";
import CoreTeam from "./Pages/CoreTeam";
import Schedule from "./Pages/Schedule";
import Admin from "./Pages/Admin";

import ChatBot from "./Components/ChatBot";

function App() {
  const [loading, setLoading] = useState(true);

  // You can remove this useEffect if you only want the loader to finish based on its own timer
  // But having it here gives you control if you want to load real data later.
  // For now, the Loader component handles its own completion callback.

  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <BrowserRouter>
          <div className="fixed-video-container">
            <video
              className="fixed-video"
              src={bgVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="fixed-video-overlay" />
          </div>
          <ChatBot />
          <Routes>
            {/* Pages WITH Navbar, Sidebar, Footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/accomodation" element={<Accomodation />} />

              <Route path="/workshops" element={<Workshops />} />
              <Route path="/workshops/:id" element={<WorkshopDetail />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/speakers" element={<Speakers />} />

              <Route path="/contact" element={<ContactUs />} />
              <Route path="/coreteam" element={<CoreTeam />} />
            </Route>

            {/* Pages WITHOUT Navbar / Sidebar / Footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
