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
}

const StudyTopicBlock: React.FC<TopicProps> = ({ studyPlanId }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicModalShow, setTopicModalShow] = useState<boolean>(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const topicsResponse = await StudyTopicService.getTopicsByPlanId(Number(studyPlanId));

    if (topicsResponse) {
      setTopics(topicsResponse);
    }
  };

  const handleAddTopic = async (newTopic: Topic) => {
    const addedTopic = await StudyTopicService.addTopic(Number(studyPlanId), newTopic);

    if (addedTopic) {
      setTopics([...topics, addedTopic]);
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
