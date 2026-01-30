import style from "../ui/ServiceCard.module.css";
import web from "../image/web.png";

function ServiceCard({service}) {
  return (
    <>
      <div className={style.serviceCard}>
        <div className={style.photo_service}>
          <img src={service.img} />
        </div>

        <div>
          <div className={style.details_provider1}>
            <p>eyad</p>
            <p>I will design a modern minimalist logo</p>
          </div>
          <div className={style.details_provider2}>
            <p>⭐4.9</p>
            <p>From 300$</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceCard;
