import style from "../style/ReviewPage.module.css";
import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";

function ReviewPage() {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);

  const user = localStorage.getItem("user");
  const userInfo = JSON.parse(user);
  const userId = userInfo._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/review", { review, rating, userId });

      if (res.status !== 201) {
        toast.error(res.data.message);
      }

      toast.success("Review Submit Successfully");
    } catch (err) {
      console.error(err.message);
    }
  };



  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleMouseEnter = (star) => {
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <>
      <NavBar />
      <div className={style.container}>
        <h2 className={style.title}>Write a Review</h2>

        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.rating}>
            <label>Rating:</label>
            <div className={style.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`${style.star} ${star <= (hoverRating || rating) ? style.selected : ""}`}
                  onClick={() => handleRatingChange(star)}
                  onMouseEnter={() => handleMouseEnter(star)}
                  onMouseLeave={handleMouseLeave}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className={style.textareaContainer}>
            <label>Your Review:</label>
            <textarea
              value={review}
              placeholder="Write your review here..."
              onChange={(e)=>setReview(e.target.value)}
            />
          </div>
          <button type="submit" className={style.submitButton}>
            Submit Review
          </button>
        </form>
      </div>
    </>
  );
}

export default ReviewPage;
