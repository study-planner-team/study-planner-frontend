import React from "react";
import { ListGroup } from "react-bootstrap";

interface StudyMaterials {
  studyMaterialId?: number;
  title: string;
  link: string;
}

interface Props {
  data?: StudyMaterials[];
}

const StudyMaterialsList: React.FC<Props> = ({ data }) => {
  return (
    <ListGroup className="list-group-flush">
      {data && data.length > 0 ? (
        data.map((material) => (
          <ListGroup.Item key={material.studyMaterialId}>
            {material.title} - {material.link}
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>Brak materiałów.</ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default StudyMaterialsList;
