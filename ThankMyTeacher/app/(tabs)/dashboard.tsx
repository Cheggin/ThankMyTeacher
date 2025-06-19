import React, { useEffect, useState } from 'react';
import { View, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '../../contexts/AuthContext';
import { fetchUserData, getUserStats, UserData } from '../../services/userDataService';
import { styles } from '../styles/styles';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [stats, setStats] = useState({
    thankYouCount: 0,
    lastActivity: null as string | null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadUserData();
    }
  }, [user?.id]);

  const loadUserData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // Fetch user data from profiles table
      const data = await fetchUserData(user.id);
      setUserData(data);
      
      // Get user statistics
      const userStats = await getUserStats(user.id);
      setStats({
        thankYouCount: userStats.thankYouCount,
        lastActivity: userStats.lastActivity || null,
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendThankYou = () => {
    router.push('/(tabs)/send-thank-you');
  };

  const handleViewHistory = () => {
    router.push('/(tabs)/thank-yous');
  };

  const handleViewProfile = () => {
    router.push('/(tabs)/profile');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF5F5' }}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <ThemedText style={{ marginTop: 16, color: '#636E72' }}>Loading your dashboard...</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFF5F5' }}>
      {/* Dashboard Content */}
      <ThemedView style={{ padding: 20, paddingTop: 40 }}>
        {/* Quick Actions */}
        <View style={{ marginBottom: 30 }}>
          <ThemedText type="title" style={{ fontSize: 24, marginBottom: 16 }}>
            Quick Actions
          </ThemedText>
          
          <Pressable style={styles.ctaButton} onPress={handleSendThankYou}>
            <LinearGradient
              colors={['#FF8A80', '#FF6B6B']}
              style={styles.ctaGradient}
            >
              <Ionicons name="heart-outline" size={20} color="white" />
              <ThemedText style={styles.ctaText}>Send a Thank You</ThemedText>
            </LinearGradient>
          </Pressable>

          <Pressable 
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={handleViewHistory}
          >
            <Ionicons name="time-outline" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>
              View My Past Messages
            </ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#636E72" />
          </Pressable>
        </View>

        {/* Stats Section */}
        <View style={{ marginBottom: 30 }}>
          <ThemedText type="title" style={{ fontSize: 24, marginBottom: 16 }}>
            My Stats
          </ThemedText>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 12,
              flex: 1,
              marginRight: 8,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <Ionicons name="heart" size={32} color="#FF6B6B" />
              <ThemedText type="title" style={{ fontSize: 24, marginTop: 8 }}>
                {stats.thankYouCount}
              </ThemedText>
              <ThemedText style={{ fontSize: 14, color: '#636E72', textAlign: 'center' }}>
                Thank Yous Sent
              </ThemedText>
            </View>
          </View>
          
          <View style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 12,
            marginTop: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="calendar-outline" size={24} color="#636E72" />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <ThemedText style={{ fontSize: 14, color: '#636E72' }}>
                  Last Activity
                </ThemedText>
                <ThemedText style={{ fontSize: 16, fontWeight: '500' }}>
                  {formatDate(stats.lastActivity)}
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Navigation */}
        <View style={{ marginBottom: 30 }}>
          <ThemedText type="title" style={{ fontSize: 24, marginBottom: 16 }}>
            Navigation
          </ThemedText>
          
          <Pressable 
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={handleViewProfile}
          >
            <Ionicons name="person-circle-outline" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>
              View Profile
            </ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#636E72" />
          </Pressable>

          <Pressable 
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => router.push('/(tabs)')}
          >
            <Ionicons name="home-outline" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>
              Go to Home
            </ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#636E72" />
          </Pressable>
        </View>
      </ThemedView>
    </ScrollView>
  );
} 