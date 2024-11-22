import { useEffect, useState } from "react";
import StudyTopicService from "../services/StudyTopicService";

interface StudyMaterials {
  studyMaterialId?: number;
  title: string;
  link: string;
}

export const useStudyMaterials = (topicId: number) => {
  const [materials, setMaterials] = useState<StudyMaterials[]>([]);
  const [materialModalShow, setMaterialModalShow] = useState<boolean>(false);

  useEffect(() => {
    fetchMaterials();
  }, [topicId]);

  const fetchMaterials = async () => {
    const materialsResponse = await StudyTopicService.getMaterialsByTopicId(topicId);
    if (materialsResponse) {
      setMaterials(materialsResponse);
    }
  };

  const handleAddMaterial = async (topicId: number, newMaterial: StudyMaterials) => {
    const addedMaterial = await StudyTopicService.addMaterial(topicId, newMaterial);
    if (addedMaterial) {
      setMaterials([...materials, addedMaterial]);
    }
  };

  const handleDeleteMaterial = async (materialId: number) => {
    const response = await StudyTopicService.deleteMaterial(topicId, materialId);
    
    if (response) {
      fetchMaterials();
    }
  };

  return {
    materials,
    materialModalShow,
    setMaterialModalShow,
    handleAddMaterial,
    handleDeleteMaterial
  };
};
