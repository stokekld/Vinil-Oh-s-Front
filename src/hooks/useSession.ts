import { useState, useEffect } from 'react';
import type { Track, SessionResponse } from '../types';

function getApiBaseUrl(): string {
  // En desarrollo, usar VITE_API_BASE_URL
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // En producción, construir URL usando el host actual
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = 3000; // Puerto del backend
  
  // Si estamos en localhost, usar localhost; si es otra IP, usar esa IP
  return `${protocol}//${hostname}:${port}`;
}

export function useSession() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const apiUrl = getApiBaseUrl();
        const response = await fetch(`${apiUrl}/v1/session`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch session: ${response.statusText}`);
        }

        const data: SessionResponse = await response.json();
        
        if (data.success && data.data) {
          setTracks(data.data);
          setError(null);
        } else {
          throw new Error(data.message || 'Failed to load session');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Error fetching session:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { tracks, loading, error };
}
