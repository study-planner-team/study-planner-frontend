import React, { useEffect, useState } from "react";
import StudyTopic from "./StudyTopic";
import { Button } from "react-bootstrap";
import AddTopicFormModal from "./AddTopicFormModal";
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
  const { topics, topicModalShow, setTopicModalShow, handleAddTopic, handleDeleteTopic } = useStudyTopics(studyPlanId, onTopicsFetched);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5>Tematy:</h5>
        {canEdit && (
          <Button
            variant="warning"
            className="mb-3"
            onClick={() => setTopicModalShow(true)}
          >
            Dodaj Temat
          </Button>
        )}
      </div>

      <ul className="list-unstyled">
        {topics.length > 0 ? (
          topics.map((topic, index) => <StudyTopic data={topic} key={index} handleDelete={handleDeleteTopic} canEdit={canEdit}/>)
        ) : (
          <p>Brak zakresu materiału.</p>
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
