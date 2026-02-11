import style from "../style/Profile.module.css";
import teo from "../image/teo.webp";
import { MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import icon from "../image/log.png";
import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast"; 

function Profile() {
  const [info, setInfo] = useState({
    name: "",
    major: "",
  });

  const [showSave, setShowSave] = useState();

  const userInfo = localStorage.getItem("user");
  const user = JSON.parse(userInfo);
  console.log(user);

  const handleSave = async (e) => {

     e.preventDefault();
    try {
      const res =await api.put(`/updateInfoProvider/${user._id}`, info);
      console.log(res);
      if (res.status != 200) {
        toast.error(res.data.message);
      }

      toast.success(res.data.message);

      setInfo({
        ...info,
        name: "",
        major: "",
      });
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(()=>{
    
  },[])

  return (
    <>
      <div className={style.container_profile}>
        <div className={style.provider_details}>
          <p>{user.role}</p>
          <h1>{user.name}</h1>
          <h6>{user.major}</h6>
          <div className={style.feedback}>
            <span>
              <h6>2,1515</h6>
              <p>Total deal</p>
            </span>
            <span>
              <h6>4.984</h6>
              <p>Reviewrs</p>
            </span>
          </div>
        </div>

        <div className={style.image_provider}>
          <img src={icon} />
          <div className={style.contact_provider}>
            <span>
              <MdEmail color="rgba(14, 74, 74, 0.85)" />
            </span>
            <span>
              <FaInstagram color="rgba(14, 74, 74, 0.85)" />
            </span>
            <span>
              <FaRegMessage color="rgba(14, 74, 74, 0.85)" />
            </span>
          </div>
        </div>
      </div>

      <div
        className={style.buttonContainer}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "20px",
        }}
      >
        <button
          onClick={() => setShowSave(!showSave)}
          className={style.changeButton}
        >
          Change
        </button>
      </div>

      {showSave && (
        <div className={style.formContainer}>
          <h3 className={style.sectionTitle}>Provider Information</h3>
          <form>
            <label>Name</label>
            <input
              disabled={!showSave}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />
            {user.role=='provider' &&
                <>
              <label>Major</label>
            <input
            disabled={!showSave}
            onChange={(e) => setInfo({ ...info, major: e.target.value })}
            />
            </>
          }

            <div className={style.buttonContainer}>
              <button className={style.saveButton} onClick={handleSave}>
                save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Profile;
