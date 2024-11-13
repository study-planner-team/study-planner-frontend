import React, { useEffect, useState } from "react";
import StudyTopicService from "../services/StudyTopicService";
import StudyTopic from "./StudyTopic";
import { Button } from "react-bootstrap";

interface Topic {
  topicId?: number;
  title: string;
  hours: number;
  studyMaterials?: StudyMaterials[];
}

interface StudyMaterials {
  studyMaterialId?: number;
  title: string;
  link: string;
}

interface TopicProps {
  studyPlanId: number;
}

const StudyTopicBlock: React.FC<TopicProps> = ({ studyPlanId }) => {
  const [topics, setTopics] = useState<Topic[]>([]);

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

  return (
    <>
      <h5>Zakres materiału:</h5>
      <Button
        variant="warning"
        className="mb-3"
        //onClick={() => setTopicModalShow(true)}
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
    </>
  );
};

export default StudyTopicBlock;
