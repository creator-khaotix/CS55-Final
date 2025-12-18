import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonLoading, IonText, IonItem, IonLabel } from '@ionic/react';
import { useMoviesData, MovieData } from '../hooks/useMoviesData';
import './Tab3.css';

const Tab3: React.FC = () => {
  const { movies, loading, error } = useMoviesData();

  const renderMovieCard = (movie: MovieData) => {
    const featuredImage = movie._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const title = movie.title?.rendered || `Movie ${movie.id}`;

    console.log(`Movie "${title}": featured image = ${featuredImage ? 'YES' : 'NO'}`);

    return (
      <IonCard key={movie.id} className="movie-card">
        <IonCardHeader>
          <IonCardTitle className="movie-title">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {featuredImage && (
            <IonImg
              src={featuredImage}
              alt={title}
              className="movie-image"
            />
          )}

          {movie.acf && Object.keys(movie.acf).length > 0 && (
            <div>
              <IonText color="primary" className="movie-details">
                Movie Details:
              </IonText>
              {Object.entries(movie.acf).map(([key, value]) => (
                <IonItem key={key} lines="none" className="movie-detail-item">
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
          <IonTitle>Movies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Movies</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading && <IonLoading isOpen={loading} message="Loading movies..." />}
        {error && (
          <IonText color="danger">
            <p>Error loading movies: {error}</p>
          </IonText>
        )}

        {!loading && !error && movies.length === 0 && (
          <IonText>
            <p>No movies found.</p>
          </IonText>
        )}

        {!loading && !error && movies.map(renderMovieCard)}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
