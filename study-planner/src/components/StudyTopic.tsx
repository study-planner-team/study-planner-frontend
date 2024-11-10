import React from 'react';
import StudyMaterialsList from './StudyMaterialsList';

interface Topic {
  title: string;
  hours: number;
  studyMaterials?: StudyMaterials[];
}

interface StudyMaterials {
    studyMaterialId: number;
    title: string;
    link: string;
}

interface TopicProps {
  data: Topic;
}

const StudyTopic: React.FC<TopicProps> = ({ data }) => {
  return (
    <div>
      <h2><strong>{data.title}</strong> - {data.hours.toString()} hours</h2>
      <button>Dodaj materiały</button>
        <StudyMaterialsList data={data.studyMaterials}/>
      <p className='fw-bold'>AJO</p>
    </div>
  );
};

export default StudyTopic;
