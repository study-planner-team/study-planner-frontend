import { useEffect, useState } from "react";
import StudyPlanService from "../services/StudyPlanService";

export const useStudyPlans = () => {
  const [studyPlans, setStudyPlans] = useState<any[]>([]);
  const [joinedPlans, setJoinedPlans] = useState<any[]>([]);
  const [archivedPlans, setArchivedPlans] = useState<any[]>([]);

  useEffect(() => {
    fetchStudyPlans();
    fetchArchivedPlans();
    fetchJoinedPlans();
  }, []);

  const fetchStudyPlans = async () => {
    try {
      const data = await StudyPlanService.getStudyPlans();
      setStudyPlans(data);
    } catch (error) {
      console.error("Error fetching study plans", error);
    }
  };

  const fetchJoinedPlans = async () => {
    try {
      const data = await StudyPlanService.getJoinedPlans();
      setJoinedPlans(data);
    } catch (error) {
      console.error("Error fetching study plans", error);
    }
  };

  const fetchArchivedPlans = async () => {
    try {
      const response = await StudyPlanService.getArchivedStudyPlans();
      setArchivedPlans(response);
    } catch (error) {
      console.error("Error fetching archived study plans:", error);
    }
  };

  const handleArchive = async (planId: number) => {
    try {
      await StudyPlanService.archiveStudyPlan(planId);
      fetchStudyPlans();
      fetchArchivedPlans();
    } catch (error) {
      console.error("Error archiving study plan:", error);
    }
  };

  const handleUnarchive = async (planId: number) => {
    try {
      await StudyPlanService.unarchiveStudyPlan(planId);
      fetchStudyPlans();
      fetchArchivedPlans();
    } catch (error) {
      console.error("Error unarchiving study plan:", error);
    }
  };

  const handleLeave = async (planId: number) => {
    try {
      await StudyPlanService.leaveStudyPlan(planId);
      fetchJoinedPlans();
    } catch (error) {
      console.error("Couldn't leave study plan:", error);
    }
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
