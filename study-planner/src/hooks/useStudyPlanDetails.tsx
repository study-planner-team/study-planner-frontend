import { useEffect, useState } from "react";
import StudyPlanService from "../services/StudyPlanService";
import { toast } from "react-toastify";

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
    const response = await StudyPlanService.getStudyPlanById(Number(id));

    if (response) {
      setStudyPlan(response);
    }
  };

  const fetchPlanMembers = async () => {
    const membersResponse = await StudyPlanService.getMembersByPlanId(
      Number(id)
    );

    if (membersResponse) {
      setMembers(membersResponse);
    }
  };

  const handleOwnerChange = async (studyPlanId: number, userId: number) => {
    const success = await StudyPlanService.changePlanOwner(studyPlanId, userId);

    if (success) {
      toast.success("Pomyślnie zmieniono lidera planu");
    }
  };

  const formatDateShort = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("pl-PL");
  };


  // const handleScheduleSubmit = async (formData: ScheduleFormData) => {
  //   const scheduleData = {
  //     ...formData,
  //     studyPlanId: studyPlan?.studyPlanId,
  //     startDate: studyPlan?.startDate,
  //     endDate: studyPlan?.endDate,
  //     topics: topics,
  //   };

  //   const success = await StudyPlanService.generateSchedule(scheduleData);
    
  //   if (success) {
  //     toast.success("Pomyślnie utworzono harmonogram!")
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
