import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonLoading, IonText, IonItem, IonLabel } from '@ionic/react';
import { useGamesData, GameData } from '../hooks/useGamesData';
import './Tab1.css';

const Tab1: React.FC = () => {
  const { games, loading, error } = useGamesData();

  const renderGameCard = (game: GameData) => {
    const featuredImage = game._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const title = game.title?.rendered || `Game ${game.id}`;

    console.log(`Game "${title}": featured image = ${featuredImage ? 'YES' : 'NO'}`);

    return (
      <IonCard key={game.id} className="game-card">
        <IonCardHeader>
          <IonCardTitle className="game-title">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {featuredImage && (
            <IonImg
              src={featuredImage}
              alt={title}
              className="game-image"
            />
          )}

          {game.acf && Object.keys(game.acf).length > 0 && (
            <div>
              <IonText color="primary" className="game-details">
                Game Details:
              </IonText>
              {Object.entries(game.acf).map(([key, value]) => (
                <IonItem key={key} lines="none" className="game-detail-item">
                  <IonLabel>
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Games</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Games</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading && <IonLoading isOpen={loading} message="Loading games..." />}
        {error && (
          <IonText color="danger">
            <p>Error loading games: {error}</p>
          </IonText>
        )}

        {!loading && !error && games.length === 0 && (
          <IonText>
            <p>No games found.</p>
          </IonText>
        )}

        {!loading && !error && games.map(renderGameCard)}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
