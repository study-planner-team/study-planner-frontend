import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import StudyPlanService from "../services/StudyPlanService";
import "../styles/StudyPlanStyles.css";

const PublicPlanPage: React.FC = () => {
  const [publicPlans, setPublicPlans] = useState<any[]>([]);

  useEffect(() => {
    fetchPublicPlans();
  }, []);

  const fetchPublicPlans = async () => {
    try {
      const data = await StudyPlanService.getPublicPlans();
      setPublicPlans(data);
    } catch (error) {
      console.error("Couldn't fetch public study plans", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <div>
          <h2 className="text-center">Publiczne Plany Nauki</h2>
        </div>
        <div className="d-flex justify-content-center">
          <input type="text" id="plan-search" />
        </div>
        <Row>
          {publicPlans.length > 0 ? (
            publicPlans.map((plan, index) => (
              <Col md={4} key={index} className="mb-4">
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
                      //onClick={() => handleJoin(plan?.studyPlanId)}
                    >
                      Dołącz
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>Brak planów nauki</p>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PublicPlanPage;
