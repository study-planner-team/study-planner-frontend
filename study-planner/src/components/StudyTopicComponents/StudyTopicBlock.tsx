import React, { useEffect, useState } from "react";
import StudyTopicService from "../../services/StudyTopicService";
import StudyTopic from "./StudyTopic";
import { Button } from "react-bootstrap";
import AddTopicFormModal from "./AddTopicFormModal";

interface Topic {
  topicId?: number;
  title: string;
  hours: number;
}

interface TopicProps {
  studyPlanId: number;
  onTopicsFetched?: (topics: number[]) => void;
}

const StudyTopicBlock: React.FC<TopicProps> = ({ studyPlanId, onTopicsFetched }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicModalShow, setTopicModalShow] = useState<boolean>(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const topicsResponse = await StudyTopicService.getTopicsByPlanId(Number(studyPlanId));

    if (topicsResponse) {
      setTopics(topicsResponse);
      onTopicsFetched?.(topicsResponse.map((topic: Topic) => topic.topicId!));
    }
  };

  const handleAddTopic = async (newTopic: Topic) => {
    const addedTopic = await StudyTopicService.addTopic(Number(studyPlanId), newTopic);

    if (addedTopic) {
      const updatedTopics = [...topics, addedTopic];
      setTopics(updatedTopics);
      onTopicsFetched?.(updatedTopics.map((topic: Topic) => topic.topicId!));
    }
  };

  return (
    <>
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
