import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../../styles/StudyPlanStyles.css";
import { useStudyPlans } from "../../hooks/useStudyPlans";

const StudyPlanPage: React.FC = () => {
  const [key, setKey] = useState("active");
  const { studyPlans, joinedPlans, archivedPlans, handleArchive, handleUnarchive, handleLeave } = useStudyPlans();

  return (
    <>
      <Header />
      <Container className="my-5">
        <h2 className="text-center">Moje Plany Nauki</h2>
        <Row className="justify-content-center mx-auto mt-3 mb-5 w-25">
          <Link to="/studyplans/new" className="text-center">
            <Button variant="warning">Dodaj nowy plan</Button>
          </Link>
        </Row>

        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => k !== null && setKey(k)}
          className="mb-3 border-warning custom-tabs"
        >
          <Tab eventKey="active" title="Aktywne">
            <Row>
              {studyPlans.length > 0 ? (
                studyPlans.map((plan) => (
                  <Col md={3} key={plan.studyPlanId} className="mb-4">
                    <Card className="custom-bg">
                      <Card.Body>
                        <Card.Title>{plan.title}</Card.Title>
                        <Card.Text>Postęp: {plan.progress}0%</Card.Text>
                        <Link
                          to={`/studyplans/${plan.studyPlanId}`}
                          className="text-center custom-margin"
                        >
                          <Button variant="warning">Szczegóły</Button>
                        </Link>
                        <Button
                          variant="danger"
                          onClick={() => handleArchive(plan?.studyPlanId)}
                        >
                          Archiwizuj
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>Brak planów nauki</p>
              )}
            </Row>
          </Tab>
          <Tab eventKey="joined" title="Dołączone">
            <Row>
              {joinedPlans.length > 0 ? (
                joinedPlans.map((plan, index) => (
                  <Col md={3} key={index} className="mb-4">
                    <Card className="custom-bg">
                      <Card.Body>
                        <Card.Title>{plan.title}</Card.Title>
                        <Card.Text>Postęp: {plan.progress}0%</Card.Text>
                        <Link
                          to={`/studyplans/${plan.studyPlanId}`}
                          className="text-center custom-margin"
                        >
                          <Button variant="warning">Szczegóły</Button>
                        </Link>
                        <Button
                          variant="danger"
                          onClick={() => handleLeave(plan?.studyPlanId)}
                        >
                          Opuść
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>Brak planów nauki</p>
              )}
            </Row>
          </Tab>
          <Tab eventKey="archived" title="Archiwizowane">
            <Row>
              {archivedPlans.length > 0 ? (
                archivedPlans.map((plan) => (
                  <Col md={3} key={plan.studyPlanId} className="mb-4">
                    <Card className="custom-bg">
                      <Card.Body>
                        <Card.Title>{plan.title}</Card.Title>
                        <Card.Text>{plan.description}</Card.Text>
                        <Button
                          variant="warning"
                          onClick={() => handleUnarchive(plan.studyPlanId)}
                        >
                          Przywróć plan
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>Brak planów nauki</p>
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
