import React, { useState, useEffect } from "react";
import "./style.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

const UsefulContents = () => {
  const [t, i18n] = useTranslation("global");
  const [contents, setContents] = useState([]); // State to store content fetched from API

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Backend URL

  // Function to extract YouTube video ID from the URL
  const getYoutubeId = (url) => {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/]+\/[^\/\n\s]+\/\S+|\S+\/\S+|(?:v|e(?:mbed)?)\/([a-zA-Z0-9_-]{11}))|youtu\.be\/([a-zA-Z0-9_-]{11}))/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  // Fetch data from API
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/resources`);
        if (response.data.success) {
          setContents(response.data.data); // Set the contents from the API
        } else {
          console.error("Failed to load contents");
        }
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchContents();
  }, []);

  return (
    <div className="contents-container">
      <h1 className="page-title">{t("navbar.library.resources")}</h1>
      <div className="contents-grid">
        {contents.map((content) => (
          <div className="content-card" key={content._id}>
            {/* Media Section */}
            <div className="content-media">
              {/* Check for youtube_link and render iframe */}
              {content.youtube_link && (
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(content.youtube_link)}`}
                  title={content.title}
                  allowFullScreen
                  className="video-frame"
                ></iframe>
              )}
              {/* Check for pdf_link and render download link */}
              {content.pdf_link && (
                <a
                  href={content.pdf_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-link"
                >
                   PDF
                </a>
              )}
            </div>
            {/* Details Section */}
            <div className="content-details">
              <h2 className="content-title">{content[`title_${i18n.language}`]}</h2>
              <p className="content-description">
                {content[`text_${i18n.language}`]?.slice(0, 60) + "..."}
              </p>
              {content.link && (
                <a
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-link"
                >
                  Visit Resource
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsefulContents;
