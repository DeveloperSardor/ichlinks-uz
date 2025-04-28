import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';
import Context from '../../context/Context';

const JobVacancies = () => {
  const { t } = useTranslation('global');
  const { currentLang } = useContext(Context);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', text: '', resume: '' });
  const [appliedVacancies, setAppliedVacancies] = useState([]);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/job-vacancies`);
        const data = await response.json();
        if (data.success) {
          setVacancies(data.data);
        }
      } catch (error) {
        console.error('Error fetching job vacancies:', error);
      } finally {
        setLoading(false);
      }
    };

    const savedApplications = JSON.parse(localStorage.getItem('appliedVacancies')) || [];
    setAppliedVacancies(savedApplications);

    fetchVacancies();
  }, []);

  const getField = (item, field) => {
    if (currentLang === 'en') return item[`${field}_en`];
    if (currentLang === 'ru') return item[`${field}_ru`];
    if (currentLang === 'uz') return item[`${field}_uz`];
    return item[`${field}_en`];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/api/vacancy-applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, vacancy: selectedVacancy?._id }),
      });
      const data = await response.json();
      if (data.success) {
        alert(t('application.success'));
        const newApplications = [...appliedVacancies, selectedVacancy._id];
        setAppliedVacancies(newApplications);
        localStorage.setItem('appliedVacancies', JSON.stringify(newApplications));
        setShowModal(false);
        setFormData({ name: '', phone: '', text: '', resume: '' });
      } else {
        alert(t('application.error'));
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert(t('application.error'));
    }
  };

  return (
    <div className="jobs-container">
      <h1 className="jobs-title">{t('navbar.aboutUs.jobs')}</h1>

      {loading ? (
        <p className="loading-text">{t('loading')}</p>
      ) : (
        <div className="jobs-list">
          {vacancies.map((vacancy) => (
            <div className="job-card" key={vacancy._id}>
              <h3 className="job-role">{getField(vacancy.role, 'name')}</h3>
              <h4 className="job-position">{getField(vacancy, 'title')}</h4>
              <p className="job-description">{getField(vacancy, 'text')}</p>
              <button
                className="apply-btn"
                onClick={() => { setSelectedVacancy(vacancy); setShowModal(true); }}
                disabled={appliedVacancies.includes(vacancy._id)}
              >
                {appliedVacancies.includes(vacancy._id) ? t('alreadyApplied') : t('applyNow')}
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {t('applyFor')} {getField(selectedVacancy.role, 'name')}
            </h2>
            <form onSubmit={handleSubmit} className="application-form">
              <label>{t('name')}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <label>{t('phone')}</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />

              <label>{t('coverLetter')}</label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                required
              />

              <label>{t('resume')} (URL)</label>
              <input
                type="text"
                value={formData.resume}
                onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
              />

              <div className="modal-buttons">
                <button type="submit" className="submit-btn">{t('submitApplication')}</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  {t('close')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobVacancies;
