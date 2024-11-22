import { useEffect, useState } from "react";
import { useAuthContext, User } from "../context/useAuthContext";
import StudyPlanService from "../services/StudyPlanService";

const usePermissions = (studyPlan: any) => {
  const { user } = useAuthContext();
  const [members, setMembers] = useState<any[]>();

  useEffect(() => {
    if (studyPlan?.studyPlanId) {
      fetchMembers();
    }
  }, [studyPlan]);

  const fetchMembers = async () => {
    //console.log(studyPlan.studyPlanId);
    const members = await StudyPlanService.getMembersByPlanId(Number(studyPlan.studyPlanId));
    if (members) {
      setMembers(members);
    }
  };

  // Check if the current user is the owner of the study plan
  const isOwner = studyPlan?.owner?.userId === user?.id;

  // Check if the user is a member of the study plan
  const isMember = members ? members.some(member => member.userId === user?.id) : false;

  //console.log(isMember);
  // Define permissions
  const canEdit = isOwner;
  const canGenerateSchedule = isOwner || isMember;
  const canViewDetails = isOwner || isMember;

  return {
    canEdit,
    canGenerateSchedule,
    canViewDetails,
  };
};

export default usePermissions;