# Ionic React Photo Gallery with WordPress Integration

A hybrid mobile application built with Ionic React that combines photo capture functionality with live data from WordPress custom post types.

## 🚀 Features

### Core Functionality
- **Photo Gallery (Tab 2)**: Capture and manage photos using device camera
- **Games Display (Tab 1)**: View games from WordPress custom post type
- **Movies Display (Tab 3)**: View movies from WordPress custom post type
- **Responsive Design**: Optimized for mobile and web platforms

### Technical Features
- **WordPress REST API Integration**: Fetches live data from Pantheon-hosted WordPress site
- **Advanced Custom Fields (ACF) Support**: Displays custom field data from WordPress
- **Image Handling**: Proper display of featured images with responsive sizing
- **Error Handling**: Comprehensive error states and loading indicators
- **Cross-Platform**: Runs on iOS, Android, and web browsers

## 🏗️ Project Structure

```
/Users/khaotix/Documents/@@SRJC@/@@@Fall 2025/Server Side Web Dev/CS55-Final/
├── src/
│   ├── components/
│   │   └── ExploreContainer.tsx
│   ├── hooks/
│   │   ├── useGamesData.ts      # Custom hook for fetching games
│   │   ├── useMoviesData.ts     # Custom hook for fetching movies
│   │   └── usePhotoGallery.ts   # Photo capture functionality
│   ├── pages/
│   │   ├── Tab1.tsx             # Games page component
│   │   ├── Tab1.css             # Games page styles
│   │   ├── Tab2.tsx             # Photo gallery page (original)
│   │   ├── Tab2.css             # Photo gallery styles
│   │   ├── Tab3.tsx             # Movies page component
│   │   └── Tab3.css             # Movies page styles
│   ├── theme/
│   │   └── variables.css        # Ionic theme variables
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # App entry point
├── capacitor.config.ts          # Capacitor configuration for mobile builds
├── ionic.config.json            # Ionic CLI configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 📱 How It Works

### Data Flow
1. **App Start**: User opens the app and navigates to Tab 1 (Games) or Tab 3 (Movies)
2. **API Call**: Custom hooks (`useGamesData`/`useMoviesData`) fetch data from WordPress REST API
3. **Data Processing**: JSON response is parsed and stored in component state
4. **Rendering**: Data is displayed in card format with images and custom fields

### API Endpoints
- **Games**: `https://dev-cs-55-week-11.pantheonsite.io/wp-json/wp/v2/game?_embed`
- **Movies**: `https://dev-cs-55-week-11.pantheonsite.io/wp-json/wp/v2/movie?_embed`

### Key Components

#### Tab1.tsx (Games Page)
- Fetches and displays game data from WordPress
- Shows game title, featured image, and ACF custom fields
- Handles loading, error, and empty states
- Uses CSS classes defined in `Tab1.css`

#### Tab3.tsx (Movies Page)
- Similar to Games page but for movie data
- Displays movie information with same layout pattern
- Uses CSS classes defined in `Tab3.css`

#### Custom Hooks
- **`useGamesData`**: Manages game data fetching and state
- **`useMoviesData`**: Manages movie data fetching and state
- Both include error handling, loading states, and timeout protection

## 🛠️ Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Ionic CLI (`npm install -g @ionic/cli`)

### Installation
```bash
# Clone or navigate to project directory
cd "/Users/khaotix/Documents/@@SRJC@/@@@Fall 2025/Server Side Web Dev/CS55-Final"

# Install dependencies
npm install

# Start development server
npm run dev
# or
npx ionic serve
```

### Browser Development
```bash
npm run dev  # Runs on http://localhost:5173
```

## 📱 Mobile App Build

### Android APK Build
```bash
# Build web assets
npm run build

# Sync to Capacitor
npx cap sync android

# Open in Android Studio
npx cap open android

# Build APK in Android Studio
```

### Important APK Configuration
Before building APK, ensure `capacitor.config.ts` includes:
```typescript
server: {
  androidScheme: 'https',
  allowNavigation: ['https://dev-cs-55-week-11.pantheonsite.io']
}
```
This prevents CORS issues when running on Android devices.

## 🎨 Styling Approach

### CSS Organization
- **Component-specific styles** in dedicated CSS files (`Tab1.css`, `Tab3.css`)
- **CSS classes** instead of inline styles for better maintainability
- **Responsive design** with proper mobile considerations
- **Ionic design system** integration

### Image Display Strategy
- **Fixed height containers** (600px) for consistent card layouts
- **`object-fit: contain`** to show entire images without cropping
- **Transparent backgrounds** to blend with card styling
- **Border styling** for visual definition

## 🔧 Technical Details

### WordPress Integration
- Uses WordPress REST API v2
- Supports `_embed` parameter for featured media
- Handles ACF (Advanced Custom Fields) data
- Decodes HTML entities in titles (e.g., apostrophes)

### Error Handling
- **Network timeouts** (10 seconds) to prevent hanging
- **Graceful fallbacks** for missing data
- **User-friendly error messages**
- **Loading indicators** during API calls

### Performance Considerations
- **Lazy loading** through React's rendering lifecycle
- **Minimal re-renders** with proper state management
- **CSS separation** for better bundling
- **Optimized images** handled by WordPress

## 🐛 Troubleshooting

### Common Issues

#### API Not Loading
- Check browser console for CORS errors
- Verify WordPress site is accessible
- Check network connectivity

#### Images Not Displaying
- Confirm WordPress posts have featured images set
- Check browser developer tools for 404 errors
- Verify image URLs in API response

#### APK Build Issues
- Ensure Capacitor configuration includes proper permissions
- Check Android Studio for build errors
- Verify network permissions in Android manifest

#### Styling Issues
- Clear browser cache
- Check CSS classes are properly applied
- Verify CSS files are imported correctly

## 📚 Dependencies

### Core Dependencies
- **Ionic React**: UI framework for cross-platform apps
- **React**: Frontend framework
- **Capacitor**: Native mobile bridge
- **TypeScript**: Type-safe JavaScript

### Key Plugins
- **@capacitor/camera**: Device camera access
- **@capacitor/filesystem**: File system operations
- **@capacitor/preferences**: Local data storage

## 🚀 Deployment

### Web Deployment
```bash
npm run build
# Deploy dist/ folder to web server
```

### Mobile Deployment
```bash
# Android
npx cap sync android
npx cap open android
# Build and deploy via Android Studio

# iOS
npx cap sync ios
npx cap open ios
# Build and deploy via Xcode
```

## 📖 API Documentation

### WordPress REST API Endpoints
- **GET** `/wp-json/wp/v2/game` - Retrieve games
- **GET** `/wp-json/wp/v2/movie` - Retrieve movies
- **Parameter** `?_embed` - Include featured media data

### Response Format
```json
{
  "id": 123,
  "title": {"rendered": "Game Title"},
  "featured_media": 456,
  "acf": {
    "field_name": "field_value"
  },
  "_embedded": {
    "wp:featuredmedia": [{
      "source_url": "https://example.com/image.jpg"
    }]
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with proper comments
4. Test thoroughly on multiple platforms
5. Submit a pull request

## 📄 License

This project is part of a CS55 final assignment and is for educational purposes.

---

**Built with Ionic React + WordPress REST API + Capacitor**