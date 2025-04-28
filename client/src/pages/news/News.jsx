import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Context from "../../context/Context";
import { useNavigate } from "react-router-dom";

const NewsPage = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [t] = useTranslation("global");
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;
  const currentLang = useContext(Context)?.currentLang;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/news`);
        const sortedNews = data?.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNews(sortedNews);
      } catch (error) {
        toast.error(error.message);
      }
    }

    fetchNews();
  }, []);

  // Pagination calculations
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const pageNumbers = Array.from({ length: Math.ceil(news.length / newsPerPage) }, (_, i) => i + 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="news-page">
      <h1 className="news-header">{t("navbar.news.news")}</h1>
      <div className="news-grid">
        {currentNews.map((newsItem) => (
          <div
            key={newsItem._id}
            className="news-card"
            onClick={() => navigate(`/news/${newsItem._id}`)}
          >
            <div className="news-media">
              {newsItem.files?.length > 0 && newsItem.files[0].type_file === "image" ? (
                <img
                  src={newsItem.files[0].link}
                  alt={newsItem[`title_${currentLang}`]}
                />
              ) : newsItem.youtube_link ? (
                <div className="youtube-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={newsItem.youtube_link.replace("youtu.be", "www.youtube.com/embed")}
                    title={newsItem[`title_${currentLang}`]}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : null}
            </div>
            <div className="news-content">
              <span className="news-date">
                {new Date(newsItem.createdAt).toLocaleDateString()}
              </span>
              <h3 className="news-title">{newsItem[`title_${currentLang}`]}</h3>
              <p className="news-description">{newsItem[`text_${currentLang}`]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pageNumbers.length > 1 && (
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
      )}
    </div>
  );
};

export default NewsPage;
