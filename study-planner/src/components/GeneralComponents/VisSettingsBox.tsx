import React, { useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import "../../styles/HeaderStyles.css";
import { useTranslation } from "react-i18next";

const VisSettingsBox: React.FC = () => {
  const { t, i18n } = useTranslation("global");
  const languages = ["eng", "pol"];
  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "eng";
    if (savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
    setSelectedLanguage(savedLanguage);
  }, [i18n]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage); 
    setSelectedLanguage(newLanguage);
    localStorage.setItem("language", newLanguage); 
  };

  return (
    <Container style={{ margin: 0, padding: 0 }}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <img src="/assets/icons8-language-48.png" alt="language-icon" style={{ height: "24px", width: "24px" }} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {languages.map((language) => (
            <Dropdown.Item key={language} as="div">
              <label>
                <input
                  type="radio"
                  name="language"
                  value={language}
                  checked={selectedLanguage === language}
                  onChange={handleLanguageChange}
                  style={{ marginRight: "8px" }}
                />
                {t(`header.languages.${language}`)}
              </label>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};

export default VisSettingsBox;
