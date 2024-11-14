import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../../styles/StudyPlanDetailsStyles.css";
import { useAuthContext } from "../../context/useAuthContext";
import StudyTopicBlock from "../../components/StudyTopicComponents/StudyTopicBlock";
import { useStudyPlanDetails } from "../../hooks/useStudyPlanDetails";

const StudyPlanDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [key, setKey] = useState("details");
  const { user } = useAuthContext();
  const {studyPlan, members, scheduleModalShow, setScheduleModalShow, handleOwnerChange, formatDateShort} = useStudyPlanDetails(id);

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
              onClick={() => setScheduleModalShow(true)}
            >
              Generuj harmonogram
            </Button>
          </Col>
        </Row>

        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => k !== null && setKey(k)}
          className="mb-3 border-warning custom-tabs"
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
                <StudyTopicBlock studyPlanId={Number(id)}/>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="members" title="Członkowie planu">
            <ul className="list-unstyled">
              {members.length > 0 ? (
                members.map((member) => (
                  <li key={member.userId} className="mb-3">
                    {member.username}
                    {user?.id == studyPlan?.owner.userId &&
                    <Button
                      variant="danger"
                      onClick={() => handleOwnerChange(Number(id), member.userId)}
                    >
                      Zmień lidera
                    </Button>
                    }
                  </li>
                ))
              ) : (
                <p>Brak innych członków planu.</p>
              )}
            </ul>
          </Tab>
          <Tab eventKey="quizes" title="Quizy">
            Brak przypisanych quizów
          </Tab>
        </Tabs>

        {/* GenerateScheduleFormModal
          show={scheduleModalShow}
          onHide={() => setScheduleModalShow(false)}
          onSubmit={handleScheduleSubmit}
        /> */}
      </Container>
      <Footer />
    </>
  );
};

export default StudyPlanDetailsPage;