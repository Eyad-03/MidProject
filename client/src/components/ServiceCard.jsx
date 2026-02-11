import style from "../ui/ServiceCard.module.css";
import { Link, useNavigate } from "react-router-dom";

function ServiceCard({service}) {

  const navigate =useNavigate()

  return (
    <>
      <div className={style.serviceCard}>
        <div className={style.photo_service}>
          <img src={service.image} />
        </div>

        <div>
          <div className={style.details_provider1}>
            <p>{service.name}</p>
            <p>{service.description}</p>
          </div>
          <div className={style.details_provider2}>
            <p>{service.rate}</p>
            <p>{service.price}</p>
          </div>
          <div className={style.btn_apply}>
            <Link to='/serviceDetail' state={{service}}>Apply</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceCard;
