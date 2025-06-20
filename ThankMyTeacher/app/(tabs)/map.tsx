import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ThankYouMap from '@/components/ThankYouMap';
import { fetchThankYouMapData, SchoolMapData } from '../../services/thankYouMapService';
import { styles as externalStyles } from '../styles/styles';

export default function MapScreen() {
  const [schoolData, setSchoolData] = useState<SchoolMapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadMapData = async () => {
    setLoading(true);
    try {
      const data = await fetchThankYouMapData();
      setSchoolData(data);
    } catch (error) {
      console.error('Error loading map data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMapData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMapData();
    setRefreshing(false);
  };

  const handleSchoolPress = (school: SchoolMapData) => {
    // You can add navigation to a school detail page here
    console.log('School pressed:', school);
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <ThemedText style={styles.loadingText}>Loading thank you map...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Thank You Map
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            See where appreciation messages have been sent around the world
          </ThemedText>
        </ThemedView>

        <View style={styles.mapContainer}>
          <ThankYouMap 
            schoolData={schoolData} 
            onSchoolPress={handleSchoolPress}
          />
        </View>

        {schoolData.length > 0 && (
          <ThemedView style={styles.statsContainer}>
            <ThemedText type="subtitle" style={styles.statsTitle}>
              Map Statistics
            </ThemedText>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <ThemedText style={styles.statNumber}>{schoolData.length}</ThemedText>
                <ThemedText style={styles.statLabel}>Schools</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statNumber}>
                  {schoolData.reduce((total, school) => total + school.thankYouCount, 0)}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Total Thank Yous</ThemedText>
              </View>
            </View>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
  },
  loadingText: {
    marginTop: 10,
    color: '#636E72',
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    color: '#2D3436',
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72',
    lineHeight: 22,
  },
  mapContainer: {
    height: 400,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#2D3436',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center',
  },
}); 