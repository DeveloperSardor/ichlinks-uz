import React, { useState, useEffect, useContext } from 'react';
import './style.css'; // to'g'ri CSS fayl import qildim
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Context from '../../context/Context';
import { useTranslation } from 'react-i18next';

const AnnouncementSingle = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const { t } = useTranslation('global');
  const { currentLang } = useContext(Context);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/announcement/${id}`);
        if (response.data.success) {
          setAnnouncement(response.data.data.announcement);
          setRecommended(response.data.data.recommended);
        } else {
          console.error('Announcement not found');
        }
      } catch (error) {
        console.error('Error fetching announcement:', error);
      }
    };

    fetchAnnouncement();
  }, [id, BACKEND_URL]);

  if (!announcement) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="announcement-single">
      <div className="announcement-content">
        <h1>{announcement[`title_${currentLang}`]}</h1>
        <div className="announcement-meta">
          <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
        </div>
        <img
          className="announcement-image"
          src={announcement.img}
          alt={announcement[`title_${currentLang}`]}
        />
        <p>{announcement[`desc_${currentLang}`]}</p>
      </div>

      <aside className="recommendations">
        <h2>{t('recommended')}</h2>
        <ul>
          {recommended.map((rec) => (
            <li key={rec._id}>
              <Link to={`/announcements/${rec._id}`} className="recommendation-link">
                <span>{new Date(rec.createdAt).toLocaleDateString()}</span>
                <p>{rec[`title_${currentLang}`]}</p>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default AnnouncementSingle;
