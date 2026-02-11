import { Link, useNavigate } from "react-router-dom";
import style from "../style/Sidebar.module.css";
import api from "../api";
import toast from "react-hot-toast";

function SideBar() {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("user");
  const user = JSON.parse(userInfo);

  console.log(user);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      toast.success("logged out successfully");
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h3 className={style.title}>Dashboard</h3>

      <nav className={style.menu}>
        <ul className={style.list_sidebar}>
          <li>
            <button onClick={() => navigate("/dashboardAdmin/profile")}>
              Profile
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/dashboardAdmin/setting")}>
              Settings
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/dashboardAdmin/review")}>
              Messages
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/dashboardProvider/request")}>
              Request
            </button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
