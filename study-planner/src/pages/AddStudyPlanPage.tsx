import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudyPlanService from '../services/StudyPlanService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StudyPlanForm from '../components/StudyPlanForm';

const AddStudyPlanPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      await StudyPlanService.createStudyPlan(data);
      navigate("/studyplans");
    } catch (error) {
      console.error("Error creating study plan:", error);
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