import { useNavigate } from "react-router-dom";
import style from "../style/NavBar.module.css";

function NavBar() {
  const navigate = useNavigate();

  return (
    <header className={style.nav}>
      <div className={style.inner}>
        <div className={style.logo}>
          <h3>WorkiQ</h3>
        </div>

        <nav className={style.navList} aria-label="Primary">
          <ul className={style.btn_nav}>
            <li>
              <button className={style.linkBtn}>Explore</button>
            </li>
            <li>
              <button
                onClick={() => navigate("/signin")}
                className={style.ghostBtn}
              >
                Login Now
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/register")}
                className={style.primaryBtn}
              >
                Join
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
