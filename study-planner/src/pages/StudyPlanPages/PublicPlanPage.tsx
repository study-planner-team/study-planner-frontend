import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import { Link } from "react-router-dom";
import StudyPlanService from "../..//services/StudyPlanService";
import "../../styles/StudyPlanStyles.css";
import { useAuthContext } from "../..//context/useAuthContext";

const PublicPlanPage: React.FC = () => {
  const [publicPlans, setPublicPlans] = useState<any[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<any[]>([]);
  const { user } = useAuthContext();
  const inputElement = document.getElementById("plan-search") as HTMLInputElement | null;

  useEffect(() => {
    fetchPublicPlans();
  }, []);

  const fetchPublicPlans = async () => {
    try {
      const data = await StudyPlanService.getPublicPlans();
      setPublicPlans(data);
      setFilteredPlans(data);
    } catch (error) {
      console.error("Couldn't fetch public study plans", error);
    }
  };

  const handleJoin = async (planId: number) => {
    try {
      await StudyPlanService.joinStudyPlan(planId);
      fetchPublicPlans();
    } catch (error) {
      console.error("Couldn't join study plan:", error);
    }
  };

  function handleFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filterTemp = publicPlans.filter(e => e.title.toLowerCase().includes(inputElement.value.toLowerCase()));
    setFilteredPlans(filterTemp);
  }

  if (inputElement) {
    inputElement.addEventListener("input", handleFilter);
  }

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
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan, index) => (
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
                      onClick={() => handleJoin(plan?.studyPlanId)}
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
