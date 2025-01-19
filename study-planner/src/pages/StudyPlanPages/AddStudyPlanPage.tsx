import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translations
import StudyPlanService from "../../services/StudyPlanService";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import StudyPlanForm from "../../components/StudyPlanComponents/StudyPlanForm";
import { toast } from "react-toastify";

const AddStudyPlanPage: React.FC = () => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    const success = await StudyPlanService.createStudyPlan(data);
    if (success) {
      toast.success(t("studyPlans.addSuccess"));
      navigate("/studyplans");
    }
  };

  return (
    <>
      <Header />
      <StudyPlanForm
        onSubmit={handleSubmit}
        submitButtonLabel={t("studyPlans.addPlan")}
      />
      <Footer />
    </>
  );
};

export default AddStudyPlanPage;
