import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import Sidebar from "../../components/sidebar/Sidebar";
import Context from "../../context/Context";
import { useTranslation } from "react-i18next";

Modal.setAppElement("#root");

const LeadershipForm = () => {
  const { currentLang } = useContext(Context);
  const [leadershipList, setLeadershipList] = useState([]);
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameUz, setNameUz] = useState("");
  const [role, setRole] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [roles, setRoles] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Leadership");

 const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch roles on mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/roles`);
        const data = await response.json();
        setRoles(data.data || []);
      } catch (error) {
        console.error("Error fetching roles:", error);
        alert("Failed to load roles. Please try again later.");
      }
    };

    fetchRoles();
  }, []);

  // Fetch leadership list on mount
  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/leadership`);
        const data = await response.json();
        setLeadershipList(data.data || []);
      } catch (error) {
        console.error("Error fetching leadership list:", error);
      }
    };

    fetchLeadership();
  }, []);

  // Handle image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "roadsidecoder");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/roadsidecoder/image/upload",
        { method: "POST", body: data }
      );
      const result = await res.json();
      if (result.secure_url) {
        setImgUrl(result.secure_url);
        setUploadError("");
      } else {
        setUploadError("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Image upload failed.");
    }
  };

  // Open modal for adding
  const openAddModal = () => {
    setEditingId(null);
    setNameEn("");
    setNameRu("");
    setNameUz("");
    setRole("");
    setImgUrl("");
    setModalTitle("Add Leadership");
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (leadership) => {
    setEditingId(leadership._id);
    setNameEn(leadership.name_en);
    setNameRu(leadership.name_ru);
    setNameUz(leadership.name_uz);
    setRole(leadership.role._id);  // Assign the current role ID
    setImgUrl(leadership.img);
    setModalTitle("Edit Leadership");
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setEditingId(null);
    setNameEn("");
    setNameRu("");
    setNameUz("");
    setRole("");
    setImgUrl("");
    setModalTitle("Add Leadership");
    setIsModalOpen(false);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/leadership/${id}`,
          { method: "DELETE" }
        );

        if (response.ok) {
          setLeadershipList((prevList) =>
            prevList.filter((item) => item._id !== id)
          );
          alert("Leadership deleted successfully.");
        } else {
          alert("Failed to delete leadership. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting leadership:", error);
        alert("An error occurred while deleting. Please try again.");
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name_en: nameEn,
        name_ru: nameRu,
        name_uz: nameUz,
        role,
        img: imgUrl,
      };

      const response = editingId
        ? await fetch(`${BACKEND_URL}/api/leadership/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
          })
        : await fetch(`${BACKEND_URL}/api/leadership`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
          });

      if (response.ok) {
        alert(
          editingId
            ? "Leadership updated successfully"
            : "Leadership added successfully"
        );
        setIsModalOpen(false);
        setLeadershipList((prevList) =>
          editingId
            ? prevList.map((item) =>
                item._id === editingId
                  ? { ...item, ...updatedData } // Update role and other fields
                  : item
              )
            : [...prevList, { ...updatedData, _id: Date.now().toString() }]
        );
      } else {
        alert("Failed to save leadership. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting leadership:", error);
      alert("An error occurred while saving leadership. Please try again.");
    }
  };

  const [t, i18] = useTranslation('global')

  return (
    <div>
      <Sidebar />
      <div style={styles.mainContent}>
        <button onClick={openAddModal} style={styles.addButton}>
         {t('addLeader')}
        </button>

        <div style={styles.cardGrid}>
          {leadershipList.map((leadership) => (
            <div key={leadership._id} style={styles.card}>
              <img
                src={leadership.img}
                alt={leadership.name_en}
                style={styles.cardImage}
              />
              <h3>
                {currentLang === "en"
                  ? leadership.name_en
                  : currentLang === "ru"
                  ? leadership.name_ru
                  : leadership.name_uz}
              </h3>
              <p>
                {currentLang === "en"
                  ? leadership.role.name_en
                  : currentLang === "ru"
                  ? leadership.role.name_ru
                  : leadership.role.name_uz}
              </p>
              <div style={styles.cardButtons}>
                <button
                  onClick={() => handleEdit(leadership)}
                  style={styles.editButton}
                >
                  {t('leader.edit')}
                </button>
                <button
                  onClick={() => handleDelete(leadership._id)}
                  style={styles.deleteButton}
                >
                {t('leader.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={styles.modal}
      >
        <h2 style={styles.modalTitle}>{modalTitle}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Name (English)"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Имя (Русский)"
            value={nameRu}
            onChange={(e) => setNameRu(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Ism (O‘zbekcha)"
            value={nameUz}
            onChange={(e) => setNameUz(e.target.value)}
            style={styles.input}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Select Role</option>
            {roles.map((roleOption) => (
              <option key={roleOption._id} value={roleOption._id}>
                 { currentLang == 'en' ? roleOption.name_en : currentLang == 'ru' ? roleOption.name_ru : roleOption.name_uz}
              </option>
            ))}
          </select>
          <input type="file" onChange={handleFileChange} style={styles.input} />
          {imgUrl && <img src={imgUrl}   alt="Preview" style={styles.preview} />}
          {uploadError && <p style={styles.errorText}>{uploadError}</p>}
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.saveButton}>
              {t('leader.save')}
            </button>
            <button type="button" onClick={closeModal} style={styles.cancelButton}>
              {t('cancel')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const styles = {
  mainContent: {
    padding: "20px",
    marginLeft: "20em",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  cardGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    width: "280px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center",
  },
  cardImage: {
    width: "100%",
    height : '270px',
    borderRadius: "8px",
    marginBottom: "10px",
    objectFit : "cover"
  },
  cardButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "6px 8px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "6px 8px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  modal: {
    content: {
      maxWidth: "600px",
      margin: "auto",
      padding: "20px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      backgroundColor: "#fff",
    },
  },
  modalTitle: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  preview: {
    width: "200px",
    margin: "0.5em auto",
    borderRadius: "4px",
    height : "200px"
  },
  errorText: {
    color: "red",
    fontSize: "14px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default LeadershipForm;
