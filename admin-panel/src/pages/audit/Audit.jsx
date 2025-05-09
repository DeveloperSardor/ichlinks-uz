import Context from "../../context/Context";
import { useTranslation } from "react-i18next";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Modal from 'react-modal'
import './style.css'


const Audit = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const contextDatas = useContext(Context);
  const currentLang = contextDatas.currentLang;
  const [t, i18n] = useTranslation('global');
  const [docs, setDocs] = useState([]);

  const [newDoc, setNewDoc] = useState({
    title_en: '', title_ru: '', title_uz: '',
    desc_en: '', desc_ru: '', desc_uz: ''
  });
  
  const [editDoc, setEditDoc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/audit`);
      setDocs(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      console.error('Error fetching docs:', error);
    }
  };

  const handleAddDoc = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/audit`, newDoc);
      setDocs([...docs, response.data.data]);
      setNewDoc({
        title_en: '', title_ru: '', title_uz: '',
        desc_en: '', desc_ru: '', desc_uz: ''
      });
      setIsModalOpen(false);
      fetchDocs()
    } catch (error) {
      console.error('Error adding doc:', error);
    }
  };
  

  const handleDeleteDoc = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/audit/${id}`);
      setDocs(docs.filter(doc => doc._id !== id));
    } catch (error) {
      console.error('Error deleting doc:', error);
    }
  };

  const handleUpdateDoc = async () => {
    if (!editDoc || !editDoc._id) {
      console.error('No document selected or audit ID is missing');
      return;
    }
  
    try {
      const response = await axios.put(`${BACKEND_URL}/api/audit/${editDoc._id}`, {
        title_en: editDoc.title_en,
        title_ru: editDoc.title_ru,
        title_uz: editDoc.title_uz,
        desc_en: editDoc.desc_en,
        desc_ru: editDoc.desc_ru,
        desc_uz: editDoc.desc_uz
      });
  
      if (response.data && response.data.data) {
        const updatedDocs = docs.map(doc =>
          doc._id === editDoc._id ? response.data.data : doc
        );
        setDocs(updatedDocs);
      }
  
      setEditDoc(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating doc:', error);
    }
  };
  

  const openModal = (doc = null) => {
    setEditDoc(doc ? { ...doc } : null);
    setNewDoc({ title_en: '', title_ru: '', title_uz: '', link: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditDoc(null);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (editDoc) {
      setEditDoc({ ...editDoc, [field]: value });
    } else {
      setNewDoc({ ...newDoc, [field]: value });
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="docs-content">
        <div className="docs-header">
          <h1>{t('audit')}</h1> {/* Translated Docs title */}
          <button className="add-doc-button" onClick={() => openModal()}>{t('addAudit')}</button> {/* Translated Add Document button */}
        </div>

        <div className="docs-grid">
          {docs.map(doc => (
            <div key={doc?._id} className="doc-card">
              <h3>{currentLang == 'uz' ? doc?.title_uz : currentLang == 'ru' ? doc?.title_ru : doc?.title_en}</h3>
              <p>{currentLang == 'uz' ? doc?.desc_uz : currentLang == 'ru' ? doc?.desc_ru : doc?.desc_en}</p>
              
             
              <div className="card-buttons">
                <button className="edit_btnn" onClick={() => openModal(doc)}>{t('edit')}</button> {/* Translated Edit button */}
                <button className="delete_btnn" onClick={() => handleDeleteDoc(doc?._id)}>{t('delete')}</button> {/* Translated Delete button */}
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel={editDoc ? t('editDoc') : t('addAudit')} // Translated content label
          className="modal"
          overlayClassName="overlay"
        >
          <h2>{editDoc ? t('edit') : t('addDoc')}</h2> {/* Modal title translation */}
          <input
            type="text"
            placeholder={t('titlePlaceholder') + '(English)'} // Translated placeholder
            value={editDoc ? editDoc.title_en : newDoc.title_en}
            onChange={(e) => handleInputChange(e, 'title_en')}
          />
          <input
            type="text"
            placeholder={t('titlePlaceholder') + '(Русский)'} // Translated placeholder
            value={editDoc ? editDoc.title_ru : newDoc.title_ru}
            onChange={(e) => handleInputChange(e, 'title_ru')}
          />
          <input
            type="text"
            placeholder={t('titlePlaceholder') + '(Uzbek)'} // Translated placeholder
            value={editDoc ? editDoc.title_uz : newDoc.title_uz}
            onChange={(e) => handleInputChange(e, 'title_uz')}
          />
          <input
  type="text"
  placeholder={t('textPlaceholder') + '(English)'}
  value={editDoc ? editDoc.desc_en : newDoc.desc_en}
  onChange={(e) => handleInputChange(e, 'desc_en')}
/>
<input
  type="text"
  placeholder={t('textPlaceholder') + '(Русский)'}
  value={editDoc ? editDoc.desc_ru : newDoc.desc_ru}
  onChange={(e) => handleInputChange(e, 'desc_ru')}
/>
<input
  type="text"
  placeholder={t('textPlaceholder') + '(Uzbek)'}
  value={editDoc ? editDoc.desc_uz : newDoc.desc_uz}
  onChange={(e) => handleInputChange(e, 'desc_uz')}
/>

          <button onClick={editDoc ? handleUpdateDoc : handleAddDoc}>
            {editDoc ? t('save') : t('addAudit')}
          </button>

          <button onClick={closeModal} className="close-modal">{t('cancel')}</button> {/* Translated cancel button */}
        </Modal>
      </div>
    </div>
  );
};

export default Audit;
