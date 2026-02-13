import { useNavigate } from "react-router-dom";
import style from "../../style/MainSetting.module.css";
import { HiArrowRight } from "react-icons/hi";

import { MdManageAccounts, MdCategory, MdDesignServices } from "react-icons/md";

function MainAdmin() {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem('user')
  const user = JSON.parse(userInfo)

  const AdminCard = [
    {
      name: "Update User",
      description: "Manage user profiles, permissions, and account statuses.",
      path: "/dashboardAdmin/updateUser",
      icon: <MdManageAccounts />, 
    },
    {
      name: "Update Services",
      description: "Modify existing services, pricing, and provider details.",
      path: "/dashboardAdmin/updateService",
      icon: <MdDesignServices />, 
    },
    {
      name: "Update Category",
      description: "Organize your marketplace by adding or editing categories.",
      path: "/dashboardAdmin/updateCategory",
      icon: <MdCategory />, 
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>Welcome {user.name} 👋</h2>
        <p>Manage and maintain the core platform data from here.</p>
      </div>

      <div className={style.requestsGrid}>
        {AdminCard.map((item, index) => (
          <div key={index} className={style.card}>
     
            <div className={style.iconWrapper}>{item.icon}</div>

            <div className={style.cardContent}>
              <h3>{item.name}</h3>
              <p className={style.desc}>{item.description}</p>

              <button
                className={style.btn}
                onClick={() => navigate(item.path)}
              >
                Control{" "}
                <span>
                  <HiArrowRight />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainAdmin;