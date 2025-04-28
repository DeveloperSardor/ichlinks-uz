import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaClock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Context from "../../context/Context";
import "./style.css";

const Rahbariyat = () => {
  const { t } = useTranslation("global");
  const { currentLang } = useContext(Context);
  const [leaders, setLeaders] = useState([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetching leaders from the API
  const fetchLeaders = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/leadership`);
      setLeaders(data.data);
    } catch (error) {
      console.error("Error fetching leadership data:", error.message);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const getLocalizedText = (item, field) => {
    if (!item || !field) return "";
    if (currentLang === "en") return item[`${field}_en`];
    if (currentLang === "ru") return item[`${field}_ru`];
    return item[`${field}_uz`];
  };

  return (
    <div className="rahbariyat-container">
      <h2 className="section-title">{t("navbar.aboutUs.leadership")}</h2>
      <div className="leaders-grid">
        {leaders.length > 0 ? (
          leaders.map((leader) => (
            <div className="leader-card" key={leader._id}>
              <img
                src={leader.img || "https://via.placeholder.com/150"}
                alt={getLocalizedText(leader, "name")}
                className="leader-image"
              />
              <h3 className="leader-name">{getLocalizedText(leader, "name")}</h3>
              <h4 className="leader-role">{getLocalizedText(leader.role, "name")}</h4>
              <p className="leader-position">{leader.position}</p>
              <div className="admission">
                <p className="leader-time">
                  <FaClock /> {leader.time || "15:00-17:00"}
                </p>
                <p className="leader-days">
                  {currentLang === "en"
                    ? "Monday-Wednesday"
                    : currentLang === "ru"
                    ? "Понедельник-Среда"
                    : "Dushanba-Chorshanba"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>{t("noLeaders")}</p>
        )}
      </div>
    </div>
  );
};

export default Rahbariyat;
