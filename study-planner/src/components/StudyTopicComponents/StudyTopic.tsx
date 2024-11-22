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
  handleDelete: (topicId: number) => void;
  canEdit: boolean;
}

const StudyTopic: React.FC<TopicProps> = ({ data, handleDelete, canEdit }) => {
  const {
    materials,
    materialModalShow,
    setMaterialModalShow,
    handleAddMaterial,
    handleDeleteMaterial
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
        <StudyMaterialsList data={materials} deleteMaterial={handleDeleteMaterial} />
        <Card.Body>
          <Button className="m-1" variant="warning" onClick={() => setMaterialModalShow(true)}>
            Dodaj materiał
          </Button>
          {canEdit && (
            <Button variant="danger" onClick={() => handleDelete(data.topicId!)}>
            <img src="/assets/svg/trash.svg" alt="Trash Icon" className="img-fluid" />
            </Button>
          )}
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
