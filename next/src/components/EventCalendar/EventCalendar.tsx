'use client';
import { Event } from '@/models/event';
import fiLocale from '@fullcalendar/core/locales/fi';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useRef, useState } from 'react';
import './EventCalendar.css';

interface EventCalendarProps {
  events: Event[];
}

export default function EventCalendar({ events }: EventCalendarProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Hacky solution to fix overlapping events styling
  const calendarRef = useRef<FullCalendar>(null);

  const handleEventClick = (e: any) => {
    // TODO: Event page
    console.log(e.event);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      calendarRef?.current?.getApi().updateSize();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <FullCalendar
      ref={calendarRef}
      aspectRatio={isMobile ? 0.8 : 1.35}
      datesSet={() => {
        setTimeout((): void => {
          calendarRef?.current?.getApi().updateSize();
        }, 0);
      }}
      dayHeaderFormat={
        isMobile
          ? {
              weekday: 'short',
              day: 'numeric',
              omitCommas: true,
            }
          : {
              weekday: 'long',
              day: 'numeric',
            }
      }
      dayMaxEventRows={4}
      dayMaxEvents={4}
      eventClick={handleEventClick}
      eventContent={function (arg) {
        return (
          <span className="tooltip block w-full" data-tip={arg.event.title}>
            <p className="overflow-hidden pl-[2px] text-left max-lg:text-xs">
              {arg.timeText}{' '}
              <span className="font-bold">{arg.event.title}</span>
            </p>
          </span>
        );
      }}
      eventOrderStrict={true}
      eventTimeFormat={{
        hour: 'numeric',
        minute: '2-digit',
        meridiem: false,
        hour12: false,
      }}
      events={events}
      headerToolbar={
        !isMobile
          ? {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek',
            }
          : {
              left: 'title',
              center: 'prev,next today',
              right: 'dayGridMonth',
            }
      }
      initialView={'dayGridMonth'}
      locale={fiLocale}
      plugins={[dayGridPlugin, timeGridPlugin]}
      slotLabelFormat={{
        hour: 'numeric',
        minute: '2-digit',
        meridiem: false,
        hour12: false,
      }}
      titleFormat={{
        year: 'numeric',
        month: 'long',
      }}
      weekends={true}
    />
  );
}