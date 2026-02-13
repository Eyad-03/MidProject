import style from "../../style/Request.module.css";
import api from "../../api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiCheck, FiX, FiDollarSign, FiTag, FiUser } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";


function RequestService() {

  const [requests,setRequests]=useState([])

  const handleStatus =async(id,status)=>
  {
    try
    {
      const res = await api.put(`/updateStatus/${id}`,{status})

      if(res.status!==200)
      {
        toast.error('failed update status')
      }

      toast.success('update successfully')
      
    }

    catch(err)
    {
      console.error(err.message)
    }
  }

  const handleDeleteRequest =async(id)=>
  {

    try
    {
      const res =await api.delete(`/deleteRequest/${id}`)

      if(res.status!==200)
      {
        toast.error('delete request failed')
      }
      fetchRequest()
      toast.success('delete request successfully')
    }

    catch(err)
    {
      console.error(err.message)
    }

  }

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
<div className={style.container}>
      <h1 className={style.pageTitle}>My Request Service</h1>

      <div className={style.requestsGrid}>
        {requests.map((item) => (
          <div className={style.card} key={item._id}>
            <h3>
              <FiUser size={18} /> {item.client.name}
            </h3>
            
            <p className={style.desc}>
              <FiMail size={14} /> {item.client.email}
            </p>

            <p className={style.desc}>
              <HiOutlineDocumentText size={14} /> {item.service.name}
            </p>

            <div className={style.meta}>
              <span>
                <FiDollarSign size={14} /> {item.service.price}
              </span>
              {item.category && (
                <span>
                  <FiTag size={14} /> {item.category}
                </span>
              )}
            </div>

            <div className={style.btn_request}>
              <button 
                className={`${style.btn} ${style.btnAccept}`} 
                onClick={() => handleStatus(item._id, true)}
              >
                <FiCheck /> Accept
              </button>
              <button 
                className={`${style.btn} ${style.btnReject}`} 
                onClick={() => handleDeleteRequest(item._id)}
              >
                <FiX /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default RequestService;
