import React, { useState } from "react";
import styles from "./Settings.module.css"; // Import the CSS module
import user from "../../assets/user.png";
import { FaTrash } from "react-icons/fa";
import Modal from "react-modal"; // Import the react-modal library
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Settings = () => {
  const [isHovered, setIsHovered] = useState(false); // State variable to track hover state
  const [isModalOpen, setIsModalOpen] = useState(false); // State variable for modal
  const [activeTab, setActiveTab] = useState("Language"); // State variable for active tab
  const navigate = useNavigate();

  const handleSaveChanges = (activeTab) => {
    if (activeTab === "Language") {
      userData.languagePreferences = selectedLanguagePreferences;
    } else if (activeTab === "Genre") {
      userData.genrePreferences = selectedGenrePreferences;
    }

    closeModal();
  };

  const toggleLanguagePreference = (language) => {
    if (selectedLanguagePreferences.includes(language)) {
      setSelectedLanguagePreferences((prev) =>
        prev.filter((prevLanguage) => prevLanguage !== language)
      );
    } else {
      setSelectedLanguagePreferences((prev) => [...prev, language]);
    }
  };

  const toggleGenrePreference = (genre) => {
    if (selectedGenrePreferences.includes(genre)) {
      setSelectedGenrePreferences((prev) =>
        prev.filter((prevGenre) => prevGenre !== genre)
      );
    } else {
      setSelectedGenrePreferences((prev) => [...prev, genre]);
    }
  };

  // Replace with actual user data fetched from the backend
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    languagePreferences: ["English", "Spanish", "French"],
    genrePreferences: ["Action", "Comedy", "Drama"],
  };

  // Dummy data for language and genre preferences
  // Replace with data fetched from the backend
  const languagePreferences = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
  ];

  const genrePreferences = ["Action", "Comedy", "Drama", "Sci-Fi", "Romance"];

  // Handle subscription cancellation
  const handleCancelSubscription = () => {
    // Remove JWT token from local storage
    localStorage.removeItem("token");

    // Navigate to the signup page
    navigate("/signup");

    // Reload the window (optional)
    window.location.reload();
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [selectedLanguagePreferences, setSelectedLanguagePreferences] =
    useState(userData.languagePreferences);

  const [selectedGenrePreferences, setSelectedGenrePreferences] = useState(
    userData.genrePreferences
  );

  return (
    <div className={styles["settings-container"]}>
      <div className={styles["profile-info"]}>
        <img
          src={user}
          alt="User Profile"
          className={styles["profile-photo"]}
        />
        <div className={styles["user-details"]}>
          <h1 className={styles["user-name"]}>{userData.name}</h1>
          <p className={styles["user-email"]}>{userData.email}</p>
        </div>
      </div>
      <div className={styles["preferences"]}>
        <div className={styles["preferences-heading-container"]}>
          <h2 className={styles["preferences-heading"]}>
            Language Preferences
          </h2>
          <button
            className={styles["change-preference-button"]}
            onClick={openModal}
          >
            Change
          </button>
        </div>
        <div className={styles["preference-cards"]}>
          {languagePreferences.map((language, index) => (
            <div
              key={index}
              className={`${styles["preference-card"]} ${
                isHovered ? styles["hovered"] : ""
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {language}
              {isHovered && <FaTrash className={styles["delete-icon"]} />}
            </div>
          ))}
        </div>
        <div className={styles["preferences-heading-container"]}>
          <h2 className={styles["preferences-heading"]}>Genre Preferences</h2>
          <button
            className={styles["change-preference-button"]}
            onClick={openModal}
          >
            Change
          </button>
        </div>
        <div className={styles["preference-cards"]}>
          {genrePreferences.map((genre, index) => (
            <div
              key={index}
              className={`${styles["preference-card"]} ${
                isHovered ? styles["hovered"] : ""
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {genre}
              {isHovered && <FaTrash className={styles["delete-icon"]} />}
            </div>
          ))}
        </div>
      </div>
      <button
        className={styles["cancel-subscription"]}
        onClick={handleCancelSubscription}
      >
        Cancel Subscription
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Preference Modal"
        className={styles["modal"]}
      >
        <div className={styles["modal-content"]}>
          <div className={styles["modal-header"]}>
            <button className={styles["close-button"]} onClick={closeModal}>
              Close
            </button>
          </div>
          <div className={styles["modal-tabs"]}>
            <button
              className={`${styles["modal-tab"]} ${
                activeTab === "Language" ? styles["active"] : ""
              }`}
              onClick={() => handleTabChange("Language")}
            >
              Language
            </button>
            <button
              className={`${styles["modal-tab"]} ${
                activeTab === "Genre" ? styles["active"] : ""
              }`}
              onClick={() => handleTabChange("Genre")}
            >
              Genre
            </button>
          </div>
          <div className={styles["modal-content-container"]}>
            {activeTab === "Language" ? (
              <div>
                Language Preferences:
                <div className={styles["preference-cards"]}>
                  {languagePreferences.map((language, index) => (
                    <div
                      key={index}
                      className={`${styles["preference-card"]} ${
                        selectedLanguagePreferences.includes(language)
                          ? styles["selected"]
                          : ""
                      }`}
                      onClick={() => toggleLanguagePreference(language)}
                    >
                      {language}
                      {selectedLanguagePreferences.includes(language) && (
                        <FaTrash className={styles["delete-icon"]} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                Genre Preferences:
                <div className={styles["preference-cards"]}>
                  {genrePreferences.map((genre, index) => (
                    <div
                      key={index}
                      className={`${styles["preference-card"]} ${
                        selectedGenrePreferences.includes(genre)
                          ? styles["selected"]
                          : ""
                      }`}
                      onClick={() => toggleGenrePreference(genre)}
                    >
                      {genre}
                      {selectedGenrePreferences.includes(genre) && (
                        <FaTrash className={styles["delete-icon"]} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add "Save Changes" button */}
            <button
              className={styles["save-changes-button"]}
              onClick={() => handleSaveChanges(activeTab)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;

// import React, { useState } from "react";
// import "./Settings.css"; // Import your CSS file for styling
// import user from "../../assets/user.png";
// import { FaTrash } from "react-icons/fa";
// import LanguagePreferencesModal from "./LanguagePreferencesModal"; // Import the LanguagePreferencesModal component
// import GenrePreferencesModal from "./GenrePreferencesModal"; //

// const Settings = () => {
//   const [isHovered, setIsHovered] = useState(false); // State variable to track hover state
//   const [isLanguageModalOpen, setLanguageModalOpen] = useState(false);
//   const [isGenreModalOpen, setGenreModalOpen] = useState(false);

//   // Replace with actual user data fetched from the backend
//   const userData = {
//     name: "John Doe",
//     email: "johndoe@example.com",
//     languagePreferences: ["English", "Spanish", "French"],
//     genrePreferences: ["Action", "Comedy", "Drama"],
//   };

//   // Dummy data for language and genre preferences
//   // Replace with data fetched from the backend
//   const languagePreferences = [
//     "English",
//     "Spanish",
//     "French",
//     "German",
//     "Italian",
//   ];

//   const genrePreferences = ["Action", "Comedy", "Drama", "Sci-Fi", "Romance"];

//   // Handle subscription cancellation
//   const handleCancelSubscription = () => {
//     alert("Your subscription is canceled.");
//   };

//   // Handle change preference click
//   const handleChangePreference = (category) => {
//     // Implement the logic to change preferences for the specified category
//     alert(`Change ${category} Preferences`);
//   };

//   // Handle delete preference click
//   //   const handleDeletePreference = (preference) => {
//   //     alert(`Delete ${preference}`);
//   //   };

//   const handleSaveLanguagePreferences = (newLanguages) => {
//     // Handle saving language preferences to your backend if needed
//     setLanguageModalOpen(false); // Close the modal after saving
//     // Update the language preferences in your state or send a request to the backend
//   };

//   const handleSaveGenrePreferences = (newGenres) => {
//     // Handle saving genre preferences to your backend if needed
//     setGenreModalOpen(false); // Close the modal after saving
//     // Update the genre preferences in your state or send a request to the backend
//   };

//   return (
//     <div className="settings-container">
//       <div className="profile-info">
//         <img
//           src={user} // Replace with the URL of the user's profile photo
//           alt="User Profile"
//           className="profile-photo"
//         />
//         <div className="user-details">
//           <h1 className="user-name">{userData.name}</h1>
//           <p className="user-email">{userData.email}</p>
//         </div>
//       </div>
//       <div className="preferences">
//         <h2 className="preferences-heading">Language Preferences</h2>
//         <button
//           className="change-button"
//           onClick={() => setLanguageModalOpen(true)}
//         >
//           Change
//         </button>
//         <div className="preference-cards">
//           {userData.languagePreferences.map((language, index) => (
//             <div key={index} className="preference-card">
//               {language}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="preferences">
//         <h2 className="preferences-heading">Genre Preferences</h2>
//         <button
//           className="change-button"
//           onClick={() => setGenreModalOpen(true)}
//         >
//           Change
//         </button>
//         <div className="preference-cards">
//           {userData.genrePreferences.map((genre, index) => (
//             <div key={index} className="preference-card">
//               {genre}
//             </div>
//           ))}
//         </div>
//       </div>
//       <button
//         className="cancel-subscription"
//         onClick={handleCancelSubscription}
//       >
//         Cancel Subscription
//       </button>
//       <LanguagePreferencesModal
//         isOpen={isLanguageModalOpen}
//         onClose={() => setLanguageModalOpen(false)}
//         selectedLanguages={userData.languagePreferences}
//         onSave={handleSaveLanguagePreferences}
//       />
//       <GenrePreferencesModal
//         isOpen={isGenreModalOpen}
//         onClose={() => setGenreModalOpen(false)}
//         selectedGenres={userData.genrePreferences}
//         onSave={handleSaveGenrePreferences}
//       />
//     </div>
//   );
// };

// export default Settings;
