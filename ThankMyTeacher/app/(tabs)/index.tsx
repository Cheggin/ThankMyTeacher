import { Image } from 'expo-image';
import { Platform, ScrollView, Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '../styles/styles';

export default function HomeScreen() {
  const router = useRouter();

  const handleSendThankYou = () => {
    router.push('/(tabs)/send-thank-you');
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
              <Ionicons name="heart" size={60} color="#FF6B6B" style={styles.headerIconMain} />
              <View style={styles.sparkleContainer}>
                <Ionicons name="sparkles" size={24} color="#FFB800" style={styles.sparkle1} />
                <Ionicons name="sparkles" size={20} color="#4ECDC4" style={styles.sparkle2} />
                <Ionicons name="sparkles" size={16} color="#FF8E53" style={styles.sparkle3} />
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
        <ThemedText type="title" style={styles.heroTitle}>
          Teachers change lives. {'\n'}Let's tell them.
        </ThemedText>
        <ThemedText style={styles.heroDescription}>
          All of us remember the teachers who helped us the most. But now, we've graduated, moved schools, and left the state-or even the country. This website aims to help you thank them, no  matter how far away you are. 
        </ThemedText>
        
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
      </ThemedView>
    </ParallaxScrollView>
  );
}