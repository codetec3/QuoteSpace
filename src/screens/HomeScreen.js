import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const QUOTE_ENDPOINT = 'https://api.api-ninjas.com/v1/quotes?category=success';
const gradients = [
  ['#03001e', '#7303c0', '#ec38bc', '#fdeff9'],
  ['#141e30', '#243b55'],
  ['#0f2027', '#203a43', '#2c5364'],
  ['#654ea3', '#eaafc8'],
  ['#1f4037', '#99f2c8'],
  ['#0f0c29', '#302b63', '#24243e'],
];

// Fallback quotes if API fails
const FALLBACK_QUOTES = [
  { quote: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'happiness' },
  { quote: 'Happiness is not something ready made. It comes from your own actions.', author: 'Dalai Lama', category: 'happiness' },
  { quote: 'The purpose of our lives is to be happy.', author: 'Dalai Lama', category: 'happiness' },
  { quote: 'Life is what happens to you while you\'re busy making other plans.', author: 'John Lennon', category: 'happiness' },
  { quote: 'Get busy living or get busy dying.', author: 'Stephen King', category: 'happiness' },
  { quote: 'You only live once, but if you do it right, once is enough.', author: 'Mae West', category: 'happiness' },
  { quote: 'Many of life\'s failures are people who did not realize how close they were to success when they gave up.', author: 'Thomas A. Edison', category: 'happiness' },
  { quote: 'If you want to live a happy life, tie it to a goal, not to people or things.', author: 'Albert Einstein', category: 'happiness' },
  { quote: 'Never let the fear of striking out keep you from playing the game.', author: 'Babe Ruth', category: 'happiness' },
  { quote: 'Life is either a daring adventure or nothing at all.', author: 'Helen Keller', category: 'happiness' },
];

const createQuoteId = (quote, author) => `${quote}-${author}`.replace(/\s+/g, '-').toLowerCase();

const getRandomFallbackQuote = () => {
  const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
  return {
    id: createQuoteId(randomQuote.quote, randomQuote.author),
    text: randomQuote.quote,
    author: randomQuote.author,
    category: randomQuote.category,
  };
};

