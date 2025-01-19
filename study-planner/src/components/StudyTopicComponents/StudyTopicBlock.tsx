import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import translations
import AddTopicFormModal from "./AddTopicFormModal";
import StudyTopic from "./StudyTopic";
import { useStudyTopics } from "../../hooks/useStudyTopics";

interface TopicProps {
  studyPlanId: number;
  onTopicsFetched?: (topics: number[]) => void;
  canEdit: boolean;
}

const StudyTopicBlock: React.FC<TopicProps> = ({
  studyPlanId,
  onTopicsFetched,
  canEdit,
}) => {
  const { t } = useTranslation("global");
  const {
    topics,
    topicModalShow,
    setTopicModalShow,
    handleAddTopic,
    handleDeleteTopic,
  } = useStudyTopics(studyPlanId, onTopicsFetched);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5>{t("studyTopics.topics")}:</h5>
        {canEdit && (
          <Button
            variant="warning"
            className="mb-3"
            onClick={() => setTopicModalShow(true)}
          >
            {t("studyTopics.addTopic")}
          </Button>
        )}
      </div>

      <ul className="list-unstyled">
        {topics.length > 0 ? (
          topics.map((topic, index) => (
            <StudyTopic
              data={topic}
              key={index}
              handleDelete={handleDeleteTopic}
              canEdit={canEdit}
            />
          ))
        ) : (
          <p>{t("studyTopics.noTopics")}</p>
        )}
      </ul>

      <AddTopicFormModal
        show={topicModalShow}
        onHide={() => setTopicModalShow(false)}
        onSubmit={handleAddTopic}
      />
    </>
  );
};

export default StudyTopicBlock;
