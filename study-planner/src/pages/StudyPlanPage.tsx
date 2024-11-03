import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StudyPlanService from "../services/StudyPlanService";
import "../styles/StudyPlanStyles.css";

const StudyPlanPage: React.FC = () => {
  const [studyPlans, setStudyPlans] = useState<any[]>([]);
  const [joinedPlans, setJoinedPlans] = useState<any[]>([]);
  const [archivedPlans, setArchivedPlans] = useState<any[]>([]);
  const [key, setKey] = useState("active");

  useEffect(() => {
    fetchStudyPlans();
    fetchArchivedPlans();
    fetchJoinedPlans();
  }, []);

  const fetchStudyPlans = async () => {
    try {
      const data = await StudyPlanService.getStudyPlans();
      setStudyPlans(data);
    } catch (error) {
      console.error("Error fetching study plans", error);
    }
  };

  const fetchJoinedPlans = async () => {
    try {
      const data = await StudyPlanService.getJoinedPlans();
      setJoinedPlans(data);
    } catch (error) {
      console.error("Error fetching study plans", error);
    }
  };

  const fetchArchivedPlans = async () => {
    try {
      const response = await StudyPlanService.getArchivedStudyPlans();
      setArchivedPlans(response);
    } catch (error) {
      console.error("Error fetching archived study plans:", error);
    }
  };

  const handleArchive = async (planId: number) => {
    try {
      await StudyPlanService.archiveStudyPlan(planId);
      fetchStudyPlans();  
      fetchArchivedPlans();
    } catch (error) {
      console.error("Error archiving study plan:", error);
    }
  };

  const handleUnarchive = async (planId: number) => {
    try {
      await StudyPlanService.unarchiveStudyPlan(planId);
      fetchStudyPlans();   
      fetchArchivedPlans();
    } catch (error) {
      console.error("Error unarchiving study plan:", error);
    }
  }

  const handleLeave = async (planId: number) => {
    try {
      await StudyPlanService.leaveStudyPlan(planId);
      fetchJoinedPlans();
    } catch (error) {
      console.error("Couldn't leave study plan:", error);
    }
  };

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
                joinedPlans.map((plan) => (
                  <Col md={3} key={plan.joinedPlanId} className="mb-4">
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
