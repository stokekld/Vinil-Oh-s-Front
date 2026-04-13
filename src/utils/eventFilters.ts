import type { Venue, Event } from '../types';

/**
 * Filtra eventos por fecha según el filtro
 * Base date: 2026-03-28 (del mockup)
 */
export function filterEventsByDate(
  venues: Venue[],
  filter: 'today' | 'week'
): Event[] {
  const baseDate = new Date('2026-03-28');
  baseDate.setHours(0, 0, 0, 0);

  const events: (Event & { venueName: string })[] = [];

  venues.forEach((venue) => {
    venue.events.forEach((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);

      let isVisible = false;

      if (filter === 'today') {
        isVisible = eventDate.getTime() === baseDate.getTime();
      } else if (filter === 'week') {
        const weekEnd = new Date(baseDate);
        weekEnd.setDate(weekEnd.getDate() + 6);
        isVisible = eventDate >= baseDate && eventDate <= weekEnd;
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
