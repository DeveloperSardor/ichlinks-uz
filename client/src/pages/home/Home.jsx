import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NewsCard from "../../components/news-card/NewsCard";
import Context from "../../context/Context";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

const Home = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  const contextDatas = useContext(Context);
  const currentLang = contextDatas.currentLang;

  const [news, setNews] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const GetNews = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/news`);
      setNews(data.data);
    } catch (error) {
      toast.error(t("error.fetchNews"));
      console.error("Error fetching news:", error.message);
    }
  };

  const GetDocuments = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/docs`);
      setDocuments(data.data);
    } catch (error) {
      toast.error(t("error.fetchDocuments"));
      console.error("Error fetching documents:", error.message);
    }
  };

  const GetDepartments = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/department`);
      setDepartments(data.data);
    } catch (error) {
      toast.error(t("error.fetchDepartments"));
      console.error("Error fetching departments:", error.message);
    }
  };

  const GetAnnouncements = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/announcement`);
      setAnnouncements(data.data);
    } catch (error) {
      toast.error(t("error.fetchAnnouncements"));
      console.error("Error fetching announcements:", error.message);
    }
  };

  useEffect(() => {
    GetNews();
    GetDocuments();
    GetDepartments();
    GetAnnouncements();
  }, []);

 
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Previous va Next tugmalarini olib tashlash
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero_section">
        <div className="overlay"></div>
        <div className="content_">
          <h2 className="title">{t("nmm")}</h2>
        </div>
      </div>

      {/* News Section */}
      <div className="news_section">
        <div className="container_">
          <h2 className="heading">{t("navbar.news.news")}</h2>
          <div className="news_wrp">
            {news.length > 0 ? (
              news.slice(0, 3).map((item) => <NewsCard key={item._id} data={item} />)
            ) : (
              <p>{t("noNews")}</p>
            )}
          </div>
        </div>
      </div>


   {/* Announcements Section */}
   <div className="announcements_section">
        <div className="container_">
          <h2 className="heading">{t("navbar.news.announcements")}</h2>

          <Slider {...sliderSettings}>
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <div
                  className="ann_card"
                  onClick={() => navigate(`/announcements/${announcement._id}`)}
                  key={announcement._id}
                >
                  <img
                    src={announcement.img}
                    alt={announcement[`title_${currentLang}`]}
                    className="card-image"
                  />
                  <div className="card-content">
                    <h3 className="card-title">{announcement[`title_${currentLang}`]}</h3>
                    <p className="card-date">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </p>
                    <p className="card-description">
                      {announcement[`desc_${currentLang}`].slice(0, 60)}...
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>{t("noAnnouncements")}</p>
            )}
          </Slider>
        </div>
      </div>





      {/* Documents Section */}
      <div className="documents_section">
  <div className="container_">
    <h2 className="heading">{t("navbar.docs")}</h2>
    <div className="documents_wrp">
      {documents.length > 0 ? (
        documents.slice(0, 3).map((doc) => (
          <div key={doc._id} className="document_card">
            <div className="doc_icon">
              📄
            </div>
            <h3 className="doc_title">{doc[`title_${currentLang}`].slice(0, 30)}...</h3>
            <p className="doc_text">{doc[`text_${currentLang}`].slice(0, 50)}...</p>
            {doc.link && (
              <a href={doc.link} className="doc_link" target="_blank" rel="noopener noreferrer">
                {t("viewDocument")}
              </a>
            )}
          </div>
        ))
      ) : (
        <p>{t("noDocuments")}</p>
      )}
    </div>
    {documents.length > 3 && <button className="more_btn" onClick={() => navigate("/docs")}>{t("moreBtn")}</button>}
  </div>
</div>


    {/* Departments Section */}
<div className="departments_section">
  <div className="container_">
    <h2 className="heading">{t("navbar.aboutUs.departments")}</h2>
    <div className="departments_wrp">
      {departments.length > 0 ? (
        departments.slice(0, 3).map((dep) => (
          <div key={dep._id} className="department_card">
            <img src={dep.img} alt={dep[`title_${currentLang}`]} className="department_img" />
            <h3 className="dep_title">{dep[`title_${currentLang}`]}</h3>
          </div>
        ))
      ) : (
        <p>{t("noDepartments")}</p>
      )}
    </div>
    {departments.length > 3 && <button className="more_btn " onClick={() => navigate("/departments")}>{t("moreBtn")}</button>}
  </div>
</div>


      {/* Map Section */}
      <div className="map">
        <iframe src="https://yandex.uz/map-widget/v1/-/CHQrFz4nT" width="100%" height="500px" frameBorder="0" title="Yandex Map" style={{ border: 0 }} allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default Home;
