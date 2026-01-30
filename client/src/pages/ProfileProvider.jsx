import style from "../style/ProfileProvider.module.css";
import teo from '../image/teo.webp'
import { MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";

function ProfileProvider() {
  return (
    <>
      <div className={style.container_profile}>
        <div className={style.provider_details}>
          <p>Instructor</p>
          <h1>Jonas Schmedtmann</h1>
          <h6>Web Developer, Designer, and Teacher</h6>
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
          <img src={teo}/>
          <div className={style.contact_provider}>
            <span><MdEmail color="rgba(14, 74, 74, 0.85)"/></span>
            <span><FaInstagram color="rgba(14, 74, 74, 0.85)"/></span>
            <span><FaRegMessage color="rgba(14, 74, 74, 0.85)"/></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileProvider;
