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
            <p>{service.name}</p>
            <p>{service.description}</p>
          </div>
          <div className={style.details_provider2}>
            <p>{service.rate}</p>
            <p>{service.price}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceCard;
