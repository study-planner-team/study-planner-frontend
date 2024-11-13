import React from 'react';

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
    <ul>
      {data && data.length > 0 ? (
        data.map((material) => (
          <li key={material.studyMaterialId} className="mb-3">
            {material.title} - {material.link}
          </li>
        ))
      ) : (
        <p>Brak materiałów.</p>
      )}
    </ul>
  );
};

export default StudyMaterialsList;
