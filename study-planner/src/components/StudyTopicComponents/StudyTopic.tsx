import React, { useEffect, useState } from "react";
import StudyMaterialsList from "../StudyMaterialComponents/StudyMaterialsList";
import AddMaterialFormModal from "../StudyMaterialComponents/AddMaterialFormModal";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useStudyMaterials } from "../../hooks/useStudyMaterials";

interface Topic {
  topicId?: number;
  title: string;
  hours: number;
}

interface TopicProps {
  data: Topic;
}

const StudyTopic: React.FC<TopicProps> = ({ data }) => {
  const {
    materials,
    materialModalShow,
    setMaterialModalShow,
    handleAddMaterial,
  } = useStudyMaterials(Number(data.topicId));

  return (
    <>
      <Card className="mb-2">
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Subtitle className=" text-muted">
            {data.hours.toString()}h
          </Card.Subtitle>
        </Card.Body>
        <StudyMaterialsList data={materials} />
        <Card.Body>
          <Button variant="warning" onClick={() => setMaterialModalShow(true)}>
            Dodaj materiał
          </Button>
        </Card.Body>
      </Card>

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
