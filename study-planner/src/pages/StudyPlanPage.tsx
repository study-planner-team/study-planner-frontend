import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StudyPlanService from "../services/StudyPlanService";

const StudyPlanPage: React.FC = () => {
  const [studyPlans, setStudyPlans] = useState<any[]>([]);
  const [key, setKey] = useState("active");

  useEffect(() => {
    fetchStudyPlans();
  }, []);

  const fetchStudyPlans = async () => {
    try {
      const data = await StudyPlanService.getStudyPlans();
      setStudyPlans(data);
    } catch (error) {
      console.error("Error fetching study plans", error);
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
          className="mb-3 border-warning"
        >
          <Tab eventKey="active" title="Aktywne">
            <Row>
              {studyPlans.length > 0 ? (
                studyPlans.map((plan) => (
                  <Col md={3} key={plan.studyPlanId} className="mb-4">
                    <Card style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title>{plan.title}</Card.Title>
                        <Card.Text>Postęp: {plan.progress}%</Card.Text>
                        <Link
                          to={`/studyplans/${plan.studyPlanId}`}
                          className="text-center"
                        >
                          <Button variant="warning">Szczegóły</Button>
                        </Link>
                        <Button variant="danger">Archiwizuj</Button>
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
              <p>Brak planów nauki</p>
            </Row>
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </>
  );
};

export default StudyPlanPage;
