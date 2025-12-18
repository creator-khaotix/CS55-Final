import { useState, useEffect } from 'react';

export interface GameData {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: [{
      source_url: string;
    }];
  };
  acf?: {
    [key: string]: any;
  };
}

export function useGamesData() {
  const [games, setGames] = useState<GameData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);

        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch('https://dev-cs-55-week-11.pantheonsite.io/wp-json/wp/v2/game?_embed', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }

        const data: GameData[] = await response.json();
        setGames(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching games:', err);
        let errorMessage = 'An error occurred while loading games';

        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            errorMessage = 'Request timed out. Please check your internet connection.';
          } else if (err.message.includes('fetch')) {
            errorMessage = 'Network error. Please check your internet connection.';
          } else {
            errorMessage = err.message;
          }
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
}
