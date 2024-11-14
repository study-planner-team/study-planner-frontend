import React, { useEffect, useState } from 'react';
import StudyMaterialsList from '../StudyMaterialComponents/StudyMaterialsList';
import StudyTopicService from '../../services/StudyTopicService';
import AddMaterialFormModal from '../StudyMaterialComponents/AddMaterialFormModal';
import { Button } from 'react-bootstrap';

interface Topic {
  topicId?: number;
  title: string;
  hours: number;
}

interface StudyMaterials {
    studyMaterialId?: number;
    title: string;
    link: string;
}

interface TopicProps {
  data: Topic;
}



const StudyTopic: React.FC<TopicProps> = ({ data }) => {
  const [materialModalShow, setMaterialModalShow] = useState<boolean>(false);
  const [materials, setMaterials] = useState<StudyMaterials[]>([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const materialsResponse = await StudyTopicService.getMaterialsByTopicId(
        Number(data.topicId)
      );
      setMaterials(materialsResponse);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleAddMaterial = async (topicId: number, newMaterial: StudyMaterials) => {
    try {
      const addedMaterial = await StudyTopicService.addMaterial(topicId, newMaterial);
      setMaterials([...materials, addedMaterial]);
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  return (
    <>
      <div>
      <h2><strong>{data.title}</strong> - {data.hours.toString()} hours</h2>
        <StudyMaterialsList data={materials}/>
        <Button
                  variant="warning"
                  className="mb-3"
                  onClick={() => setMaterialModalShow(true)}
                >
                  Dodaj
        </Button>
    </div>

    <AddMaterialFormModal
    topicId={data.topicId!}
    show={materialModalShow}
    onHide={() => setMaterialModalShow(false)}
    onSubmit={handleAddMaterial}
    />
    </>
  );
};

export default StudyTopic;
