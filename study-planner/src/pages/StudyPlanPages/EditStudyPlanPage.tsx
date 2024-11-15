import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudyPlanService from "../../services/StudyPlanService";
import StudyPlanForm from "../../components/StudyPlanComponents/StudyPlanForm";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import { toast } from "react-toastify";

const EditStudyPlanPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudyPlan();
  }, [id]);

  const fetchStudyPlan = async () => {
    const plan = await StudyPlanService.getStudyPlanById(Number(id));
    if (plan) {
      setInitialValues(plan);
    }
  };

  const handleSubmit = async (data: any) => {
    const success = await StudyPlanService.updateStudyPlan(Number(id), data);
    if (success) {
      toast.success("Pomyślnie zmodyfikowano plan nauki")
      navigate('/studyplans');
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