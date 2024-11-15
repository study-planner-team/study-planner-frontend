import { useEffect, useState } from "react";
import StudyPlanService from "../services/StudyPlanService";

export const usePublicPlans = () => {
  const [publicPlans, setPublicPlans] = useState<any[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<any[]>([]);

  useEffect(() => {
    fetchPublicPlans();
  }, []);

  const fetchPublicPlans = async () => {
    const data = await StudyPlanService.getPublicPlans();
    if (data) {
      setPublicPlans(data);
      setFilteredPlans(data);
    }
  };

  function handleFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filterTemp = publicPlans.filter(e => e.title.toLowerCase().includes(inputElement.value.toLowerCase()));
    setFilteredPlans(filterTemp);
  }

  const handleJoin = async (planId: number) => {
    const success = await StudyPlanService.joinStudyPlan(planId);
    
    if (success) {
      fetchPublicPlans();
    }
  };

  return { publicPlans, filteredPlans, fetchPublicPlans, handleFilter, handleJoin };
};
