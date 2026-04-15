import type { Venue, Event } from '../types';

export function filterEventsByDate(
  venues: Venue[],
  filter: 'today' | 'week'
): Event[] {
  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);

  const tomorrowBase = new Date();
  tomorrowBase.setDate(tomorrowBase.getDate() + 1);
  tomorrowBase.setHours(0, 0, 0, 0);

  const events: (Event & { venueName: string })[] = [];
  let eventIdCounter = 0;

  venues.forEach((venue) => {
    venue.events.forEach((event) => {
      event.id = eventIdCounter++;
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);

      let isVisible = false;

      if (filter === 'today') {
        isVisible = eventDate.getTime() === baseDate.getTime();
      } else if (filter === 'week') {
        const weekEnd = new Date(tomorrowBase);
        weekEnd.setDate(weekEnd.getDate() + 6);
        isVisible = eventDate >= tomorrowBase && eventDate <= weekEnd;
      }

      if (isVisible) {
        events.push({
          ...event,
          venueName: venue.name,
        });
      }
    });
  });

  // Sort by date
  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return events;
}

/**
 * Extrae todos los eventos de todas las venues
 */
export function getAllEvents(venues: Venue[]): (Event & { venueName: string })[] {
  const events: (Event & { venueName: string })[] = [];

  venues.forEach((venue) => {
    venue.events.forEach((event) => {
      events.push({
        ...event,
        venueName: venue.name,
      });
    });
  });

  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
