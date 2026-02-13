import style from "../../style/MainSetting.module.css";
import { useNavigate } from "react-router-dom";

import { MdSettingsSuggest } from "react-icons/md"; 
import { HiArrowRight } from "react-icons/hi";

const ProviderCard = [
  {
    name: "Update Services",
    description: "Looking for professional translation of 10 pages document.",
    path: "/dashboardProvider/UpdateServiceProvider",
    icon: <MdSettingsSuggest />
  },
];

function MainProvider() {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>Provider Controls</h2>
        <p>Clients are looking for providers like you. Apply now.</p>
      </div>

      <div className={style.requestsGrid}>
        {ProviderCard.map((item, index) => (
          <div key={index} className={style.card}>
            <div className={style.iconWrapper}>
              {item.icon}
            </div>
            
            <div className={style.cardContent}>
              <h3>{item.name}</h3>
              <p className={style.desc}>{item.description}</p>
              
              <button className={style.btn} onClick={() => navigate(item.path)}>
                Control <span><HiArrowRight /></span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainProvider;