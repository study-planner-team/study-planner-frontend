import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../../styles/StudyPlanStyles.css";
import { useStudyPlans } from "../../hooks/useStudyPlans";
import StudyPlanCard from "../../components/StudyPlanComponents/StudyPlanCard";
import { useTranslation } from "react-i18next"; // Import translations

const StudyPlanPage: React.FC = () => {
  const { t } = useTranslation("global");
  const [key, setKey] = useState("active");
  const { studyPlans, joinedPlans, archivedPlans, handleArchive, handleUnarchive, handleLeave } = useStudyPlans();

  return (
    <>
      <Header />
      <Container className="my-5">
        <h2 className="text-center">{t("studyPlans.myPlans")}</h2>
        <Row className="justify-content-center mx-auto mt-3 mb-5 w-25">
          <Link to="/studyplans/new" className="text-center">
            <Button variant="warning">{t("studyPlans.addNewPlan")}</Button>
          </Link>
        </Row>

        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => k !== null && setKey(k)}
          className="mb-3 border-warning custom-tabs"
        >
          <Tab eventKey="active" title={t("studyPlans.active")}>
            <Row>
              {studyPlans.length > 0 ? (
                studyPlans.map((plan) => (
                  <Col md="auto" key={plan.studyPlanId}>
                    <StudyPlanCard
                      plan={plan}
                      onActionClick={() => handleArchive(plan.studyPlanId)}
                      actionLabel={t("studyPlans.archive")}
                      actionVariant="danger"
                    />
                  </Col>
                ))
              ) : (
                <p>{t("studyPlans.noPlans")}</p>
              )}
            </Row>
          </Tab>
          <Tab eventKey="joined" title={t("studyPlans.joined")}>
            <Row>
              {joinedPlans.length > 0 ? (
                joinedPlans.map((plan, index) => (
                  <Col md="auto" key={index}>
                    <StudyPlanCard
                      plan={plan}
                      onActionClick={() => handleLeave(plan.studyPlanId)}
                      actionLabel={t("studyPlans.leave")}
                      actionVariant="danger"
                    />
                  </Col>
                ))
              ) : (
                <p>{t("studyPlans.noPlans")}</p>
              )}
            </Row>
          </Tab>
          <Tab eventKey="archived" title={t("studyPlans.archived")}>
            <Row>
              {archivedPlans.length > 0 ? (
                archivedPlans.map((plan) => (
                  <Col md="auto" key={plan.studyPlanId}>
                    <StudyPlanCard
                      plan={plan}
                      onActionClick={() => handleUnarchive(plan.studyPlanId)}
                      actionLabel={t("studyPlans.restorePlan")}
                      actionVariant="warning"
                    />
                  </Col>
                ))
              ) : (
                <p>{t("studyPlans.noPlans")}</p>
              )}
            </Row>
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </>
  );
};

export default StudyPlanPage;
