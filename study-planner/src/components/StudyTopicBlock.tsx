import React, { useEffect, useState } from "react";
import StudyTopicService from "../services/StudyTopicService";
import StudyTopic from "./StudyTopic";
import { Button } from "react-bootstrap";
import AddTopicModal from "./AddTopicModal";

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
    try {
      const topicsResponse = await StudyTopicService.getTopicsByPlanId(
        Number(studyPlanId)
      );
      setTopics(topicsResponse);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleAddTopic = async (newTopic: Topic) => {
    try {
      const addedTopic = await StudyTopicService.addTopic(Number(studyPlanId), newTopic);
      setTopics([...topics, addedTopic]);
    } catch (error) {
      console.error("Error adding topic:", error);
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

      <AddTopicModal
          show={topicModalShow}
          onHide={() => setTopicModalShow(false)}
          onSubmit={handleAddTopic}
        />

    </>
  );
};

export default StudyTopicBlock;
