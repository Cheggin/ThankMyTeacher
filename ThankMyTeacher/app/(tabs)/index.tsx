import { Image } from 'expo-image';
import { Platform, ScrollView, Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '../../contexts/AuthContext';
import { styles } from '../styles/styles';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSendThankYou = () => {
    router.push('/(tabs)/send-thank-you');
  };

  const handleLogin = () => {
    router.push('/auth');
  };

  const handleDashboard = () => {
    router.push('/(tabs)/dashboard');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFF5F5', dark: '#FFF5F5' }}
      headerImage={
        <LinearGradient
          colors={['#FFE5E5', '#FFF0E6', '#E6F4F1']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ThemedView style={styles.headerContent}>
            <View style={styles.headerIconGroup}>
              <Ionicons name="heart" size={80} color="#FF6B6B" style={styles.headerIconMain} />
              <View style={styles.sparkleContainer}>
                <Ionicons name="sparkles" size={32} color="#FFB800" style={styles.sparkle1} />
                <Ionicons name="sparkles" size={28} color="#4ECDC4" style={styles.sparkle2} />
                <Ionicons name="sparkles" size={22} color="#FF8E53" style={styles.sparkle3} />
              </View>
            </View>
            <ThemedText type="title" style={styles.headerTitle}>
              ThankMyTeacher
            </ThemedText>
          </ThemedView>
        </LinearGradient>
      }>
      
      {/* Hero Section */}
      <ThemedView style={styles.heroSection}>
        <ThemedText style={styles.heroDescription}>
          Everyone remembers the teachers who changed their life. But as we grow up and move away, it gets harder to show our gratitude. This website makes it easy to send your appreciation to them, no matter how far away you are. 
        </ThemedText>
        
        {user ? (
          <View style={{ gap: 12 }}>
            <Pressable style={styles.ctaButton} onPress={handleSendThankYou}>
              <LinearGradient
                colors={['#FF8A80', '#FF6B6B']}
                style={styles.ctaGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="heart-outline" size={20} color="white" />
                <ThemedText style={styles.ctaText}>Send a Thank You Note</ThemedText>
              </LinearGradient>
            </Pressable>
            
            <Pressable 
              style={{
                backgroundColor: 'white',
                padding: 16,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              onPress={handleDashboard}
            >
              <Ionicons name="person-outline" size={20} color="#636E72" />
              <ThemedText style={{ marginLeft: 8, fontSize: 16, color: '#636E72' }}>
                View My Dashboard
              </ThemedText>
            </Pressable>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            <Pressable style={styles.ctaButton} onPress={handleSendThankYou}>
              <LinearGradient
                colors={['#FF8A80', '#FF6B6B']}
                style={styles.ctaGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="heart-outline" size={20} color="white" />
                <ThemedText style={styles.ctaText}>Write a Thank You Note</ThemedText>
              </LinearGradient>
            </Pressable>
            
            <Pressable 
              style={{
                backgroundColor: 'white',
                padding: 16,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              onPress={handleLogin}
            >
              <Ionicons name="person-outline" size={20} color="#636E72" />
              <ThemedText style={{ marginLeft: 8, fontSize: 16, color: '#636E72' }}>
                Sign Up / Log In to Save and Track Your Messages! 
              </ThemedText>
            </Pressable>
          </View>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}