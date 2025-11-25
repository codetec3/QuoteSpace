# QuoteSpace 📚

A beautiful React Native mobile application that provides users with daily motivational quotes. The app features a modern UI, smooth animations, favorites functionality, and seamless API integration.

![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue)
![Expo](https://img.shields.io/badge/Expo-54.0.25-black)
![License](https://img.shields.io/badge/License-0BSD-green)

## 📸 Screenshots
![Project Screenshot]image1.png


### Home Screen
The home screen features a stunning gradient background (purple to pink) with a beautifully designed quote card displaying:
- Large quote text with elegant typography
- Author attribution
- Category tags (e.g., "Happiness")
- Three action buttons: Refresh (↻), Favorite (❤️), and Share (⤢)

### Favorites Screen
The favorites screen shows all your saved quotes in a clean list format:
- Quote count display ("You have X saved quotes")
- Individual quote cards with author and category
- Delete button (trash icon) on each card for easy removal
- Dark theme with excellent readability

## ✨ Features

### 🏠 Home Screen
- **Daily Quotes**: Fetches inspirational quotes from API Ninjas
- **Animated Background**: Beautiful gradient backgrounds (purple to pink) with smooth transitions
- **Quote Card Design**: Elegant card layout with quote icon, text, author, and category tags
- **Refresh Button**: Get a new quote anytime with a tap (↻)
- **Loading Indicator**: Elegant "Finding inspiration..." loader while fetching quotes
- **Share Functionality**: Share your favorite quotes with others (⤢)
- **Favorite Toggle**: Heart icon to save quotes (❤️/♡)
- **Fallback Quotes**: Works offline with built-in quotes if API fails

### ⭐ Favorites
- **Save Quotes**: Mark any quote as favorite with a heart icon
- **Quote Counter**: Shows how many quotes you've saved
- **Persistent Storage**: Favorites saved using AsyncStorage
- **Survives App Restart**: Your favorites are never lost
- **Easy Management**: Tap the trash icon to remove favorites
- **Clean List View**: Beautiful card-based layout for all saved quotes

### 🎨 Design
- **Modern UI**: Clean, minimalist design with dark theme
- **Smooth Animations**: Fade-in effects and gradient transitions
- **Gradient Backgrounds**: Dynamic purple-to-pink gradients that change with each quote
- **Typography**: Elegant font styling for quotes and authors
- **Category Tags**: Color-coded tags for quote categories
- **Bottom Navigation**: Intuitive tab navigation (Home & Favorites)
- **Responsive**: Works on all screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (comes with the project)
- iOS Simulator (for Mac) or Android Emulator, or Expo Go app on your phone

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd QuoteSpace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up API Key (Optional but Recommended)**
   
   Create a `.env` file in the root directory:
   ```bash
   EXPO_PUBLIC_API_NINJAS_KEY=your_api_key_here
   ```
   
   Get your free API key from [api-ninjas.com](https://api-ninjas.com/api)
   
   > **Note**: The app works without an API key using fallback quotes, but you'll get fresh quotes from the API with a valid key.

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device/emulator**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app (iOS/Android)

## 📱 Usage

### Home Screen
- **View Quotes**: Daily inspirational quotes are displayed automatically in a beautiful card
- **Refresh**: Tap the circular refresh button (↻) at the bottom to get a new quote
- **Favorite**: Tap the heart icon (❤️) to save a quote to favorites (outline when not favorited, filled when favorited)
- **Share**: Tap the share icon (⤢) to share quotes with others via your device's share menu
- **Category Tags**: Each quote displays its category (e.g., "Happiness", "Success", "Wisdom")

### Favorites Screen
- **View Favorites**: Navigate to the Favorites tab (bottom navigation) to see all saved quotes
- **Quote Count**: See how many quotes you've saved at the top
- **Remove**: Tap the red trash icon (🗑️) on any quote card to remove it from favorites
- **Empty State**: If you have no favorites, the screen will show an empty state message

## 🏗️ Project Structure

```
QuoteSpace/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js      # Main quote display screen
│   │   └── FavoritesScreen.js  # Saved quotes screen
│   └── context/
│       └── FavoritesContext.js # Favorites state management
├── assets/                     # App icons and images
├── App.js                      # Main app component with navigation
├── index.js                    # Entry point
├── package.json                # Dependencies
└── .env                        # Environment variables (create this)
```

## 🛠️ Technologies Used

- **React Native 0.81.5** - Mobile app framework
- **Expo SDK 54** - Development platform and tooling
- **React Navigation 7** - Bottom tab navigation
- **AsyncStorage** - Local data persistence for favorites
- **Expo Linear Gradient** - Beautiful animated gradient backgrounds
- **React Native Animated** - Smooth fade-in and transition animations
- **Expo Vector Icons** - Icon library (Ionicons)
- **React Native Safe Area Context** - Safe area handling
- **API Ninjas** - Quote API service for fetching quotes

## 📦 Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## 🔧 Configuration

### API Setup

For detailed API setup instructions, see [API_SETUP.md](./API_SETUP.md)

**Quick Setup:**
1. Sign up at [api-ninjas.com/register](https://api-ninjas.com/register)
2. Get your API key from [api-ninjas.com/api](https://api-ninjas.com/api)
3. Add to `.env` file:
   ```
   EXPO_PUBLIC_API_NINJAS_KEY=your_key_here
   ```
4. Restart Expo server

### Environment Variables

The app uses the following environment variable:
- `EXPO_PUBLIC_API_NINJAS_KEY` - Your API Ninjas API key (optional)

## 🎯 Features Breakdown
![Project Screenshot]image2.jpg

### ✅ Implemented Features

- [x] Daily quote display from API
- [x] Refresh quote functionality
- [x] Animated gradient backgrounds
- [x] Loading indicators
- [x] Favorites with local storage
- [x] Favorites screen with remove option
- [x] Share quote functionality
- [x] Smooth animations
- [x] Error handling with fallback quotes
- [x] Modern, clean UI

### 🚀 Bonus Features

- [x] Share Quote (React Native Share API)
- [x] Gradient Animated Background
- [x] Fallback quotes for offline use
- [x] Error handling and user feedback

## 🐛 Troubleshooting

### "Unable to load a fresh quote"
- Check your API key in `.env` file
- Ensure the API key is correct (not the URL)
- Verify internet connection
- The app will use fallback quotes if API fails

### "Maximum update depth exceeded"
- This has been fixed in the latest version
- Restart the Expo server if you see this error

### API Key Issues
- Make sure your `.env` file is in the root directory
- Restart Expo after adding/changing the API key
- The API key should be just the key string, not a URL

## 📄 License

This project is licensed under the 0BSD License.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📝 Notes

- The app works without an API key using built-in fallback quotes
- Favorites are stored locally and persist across app restarts
- All quotes are fetched from the API Ninjas service (when API key is provided)
- The app includes 10 fallback quotes for offline functionality
- Gradient backgrounds automatically change when fetching new quotes
- Error messages are displayed in a yellow banner if API calls fail
- The app gracefully handles network timeouts (10-second timeout)

## 🙏 Acknowledgments

- [API Ninjas](https://api-ninjas.com) for providing the quotes API
- Expo team for the amazing development platform
- React Native community for excellent libraries and resources

---

Made with ❤️ using React Native and Expo

