import api from "../../api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import style from "../../style/Review.module.css";

function Review() {
  const [reviews, setReviews] = useState([]);

  const fetchReview = async () => {
    try {
      const res = await api.get("/getAllReviews");
      console.log(res.data);
      if (res.status !== 200) toast.error("failed to fetch review");

      toast.success("success to fetch review");

      setReviews(res.data.reviews);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const res =await api.delete(`/deleteReview/${id}`);
      if (res.status !== 200) toast.error("delete review failed");

      toast.success(res.data.message);
      fetchReview();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdateStatue = async (id, status) => {
    try {
      const res = await api.put(`/updateReviewStatue/${id}`, { status });

      if (res.status !== 200) toast.error("failed update statue");

      toast.success(res.data.message);
      fetchReview();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <>
      <div className={style.header}>
        <h2>All Reviews</h2>
        <p>Clients are looking for providers like you. Apply now.</p>
      </div>

      <div className={style.requestsGrid}>
        {reviews.map((item) => (
          <div className={style.card} key={item._id}>
            <h3>{item.userId}</h3>

            <p className={style.desc}>{item.review}</p>

            <div className={style.rating}>
              <span>Rating : {item.rating} </span>{" "}
              <span className={style.star}> ★ </span>{" "}
            </div>

            <ul className={style.btn_review}>
              <button
                className={style.btn_accept}
                onClick={() => handleUpdateStatue(item._id, "accept")}
              >
                Accept
              </button>
              <button
                className={style.btn_reject}
                onClick={() => handleDeleteReview(item._id)}
              >
                Reject
              </button>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default Review;
