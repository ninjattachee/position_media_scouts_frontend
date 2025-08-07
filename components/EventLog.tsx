import { Event } from "@/hooks/useCrewJob";

interface EventLogProps {
  events: Event[];
}

export const EventLog = ({ events }: EventLogProps) => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-semibold mb-2">Event Details</h3>
      <div className="border-2 border-gray-300 rounded-md p-2 flex flex-col gap-2 overflow-y-auto">
        {events.length === 0 && (
          <p className="text-gray-500">No events found yet.</p>
        )}
        {events.map((event, index) => (
          <div key={index} className="p-2 border-b border-gray-200">
            {event.timestamp}: {event.data}
          </div>
        ))}
      </div>
    </div>
  );
};
