import React from "react";
import Footer from "../../components/GeneralComponents/Footer";
import Header from "../../components/GeneralComponents/Header";
import { Col, Row, Container } from "react-bootstrap";
import FinishedSessionBlock from "../../components/SessionComponents/FinishedSessionsBlock";
import CurrentSessionCard from "../../components/SessionComponents/CurrentSessionCard";
import UpcomingSessionCard from "../../components/SessionComponents/UpcomingSessionCard";
import "../../styles/StudyPlanStyles.css";
import { useTranslation } from "react-i18next";

const ActiveSessionPage: React.FC = () => {
 const { t } = useTranslation("global");

  return (
    <>
      <Header />
      <Container className="my-5">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center">{t("session.yourSessions")}</h2>
            <div className="d-flex justify-content-center mb-3">
              <div className="custom-line"></div>
            </div>
          </Col>
        </Row>
        <Row className="gy-4 gx-4 justify-content-center">
          <Col md={4}>
            <FinishedSessionBlock />
          </Col>
          <Col md={4}>
            <CurrentSessionCard />
          </Col>
          <Col md={4}>
            <UpcomingSessionCard />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ActiveSessionPage;
