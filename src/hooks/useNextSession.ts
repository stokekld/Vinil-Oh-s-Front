import { useState, useEffect } from 'react';
import type { Album, NextSessionResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export function useNextSession() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNextSession = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/v1/session/next`);

        if (!response.ok) {
          throw new Error(`Failed to fetch next session: ${response.statusText}`);
        }

        const data: NextSessionResponse = await response.json();

        if (data.success && data.data) {
          setAlbums(data.data);
          setError(null);
        } else {
          throw new Error(data.message || 'Failed to load next session');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Error fetching next session:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNextSession();
  }, []);

  return { albums, loading, error };
}
