import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import GenerateScheduleFormModal from "../../components/ScheduleComponents/GenerateScheduleFormModal";
import StudyPlanService from "../../services/StudyPlanService";

interface ScheduleFormData {
  sessionsPerDay: number;
  sessionLength: number;
  studyStartTime: string;
  studyEndTime: string;
  preferredStudyDays: string[];
}

interface ScheduleGeneratingBlockProps {
  studyPlanId: number;
  startDate: string;
  endDate: string;
  topicIds: number[];
}

const ScheduleGeneratingBlock: React.FC<ScheduleGeneratingBlockProps> = ({studyPlanId, startDate, endDate, topicIds}) => {
  const [scheduleModalShow, setScheduleModalShow] = useState<boolean>(false);

  const handleScheduleSubmit = async (formData: ScheduleFormData) => {
    const scheduleData = {
      ...formData,
      studyPlanId,
      startDate,
      endDate,
      topicIds,
    };

    const success = await StudyPlanService.generateSchedule(scheduleData);
    if (success) {
      toast.success("Pomyślnie utworzono harmonogram!");
    }
  };

  return (
    <>
      <Button variant="warning" onClick={() => setScheduleModalShow(true)}>
        Generuj harmonogram
      </Button>

      <GenerateScheduleFormModal
        show={scheduleModalShow}
        onHide={() => setScheduleModalShow(false)}
        onSubmit={handleScheduleSubmit}
      />

    </>
  );
};

export default ScheduleGeneratingBlock;
