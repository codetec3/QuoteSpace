import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();
const STORAGE_KEY = '@quotespace-favorites';

const useIsMounted = () => {
  const mountedRef = useRef(true);
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return mountedRef;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const mountedRef = useIsMounted();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setFavorites(parsed);
          }
        }
      } catch (error) {
        console.warn('Failed to load favorites', error);
      } finally {
        if (mountedRef.current) {
          setHydrated(true);
        }
      }
    };

    loadFavorites();
  }, [mountedRef]);

  const persistFavorites = useCallback(async (nextFavorites) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavorites));
    } catch (error) {
      console.warn('Failed to persist favorites', error);
    }
  }, []);

  const updateFavorites = useCallback(
    (updater) => {
      setFavorites((prev) => {
        const next = updater(prev);
        persistFavorites(next);
        return next;
      });
    },
    [persistFavorites],
  );

  const addFavorite = useCallback(
    (quote) => {
      if (!quote?.id) {
        return;
      }
      updateFavorites((prev) => {
        if (prev.some((item) => item.id === quote.id)) {
          return prev;
        }
        return [quote, ...prev];
      });
    },
    [updateFavorites],
  );

  const removeFavorite = useCallback(
    (id) => {
      if (!id) {
        return;
      }
      updateFavorites((prev) => prev.filter((item) => item.id !== id));
    },
    [updateFavorites],
  );

  const isFavorite = useCallback(
    (id) => favorites.some((item) => item.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (quote) => {
      if (!quote?.id) {
        return;
      }
      if (isFavorite(quote.id)) {
        removeFavorite(quote.id);
      } else {
        addFavorite(quote);
      }
    },
    [addFavorite, isFavorite, removeFavorite],
  );

  const contextValue = useMemo(
    () => ({
      favorites,
      hydrated,
      toggleFavorite,
      removeFavorite,
      isFavorite,
    }),
    [favorites, hydrated, isFavorite, removeFavorite, toggleFavorite],
  );

  if (!hydrated) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
        }}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

