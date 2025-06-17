import { Image } from 'expo-image';
import { Platform, ScrollView, Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '../styles/styles';

export default function WhyIMadeIt() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E6F4F1', dark: '#E6F4F1' }}
      headerImage={
        <LinearGradient
          colors={['#E6F4F1', '#FFE5E5', '#FFF0E6']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ThemedView style={styles.headerContent}>
            <View style={styles.headerIconGroup}>
              <Ionicons name="person-circle-outline" size={60} color="#4ECDC4" style={styles.headerIconMain} />
            </View>
            <ThemedText type="title" style={styles.headerTitle}>
              Why I Made This
            </ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              TODO: Subtitle tagline
            </ThemedText>
          </ThemedView>
        </LinearGradient>
      }>
      
      {/* Personal Introduction Section */}
      <ThemedView style={styles.heroSection}>
        <ThemedText type="title" style={styles.heroTitle}>
          Who Am I? 
        </ThemedText>
        <ThemedText style={styles.heroDescription}>
          TODO: Brief personal introduction paragraph
        </ThemedText>
      </ThemedView>

      {/* My Story Section */}
      <ThemedView style={styles.quoteSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          My Story
        </ThemedText>
        <ThemedText style={styles.heroDescription}>
          TODO: Personal story about your experience with teachers
        </ThemedText>
      </ThemedView>


      {/* Vision Section */}
      <ThemedView style={styles.storiesSection}>
        <ThemedText type="title" style={styles.sectionTitle}>
          TODO: Vision Section Title
        </ThemedText>
        <ThemedText style={styles.heroDescription}>
          TODO: Vision for the future paragraph
        </ThemedText>
      </ThemedView>

      {/* Personal Message Section */}
      <ThemedView style={[styles.quoteSection, { marginBottom: 20 }]}>
        <ThemedView style={styles.storyCard}>
          <ThemedText style={styles.quoteText}>
            "TODO: Inspirational quote or personal message"
          </ThemedText>
          <ThemedText style={styles.quoteAuthor}>
            - TODO: Your name
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Connect Section */}
      <ThemedView style={styles.finalCtaSection}>
        <ThemedText type="title" style={styles.finalCtaTitle}>
          Contact Me!
        </ThemedText>
        <ThemedText style={styles.finalCtaDescription}>
          TODO: Invitation to connect or share feedback
        </ThemedText>
        
        <View style={{ flexDirection: 'row', gap: 20, marginTop: 20 }}>
          <Pressable style={[styles.finalCtaButton, { backgroundColor: '#4ECDC4' }]}>
            <ThemedText style={styles.finalCtaButtonText}>Website Suggestions</ThemedText>
          </Pressable>
          
          <Pressable style={[styles.finalCtaButton, { backgroundColor: '#FF6B6B' }]}>
            <ThemedText style={styles.finalCtaButtonText}>TODO: CTA 2</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}