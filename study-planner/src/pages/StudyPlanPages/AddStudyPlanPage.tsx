import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudyPlanService from '../../services/StudyPlanService';
import Header from '../../components/GeneralComponents/Header';
import Footer from '../../components/GeneralComponents/Footer';
import StudyPlanForm from '../../components/StudyPlanComponents/StudyPlanForm';
import { toast } from 'react-toastify';

const AddStudyPlanPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    const success = await StudyPlanService.createStudyPlan(data);
    if (success) {
      toast.success("Pomyślnie dodano nowy plan nauki!");
      navigate("/studyplans");
    }
  };

  return (
    <>
      <Header />
      <StudyPlanForm onSubmit={handleSubmit} submitButtonLabel="Dodaj plan" />
      <Footer />
    </>
  );
};

export default AddStudyPlanPage;