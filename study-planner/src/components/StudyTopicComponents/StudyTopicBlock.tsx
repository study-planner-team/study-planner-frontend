import React, { useEffect, useState } from "react";
import StudyTopic from "./StudyTopic";
import { Button } from "react-bootstrap";
import AddTopicFormModal from "./AddTopicFormModal";
import { useStudyTopics } from "../../hooks/useStudyTopics";

interface TopicProps {
  studyPlanId: number;
  onTopicsFetched?: (topics: number[]) => void;
}

const StudyTopicBlock: React.FC<TopicProps> = ({
  studyPlanId,
  onTopicsFetched,
}) => {
  const { topics, topicModalShow, setTopicModalShow, handleAddTopic } =
    useStudyTopics(studyPlanId, onTopicsFetched);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5>Tematy:</h5>
        <Button
          variant="warning"
          className="mb-3"
          onClick={() => setTopicModalShow(true)}
        >
          Dodaj Temat
        </Button>
      </div>

      <ul className="list-unstyled">
        {topics.length > 0 ? (
          topics.map((topic, index) => <StudyTopic data={topic} key={index} />)
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
