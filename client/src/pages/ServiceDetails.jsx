import style from "../style/ServiceDetails.module.css";
import { MdEmail, MdStar, MdPayments } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import api from "../api";
import toast from "react-hot-toast";

function ServiceDetails() {
  const { state } = useLocation();
  const { service } = state;

  const serviceId = service._id;

  const handleAddRequest = async (providerId) => {
    try {
      const res = await api.post("/createRequest", { providerId, serviceId });
      if (res.status !== 200) toast.error("failed request");

      toast.success(res.data.message);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <NavBar />

      {/* SECTION 1: Profile Header */}
      <div className={style.container_profile}>
        <div className={style.provider_details}>
          <p>{service.role}</p>
          <h1>{service.name}</h1>
          <h6>{service.major}</h6>
          <div className={style.feedback}>
            <span>
              <h6>2,151</h6>
              <p>Total deals</p>
            </span>
            <span>
              <h6>4.98</h6>
              <p>Reviews</p>
            </span>
          </div>
        </div>

        <div className={style.image_provider}>
          <img src={service.image} alt="Provider Profile" />
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

      {/* SECTION 2: Service Details with Image */}
      <div className={style.service_info_container}>
        <div className={style.service_content_grid}>
          {/* Left Side: Service Image */}
          <div className={style.service_main_image}>
            <img src={service.image} alt={service.name} />
          </div>

          {/* Right Side: Service Info */}
          <div className={style.info_card}>
            <h3>Service Overview</h3>
            <p className={style.description}>{service.description}</p>

            <div className={style.meta_grid}>
              <div className={style.meta_item}>
                <MdPayments size={22} color="#0e4a4a" />
                <div>
                  <label>Pricing</label>
                  <span>{service.price}</span>
                </div>
              </div>
              <div className={style.meta_item}>
                <MdStar size={22} color="#f59e0b" />
                <div>
                  <label>Service Rating</label>
                  <span>{service.rate} / 5.0</span>
                </div>
              </div>
            </div>

            <button
              className={style.book_now_btn}
              onClick={() => handleAddRequest(service.user)}
            >
              Book This Service
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceDetails;
