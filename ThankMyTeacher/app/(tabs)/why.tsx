import { Image } from 'expo-image';
import { Platform, ScrollView, Pressable, View, StyleSheet, Linking, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';

import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { styles } from '../styles/styles';
import { AppColors } from '../../constants/Colors';

// Web-compatible alert function
const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    const { Alert } = require('react-native');
    Alert.alert(title, message);
  }
};

export default function WhyIMadeIt() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation values for staggered loading
  const headerAnim = useRef(new Animated.Value(0)).current;
  const introAnim = useRef(new Animated.Value(0)).current;
  const profileImageAnim = useRef(new Animated.Value(0)).current;
  const storyAnim = useRef(new Animated.Value(0)).current;
  const visionAnim = useRef(new Animated.Value(0)).current;
  const contactAnim = useRef(new Animated.Value(0)).current;
  const suggestionsButtonAnim = useRef(new Animated.Value(1)).current;
  const emailButtonAnim = useRef(new Animated.Value(1)).current;

  // Start animations when component mounts
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      animateSections();
    }, 300);
  }, []);

  const animateSections = () => {
    // Staggered section animations
    Animated.stagger(200, [
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(introAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(profileImageAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(storyAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(visionAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(contactAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleButtonHover = (buttonId: string, isHovering: boolean) => {
    setHovered(isHovering ? buttonId : null);
    
    // Enhanced hover animation for specific button
    let targetAnim: Animated.Value;
    switch (buttonId) {
      case 'suggestions':
        targetAnim = suggestionsButtonAnim;
        break;
      case 'email':
        targetAnim = emailButtonAnim;
        break;
      default:
        return;
    }
    
    Animated.timing(targetAnim, {
      toValue: isHovering ? 1.02 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const localStyles = StyleSheet.create({
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: Platform.OS === 'web' ? 400 : 180,
      height: Platform.OS === 'web' ? 400 : 180,
      borderRadius: Platform.OS === 'web' ? 400 : 90,
      borderWidth: 3,
      borderColor: '#00D4AA',
    },
    contentWrapper: {
      width: '100%',
      paddingHorizontal: 20,
    },
    headerSubtitleWrapper: {
      maxWidth: 700,
      alignSelf: 'center',
      paddingHorizontal: 20,
    },
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: AppColors.background }}>
      <View style={{ width: '100%' }}>
        {/* Top Block Section - Why I Made This */}
        <Animated.View 
          style={[
            styles.card,
            {
              opacity: headerAnim,
              transform: [
                { translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                })},
              ],
              marginHorizontal: 20,
              marginBottom: 20,
            }
          ]}
        >
          <View style={localStyles.contentWrapper}>
            <Animated.Text 
              style={[
                styles.headerTitle,
                {
                  opacity: headerAnim,
                  fontFamily: 'OpenSans',
                  fontWeight: '600',
                  letterSpacing: 0.5,
                  fontSize: 48,
                  marginBottom: 8,
                  textAlign: 'center',
                }
              ]}
            >
              Why I Made This
            </Animated.Text>
            <Animated.View 
              style={{
                opacity: headerAnim,
                maxWidth: 700,
                alignSelf: 'center',
                paddingHorizontal: 20,
              }}
            >
              <ThemedText style={{
                color: AppColors.textSecondary,
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'Inter',
                fontWeight: '400',
                lineHeight: 28,
                marginBottom: 0,
                fontStyle: 'normal',
              }}>
                  Everyone I know recalls their favorite teachers. But no matter how grateful all of us are for them, many of us don't have a great way to give thanks. I thought that a website that (1) aimed to streamline the process, (2) allowed people to do this in a fun way, and (3) allowed people to do this anonymously, would be something that my computer science expertise would be great for. 
              </ThemedText>
            </Animated.View>
            </View>
        </Animated.View>

        {/* Top Row - Meet the Creator and My Story side by side */}
        <View style={{ 
          flexDirection: Platform.OS === 'web' ? 'row' : 'column', 
          justifyContent: 'center', 
          gap: 20, 
          marginHorizontal: 20, 
          marginBottom: 20 
        }}>
          {/* Meet the Creator Section (Large) */}
          <Animated.View 
            style={[
              styles.card,
              {
                opacity: introAnim,
                transform: [
                  { translateY: introAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  })},
                ],
                flex: 1,
                minHeight: 400,
              }
            ]}
          >
        <View style={localStyles.contentWrapper}>
          <ThemedText type="title" style={styles.heroTitle}>
            Meet the Creator
          </ThemedText>
              <Animated.View 
                style={[
                  localStyles.profileImageContainer,
                  {
                    transform: [{ scale: profileImageAnim }],
                  }
                ]}
              >
            <Image 
              source={require('../../assets/images/pfp.png')}
                  style={[localStyles.profileImage, { borderColor: '#333333' }]}
              contentFit="cover"
            />
              </Animated.View>
          <ThemedText style={styles.heroDescription}>
            Hi! I'm Reagan. As of June 2025, I am a Computer Science student at the University of California, San Diego. 
          </ThemedText>
        </View>
          </Animated.View>

          {/* My Story Section (Medium) */}
          <Animated.View 
            style={[
              styles.card,
              {
                opacity: storyAnim,
                transform: [
                  { translateY: storyAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  })},
                ],
                flex: 1,
                minHeight: 400,
              }
            ]}
          >
        <View style={localStyles.contentWrapper}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            My Story
          </ThemedText>
          <ThemedText style={styles.heroDescription}>
          Throughout my life, teachers have been a major source of inspiration. Not only did they foster my love for learning, but many of them helped me through periods where my mental health was at a low. From afterschool yap sessions to teary goodbyes, I would not be the person I am today without them.
          </ThemedText>
        </View>
          </Animated.View>
        </View>

        {/* Second Row - Vision Section (Full Width) */}
        <Animated.View 
          style={[
            styles.card,
            {
              opacity: visionAnim,
              transform: [
                { translateY: visionAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                })},
              ],
              marginHorizontal: 20,
              marginBottom: 20,
            }
          ]}
        >
        <View style={localStyles.contentWrapper}>
          <ThemedText type="title" style={styles.sectionTitle}>
              Website Vision
          </ThemedText>
          <ThemedText style={styles.heroDescription}>
              At some point, I would like to have access to a database of teacher emails that allows students to send emails to teachers while hiding the teacher's email for privacy reasons. I currently cannot do that for many reasons (including the fact that somehow, these datasets are ~ $1000). In relation to that, expanding this website past just the United States would be cool. <br></br><br></br>
              I would also like for this website to be shared with others so that as many kind messages can be sent to teachers as possible, and so that this website can be a showcase for that gratitude. Appreciation and gratitude are infectious, and if this site could be a conduit for them, that would be incredible. 
          </ThemedText>
        </View>
        </Animated.View>

        {/* Bottom Row - Contact Section (Full Width) */}
        <Animated.View 
          style={[
            styles.card,
            {
              opacity: contactAnim,
              transform: [
                { translateY: contactAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                })},
              ],
              marginHorizontal: 20,
            }
          ]}
        >
        <View style={localStyles.contentWrapper}>
          <ThemedText type="title" style={styles.finalCtaTitle}>
            Contact Me!
          </ThemedText>
          
            <View style={[styles.row, { gap: 20, marginTop: 20, justifyContent: 'center' }]}>
              <Animated.View style={{ transform: [{ scale: suggestionsButtonAnim }] }}>
            <Pressable 
                  style={[
                    styles.buttonSecondary,
                    { backgroundColor: '#FF6B6B' },
                    hovered === 'suggestions' && styles.buttonHover,
                    {
                      shadowOpacity: hovered === 'suggestions' ? 0.3 : 0.1,
                      shadowRadius: hovered === 'suggestions' ? 8 : 4,
                    }
                  ]}
              onPress={() => {
                const url = 'https://docs.google.com/forms/d/e/1FAIpQLSe7omeIGOl6ERL_jdKPuqHwfUEwahWKx2zp4Sd3nScWiiOgmA/viewform?usp=sharing&ouid=106869933586522440256';
                if (Platform.OS === 'web') {
                  window.open(url, '_blank');
                } else {
                  Linking.openURL(url);
                }
              }}
                  onHoverIn={() => handleButtonHover('suggestions', true)}
                  onHoverOut={() => handleButtonHover('suggestions', false)}
            >
                  <ThemedText style={[styles.buttonText, { color: AppColors.textPrimary }]}>Website Suggestions</ThemedText>
            </Pressable>
              </Animated.View>
            
              <Animated.View style={{ transform: [{ scale: emailButtonAnim }] }}>
            <Pressable 
                  style={[
                    styles.buttonSecondary, 
                    { backgroundColor: '#FF6B6B' },
                    hovered === 'email' && styles.buttonHover,
                    {
                      shadowOpacity: hovered === 'email' ? 0.3 : 0.1,
                      shadowRadius: hovered === 'email' ? 8 : 4,
                    }
                  ]}
              onPress={() => {
                const email = 'reaganhsu@thankmyteacher.net';
                const subject = 'ThankMyTeacher.net - Feedback';
                const body = 'Hi Reagan,\n\n';
                
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                if (Platform.OS === 'web') {
                  window.open(gmailUrl, '_blank');
                } else {
                  Linking.openURL(gmailUrl);
                }
              }}
                  onHoverIn={() => handleButtonHover('email', true)}
                  onHoverOut={() => handleButtonHover('email', false)}
            >
                  <ThemedText style={[styles.buttonText, { color: AppColors.textPrimary }]}>Email</ThemedText>
            </Pressable>
              </Animated.View>
            </View>
          </View>
        </Animated.View>
        
        {/* Animated Divider */}
        <Animated.View 
          style={[
            styles.divider, 
            { 
              opacity: contactAnim,
              transform: [{ scaleX: contactAnim }],
            }
          ]} 
        />
        
        {/* Animated Footer */}
        <Animated.View 
          style={[
            styles.footer, 
            { 
              opacity: contactAnim,
              transform: [{ translateY: contactAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              })}],
            }
          ]}
        >
          <ThemedText style={{ color: AppColors.textSecondary, fontSize: 16 }}>
            © {new Date().getFullYear()} Reagan Hsu &nbsp;
            <ThemedText style={{ color: '#FF6B6B' }}>♥</ThemedText>
          </ThemedText>
        </Animated.View>
      </View>
    </ScrollView>
  );
}