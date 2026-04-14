import { useState, useEffect } from 'react';
import type { Venue, ApiEventResponse, NormalizedVenue } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Normalizes API venue response to consistent format
 * Converts API's latitude/longitude to lat/lng and ensures IDs are consistent
 */
function normalizeVenue(apiVenue: Venue, index: number): NormalizedVenue {
  return {
    ...apiVenue,
    id: apiVenue.id ?? index,
    lat: apiVenue.latitude ?? apiVenue.lat ?? 0,
    lng: apiVenue.longitude ?? apiVenue.lng ?? 0,
    events: apiVenue.events.map((event, eventIndex) => ({
      ...event,
      id: event.id ?? eventIndex,
    })),
  };
}

export function useEvents() {
  const [venues, setVenues] = useState<NormalizedVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/v1/event`);

        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`);
        }

        const data: ApiEventResponse = await response.json();

        if (data.success && data.data) {
          // Normalize venues to consistent format
          const normalizedVenues = data.data.map(normalizeVenue);
          setVenues(normalizedVenues);
          setError(null);
        } else {
          throw new Error(data.message || 'Failed to load events');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { venues, loading, error };
}
