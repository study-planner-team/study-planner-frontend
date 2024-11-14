import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudyPlanService from "../../services/StudyPlanService";
import StudyPlanForm from "../../components/StudyPlanComponents/StudyPlanForm";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";

const EditStudyPlanPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        const response = await StudyPlanService.getStudyPlanById(Number(id));
        setInitialValues(response);
      } catch (error) {
        console.error('Error fetching study plan:', error);
      }
    };

    fetchStudyPlan();
  }, [id]);

  const handleSubmit = async (data: any) => {
    try {
      await StudyPlanService.updateStudyPlan(Number(id), data);
      navigate('/studyplans');
    } catch (error) {
      console.error('Error updating study plan:', error);
    }
  };

  return (
    <>
      <Header />
      <StudyPlanForm initialValues={initialValues} onSubmit={handleSubmit} submitButtonLabel="Zapisz zmiany" />
      <Footer />
    </>
  );
};

export default EditStudyPlanPage;