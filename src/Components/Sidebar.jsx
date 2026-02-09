import {
  FaHome,
  FaInfoCircle,
  FaUserFriends,
  FaImages,

  FaUsers,
} from "react-icons/fa";
import "../styles/sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <NavLink to="/">
        <SidebarItem icon={<FaHome />} label="Home" />
      </NavLink>
      <NavLink to="/about">
        <SidebarItem icon={<FaInfoCircle />} label="About" />
      </NavLink>
      <NavLink to="/speakers">
        <SidebarItem icon={<FaUserFriends />} label="Speakers" />
      </NavLink>
      <NavLink to="/gallery">
        <SidebarItem icon={<FaImages />} label="Gallery" />
      </NavLink>

      <NavLink to="/coreteam">
        <SidebarItem icon={<FaUsers />} label="Core Team" />
      </NavLink>
    </aside>
  );
};

const SidebarItem = ({ icon, label }) => (
  <div className="sidebar-item">
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
