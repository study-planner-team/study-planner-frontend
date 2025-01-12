import React from "react";
import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import translations
import StudyMaterialsList from "../StudyMaterialComponents/StudyMaterialsList";
import AddMaterialFormModal from "../StudyMaterialComponents/AddMaterialFormModal";
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

const StudyTopic: React.FC<TopicProps> = ({
  data,
  handleDelete,
  canEdit,
}) => {
  const { t } = useTranslation("global");
  const {
    materials,
    materialModalShow,
    setMaterialModalShow,
    handleAddMaterial,
    handleDeleteMaterial,
  } = useStudyMaterials(Number(data.topicId));

  return (
    <>
      <Card className="mb-2">
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Subtitle className="text-muted">{data.hours}h</Card.Subtitle>
        </Card.Body>
        <StudyMaterialsList
          data={materials}
          deleteMaterial={handleDeleteMaterial}
        />
        <Card.Body>
          <Button
            className="m-1"
            variant="warning"
            onClick={() => setMaterialModalShow(true)}
          >
            {t("studyMaterials.addMaterial")}
          </Button>
          {canEdit && (
            <Button
              variant="danger"
              onClick={() => handleDelete(data.topicId!)}
            >
              <img
                src="/assets/svg/trash.svg"
                alt={t("common.deleteIconAlt")}
                className="img-fluid"
              />
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
