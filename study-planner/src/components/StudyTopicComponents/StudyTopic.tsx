import React, { useEffect, useState } from 'react';
import StudyMaterialsList from '../StudyMaterialComponents/StudyMaterialsList';
import AddMaterialFormModal from '../StudyMaterialComponents/AddMaterialFormModal';
import { Button } from 'react-bootstrap';
import { useStudyMaterials } from '../../hooks/useStudyMaterials';

interface Topic {
  topicId?: number;
  title: string;
  hours: number;
}

interface TopicProps {
  data: Topic;
}

const StudyTopic: React.FC<TopicProps> = ({ data }) => {
  const { materials, materialModalShow, setMaterialModalShow, handleAddMaterial } = useStudyMaterials(Number(data.topicId));
  
  return (
    <>
      <div>
        <h2>
          <strong>{data.title}</strong> - {data.hours.toString()} hours
        </h2>
        <StudyMaterialsList data={materials} />
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
