import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import translations
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import FeatureCard from "../../components/GeneralComponents/FeatureCard";
import "../../styles/LandingPageStyles.css";

const LandingPage: React.FC = () => {
  const { t } = useTranslation("global");

  return (
    <>
      <Header />
      <Container fluid className="mt-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src="/assets/svg/undraw_learning_re_32qv.svg"
              alt={t("landingPage.illustrationAlt")}
              className="img-fluid"
            />
          </Col>
          <Col
            md={6}
            className="d-flex flex-column justify-content-center align-items-center text-center"
          >
            <h2>{t("landingPage.heroText")}</h2>
            <Button variant="warning" className="mt-3">
              {t("landingPage.viewMore")}
            </Button>
          </Col>
        </Row>
        <Row className="mt-4" id="braker-row">
          <Col>
            <h4 className="text-center fw-bold mb-0 p-3">
              {t("landingPage.readMore")}
            </h4>
          </Col>
        </Row>
      </Container>
      <Container fluid className="text-white py-5" id="dark-background">
        <Container>
          <h3 className="text-center mb-4">{t("landingPage.features")}</h3>
          <Row>
            <Col md={4} className="text-center">
              <FeatureCard
                title={t("landingPage.feature1.title")}
                text={t("landingPage.feature1.text")}
                imageUrl="assets/svg/undraw_chat_bot_re_e2gj.svg"
              />
            </Col>
            <Col md={4} className="text-center">
              <FeatureCard
                title={t("landingPage.feature2.title")}
                text={t("landingPage.feature2.text")}
                imageUrl="assets/svg/undraw_selecting_team_re_ndkb.svg"
              />
            </Col>
            <Col md={4} className="text-center">
              <FeatureCard
                title={t("landingPage.feature3.title")}
                text={t("landingPage.feature3.text")}
                imageUrl="assets/svg/undraw_reminders_re_gtyb.svg"
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;
