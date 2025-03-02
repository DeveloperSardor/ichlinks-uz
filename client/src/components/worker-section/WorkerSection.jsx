import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { FaClock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import Context from "../../context/Context";

const Rahbariyat = () => {
  const [t] = useTranslation("global");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Ensure this is defined in your environment variables
  const [leaders, setLeaders] = useState([]);
  const contextDatas = useContext(Context)
 const currentLang = contextDatas.currentLang;

  // Fetching leaders from the API
  const fetchLeaders = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/leadership`);
      setLeaders(data.data); // Assuming the leaders' data is in `data.data`
    } catch (error) {
      console.error("Error fetching leadership data:", error.message);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  return (
    <div className="rahbariyat-container">
      <h2 className="section-title">{t("navbar.aboutUs.leadership")}</h2>
      <div className="leaders-grid">
        {leaders.length > 0 ? (
          leaders.map((leader) => (
            <div className="leader-card" key={leader._id}>
              <img
                src={leader.img || "https://via.placeholder.com/150"} // Fallback image
                alt={leader.name}
                className="leader-image"
              />
              <h3 className="leader-name">{ currentLang == 'en' ?  leader.name_en : currentLang == 'ru' ? leader.name_ru : leader.name_uz}</h3>
              <h3 className="leader-role">{ currentLang == 'en' ?  leader.role.name_en : currentLang == 'ru' ? leader.role.name_ru : leader.role.name_uz}</h3>
              <p className="leader-position">{leader.position}</p>
              <div className="admission">
                {/* <p className="leader-date">
                  {t("admission")}: {leader.admissionDays || t("noData")}
                </p> */}
                <p className="leader-time">
                  <FaClock /> {leader.time || "15:00-17:00"} 
                </p>
                  {currentLang == 'en' ? "Monday-Wednesday" : currentLang == 'ru' ? "Понедельник-Среда" : "Dushanba-Chorshanba"}
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
