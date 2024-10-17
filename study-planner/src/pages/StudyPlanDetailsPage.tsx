import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import StudyPlanService from "../services/StudyPlanService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

interface StudyPlan {
  studyPlanId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  owner: StudyPlanOwner;
}

interface StudyPlanOwner {
  userId: number;
  username: string;
  email: string;
  isPublic: boolean;
}

const StudyPlanDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [key, setKey] = useState("details");

  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        const response = await StudyPlanService.getStudyPlanById(Number(id));
        setStudyPlan(response);
      } catch (error) {
        console.error("Error fetching study plan:", error);
      }
    };

    fetchStudyPlan();
  }, [id]);

  const formatDateShort = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("pl-PL");
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <Row className="justify-content-between align-items-center mb-4">
          <Col>
            <h3>{studyPlan?.title}</h3>
            <p>
              Status planu: {studyPlan?.isPublic ? "Publiczny" : "Prywatny"}
            </p>
            <Link
              to={`/studyplans/edit/${studyPlan?.studyPlanId}`}
              className="text-center"
            >
              <Button variant="warning">Edytuj plan</Button>
            </Link>
          </Col>
          <Col className="text-end">
            <Button
              variant="warning"
              >
              Generuj harmonogram
            </Button>
          </Col>
        </Row>

        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => k !== null && setKey(k)}
          className="mb-3 border-warning"
        >
          <Tab eventKey="details" title="Szczegóły">
            <Row>
              <Col md={6} className="border-end pe-4">
                <h5>Opis:</h5>
                <p>{studyPlan?.description}</p>

                <h6>Czas trwania:</h6>
                <p>
                  {formatDateShort(studyPlan?.startDate)} -{" "}
                  {formatDateShort(studyPlan?.endDate)}
                </p>

                <h6>Właściciel planu:</h6>
                <p>{studyPlan?.owner.username}</p>
              </Col>

              <Col md={6} className="ps-4">
                <h5>Zakres materiału:</h5>
                <Button
                  variant="warning"
                  className="mb-3"
                >
                  Dodaj zakres materiału
                </Button>
                <ul className="list-unstyled">
                    <p>Brak zakresu materiału.</p>
                </ul>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="members" title="Członkowie planu">
            Tab content for Profile
          </Tab>
          <Tab eventKey="quizes" title="Quizy">
            Tab content for Profile
          </Tab>
        </Tabs>

      </Container>
      <Footer />
    </>
  );
};

export default StudyPlanDetailsPage;
