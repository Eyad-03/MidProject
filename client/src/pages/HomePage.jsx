import NavBar from "../components/NavBar";
import style from "../style/HomePage.module.css";
import BG from "../image/bg.png";
import BGW from "../image/bgw.png";
import web from "../image/web.png";
import video from "../image/video.png";
import seo from "../image/seo.png";
import logo from "../image/logo.png";
import office from "../image/office.png";
import api from "../api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [reviews, setReview] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      const res = await api.get("/getAllCategory");
      if (res.status !== 200) {
        toast.error(res.data.message);
      }

      setCategories(res.data.categories);
    } catch {
      toast.error("Faild to fetch category");
    }
  };

  const fetchReview = async () => {
    try {
      const res = await api.get("/getAllReviewAccepted");
      console.log(res.data.acceptedReviews);

      if (res.status !== 200) toast.error(res.data.message);

      setReview(res.data.acceptedReviews);
      toast.success(res.data.message);
    } catch {
      toast.error("Faild to fetch review");
    }
  };

  const reviewsPerPage = 3;

  const nextReviews = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + reviewsPerPage >= reviews.length
        ? 0
        : prevIndex + reviewsPerPage,
    );
  };

  const prevReviews = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - reviewsPerPage < 0
        ? Math.max(
            0,
            Math.floor((reviews.length - 1) / reviewsPerPage) * reviewsPerPage,
          )
        : prevIndex - reviewsPerPage,
    );
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <>
      <NavBar />
      <div className={style.bg_home}>
        <div className={style.bg1}>
          <div className={style.bg_text}>
            <h1>WORKIQ</h1>
            <h2>FREELANCING MADE EASY !</h2>
            <p>
              The platform typically provides tools ensuring both freelancers
              and clients have a smooth transaction experience
            </p>
          </div>

          <div className={style.trend_text}>
            <h4>TRENDING SERVICES</h4>
            <ul className={style.badge_trend}>
              <li>
                Designer <FaArrowTrendUp />{" "}
              </li>
              <li>
                Developer <FaArrowTrendUp />
              </li>
              <li>
                Wordpress <FaArrowTrendUp />
              </li>
            </ul>
          </div>
        </div>

        <div className={style.bg2}>
          <img src={BGW} />
        </div>
      </div>

      <div className={style.section_popular}>
        <h1 className={style.header_popular}>
          Most Popular Services
          <FaArrowTrendUp color="#2e90eb" />
        </h1>
        <br />
        <ul className={style.img_popular}>
          <img src={web} />
          <img src={logo} />
          <img src={seo} />
          <img src={video} />
        </ul>
      </div>

      <section className={style.headering}>
        <div className={style.grid_header1}>
          <h1 style={{ color: "#5162e9" }}>
            Discover Our Outstanding Features
          </h1>

          <ul className={style.list_heading}>
            <div className={style.card_header}>
              <span className={style.flex_heading}>
                <FaCheckCircle color="green" />
                <h2>Discover and Connect with Skilled Freelancers</h2>
              </span>
              <p>
                Find the perfect professional for your project from a wide range
                of talented freelancers with the expertise you need, whether
                it's design
              </p>
            </div>
            <div className={style.card_header}>
              <span className={style.flex_heading}>
                <FaCheckCircle color="green" />
                <h2>How Our Platform Simplifies </h2>
              </span>
              <p>
                Enjoy a smooth and efficient way to collaborate with
                freelancers. From posting projects to seamless communication
              </p>
            </div>
            <div className={style.card_header}>
              <span className={style.flex_heading}>
                <FaCheckCircle color="green" />
                <h2>Join a Thriving Community of Professionals</h2>
              </span>
              <p>
                Become a part of a dynamic and growing community where
                professionals from diverse fields come together to collaborate
              </p>
            </div>
          </ul>
        </div>

        <div className={style.grid_header2}>
          <img src={office} />
        </div>
      </section>

      <section className={style.category}>
        <h2>Here Are Categories</h2>

        <div className={style.grid_category}>
          {categories.map((category) => (
            <div key={category._id} className={style.category_item}>
              <h3 className={style.category_heading}>{category.name}</h3>
              <img
                className={style.image_category}
                src={category.image}
                onClick={() => navigate(`/service/${category._id}`)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className={style.reviews_section}>
        <h2>Customer Reviews</h2>

        <div className={style.carousel_wrapper}>
          <button className={style.nav_button} onClick={prevReviews}>
            <FaChevronLeft />
          </button>

          <div className={style.reviews_grid_container}>
            {reviews.length > 0 ? (
              reviews
                .slice(currentIndex, currentIndex + reviewsPerPage)
                .map((rev) => (
                  <div key={rev._id} className={style.review_card_dynamic}>
                    <div className={style.quote_icon}>
                      <FaQuoteLeft />
                    </div>
                    <div className={style.rating_container}>
                      <FaStar className={style.star_icon} />
                      <span>{rev.rating} / 5</span>
                    </div>
                    <p className={style.review_text}>"{rev.review}"</p>
                    <h4 className={style.user_name}>
                      — {rev.userId?.name || "Anonymous"}
                    </h4>
                  </div>
                ))
            ) : (
              <p>No reviews available yet.</p>
            )}
          </div>

          <button className={style.nav_button} onClick={nextReviews}>
            <FaChevronRight />
          </button>
        </div>

        <div className={style.dots_container}>
          {Array.from({
            length: Math.ceil(reviews.length / reviewsPerPage),
          }).map((_, index) => (
            <span
              key={index}
              className={
                currentIndex === index * reviewsPerPage
                  ? style.dot_active
                  : style.dot
              }
              onClick={() => setCurrentIndex(index * reviewsPerPage)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
