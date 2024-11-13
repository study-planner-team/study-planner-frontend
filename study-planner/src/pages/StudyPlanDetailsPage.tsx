import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import StudyPlanService from "../services/StudyPlanService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../styles/StudyPlanDetailsStyles.css";
import { useAuthContext } from "../context/useAuthContext";
import StudyTopicBlock from "../components/StudyTopicBlock";

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

interface ScheduleFormData {
  sessionsPerDay: number;
  sessionLength: number;
  studyStartTime: string;
  studyEndTime: string;
  preferredStudyDays: string[];
}

const StudyPlanDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [studyPlan, setStudyPlan] = useState<StudyPlan>();
  const [key, setKey] = useState("details");
  const [scheduleModalShow, setScheduleModalShow] = useState<boolean>(false);
  const [members, setMembers] = useState<any[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    fetchStudyPlan();
    fetchPlanMembers();
  }, [id]);

  const fetchStudyPlan = async () => {
    try {
      const response = await StudyPlanService.getStudyPlanById(Number(id));
      setStudyPlan(response);
    } catch (error) {
      console.error("Error fetching study plan:", error);
    }
  };

  const fetchPlanMembers = async () => {
    try {
      const membersResponse = await StudyPlanService.getMembersByPlanId(
        Number(id)
      );
      setMembers(membersResponse);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const formatDateShort = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("pl-PL");
  };

  const handleOwnerChange = async (studyPlanId: number, userId: number) => {
    try {
      await StudyPlanService.changePlanOwner(studyPlanId, userId);
    } catch (error) {
      console.error("Error changing owner:", error);
    }
  };

  // const handleScheduleSubmit = async (formData: ScheduleFormData) => {
  //   try {
  //     const scheduleData = {
  //       ...formData,
  //       studyPlanId: studyPlan?.studyPlanId,
  //       startDate: studyPlan?.startDate,
  //       endDate: studyPlan?.endDate,
  //       topics: topics,
  //     };

  //     await StudyPlanService.generateSchedule(scheduleData);
  //   } catch (error) {
  //     console.error("Error generating schedule", error);
  //   }
  // };

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

        {/* <GenerateScheduleModal
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