const HomeScreen = () => {
  // Initialize with a fallback quote so the app doesn't show blank screen
  const [quote, setQuote] = useState(() => getRandomFallbackQuote());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentGradient, setCurrentGradient] = useState(0);
  const [previousGradient, setPreviousGradient] = useState(null);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Start at 1 since we have initial quote
  const gradientFade = useRef(new Animated.Value(1)).current;
  const { toggleFavorite, isFavorite } = useFavorites();
  const apiKey = process.env.EXPO_PUBLIC_API_NINJAS_KEY;

  const isCurrentFavorite = quote?.id ? isFavorite(quote.id) : false;

  const animateQuote = useCallback(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const animateGradient = useCallback(() => {
    gradientFade.setValue(0);
    Animated.timing(gradientFade, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setPreviousGradient(null);
    });
  }, [gradientFade]);

  const handleBackgroundCycle = useCallback(() => {
    setPreviousGradient(currentGradient);
    const nextIndex = Math.floor(Math.random() * gradients.length);
    setCurrentGradient(nextIndex === currentGradient ? (nextIndex + 1) % gradients.length : nextIndex);
    animateGradient();
  }, [animateGradient, currentGradient]);

  const normalizeQuote = (payload) => {
    if (!payload) {
      return null;
    }
    const text = payload.quote?.trim();
    const author = payload.author?.trim() || 'Unknown';
    if (!text) {
      return null;
    }
    return {
      id: createQuoteId(text, author),
      text,
      author,
      category: payload.category,
    };
  };

  const fetchQuote = useCallback(async () => {
    // If no API key or invalid format, use fallback quotes
    if (!apiKey || apiKey.startsWith('http://') || apiKey.startsWith('https://')) {
      setLoading(true);
      const fallbackQuote = getRandomFallbackQuote();
      setQuote(fallbackQuote);
      animateQuote();
      handleBackgroundCycle();
      setError(''); // No error, just using fallback
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(QUOTE_ENDPOINT, {
        headers: {
          'X-Api-Key': apiKey,
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Unable to load a fresh quote.';
        let useFallback = false;
        
        if (response.status === 400) {
          errorMessage = 'Invalid API key. Using fallback quotes. Get a free key from api-ninjas.com/api';
          useFallback = true;
        } else if (response.status === 401 || response.status === 403) {
          errorMessage = 'Invalid API key. Using fallback quotes. Get a free key from api-ninjas.com/api';
          useFallback = true;
        } else if (response.status === 429) {
          errorMessage = 'Rate limit exceeded. Using fallback quotes.';
          useFallback = true;
        } else {
          errorMessage = `API error (${response.status}). Using fallback quotes.`;
          useFallback = true;
        }
        
        if (useFallback) {
          const fallbackQuote = getRandomFallbackQuote();
          setQuote(fallbackQuote);
          animateQuote();
          handleBackgroundCycle();
          setError(errorMessage); // Show error message to user
          setLoading(false);
          return;
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      const normalized = normalizeQuote(data?.[0]);
      if (!normalized) {
        throw new Error('Quote data was empty. Try refreshing.');
      }
      setQuote(normalized);
      animateQuote();
      handleBackgroundCycle();
    } catch (err) {
      // On any error (network, parsing, timeout, etc.), use fallback quotes
      console.log('API Error, using fallback:', err.message);
      let errorMsg = err.message || 'Failed to fetch quote from API.';
      if (err.name === 'AbortError') {
        errorMsg = 'Request timeout. Using fallback quote.';
        console.log('Request timeout, using fallback quote');
      }
      const fallbackQuote = getRandomFallbackQuote();
      setQuote(fallbackQuote);
      animateQuote();
      handleBackgroundCycle();
      setError(errorMsg); // Show error message to user
    } finally {
      setLoading(false);
    }
  }, [animateQuote, apiKey, handleBackgroundCycle]);

  useEffect(() => {
    // Only fetch on mount, not when fetchQuote changes
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  const handleShare = useCallback(async () => {
    if (!quote) {
      return;
    }
    try {
      await Share.share({
        message: `"${quote.text}" — ${quote.author}`,
      });
    } catch (err) {
      console.warn('Share failed', err);
    }
  }, [quote]);

  const actionButtons = useMemo(
    () => [
      {
        icon: 'refresh',
        onPress: fetchQuote,
        disabled: loading,
      },
      {
        icon: isCurrentFavorite ? 'heart' : 'heart-outline',
        onPress: () => (quote ? toggleFavorite(quote) : undefined),
        disabled: !quote,
      },
      {
        icon: 'share-outline',
        onPress: handleShare,
        disabled: !quote,
      },
    ],
    [fetchQuote, handleShare, isCurrentFavorite, loading, quote, toggleFavorite],
  );

  const renderQuoteCard = () => {
    if (loading) {
      return (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loaderLabel}>Finding inspiration...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorWrapper}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchQuote}>
            <Text style={styles.retryLabel}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!quote) {
      return null;
    }

    return (
      <Animated.View
        style={[
          styles.quoteCard,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.quoteIcon}>“</Text>
        <Text style={styles.quoteText}>{quote.text}</Text>
        <Text style={styles.authorText}>— {quote.author}</Text>
        {quote.category ? <Text style={styles.categoryTag}>{quote.category}</Text> : null}
      </Animated.View>
    );
  };

  const currentOpacity = gradientFade;
  const previousOpacity = gradientFade.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      {previousGradient !== null ? (
        <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: previousOpacity }]}>
          <LinearGradient
            colors={gradients[previousGradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      ) : null}
      <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: currentOpacity }]}>
        <LinearGradient
          colors={gradients[currentGradient]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.heading}>Daily Motivation</Text>
          <Text style={styles.subHeading}>One quote at a time</Text>
          {error && quote && (
            <View style={styles.errorBanner}>
              <Ionicons name="warning-outline" size={16} color="#ffeb3b" />
              <Text style={styles.errorBannerText}>{error}</Text>
            </View>
          )}
          {renderQuoteCard()}
          <View style={styles.actionsRow}>
            {actionButtons.map((action) => (
              <TouchableOpacity
                key={action.icon}
                style={styles.iconButton}
                onPress={action.onPress}
                disabled={action.disabled}
              >
                <Ionicons
                  name={action.icon}
                  size={22}
                  color={action.disabled ? 'rgba(255,255,255,0.4)' : '#ffffff'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  subHeading: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  quoteCard: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  quoteIcon: {
    fontSize: 48,
    color: 'rgba(255,255,255,0.6)',
  },
  quoteText: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 8,
    lineHeight: 30,
  },
  authorText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 16,
    fontStyle: 'italic',
  },
  categoryTag: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    textTransform: 'capitalize',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  loaderWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loaderLabel: {
    marginTop: 12,
    color: '#ffffff',
    opacity: 0.8,
  },
  errorWrapper: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 20,
    padding: 24,
  },
  errorText: {
    color: '#ffe066',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  retryButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#ffffff',
  },
  retryLabel: {
    color: '#000',
    fontWeight: '600',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 193, 7, 0.4)',
  },
  errorBannerText: {
    color: '#ffeb3b',
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
});

export default HomeScreen;

