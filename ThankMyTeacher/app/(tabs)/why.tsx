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
                To this day, everyone I know recalls their favorite teachers. But no matter how grateful all of us are for our teachers, many of us don't have a great way to give thanks. I thought that a website that (1) aimed to streamline the process, (2) allowed people to do this in a fun way, and (3) allowed people to do this anonymously, would be something that my computer science expertise would be great for. 
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
          As of June 2025, I am a Computer Science student at the University of California, San Diego. 
        </ThemedText>
      </ThemedView>

      {/* My Story Section */}
      <ThemedView style={styles.quoteSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          My Story
        </ThemedText>
        <ThemedText style={styles.heroDescription}>
        Throughout my life, teachers have been a major source of inspiration. Not only did they foster my love for learning, but many of them helped me through periods where my mental health was at a low. From afterschool yap sessions to teary goodbyes, I would not be the person I am today without them.
        </ThemedText>
      </ThemedView>


      {/* Vision Section */}
      <ThemedView style={styles.storiesSection}>
        <ThemedText type="title" style={styles.sectionTitle}>
            Website Vision
        </ThemedText>
        <ThemedText style={styles.heroDescription}>
            At some point, I would like to have access to a database of teacher emails that allows students to send emails to teachers while hiding the teacher's email for privacy reasons. I currently cannot do that for many reasons (including the fact that somehow, these datasets are ~ $1000). In relation to that, expanding this website past just the United States would be kind of cool. <br></br><br></br>
            I would like for this website to be shared with others so that kind messages can be sent to teachers and this website can be a showcase of teacherly appreciation. Appreciation and gratefulness is infectious, and if this site could be a conduit for that, that would be incredible. 
        </ThemedText>
      </ThemedView>

      {/* Connect Section */}
      <ThemedView style={styles.finalCtaSection}>
        <ThemedText type="title" style={styles.finalCtaTitle}>
          Contact Me!
        </ThemedText>
        
        <View style={{ flexDirection: 'row', gap: 20, marginTop: 20 }}>
          <Pressable style={[styles.finalCtaButton, { backgroundColor: '#4ECDC4' }]}>
            <ThemedText style={styles.finalCtaButtonText}>Website Suggestions</ThemedText>
          </Pressable>
          
          <Pressable style={[styles.finalCtaButton, { backgroundColor: '#FF6B6B' }]}>
            <ThemedText style={styles.finalCtaButtonText}>Email</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}