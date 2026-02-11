import style from "../style/RegisterPage.module.css";
import test from "../image/test.png";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from '../image/logo.png'

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [major,setMajor]=useState('');

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
        role,
        major:major || 'User'
      });
      if (res.status !== 201) {
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
      navigate("/signin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <>
      <div className={style.page_bg}>
        <div className={style.grid_container}>
          <div className={style.grid1_register}>
            <div className={style.logo}>
              <h3>WorkiQ</h3>
            </div>
            <p>By registering, you will be able to join our world!</p>

            <form className={style.form_Register} onSubmit={handleRegister}>
              <div className={style.field}>
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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

              <div className={style.field}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className={style.field}>
                <label>Role</label>
                <select
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="provider">Provider</option>
                </select>
              </div>
              {role == "provider" && (
                <div className={style.field}>
                  <label>Major</label>
                  <textarea
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  >
                  </textarea>
                </div>
              )}
              <button type="submit">Register</button>
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
export default RegisterPage;
