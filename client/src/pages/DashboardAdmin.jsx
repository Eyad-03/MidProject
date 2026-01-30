import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import style from "../style/DashboardProvider.module.css";

function DashboardAdmin() {
  
  return (
    <div className={style.layout}>
      {/* Navbar */}
      <header className={style.nav}>
        <NavBar />
      </header>

      {/* Sidebar */}
      <aside className={style.sidebar}>
        <SideBar />
      </aside>

      {/* Main */}
      <main className={style.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardAdmin;
