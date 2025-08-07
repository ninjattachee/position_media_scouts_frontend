import { useCrewJob } from "@/hooks/useCrewJob";
import { RocketIcon } from "lucide-react";

export const StartButton = ({
  crewJob,
}: {
  crewJob: ReturnType<typeof useCrewJob>;
}) => {
  return (
    <button
      onClick={crewJob.startJob}
      className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-2 rounded-md grow md:min-w-max max-md:w-full disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={crewJob.running}
    >
      {crewJob.running ? (
        <>
          Running... <RocketIcon className="inline animate-bounce" />
        </>
      ) : (
        <>
          Start <RocketIcon className="inline" />
        </>
      )}
    </button>
  );
};
