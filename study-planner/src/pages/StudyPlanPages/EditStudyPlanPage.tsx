import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translations
import StudyPlanService from "../../services/StudyPlanService";
import StudyPlanForm from "../../components/StudyPlanComponents/StudyPlanForm";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import { toast } from "react-toastify";

const EditStudyPlanPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("global");
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
      toast.success(t("studyPlans.editSuccess"));
      navigate("/studyplans");
    }
  };

  return (
    <>
      <Header />
      <StudyPlanForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitButtonLabel={t("studyPlans.saveChanges")}
      />
      <Footer />
    </>
  );
};

export default EditStudyPlanPage;
