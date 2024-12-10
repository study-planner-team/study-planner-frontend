import React, { createContext, useContext, useEffect, useState } from "react";
import ScheduleService from "../services/ScheduleService";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

interface StudySession {
  studySessionId: number;
  date: string;
  duration: number;
  startTime: string;
  endTime: string;
  status: string;
  topicId: number;
  studyTopic: {
    topicId: number;
    title: string;
    hours: number;
    studyMaterials: { studyMaterialId: number; title: string; link: string }[];
  };
}

interface ActiveSessionContextType {
  activeSession: StudySession | null;
  fetchActiveSession: () => Promise<void>;
  startSession: () => Promise<void>;
  endSession: () => Promise<void>;
}

const ActiveSessionContext = createContext<ActiveSessionContextType | undefined>(undefined);

export const ActiveSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuthContext();
  const [activeSession, setActiveSession] = useState<StudySession | null>(null);
  const navigate = useNavigate();

  const fetchActiveSession = async () => {
    if (!isLoggedIn()) return;

    const session = await ScheduleService.getCurrentSession();
    if (!session || (activeSession && session.studySessionId === activeSession.studySessionId)) return;

    setActiveSession(session);
    toast.info(`Masz ${session.status === "InProgress" ? "trwającą" : "aktywną"} sesję: ${session.studyTopic.title}`, {
      onClick: () => navigate(`/sessions/active`),
    });
  };

  const startSession = async () => {
    if (!activeSession) return;

    const updatedSession = await ScheduleService.startSession(activeSession.studySessionId);
    setActiveSession(updatedSession);
    toast.success("Sesja rozpoczęta!");
  };

  const endSession = async () => {
    if (!activeSession) return;

    await ScheduleService.endSession(activeSession.studySessionId);
    setActiveSession(null);
    toast.success("Sesja zakończona!");
  };

  useEffect(() => {
    fetchActiveSession(); // Initial fetch
    const interval = setInterval(fetchActiveSession, 60000); // Poll every minute
    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <ActiveSessionContext.Provider value={{ activeSession, fetchActiveSession, startSession, endSession }}>
      {children}
    </ActiveSessionContext.Provider>
  );
};

export const useActiveSessionContext = () => {
  const context = useContext(ActiveSessionContext);
  if (!context) {
    throw new Error("useActiveSessionContext must be used within an ActiveSessionProvider");
  }
  return context;
};