import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import StudyPlanService from "../services/StudyPlanService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StudyTopicService from "../services/StudyTopicService";
import AddTopicModal from "../components/AddTopicModal";

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

interface StudyTopic {
  topicId?: number;
  title: string;
  hours: number;
}

const StudyPlanDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [key, setKey] = useState("details");
  const [topicModalShow, setTopicModalShow] = useState<boolean>(false);
  const [topics, setTopics] = useState<StudyTopic[]>([]);

  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        const response = await StudyPlanService.getStudyPlanById(Number(id));
        setStudyPlan(response);
      } catch (error) {
        console.error("Error fetching study plan:", error);
      }
    };

    const fetchTopics = async () => {
      try {
        const topicsResponse = await StudyTopicService.getTopicsByPlanId(
          Number(id)
        );
        setTopics(topicsResponse);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchStudyPlan();
    fetchTopics();
  }, [id]);

  const formatDateShort = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("pl-PL");
  };

  const handleAddTopic = async (newTopic: StudyTopic) => {
    try {
      const addedTopic = await StudyTopicService.addTopic(Number(id), newTopic);
      setTopics([...topics, addedTopic]); // Update topics list
    } catch (error) {
      console.error("Error adding topic:", error);
    }
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
                  onClick={() => setTopicModalShow(true)}
                >
                  Dodaj zakres materiału
                </Button>
                <ul className="list-unstyled">
                  {topics.length > 0 ? (
                    topics.map((topic) => (
                      <li key={topic.topicId} className="mb-3">
                        <h6>
                          {topic.title} - {topic.hours} godziny
                        </h6>
                      </li>
                    ))
                  ) : (
                    <p>Brak zakresu materiału.</p>
                  )}
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
        <AddTopicModal
          show={topicModalShow}
          onHide={() => setTopicModalShow(false)}
          onSubmit={handleAddTopic}
        />
      </Container>
      <Footer />
    </>
  );
};

export default StudyPlanDetailsPage;
