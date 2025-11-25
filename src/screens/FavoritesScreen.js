import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useFavorites();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.quoteText}>{item.text}</Text>
      <Text style={styles.authorText}>— {item.author}</Text>
      <View style={styles.cardFooter}>
        {item.category ? <Text style={styles.category}>{item.category}</Text> : <View />}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFavorite(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#ff6b6b" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Favorites</Text>
      <Text style={styles.subHeading}>
        {favorites.length === 0
          ? 'Save quotes you resonate with.'
          : `You have ${favorites.length} saved ${favorites.length === 1 ? 'quote' : 'quotes'}.`}
      </Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="book-outline" size={48} color="rgba(255,255,255,0.4)" />
          <Text style={styles.emptyTitle}>Your inspiration shelf is empty.</Text>
          <Text style={styles.emptySubtitle}>Tap the heart on the Home tab to save favorites.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: '#050505',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  subHeading: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 6,
    marginBottom: 24,
  },
  listContent: {
    paddingBottom: 120,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  quoteText: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 26,
  },
  authorText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    marginTop: 12,
  },
  cardFooter: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    color: '#a5f3fc',
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  emptySubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default FavoritesScreen;

