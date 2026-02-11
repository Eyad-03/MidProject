import style from "../../style/MainProvider.module.css";
import api from "../../api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProviderCard = [
  {
    name: "Website Landing Page Design",
    description: "Need a modern landing page for a startup marketplace.",
    price: "Budget: $150",
    category: "Category: Design",
  },

  {
    name: "Translation Arabic → English",
    description: "Looking for professional translation of 10 pages document.",
    price: "Budget: $80",
    category: "Category: Translation",
  },
];

function RequestService() {

  const [requests,setRequests]=useState([])



  const fetchRequest = async () => {
    try {
      const res = await api.get("/getAllRequest");
      console.log(res.data);

      if (res.status !== 200) toast.error("failed fetch request");

      setRequests(res.data.requests)
      toast.success(res.data.message);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <>
      <div className={style.requestsGrid}>
        {requests.map((item) => (
          <div className={style.card}>
            <h3>{item.client.name}</h3>
            <p className={style.desc}>{item.client.email}</p>

            <p className={style.desc}>{item.description}</p>

            <div className={style.meta}>
              <span>{item.service.price}</span>
              <span>{item.category}</span>
            </div>

            <button className={style.btn}>Apply Offer</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default RequestService;
