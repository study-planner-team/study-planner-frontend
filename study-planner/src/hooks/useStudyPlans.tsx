import { useEffect, useState } from "react";
import StudyPlanService from "../services/StudyPlanService";

export const useStudyPlans = () => {
  const [studyPlans, setStudyPlans] = useState<any[]>([]);
  const [joinedPlans, setJoinedPlans] = useState<any[]>([]);
  const [archivedPlans, setArchivedPlans] = useState<any[]>([]);

  useEffect(() => {
    fetchAllPlans();
  }, []);

  const fetchAllPlans = async () => {
    const activePlans = await StudyPlanService.getStudyPlans();
    const joined = await StudyPlanService.getJoinedPlans();
    const archived = await StudyPlanService.getArchivedStudyPlans();

    if (activePlans) setStudyPlans(activePlans);
    if (joined) setJoinedPlans(joined);
    if (archived) setArchivedPlans(archived);
  };

  const handleSuccess = async (success: boolean) => {
    if (success) {
      await fetchAllPlans();
    }
  };

  const handleArchive = async (planId: number) => {
    const success = await StudyPlanService.archiveStudyPlan(planId);
    handleSuccess(success);
  };

  const handleUnarchive = async (planId: number) => {
    const success = await StudyPlanService.unarchiveStudyPlan(planId);
    handleSuccess(success);
  };


  const handleLeave = async (planId: number) => {
    const success = await StudyPlanService.leaveStudyPlan(planId);
    handleSuccess(success);
  };

  return {
    studyPlans,
    joinedPlans,
    archivedPlans,
    handleArchive,
    handleUnarchive,
    handleLeave,
  };

};
