import api from "../../api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import style from "../../style/Review.module.css";
import { HiStar, HiCheck, HiTrash, HiUserCircle } from "react-icons/hi2";
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
      const res = await api.delete(`/deleteReview/${id}`);
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
      <div className={style.container}>
        <div className={style.header}>
          <h2>All Reviews</h2>
          <p>Manage and moderate client feedback efficiently.</p>
        </div>

        <div className={style.requestsGrid}>
          {reviews.map((item) => (
            <div className={style.card} key={item._id}>
              <div className={style.cardHeader}>
                <HiUserCircle className={style.userIcon} />
                <div className={style.userInfo}>
                  <span className={style.userIdLabel}>User Name</span>
                  <h3>{item.userId.name}</h3>
                </div>
              </div>

              <div className={style.ratingBadge}>
                <HiStar className={style.starIcon} />
                <span>{item.rating} / 5</span>
              </div>

              <p className={style.desc}>{item.review}</p>

              <p className={style.desc}>{item.createdAt}</p>

              <div className={style.actions}>
                <button
                  className={style.btn_accept}
                  onClick={() => handleUpdateStatue(item._id, "accept")}
                >
                  <HiCheck /> Accept
                </button>
                <button
                  className={style.btn_reject}
                  onClick={() => handleDeleteReview(item._id)}
                >
                  <HiTrash /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Review;
