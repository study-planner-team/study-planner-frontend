import React from 'react';

interface Topic {
  title: string;
  hours: number;
}

interface Schedule {
  studySessionId: number;
  date: Date;
  duration: number;
  topicTitle: string;
  startTime: Date;
  endTime: Date;
  studyPlanId: number;
  //studyPlan: StudyPlan;
  userId: number;
  //user: User;
}

interface ScheduleProps {
  data: Schedule;
}

const ScheduleBlock: React.FC<ScheduleProps> = ({ data }) => {
  return (
    <div>
      <h2>{data.topicTitle}</h2>

      <p className='fw-bold'>Date: {data.date.toString()}</p>
      <p className='fw-bold'>Duration: {data.duration.toString()}</p>
      <p className='fw-bold'>Start Time: {data.startTime.toString()}</p>
      <p className='fw-bold'>End Time: {data.endTime.toString()}</p>
    </div>
  );
};

export default ScheduleBlock;
