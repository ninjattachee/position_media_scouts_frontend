"use client";

import { EventLog } from "@/components/EventLog";
import { FinalOutput } from "@/components/FinalOutput";
import { Header } from "@/components/Header";
import { InputSection } from "@/components/InputSection";
import { StartButton } from "@/components/StartButton";
import { useCrewJob } from "@/hooks/useCrewJob";

export default function Home() {
  const crewJob = useCrewJob();

  return (
    <div className="flex flex-col gap-6">
      <Header />
      <div className="flex items-baseline-last md:flex-row flex-col mx-8 gap-12 max-md:gap-6">
        <InputSection />
        <StartButton crewJob={crewJob} />
      </div>
      <div className="px-8 py-4 flex flex-col">
        <div className="flex flex-col gap-4">
          <FinalOutput />
          <EventLog events={crewJob.events} />
        </div>
      </div>
    </div>
  );
}
