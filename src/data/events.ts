import type { NormalizedVenue } from '../types';

/**
 * Mock data de venues y eventos - used as fallback when API is unavailable
 * Extraído del mockup: design/mockups/index-v2.html (líneas 1162-1229)
 * Ubicación: Tulancingo, Hidalgo, México
 * Período: 2026-03-28 a 2026-04-02
 */

export const mockVenues: NormalizedVenue[] = [
  {
    id: 1,
    name: "Foro Indie",
    lat: 20.0858,
    lng: -98.3611,
    events: [
      {
        id: 1,
        name: "Banda en vivo - Los Rebeldes",
        date: "2026-03-28T20:00:00",
        links: {
          instagram: "https://instagram.com/p/abc123"
        }
      },
      {
        id: 2,
        name: "DJ Set - Electro Night",
        date: "2026-03-28T23:00:00",
        links: {
          facebook: "https://facebook.com/events/xyz456"
        }
      }
    ]
  },
  {
    id: 2,
    name: "La Cantina del Pueblo",
    lat: 20.0865,
    lng: -98.3580,
    events: [
      {
        id: 3,
        name: "Música Mexicana Viva",
        date: "2026-03-28T21:00:00",
        links: {
          instagram: "https://instagram.com/p/def789"
        }
      }
    ]
  },
  {
    id: 3,
    name: "Auditorio Municipal",
    lat: 20.0873,
    lng: -98.3620,
    events: [
      {
        id: 4,
        name: "Concierto Sinfónico",
        date: "2026-03-30T19:00:00",
        links: {
          facebook: "https://facebook.com/events/abc789"
        }
      },
      {
        id: 5,
        name: "Festival de Rock",
        date: "2026-03-31T20:00:00",
        links: {
          instagram: "https://instagram.com/p/ghi012"
        }
      }
    ]
  },
  {
    id: 4,
    name: "Club Nocturno Bella Noche",
    lat: 20.0851,
    lng: -98.3595,
    events: [
      {
        id: 6,
        name: "House Party",
        date: "2026-03-28T22:30:00",
        links: {
          facebook: "https://facebook.com/events/def012"
        }
      },
      {
        id: 7,
        name: "Deep House Sessions",
        date: "2026-03-30T22:00:00",
        links: {
          instagram: "https://instagram.com/p/jkl345"
        }
      }
    ]
  },
  {
    id: 5,
    name: "Jardín Botánico",
    lat: 20.0840,
    lng: -98.3640,
    events: [
      {
        id: 8,
        name: "Concierto Acústico al Aire Libre",
        date: "2026-03-29T18:00:00",
        links: {
          instagram: "https://instagram.com/p/mno678"
        }
      }
    ]
  },
  {
    id: 6,
    name: "Bar La Esquina",
    lat: 20.0880,
    lng: -98.3600,
    events: [
      {
        id: 9,
        name: "Jam Session de Jazz",
        date: "2026-03-28T20:30:00",
        links: {
          facebook: "https://facebook.com/events/ghi345"
        }
      }
    ]
  },
  {
    id: 7,
    name: "Sala de Conciertos Moderna",
    lat: 20.0845,
    lng: -98.3575,
    events: [
      {
        id: 10,
        name: "Indie Rock Showcase",
        date: "2026-04-02T21:00:00",
        links: {
          instagram: "https://instagram.com/p/pqr901"
        }
      }
    ]
  }
];

/**
 * Fallback venues exported for backwards compatibility
 * @deprecated Use useEvents hook for API-fetched data
 */
export const venues = mockVenues;

/**
 * Extrae todos los eventos de todas las venues en un array plano
 * @deprecated Use useEvents hook for API-fetched data
 */
export function getAllEvents() {
  return venues.flatMap(venue =>
    venue.events.map(event => ({
      ...event,
      venueName: venue.name,
      venueLat: venue.lat,
      venueLng: venue.lng
    }))
  );
}
