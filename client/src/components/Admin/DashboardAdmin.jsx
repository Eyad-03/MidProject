import { useState } from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import style from "../../style/DashboardProvider.module.css";
import { Outlet } from "react-router-dom";

function DashboardAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`${style.layout} ${!isSidebarOpen ? style.sidebarHidden : ""}`}
    >
      <header className={style.nav}>
        <NavBar />
      </header>

      <button className={style.toggleBtn} onClick={toggleSidebar}>
        {isSidebarOpen ? "◀" : "▶"}
      </button>

      <aside className={style.sidebar}>
        <SideBar />
      </aside>

      <main className={style.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardAdmin;
