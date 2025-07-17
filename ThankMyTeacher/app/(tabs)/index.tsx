import React, { useState, useEffect, useRef } from 'react';
import { Image } from 'expo-image';
import { Platform, ScrollView, Pressable, View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '../../contexts/AuthContext';
import { styles } from '../styles/styles';
import { AppColors } from '../../constants/Colors';
import { useDeviceType } from '../../hooks/useDeviceType';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { isMobile } = useDeviceType();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const headerScaleAnim = useRef(new Animated.Value(1)).current;
  
  // Title animation values
  const titleOpacityAnim = useRef(new Animated.Value(0)).current;
  const titleScaleAnim = useRef(new Animated.Value(0.8)).current;
  const titleColorAnim = useRef(new Animated.Value(0)).current;
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const titleText = 'ThankMyTeacher';
  
  // Interpolated title color
  const titleColor = titleColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [AppColors.primary, AppColors.textPrimary],
  });
  
  // Cursor blink animation
  const cursorOpacityAnim = useRef(new Animated.Value(1)).current;

  // Hover state for each button
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Title entrance animation with easing
      Animated.parallel([
        Animated.timing(titleOpacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(titleScaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();

      // Start typewriter effect after title appears (only on web)
      if (Platform.OS === 'web') {
        setTimeout(() => {
          // Start cursor blink animation immediately with smoother timing
          const blinkAnimation = () => {
            Animated.sequence([
              Animated.timing(cursorOpacityAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(cursorOpacityAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }),
            ]).start(blinkAnimation);
          };
          blinkAnimation();
          
          const typewriterInterval = setInterval(() => {
            setCurrentLetterIndex((prevIndex) => {
              if (prevIndex < titleText.length) {
                setDisplayedTitle(titleText.slice(0, prevIndex + 1));
                return prevIndex + 1;
              } else {
                clearInterval(typewriterInterval);
                // Start color animation after typewriter completes (no bounce)
                Animated.timing(titleColorAnim, {
                  toValue: 1,
                  duration: 1200,
                  useNativeDriver: false,
                }).start(() => {
                  // Hide cursor after 3 seconds when animation completes
                  setTimeout(() => {
                    setShowCursor(false);
                  }, 3000);
                });
                return prevIndex;
              }
            });
          }, 100); // Faster, smoother typewriter effect
        }, 800);
      } else {
        // On mobile, just show the full title immediately
        setDisplayedTitle(titleText);
        setShowCursor(false);
      }

      // Staggered entrance animations for other elements
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();

      // Header subtle entrance animation
      Animated.timing(headerScaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleSendThankYou = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/(tabs)/send-thank-you');
    });
  };

  const handleLogin = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/auth');
    });
  };

  const handleDashboard = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/(tabs)/dashboard');
    });
  };

  const handleButtonHover = (buttonId: string, isHovering: boolean) => {
    setHoveredBtn(isHovering ? buttonId : null);
    
    // Enhanced hover animation
    Animated.timing(buttonScaleAnim, {
      toValue: isHovering ? 1.02 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: AppColors.background, dark: AppColors.background }}
      headerImage={
        isMobile ? (
          <View style={[styles.headerGradient, { backgroundColor: AppColors.background }] }>
            <ThemedView style={styles.headerContent}>
              <Ionicons name="heart" size={48} color="#FF6B6B" style={styles.headerIconMain} />
              <ThemedText style={styles.headerTitle}>ThankMyTeacher</ThemedText>
            </ThemedView>
          </View>
        ) : (
          <Animated.View 
            style={[
              styles.headerGradient, 
              { 
                backgroundColor: AppColors.background,
                transform: [{ scale: headerScaleAnim }],
              }
            ]}
          >
            <ThemedView style={styles.headerContent}>
              <Animated.View 
                style={[
                  styles.headerIconGroup,
                  {
                    transform: [{ scale: headerScaleAnim }],
                  }
                ]}
              >
                <Ionicons name="heart" size={80} color="#FF6B6B" style={styles.headerIconMain} />
              </Animated.View>
              <Animated.View 
                style={[
                  {
                    opacity: titleOpacityAnim,
                    transform: [{ scale: titleScaleAnim }],
                  }
                ]}
              >
                <Animated.Text 
                  style={[
                    styles.headerTitle,
                    { color: titleColor }
                  ]}
                >
                  {displayedTitle}
                  {showCursor && (
                    <Animated.Text 
                      style={[
                        { 
                          color: titleColor,
                          opacity: cursorOpacityAnim,
                        }
                      ]}
                    >
                      |
                    </Animated.Text>
                  )}
                </Animated.Text>
              </Animated.View>
            </ThemedView>
          </Animated.View>
        )
      }>
      <View style={styles.maxWidthContainer}>
        {/* Hero Section with animations */}
        <Animated.View
          style={[
            styles.heroSection, 
            { 
              backgroundColor: AppColors.backgroundLight,
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ],
            }
          ]}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <ThemedText style={styles.heroDescription}>
              Everyone remembers the teachers who changed their life. But as we grow up and move away, it gets harder to show our gratitude. This website encourages you to send appreciation to their teachers, no matter how far away you are. 
            </ThemedText>
          </Animated.View>
          
          <Animated.View 
            style={{ 
              gap: 12,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {user ? (
              <>
                <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
                  <Pressable
                    style={[
                      styles.buttonBlackBorder,
                      hoveredBtn === 'send' && styles.buttonHover,
                      {
                        shadowOpacity: hoveredBtn === 'send' ? 0.3 : 0.1,
                        shadowRadius: hoveredBtn === 'send' ? 8 : 4,
                      }
                    ]}
                    onPress={handleSendThankYou}
                    onHoverIn={() => handleButtonHover('send', true)}
                    onHoverOut={() => handleButtonHover('send', false)}
                    android_ripple={{ color: AppColors.cardHover }}
                  >
                    <Ionicons name="heart-outline" size={20} color={AppColors.primary} />
                    <ThemedText style={styles.ctaText}>Send a Thank You Note</ThemedText>
                  </Pressable>
                </Animated.View>
                
                <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
                  <Pressable
                    style={[
                      styles.buttonBlackBorder,
                      hoveredBtn === 'dashboard' && styles.buttonHover,
                      {
                        shadowOpacity: hoveredBtn === 'dashboard' ? 0.3 : 0.1,
                        shadowRadius: hoveredBtn === 'dashboard' ? 8 : 4,
                      }
                    ]}
                    onPress={handleDashboard}
                    onHoverIn={() => handleButtonHover('dashboard', true)}
                    onHoverOut={() => handleButtonHover('dashboard', false)}
                    android_ripple={{ color: AppColors.cardHover }}
                  >
                    <Ionicons name="person-outline" size={20} color={AppColors.primary} />
                    <ThemedText style={styles.ctaText}>View My Dashboard</ThemedText>
                  </Pressable>
                </Animated.View>
              </>
            ) : (
              <>
                <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
                  <Pressable
                    style={[
                      styles.buttonBlackBorder,
                      hoveredBtn === 'send' && styles.buttonHover,
                      {
                        shadowOpacity: hoveredBtn === 'send' ? 0.3 : 0.1,
                        shadowRadius: hoveredBtn === 'send' ? 8 : 4,
                      }
                    ]}
                    onPress={handleSendThankYou}
                    onHoverIn={() => handleButtonHover('send', true)}
                    onHoverOut={() => handleButtonHover('send', false)}
                    android_ripple={{ color: AppColors.cardHover }}
                  >
                    <Ionicons name="heart-outline" size={20} color={AppColors.primary} />
                    <ThemedText style={styles.ctaText}>Write a Thank You Note</ThemedText>
                  </Pressable>
                </Animated.View>
                
                <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
                  <Pressable
                    style={[
                      styles.buttonBlackBorder,
                      hoveredBtn === 'login' && styles.buttonHover,
                      {
                        shadowOpacity: hoveredBtn === 'login' ? 0.3 : 0.1,
                        shadowRadius: hoveredBtn === 'login' ? 8 : 4,
                      }
                    ]}
                    onPress={handleLogin}
                    onHoverIn={() => handleButtonHover('login', true)}
                    onHoverOut={() => handleButtonHover('login', false)}
                    android_ripple={{ color: AppColors.cardHover }}
                  >
                    <Ionicons name="person-outline" size={20} color={AppColors.primary} />
                    <ThemedText style={styles.ctaText}>Sign Up / Log In to Save and Track Your Messages!</ThemedText>
                  </Pressable>
                </Animated.View>
              </>
            )}
          </Animated.View>
        </Animated.View>
        
        {/* Animated Divider */}
        <Animated.View 
          style={[
            styles.divider, 
            { 
              opacity: fadeAnim,
              transform: [{ scaleX: scaleAnim }],
            }
          ]} 
        />
        
        {/* Animated Footer */}
        <Animated.View 
          style={[
            styles.footer, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <ThemedText style={{ color: AppColors.textSecondary, fontSize: 16 }}>
            © {new Date().getFullYear()} Reagan Hsu &nbsp; <Ionicons name="heart" size={16} color="#FF6B6B" />
          </ThemedText>
        </Animated.View>
      </View>
    </ParallaxScrollView>
  );
}