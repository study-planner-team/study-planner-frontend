import React, { useState } from 'react';
import StudyMaterialsList from './StudyMaterialsList';
import StudyTopicService from '../services/StudyTopicService';
import AddMaterialModal from './AddMaterialModal';
import { Button } from 'react-bootstrap';

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
  data: Topic;
}

const handleAddMaterial = async (topicId: number, newMaterial: StudyMaterials) => {
    try {
      const addedTopic = await StudyTopicService.addMaterial(topicId, newMaterial);
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

const StudyTopic: React.FC<TopicProps> = ({ data }) => {
  const [materialModalShow, setMaterialModalShow] = useState<boolean>(false);
  return (
    <>
      <div>
      <h2><strong>{data.title}</strong> - {data.hours.toString()} hours</h2>
        <StudyMaterialsList data={data.studyMaterials}/>
        <Button
                  variant="warning"
                  className="mb-3"
                  onClick={() => setMaterialModalShow(true)}
                >
                  Dodaj
        </Button>
      <p className='fw-bold'>AJO</p>
    </div>

    <AddMaterialModal
    topicId={data.topicId!}
    show={materialModalShow}
    onHide={() => setMaterialModalShow(false)}
    onSubmit={handleAddMaterial}
    />
    </>
  );
};

export default StudyTopic;
