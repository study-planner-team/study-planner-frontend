import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import translations
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
import QuizBlock from "../../components/QuizComponents/QuizBlock";

const StudyPlanDetailsPage: React.FC = () => {
  const { t } = useTranslation("global");
  const { id } = useParams<{ id: string }>();
  const [key, setKey] = useState("details");
  const [topicIds, setTopicIds] = useState<number[]>([]);
  const { studyPlan, members, handleOwnerChange, formatDateShort } = useStudyPlanDetails(id);
  const { canEdit, canGenerateSchedule, canViewDetails } = usePermissions(studyPlan);

  return (
    <>
      <Header />
      <Container className="my-5">
        <Row className="justify-content-between align-items-center mb-4">
          <Col>
            <h3>{studyPlan?.title}</h3>
            <p>
              {t("studyPlans.planStatus")}: {studyPlan?.isPublic ? t("common.public") : t("common.private")}
            </p>
            {studyPlan && canEdit && (
              <Link
                to={`/studyplans/edit/${studyPlan?.studyPlanId}`}
                className="text-center"
              >
                <Button variant="warning">{t("studyPlans.editPlan")}</Button>
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
          <Tab eventKey="details" title={t("studyPlans.detailsTab")}>
            <Row>
              <Col md={6} className="border-end pe-4">
                <h5>{t("studyPlans.description")}:</h5>
                <p>{studyPlan?.description}</p>

                <h6>{t("studyPlans.duration")}:</h6>
                <p>
                  {formatDateShort(studyPlan?.startDate)} -{" "}
                  {formatDateShort(studyPlan?.endDate)}
                </p>

                <h6>{t("studyPlans.owner")}:</h6>
                <p>{studyPlan?.owner.username}</p>
              </Col>
              <Col md={6} className="ps-4">
                <StudyTopicBlock
                  studyPlanId={Number(id)}
                  onTopicsFetched={setTopicIds}
                  canEdit={canEdit}
                />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="members" title={t("studyPlans.membersTab")}>
            <ul className="list-unstyled">
              {members.length > 0 ? (
                members.map((member) => (
                  <li key={member.userId} className="mb-3">
                    {member.username}
                    {canEdit && member.userId !== studyPlan?.owner.userId && (
                      <Button
                        variant="danger"
                        onClick={() => handleOwnerChange(Number(id), member.userId)}
                      >
                        {t("studyPlans.changeLeader")}
                      </Button>
                    )}
                  </li>
                ))
              ) : (
                <p>{t("studyPlans.noMembers")}</p>
              )}
            </ul>
          </Tab>
          <Tab eventKey="quizzes" title={t("studyPlans.quizzesTab")}>
            {studyPlan && (
              <QuizBlock
                studyPlanId={studyPlan?.studyPlanId}
                canViewDetails={canViewDetails}
                members={members}
              />
            )}
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </>
  );
};

export default StudyPlanDetailsPage;
