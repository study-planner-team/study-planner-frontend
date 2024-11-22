import { useEffect, useState } from "react";
import StudyTopicService from "../services/StudyTopicService";

interface Topic {
  topicId?: number;
  title: string;
  hours: number;
}

export const useStudyTopics = (studyPlanId: number, onTopicsFetched?: (topics: number[]) => void) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicModalShow, setTopicModalShow] = useState<boolean>(false);

  useEffect(() => {
    fetchTopics();
  }, [studyPlanId]);

  const fetchTopics = async () => {
    const topicsResponse = await StudyTopicService.getTopicsByPlanId(studyPlanId);

    if (topicsResponse) {
      setTopics(topicsResponse);
      onTopicsFetched?.(topicsResponse.map((topic: Topic) => topic.topicId!));
    }
  };

  const handleAddTopic = async (newTopic: Topic) => {
    const addedTopic = await StudyTopicService.addTopic(studyPlanId, newTopic);
    
    if (addedTopic) {
      const updatedTopics = [...topics, addedTopic];
      setTopics(updatedTopics);
      onTopicsFetched?.(updatedTopics.map((topic) => topic.topicId!));
    }
  };

  const handleDeleteTopic = async (topicId: number) => {
    const response = await StudyTopicService.deleteTopic(studyPlanId, topicId);
    
    if (response) {
      fetchTopics();
    }
  };

  return {
    topics,
    topicModalShow,
    setTopicModalShow,
    handleAddTopic,
    handleDeleteTopic
  };
};
