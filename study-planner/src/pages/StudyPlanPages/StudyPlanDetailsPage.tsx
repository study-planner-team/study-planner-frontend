import React, { useState } from "react";
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
import ScheduleGeneratingBlock from "../../components/ScheduleComponents/ScheduleGeneratingBlock";
import usePermissions from "../../hooks/usePermissions";

const StudyPlanDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthContext();
  const [key, setKey] = useState("details");
  const [topicIds, setTopicIds] = useState<number[]>([]);
  const {studyPlan, members, handleOwnerChange, formatDateShort} = useStudyPlanDetails(id);
  const { canEdit, canGenerateSchedule} = usePermissions(studyPlan);

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
            { studyPlan && canEdit && (
              <Link
              to={`/studyplans/edit/${studyPlan?.studyPlanId}`}
              className="text-center"
            >
              <Button variant="warning">Edytuj plan</Button>
            </Link>
            )}
            
          </Col>
          <Col className="text-end">
          {studyPlan && canGenerateSchedule && (
              <ScheduleGeneratingBlock
                studyPlanId={studyPlan.studyPlanId}
                startDate={studyPlan.startDate}
                endDate={studyPlan.endDate}
                topicIds={topicIds}
              />
            )}
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
                <StudyTopicBlock studyPlanId={Number(id)} onTopicsFetched={setTopicIds} canEdit={canEdit} />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="members" title="Członkowie planu">
            <ul className="list-unstyled">
              {members.length > 0 ? (
                members.map((member) => (
                  <li key={member.userId} className="mb-3">
                    {member.username}
                    {canEdit && (member.userId != studyPlan?.owner.userId) && (
                    <Button
                      variant="danger"
                      onClick={() => handleOwnerChange(Number(id), member.userId)}
                    >
                      Zmień lidera
                    </Button>
                    )}
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
      </Container>
      <Footer />
    </>
  );
};

export default StudyPlanDetailsPage;
