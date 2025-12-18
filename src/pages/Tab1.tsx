/**
 * Tab1 Component - Games Page
 *
 * Displays a list of games fetched from the WordPress REST API.
 * Each game is displayed as a card with title, featured image, and ACF custom fields.
 *
 * Features:
 * - Fetches data from WordPress API endpoint
 * - Displays game title, image, and custom fields
 * - Handles loading and error states
 * - Uses CSS classes for styling (defined in Tab1.css)
 */
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonLoading, IonText, IonItem, IonLabel } from '@ionic/react';
import { useGamesData, GameData } from '../hooks/useGamesData';
import './Tab1.css';

const Tab1: React.FC = () => {
  // Custom hook to fetch games data from WordPress API
  const { games, loading, error } = useGamesData();

  /**
   * Renders an individual game card
   * @param game - GameData object containing game information
   * @returns JSX element representing a game card
   */
  const renderGameCard = (game: GameData) => {
    // Extract featured image URL from WordPress API response
    const featuredImage = game._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    // Get title with HTML entity decoding, fallback to generic title if missing
    const title = game.title?.rendered || `Game ${game.id}`;

    // Debug logging to track which games have images
    console.log(`Game "${title}": featured image = ${featuredImage ? 'YES' : 'NO'}`);

    return (
      <IonCard key={game.id} className="game-card">
        <IonCardHeader>
          <IonCardTitle className="game-title">
            {/* Use dangerouslySetInnerHTML to decode HTML entities (like apostrophes) */}
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {/* Only render image if it exists */}
          {featuredImage && (
            <IonImg
              src={featuredImage}
              alt={title}
              className="game-image"
            />
          )}

          {/* Render ACF custom fields if they exist */}
          {game.acf && Object.keys(game.acf).length > 0 && (
            <div>
              <IonText color="primary" className="game-details">
                Game Details:
              </IonText>
              {/* Map through ACF fields and display them */}
              {Object.entries(game.acf).map(([key, value]) => (
                <IonItem key={key} lines="none" className="game-detail-item">
                  <IonLabel>
                    {/* Format field names: replace underscores with spaces, capitalize */}
                    <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {String(value)}
                  </IonLabel>
                </IonItem>
              ))}
            </div>
          )}
        </IonCardContent>
      </IonCard>
    );
  };

  return (
    <IonPage>
      {/* Page header with navigation title */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Games</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Collapsible header for mobile scrolling */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Games</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Loading state */}
        {loading && <IonLoading isOpen={loading} message="Loading games..." />}

        {/* Error state */}
        {error && (
          <IonText color="danger">
            <p>Error loading games: {error}</p>
          </IonText>
        )}

        {/* Empty state */}
        {!loading && !error && games.length === 0 && (
          <IonText>
            <p>No games found.</p>
          </IonText>
        )}

        {/* Render game cards */}
        {!loading && !error && games.map(renderGameCard)}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
