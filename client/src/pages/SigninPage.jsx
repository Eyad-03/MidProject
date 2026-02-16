import style from "../style/RegisterPage.module.css";
import test from "../image/test.png";
import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { useNavigate,Link } from "react-router-dom";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.status !== 200) {
        toast.error(res.data.message);
      }
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(res.data.message);
      const role = res.data.user.role;
      role === "admin"
        ? navigate("/dashboardAdmin")
        : role === "provider"
          ? navigate("/dashboardProvider")
          : navigate("/home");
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <>
      <div className={style.page_bg}>
        <div className={style.grid_container}>
          <div className={style.grid1_register}>
            <div className={style.logo}>
              <h3 style={{cursor:'pointer'}} onClick={()=>navigate('/home')}>WorkiQ</h3>
            </div>
            <p>By registering, you will be able to join our world!</p>

            <form className={style.form_Register} onSubmit={handleLogin}>
              <div className={style.field}>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={style.field}>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit">Sign in</button>
              <Link to='/register'>dont have account ?</Link>
            </form>
          </div>

          <div className={style.image_register}>
            <img src={test} />
          </div>
        </div>
      </div>
    </>
  );
}
export default SigninPage;
