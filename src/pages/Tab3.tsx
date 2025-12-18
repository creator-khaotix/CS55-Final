/**
 * Tab3 Component - Movies Page
 *
 * Displays a list of movies fetched from the WordPress REST API.
 * Each movie is displayed as a card with title, featured image, and ACF custom fields.
 *
 * Features:
 * - Fetches data from WordPress API endpoint
 * - Displays movie title, image, and custom fields
 * - Handles loading and error states
 * - Uses CSS classes for styling (defined in Tab3.css)
 */
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonLoading, IonText, IonItem, IonLabel } from '@ionic/react';
import { useMoviesData, MovieData } from '../hooks/useMoviesData';
import './Tab3.css';

const Tab3: React.FC = () => {
  // Custom hook to fetch movies data from WordPress API
  const { movies, loading, error } = useMoviesData();

  /**
   * Renders an individual movie card
   * @param movie - MovieData object containing movie information
   * @returns JSX element representing a movie card
   */
  const renderMovieCard = (movie: MovieData) => {
    // Extract featured image URL from WordPress API response
    const featuredImage = movie._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    // Get title with HTML entity decoding, fallback to generic title if missing
    const title = movie.title?.rendered || `Movie ${movie.id}`;

    // Debug logging to track which movies have images
    console.log(`Movie "${title}": featured image = ${featuredImage ? 'YES' : 'NO'}`);

    return (
      <IonCard key={movie.id} className="movie-card">
        <IonCardHeader>
          <IonCardTitle className="movie-title">
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
              className="movie-image"
            />
          )}

          {/* Render ACF custom fields if they exist */}
          {movie.acf && Object.keys(movie.acf).length > 0 && (
            <div>
              <IonText color="primary" className="movie-details">
                Movie Details:
              </IonText>
              {/* Map through ACF fields and display them */}
              {Object.entries(movie.acf).map(([key, value]) => (
                <IonItem key={key} lines="none" className="movie-detail-item">
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
          <IonTitle>Movies</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Collapsible header for mobile scrolling */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Movies</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Loading state */}
        {loading && <IonLoading isOpen={loading} message="Loading movies..." />}

        {/* Error state */}
        {error && (
          <IonText color="danger">
            <p>Error loading movies: {error}</p>
          </IonText>
        )}

        {/* Empty state */}
        {!loading && !error && movies.length === 0 && (
          <IonText>
            <p>No movies found.</p>
          </IonText>
        )}

        {/* Render movie cards */}
        {!loading && !error && movies.map(renderMovieCard)}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
