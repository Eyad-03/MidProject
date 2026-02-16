import { useNavigate } from "react-router-dom";
import style from "../ui/NavBar.module.css";
import icon2 from "../image/icon.png";
import api from "../api";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";

function NavBar() {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("user");
  const user = JSON.parse(userInfo);

  console.log(user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      toast.success("logged out successfully");
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className={style.nav}>
      <div className={style.inner}>
        <div className={style.logo}>
          <h3 onClick={() => navigate("/home")}>WorkiQ</h3>
        </div>

        <nav className={style.navList} aria-label="Primary">
          <ul className={style.btn_nav}>
            {user.role === "user" ? (
              <>
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

                <li>
                  <button onClick={toggleDropdown}>
                    <CgProfile size="35px" />
                  </button>

                  {isDropdownOpen && (
                    <div className={style.dropdownMenu}>
                      <button onClick={() => navigate("/profileuser")}>
                        Profile
                      </button>
                      <button onClick={() => navigate("/review")}>
                        Review
                      </button>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
