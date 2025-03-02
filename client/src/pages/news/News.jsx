import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Context from "../../context/Context";
import { useNavigate } from "react-router-dom";

const NewsPage = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [t, i18n] = useTranslation("global");
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Hozirgi sahifa
  const [newsPerPage] = useState(6); // Sahifada ko'rsatiladigan e'lonlar soni
  const currentLang = useContext(Context)?.currentLang;
  const navigate = useNavigate();

  // Fetch news on component mount
  useEffect(() => {
    async function fetchNews() {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/news`);
        setNews(data?.data);
      } catch (error) {
        toast.error(error.message);
      }
    }

    fetchNews();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Newsni sahifalarga ajratish
  const indexOfLastNews = currentPage * newsPerPage; // Oxirgi ko'rsatilgan e'lon
  const indexOfFirstNews = indexOfLastNews - newsPerPage; // Birinchi ko'rsatilgan e'lon
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews); // Hozirgi sahifada ko'rsatiladigan e'lonlar

  // Sahifa navigatsiyasi uchun
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(news.length / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Sahifani o'zgartirish
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="news-page">
      <h1 className="news-header">{t("navbar.news.news")}</h1>
      <div className="news-grid">
        {currentNews.map((newsItem, index) => (
          <div
            key={index}
            className="news-card"
            onClick={() => navigate(`/news/${newsItem._id}`)}
          >
            <div className="news-imagee">
              {/* Render image if file type is image */}
              {newsItem.files && newsItem.files.length > 0 && newsItem.files[0].type_file === "image" ? (
                <img
                  src={newsItem.files[0].link}
                  alt={newsItem[`title_${currentLang}`]}
                />
              ) : (
                newsItem.youtube_link && (
                  <div className="youtube-video">
                    <iframe
                      width="100%"
                      height="250"
                      src={newsItem.youtube_link.replace("youtu.be", "www.youtube.com/embed")}
                      title={newsItem[`title_${currentLang}`]}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )
              )}
            </div>
            <div className="news-content">
              <span className="news-date">
                {new Date(newsItem.createdAt).toLocaleDateString()}
              </span>
              {/* <h3 className="news-title">{currentLang == 'uz' ? newsItem.title_uz : currentLang == 'ru' ? newsItem.title_ru : newsItem.title_en}</h3> */}
              <h3 className="news-title">{newsItem[`title_${currentLang}`]}</h3>
              <p className="news-description">{newsItem[`text_${currentLang}`]}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
