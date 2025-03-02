import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NewsCard from "../../components/news-card/NewsCard";
import "./style.css";
import Context from "../../context/Context";

const Home = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [t] = useTranslation("global");
  const [news, setNews] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const contextDatas = useContext(Context);
  const currentLang = contextDatas.currentLang;

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

  useEffect(() => {
    GetNews();
    GetDocuments();
    GetDepartments();
  }, []);

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
              news.slice(0,3).map((item) => <NewsCard key={item._id} data={item} />)
            ) : (
              <p>{t("noNews")}</p>
            )}
          </div>
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
                  <h3 className="doc_title">
                    {currentLang === "en"
                      ? doc.title_en.slice(0, 30) + "..."
                      : currentLang === "ru"
                      ? doc.title_ru.slice(0, 30) + "..."
                      : doc.title_uz.slice(0, 30) + "..."}
                  </h3>
                  <p className="doc_text">
                    {currentLang === "en"
                      ? doc.text_en.slice(0, 50) + "..."
                      : currentLang === "ru"
                      ? doc.text_ru.slice(0, 50) + "..."
                      : doc.text_uz.slice(0, 50) + "..."}
                  </p>
                  {doc.link && (
                    <a
                      href={doc.link}
                      className="doc_link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("viewDocument")}
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p>{t("noDocuments")}</p>
            )}
          </div>
          {documents.length > 3 && (
            <button
              className="more_btn"
              onClick={() => navigate("/docs")}
            >
              {t("moreBtn")}
            </button>
          )}
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
                  <img
                    src={dep.img}
                    alt={dep[`title_${t("lang")}`]}
                    className="department_img"
                  />
                  <h3 className="dep_title">
                    {currentLang === "en"
                      ? dep.title_en
                      : currentLang === "ru"
                      ? dep.title_ru
                      : dep.title_uz}
                  </h3>
                </div>
              ))
            ) : (
              <p>{t("noDepartments")}</p>
            )}
          </div>
          {departments.length > 3 && (
            <button
              className="more_btn"
              onClick={() => navigate("/departments")}
            >
              {t("moreBtn")}
            </button>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="map">
        <iframe
          src="https://yandex.uz/map-widget/v1/-/CHQrFz4nT"
          width="100%"
          height="500px"
          frameBorder="0"
          title="Yandex Map"
          style={{ border: 0, margin: "0 auto" }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
