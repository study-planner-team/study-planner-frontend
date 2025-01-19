import React, { createContext, useContext, useEffect, useState, useRef } from "react";
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
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the interval ID
  const navigate = useNavigate();

  useEffect(() => {
    fetchActiveSession();

    if (!intervalRef.current) {
      intervalRef.current = setInterval(fetchActiveSession, 60000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Cleanup interval on unmount
        intervalRef.current = null;
      }
    };
  }, [activeSession, toastDisplayed]);


  const fetchActiveSession = async () => {
    if (!isLoggedIn()) return;

    const session = await ScheduleService.getCurrentSession();

    // If no session or session hasn't changed, do nothing
    if (!session || (activeSession && session.studySessionId === activeSession.studySessionId)) {
      return;
    }

    if (session.status === "InProgress") {
      setActiveSession(session);

      if (!toastDisplayed) {
        toast.info(`Masz trwającą sesję: ${session.studyTopic.title}`, {
          onClick: () => navigate(`/sessions/active`),
        });
        setToastDisplayed(true);
      }

      // Stop polling
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      return;
    }

    // For other statuses, update the state and reset the toast
    setActiveSession(session);
    setToastDisplayed(false);
    toast.info(`Masz aktywną sesję: ${session.studyTopic.title}`, {
      onClick: () => navigate(`/sessions/active`),
    });
  };

  const startSession = async () => {
    if (!activeSession) return;

    const updatedSession = await ScheduleService.startSession(activeSession.studySessionId);
    setActiveSession(updatedSession);
    setToastDisplayed(false);
    toast.success("Sesja rozpoczęta!");
  };

  const endSession = async () => {
    if (!activeSession) return;

    await ScheduleService.endSession(activeSession.studySessionId);
    setActiveSession(null);
    setToastDisplayed(false);
    toast.success("Sesja zakończona!");

    // Restart polling after session ends
    if (!intervalRef.current) {
      intervalRef.current = setInterval(fetchActiveSession, 60000); 
    }
  };

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
