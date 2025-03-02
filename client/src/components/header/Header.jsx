import React, { useContext, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LogoImg from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";
import Context from "../../context/Context";
import NaqshBgImg from '../../assets/nashq-img-bg.jpg'
import uz from '../../assets/uz.png' 
import ru from '../../assets/ru.png' 
import en from '../../assets/en.png' 

const Header = () => {
  const [t, i18n] = useTranslation("global");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dateTime, setDateTime] = useState(new Date()); // State for real-time date and time
  const contextDatas = useContext(Context);
  const currentLang = contextDatas.currentLang;

  const languages = ["uz", "ru", "en"];
  const selectedLanguage = i18n.language;

  // Update date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const changeLangHandler = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("currentLang", lang);
    setIsLanguageMenuOpen(false);
    location.reload()
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Close the mobile menu when a link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <Link to={"/"} className="logo_a">
          <div className="logo">
            <img src={LogoImg} alt="Logo"  className="logo-spin"/>
            <p>
             {t('nmm')}
            </p>
          </div>
        </Link>

        {/* Desktop Navbar */}
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            {/* Biz haqimizda */}
            <li
              onMouseEnter={() => toggleDropdown("about")}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <Link onClick={handleLinkClick}>{t("navbar.aboutUs.about")}</Link>
              {openDropdown === "about" && (
                <ul className="dropdown">
                  <li>
                    <Link to={"/activity"} onClick={handleLinkClick}>{t("navbar.aboutUs.activities")}</Link>
                  </li>
                  <li>
                    <Link to={"/structure"} onClick={handleLinkClick}>{t("navbar.aboutUs.structure")}</Link>
                  </li>
                  <li>
                    <Link to={"/leadership"} onClick={handleLinkClick}>{t("navbar.aboutUs.leadership")}</Link>
                  </li>
                  <li>
                    <Link to={"/departments"} onClick={handleLinkClick}>{t("navbar.aboutUs.departments")}</Link>
                  </li>
                  <li>
                    <Link to={"/charter"} onClick={handleLinkClick}>{t("navbar.aboutUs.charter")}</Link>
                  </li>
                  <li>
                    <Link to={"/jobs"} onClick={handleLinkClick}>{t("navbar.aboutUs.jobs")}</Link>
                  </li>
                </ul>
              )}
            </li>

            {/* NMM */}
            <li
              onMouseEnter={() => toggleDropdown("nmm")}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <Link onClick={handleLinkClick}>NMM</Link>
              {openDropdown === "nmm" && (
                <ul className="dropdown">
                  <li>
                    <Link to={"/yunesko"} onClick={handleLinkClick}>{t("navbar.nmm.yunesko")}</Link>
                  </li>
                  <li>
                    <Link to={"/national"} onClick={handleLinkClick}>{t("navbar.nmm.national")}</Link>
                  </li>
                  <li>
                    <Link to={"/local-list"} onClick={handleLinkClick}>{t("navbar.nmm.localList")}</Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Yangiliklar */}
            <li
              onMouseEnter={() => toggleDropdown("news")}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <Link onClick={handleLinkClick}>{t("navbar.news.news")}</Link>
              {openDropdown === "news" && (
                <ul className="dropdown">
                  <li>
                    <Link to={"/news"} onClick={handleLinkClick}>{t("navbar.news.news")}</Link>
                  </li>
                  <li>
                    <Link to={"/announcements"} onClick={handleLinkClick}>
                      {t("navbar.news.announcements")}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Hujjatlar */}
            <li>
              <Link to={"/docs"} onClick={handleLinkClick}>{t("navbar.docs")}</Link>
            </li>

            {/* Kutubxona */}
            <li
              onMouseEnter={() => toggleDropdown("library")}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <Link onClick={handleLinkClick}>{t("navbar.library.library")}</Link>
              {openDropdown === "library" && (
                <ul className="dropdown">
                  <li>
                    <Link to={"/resources"} onClick={handleLinkClick}>
                      {t("navbar.library.resources")}
                    </Link>
                  </li>
                  <li>
                    <Link to={"/articles"} onClick={handleLinkClick}>{t("navbar.library.articles")}</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to={"/contact"} onClick={handleLinkClick}>{t("navbar.aboutUs.contactUs")}</Link>
            </li>
          </ul>

          {/* Language Selector */}
          <div className="buttons">
            <div
              className="language-selector"
              style={{ position: "relative", display: "inline-block" }}
            >
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={selectedLanguage == 'uz' ? uz : selectedLanguage == 'ru' ? ru : en}
                  alt={selectedLanguage}
                  style={{
                    width: "20px",
                    height: "15px",
                    marginRight: "8px",
                  }}
                />
                <span>{selectedLanguage.toUpperCase()}</span>
              </button>
              {isLanguageMenuOpen && (
                <ul
                  style={{
                    position: "absolute",
                    top: "30px",
                    right: "0",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    listStyle: "none",
                    padding: "5px 0",
                    margin: "0",
                    zIndex: 1000,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {languages.map((lang) => (
                    <li
                      key={lang}
                      onClick={() => changeLangHandler(lang)}
                      style={{
                        padding: "8px 16px",
                        cursor: "pointer",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor:
                          selectedLanguage === lang ? "#f0f0f0" : "transparent",
                      }}
                    >
                      <img
                        src={lang == 'uz' ? uz : lang == 'ru' ? ru : en}
                        alt={lang}
                        style={{
                          width: "20px",
                          height: "15px",
                          marginRight: "8px",
                        }}
                      />
                      {lang.toUpperCase()}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="date-time">
            {dateTime.toLocaleDateString()}  <br/> {dateTime.toLocaleTimeString()}
          </div>
        </nav>

        {/* Mobile Toggle Button */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Real-Time Date and Time */}
    </header>
  );
};

export default Header;
