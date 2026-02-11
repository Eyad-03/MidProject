import { useState } from "react";
import NavBar from "../components/NavBar";
import style from "../style/ProfileUser.module.css";
import api from "../api";
import toast from "react-hot-toast"; 

function ProfileUser() {
  const userInfo = localStorage.getItem("user");
  const user = JSON.parse(userInfo);
  console.log(user);

  const [show, setShow] = useState(false);
  const [showDetail, setDetail] = useState(false);
  const [info, setInfo] = useState({
        name: ""||user.name,
        email: ""||user.email
  });
  const [change, setChange] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handlePassword = async (e) => {
    e.preventDefault(); 
    try {
      const res = await api.put(`/updatePassword/${user._id}`, change);

      if (res.status !== 200) {
        toast.error(res.data.message || "password did not change");
      } else {
        toast.success("password updated successfully");
      }

      setChange({
        ...change,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/updateInfo/${user._id}`, info);
      console.log(res);
      if (res.status !== 200) {
        toast.error(res.data.message);
      } else {
        toast.success("info updated successfully");
      }

      setInfo({
        ...info,
        name: "",
        email: ""
       
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />

      <div className={style.container}>
        <h2 className={style.header}>Profile Settings</h2>

        {/* User Information Section */}
        <div className={style.formContainer}>
          <h3 className={style.sectionTitle}>User Information</h3>
          <form onSubmit={handleDetails}>
            <label>Name</label>
            <input
              className={style.input}
              defaultValue={user.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              disabled={!showDetail}
            />

            <label>Email</label>
            <input
              className={style.input}
              defaultValue={user.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              disabled={!showDetail}
            />

            {showDetail && (
              <div className={style.buttonContainer}>
                <button type="submit" className={style.saveButton}>
                  Save
                </button>
              </div>
            )}
          </form>
          <div className={style.buttonContainer}>
            <button
              className={style.changeButton}
              onClick={() => setDetail(!showDetail)}
            >
              Change
            </button>
          </div>
        </div>

        {/* Password Change Section */}
        <div className={style.formContainer}>
          <h3 className={style.sectionTitle}>Change Password</h3>
          <form onSubmit={handlePassword}>
            <label>Current Password</label>
            <input
              type="password"
              className={style.input}
              disabled={!show}
              onChange={(e) =>
                setChange({ ...change, oldPassword: e.target.value })
              }
            />

            <label>New Password</label>
            <input
              type="password"
              className={style.input}
              disabled={!show}
              onChange={(e) =>
                setChange({ ...change, newPassword: e.target.value })
              }
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              className={style.input}
              disabled={!show}
              onChange={(e) =>
                setChange({ ...change, confirmNewPassword: e.target.value })
              }
            />

            {show && (
              <div className={style.buttonContainer}>
                <button type="submit" className={style.saveButton}>
                  Save
                </button>
              </div>
            )}
          </form>
          <div className={style.buttonContainer}>
            <button
              type="button"
              className={style.changeButton}
              onClick={() => setShow(!show)}
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUser;
