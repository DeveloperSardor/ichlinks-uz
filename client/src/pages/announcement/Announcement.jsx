import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import axios from 'axios';
import Context from '../../context/Context';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AnnouncementsPage = () => {
  const { currentLang } = useContext(Context);
  const [t] = useTranslation('global');
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 6;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/announcement`);
        if (response.data.success) {
          setAnnouncements(response.data.data);
        } else {
          console.error('Failed to load announcements');
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, [BACKEND_URL]);

  // Sahifalash
  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const pageNumbers = Array.from({ length: Math.ceil(announcements.length / announcementsPerPage) }, (_, i) => i + 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ann_container">
      <header className="ann_header">
        <h1>{t('navbar.news.announcements')}</h1>
      </header>

      <div className="ann_grid">
        {currentAnnouncements.map((announcement) => (
          <div
            className="ann_card"
            onClick={() => navigate(`/announcements/${announcement._id}`)}
            key={announcement._id}
          >
            <img
              src={announcement.img}
              alt={announcement[`title_${currentLang}`] || 'Announcement'}
              className="card-image"
            />
            <div className="card-content">
              <h3 className="card-title">
                {announcement[`title_${currentLang}`]}
              </h3>
              <p className="card-date">
                {new Date(announcement.createdAt).toLocaleDateString()}
              </p>
              <p className="card-description">
                {announcement[`desc_${currentLang}`]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sahifa tugmalari */}
      <div className="pagination">
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
};

export default AnnouncementsPage;
