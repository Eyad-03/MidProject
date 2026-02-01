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

import { FaCheckCircle } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const [categories, setCategories] = useState([]);
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


    useEffect(() => {
      fetchCategory();
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
              the ddeferint between hiring and expert the ddeferint between
              hiring and expert the ddeferint between hiring and expert
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
                <h2>Heading 1</h2>
              </span>
              <p>
                Lorem Ipsum Dolor Sit Amet, Interdum A Suscipit Et, Consequat
                Nec Nibh. Lorem Ipsum Dolor Sit Amet, Interdum
              </p>
            </div>
            <div className={style.card_header}>
              <span className={style.flex_heading}>
                <FaCheckCircle color="green" />
                <h2>Heading 2</h2>
              </span>
              <p>
                Lorem Ipsum Dolor Sit Amet, Interdum A Suscipit Et, Consequat
                Nec Nibh. Lorem Ipsum Dolor Sit Amet, Interdum
              </p>
            </div>
            <div className={style.card_header}>
              <span className={style.flex_heading}>
                <FaCheckCircle color="green" />
                <h2>Heading 3</h2>
              </span>
              <p>
                Lorem Ipsum Dolor Sit Amet, Interdum A Suscipit Et, Consequat
                Nec Nibh. Lorem Ipsum Dolor Sit Amet, Interdum
              </p>
            </div>
          </ul>
        </div>

        <div className={style.grid_header2}>
          <img src={office} />
        </div>
      </section>

      <section className={style.category}>
        <h2>Here Are Category</h2>

        <div className={style.grid_category}>
          {categories.map((category) => (
            <img
              className={style.image_category}
              src={category.image}
              onClick={() => navigate(`/service/${category._id}`)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
