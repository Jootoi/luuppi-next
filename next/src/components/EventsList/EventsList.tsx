import { Event } from '@/models/event';
import Link from 'next/link';
import { useState } from 'react';

interface EventListProps {
  events: Event[];
}

export default function EventsList({ events }: EventListProps) {
  const [showPastEvents, setShowPastEvents] = useState(false);

  const toggleShowPastEvents = (e: any) => {
    e.preventDefault();
    setShowPastEvents(!showPastEvents);
  };

  const groupEventsByDate = (events: Event[]) => {
    const groupedEvents = events.reduce(
      (acc, event) => {
        if (!event.start) return acc;
        const dateStr = event.start.toDateString();
        if (!acc[dateStr]) {
          acc[dateStr] = {
            date: event.start,
            events: [],
          };
        }
        acc[dateStr].events.push(event);
        return acc;
      },
      {} as Record<string, { date: Date; events: typeof events }>,
    );
    return groupedEvents;
  };

  const getEvents = (showAll: boolean) => {
    if (showAll) {
      return groupEventsByDate(events);
    }
    const filtered = events.filter((event) => event.start > new Date());
    return groupEventsByDate(filtered);
  };

  const dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  } as const;

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
  } as const;

  return (
    <div className="flex flex-col gap-12">
      <div>
        <button
          className="btn btn-primary text-lg font-bold text-white"
          onClick={toggleShowPastEvents}
        >
          {showPastEvents ? 'Hide past events' : 'Show past events'}
        </button>
      </div>
      {Object.values(getEvents(showPastEvents)).map((group) => (
        <div key={group.date.toDateString()} className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            {group.date.toLocaleDateString(
              undefined,
              showPastEvents
                ? { ...dateOptions, year: 'numeric' }
                : dateOptions,
            )}
          </h2>
          <div className="divider my-0" />
          <div className="flex flex-col gap-4">
            {group.events.map((event) => (
              <Link
                key={
                  event.start.toISOString() +
                  event.end.toISOString() +
                  event.title
                }
                className="flex gap-4 rounded-lg transition-all delay-300 ease-in-out hover:bg-primary-50"
                href="/"
              >
                <span className="w-1 rounded-l-lg bg-primary-400" />
                <div className="flex flex-col py-2">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <div className="flex gap-2">
                    <p>
                      {event.start.toLocaleTimeString(undefined, timeOptions)}
                    </p>
                    <p>-</p>
                    <p>
                      {event.end.toLocaleTimeString(undefined, timeOptions)}
                    </p>
                    p
                  </div>
                  <p className="line-clamp-3 max-w-xl text-gray-500">
                    {event.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}