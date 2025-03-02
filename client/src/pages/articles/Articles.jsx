import React, { useState, useEffect } from 'react';
import './style.css';  // Import custom styles
import { useTranslation } from 'react-i18next';  // i18n for translations
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ScientificArticles() {
  const [t, i18n] = useTranslation('global');
  const [articles, setArticles] = useState([]);  // State for storing articles
  const [currentPage, setCurrentPage] = useState(1);  // Current page
  const [articlesPerPage] = useState(6);  // Articles per page
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  // Backend URL (you need to set this in .env file)
  const navigate = useNavigate();

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/articles`);
        if (response.data.success) {
          setArticles(response.data.data);  // Set the articles in state
        } else {
          console.error('Failed to load articles');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  // Paginate articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Pagination navigation
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="articles-container">
      <h1 className="text-center">{t('navbar.library.articles')}</h1>
      <div className="articles-grid">
        {currentArticles.map(article => (
          <div className="article-card"  key={article._id}>
            <div className="article-content">
              <h5 className="article-title">{article[`title_${i18n.language}`]}</h5>
              <p className="article-description">{article[`desc_${i18n.language}`].slice(0, 30) + '...'}</p>
              {/* Display the PDF file link */}
              <a href={`${article.pdf_file}`} target="_blank" rel="noopener noreferrer">
                <button className="read-more-btn">{t('moreBtn')}</button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination" style={{ marginTop : "-1.4em" }}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ScientificArticles;
