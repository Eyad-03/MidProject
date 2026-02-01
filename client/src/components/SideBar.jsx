import { Link } from "react-router-dom";
import style from "../style/Sidebar.module.css";



function SideBar() {
  return (
    < >
      <h3 className={style.title}>Dashboard</h3>

      <nav className={style.menu}>
        <Link to="profile">Profile</Link>
        <Link to="setting">Settings</Link>
        <Link to="#">Messages</Link>
        <Link to="#">Logout</Link>
      </nav>
    </>
  );
}

export default SideBar;
