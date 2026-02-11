import ServiceCard from "../components/ServiceCard";
import style from "../style/ServicePage.module.css";
import web from "../image/web.png";
import video from "../image/video.png";
import seo from "../image/seo.png";
import logo from "../image/logo.png";
import NavBar from "../components/NavBar";
import api from "../api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function ServicePage() {

const [services,setService]=useState([])

const {id}=useParams()
console.log(id)

  const fetchService = async () => {
    try {
      const res = await api.get(`/getServiceCategoryById/${id}`);
      console.log(res.data)

      if (res.status !== 200) {
        toast.error(res.data.message);
      }
      setService(res.data.services)
    } catch (error) {
      toast.error("faild to fetch service");
    }
  };

useEffect(()=>{
fetchService()
},[])


  return (
    <>
      <NavBar />
      <div className={style.container_serviceCard}>
        <h1>{services.name}</h1>

        <div className={style.grid_service}>
          {services.map((service) => (
            <ServiceCard service={service} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ServicePage;
