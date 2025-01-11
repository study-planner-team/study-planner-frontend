import React from "react";
import {Container, Dropdown} from "react-bootstrap";
import "../../styles/HeaderStyles.css";
import { useTranslation } from "react-i18next";

const VisSettingsBox: React.FC = () => {
    const [t, i18n] = useTranslation("global");
    const languages = ["eng", "pol"];

  const handleLanguageChange = (event: { target: { value: any; }; }) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
};

  return (
        <Container>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {t("header.pickLang")}
                </Dropdown.Toggle>
        
                    <Dropdown.Menu>
                        {languages.map((language, index) => (
                            <Dropdown.Item key={index} as="div">
                                <label>
                                    <input
                                        type="radio"
                                        name="language"
                                        value={language}
                                        onChange={handleLanguageChange}
                                        style={{ marginRight: '8px' }}
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
