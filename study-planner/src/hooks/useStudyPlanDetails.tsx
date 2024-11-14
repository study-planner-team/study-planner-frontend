import { useEffect, useState } from "react";
import StudyPlanService from "../services/StudyPlanService";

interface StudyPlan {
  studyPlanId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  owner: StudyPlanOwner;
}

interface StudyPlanOwner {
  userId: number;
  username: string;
  email: string;
  isPublic: boolean;
}

interface ScheduleFormData {
  sessionsPerDay: number;
  sessionLength: number;
  studyStartTime: string;
  studyEndTime: string;
  preferredStudyDays: string[];
}

export const useStudyPlanDetails = (id: string | undefined) => {
  const [studyPlan, setStudyPlan] = useState<StudyPlan>();
  const [members, setMembers] = useState<any[]>([]);
  const [scheduleModalShow, setScheduleModalShow] = useState<boolean>(false);

  useEffect(() => {
    fetchStudyPlan();
    fetchPlanMembers();
  }, [id]);

  const fetchStudyPlan = async () => {
    try {
      const response = await StudyPlanService.getStudyPlanById(Number(id));
      setStudyPlan(response);
    } catch (error) {
      console.error("Error fetching study plan:", error);
    }
  };

  const fetchPlanMembers = async () => {
    try {
      const membersResponse = await StudyPlanService.getMembersByPlanId(
        Number(id)
      );
      setMembers(membersResponse);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const formatDateShort = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("pl-PL");
  };

  const handleOwnerChange = async (studyPlanId: number, userId: number) => {
    try {
      await StudyPlanService.changePlanOwner(studyPlanId, userId);
    } catch (error) {
      console.error("Error changing owner:", error);
    }
  };

  // const handleScheduleSubmit = async (formData: ScheduleFormData) => {
  //   try {
  //     const scheduleData = {
  //       ...formData,
  //       studyPlanId: studyPlan?.studyPlanId,
  //       startDate: studyPlan?.startDate,
  //       endDate: studyPlan?.endDate,
  //       topics: topics,
  //     };

  //     await StudyPlanService.generateSchedule(scheduleData);
  //   } catch (error) {
  //     console.error("Error generating schedule", error);
  //   }
  // };

  return {
    studyPlan,
    members,
    scheduleModalShow,
    setScheduleModalShow,
    handleOwnerChange,
    formatDateShort,
  };
};
