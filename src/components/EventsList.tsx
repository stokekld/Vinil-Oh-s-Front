import type { Event } from '../types';

interface EventsListProps {
  events: Event[];
  selectedEventId: number | null;
  onEventSelect: (eventId: number) => void;
}

export function EventsList({ events, selectedEventId, onEventSelect }: EventsListProps) {
  return (
    <div className="events-info" id="eventsInfo">
      {events.length === 0 ? (
        <p style={{ textAlign: 'center', opacity: 0.6, padding: '1rem' }}>
          No events match the selected filter
        </p>
      ) : (
        <>
          {events.map((event) => {
            const eventDate = new Date(event.date);
            return (
              <div
                key={event.id}
                className={`event-item-compact ${selectedEventId === event.id ? 'active' : ''}`}
                data-event-id={event.id}
                onClick={() => onEventSelect(event.id)}
              >
                <h4>{event.name}</h4>
                <p>{(event as any).venueName}</p>
                <p>
                  {eventDate.toLocaleDateString('es-MX')} · {eventDate.toLocaleTimeString('es-MX', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
