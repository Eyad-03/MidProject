import ServiceCard from "../components/ServiceCard";
import style from "../style/ServicePage.module.css";
import web from "../image/web.png";
import video from "../image/video.png";
import seo from "../image/seo.png";
import logo from "../image/logo.png";
import NavBar from "../components/NavBar";

function ServicePage() {
  const serviceName = [
    {
      name: "web",
      img: web,
    },

    {
      name: "logo",
      img: logo,
    },

    {
      name: "video",
      img: video,
    },

    {
      name: "seo",
      img: seo,
    },
    {
      name: "web",
      img: web,
    },

    {
      name: "logo",
      img: logo,
    },

    {
      name: "video",
      img: video,
    },

    {
      name: "seo",
      img: seo,
    },
  ];

  return (
    <>
    <NavBar/>
      <div className={style.container_serviceCard}>
        <h1>Logo Design</h1>

        <div className={style.grid_service}>
          {serviceName.map((service) => (
            <ServiceCard service={service} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ServicePage;
