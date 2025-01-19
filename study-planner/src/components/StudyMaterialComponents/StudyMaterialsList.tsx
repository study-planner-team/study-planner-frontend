import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import translations

interface StudyMaterials {
  studyMaterialId?: number;
  title: string;
  link: string;
}

interface Props {
  data?: StudyMaterials[];
  deleteMaterial: (materialId: number) => void;
}

const StudyMaterialsList: React.FC<Props> = ({ data, deleteMaterial }) => {
  const { t } = useTranslation("global");

  return (
    <ListGroup className="list-group-flush">
      {data && data.length > 0 ? (
        data.map((material) => (
          <ListGroup.Item key={material.studyMaterialId}>
            <Button
              className="m-1"
              variant="danger"
              onClick={() => deleteMaterial(material.studyMaterialId!)}
            >
              <img
                src="/assets/svg/trash.svg"
                alt={t("common.deleteIconAlt")}
                className="img-fluid"
              />
            </Button>
            {material.title} - {material.link}
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>{t("studyMaterials.noMaterials")}</ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default StudyMaterialsList;
