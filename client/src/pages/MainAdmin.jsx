import { useNavigate } from "react-router-dom";
import style from "../style/MainProvider.module.css";


function MainAdmin() {
  const navigate =useNavigate()
  
  const AdminCard = [
    {
      name: "Update User",
      description: "Need a modern landing page for a startup marketplace.",
      path: "updateUser",
    },
    {
      name: "Update Provider",
      description: "Looking for professional translation of 10 pages document.",
      path: "updateProvider",
    },
    {
      name: "Update Services",
      description: "Looking for professional translation of 10 pages document.",
      path: "updateService",
    },
    {
      name: "Update Category",
      description: "Looking for professional translation of 10 pages document.",
      path: "updateCategory",
    },
  ];

  return (
    <>
      {/* Page Title */}
      <div className={style.header}>
        <h2>Tools Available To The Admin</h2>
        <br />
      </div>

      {/* Requests Grid */}
      
        <div className={style.requestsGrid}>
          {/* Request Card */}

          {AdminCard.map((item) => (
            <div className={style.card}>
              <h3>{item.name}</h3>

              <p className={style.desc}>{item.description}</p>

              <button
                className={style.btn}
                onClick={() => navigate(item.path)}
              >
                Controll
              </button>
            </div>
          ))}
        </div>
      
    </>
  );
}

export default MainAdmin;
