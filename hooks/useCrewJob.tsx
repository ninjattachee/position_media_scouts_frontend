import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCompanyStore } from "./useCompanyStore";
import { usePositionStore } from "./usePositionStore";
import {
  PositionInfo,
  usePositionInfoListStore,
} from "./usePositionInfoListStore";
import { useRunningStore } from "./useRunningStore";

export type Event = {
  data: string;
  timestamp: string;
};

export const useCrewJob = () => {
  // State
  const { running, setRunning } = useRunningStore();
  const { companies, setCompanies } = useCompanyStore();
  const { positions, setPositions } = usePositionStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const { setPositionInfoList } = usePositionInfoListStore();

  const handleJobCompletion = (
    status: "Completed" | "Failed",
    intervalId: NodeJS.Timeout | null
  ) => {
    setRunning(false);
    status === "Completed"
      ? toast.success("Job completed")
      : toast.error("Job failed");

    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  // useEffects
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const fetchJobStatus = async () => {
      try {
        const response = await axios.get<{
          status: "Running" | "Completed" | "Failed";
          result: { positions: PositionInfo[] };
          events: Event[];
        }>(`http://localhost:3001/api/crew/${currentJobId}`);

        setEvents(response.data.events);

        if (response.data.result) {
          console.log("Setting job positions", response.data.result.positions);
          setPositionInfoList(response.data.result.positions || []);
        }

        if (
          response.data.status === "Completed" ||
          response.data.status === "Failed"
        ) {
          handleJobCompletion(response.data.status, intervalId);
        }
      } catch (error: any) {
        console.error(error);
        setRunning(false);
        toast.error("Job failed to fetch");
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    };

    if (currentJobId) {
      intervalId = setInterval(fetchJobStatus, 1000);
    }
  }, [currentJobId]);

  // Functions
  const startJob = async () => {
    // Clean up the old job
    setEvents([]);
    setPositionInfoList([]);
    setRunning(true);

    // Request to our backend
    try {
      const response = await axios.post<{ job_id: string }>(
        "http://localhost:3001/api/crew",
        {
          companies,
          positions,
        }
      );

      setCurrentJobId(response.data.job_id);

      toast.success("Job started");
    } catch (error) {
      console.error(error);
      setCurrentJobId(null);
      setRunning(false);
      toast.error("Job failed to start");
    }
  };

  return {
    companies,
    positions,
    setCompanies,
    setPositions,
    startJob,
    running,
    events,
  };
};
