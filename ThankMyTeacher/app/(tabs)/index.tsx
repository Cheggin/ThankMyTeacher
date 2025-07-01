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

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const headerScaleAnim = useRef(new Animated.Value(1)).current;

  // Hover state for each button
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Staggered entrance animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      // Header subtle entrance animation
      Animated.timing(headerScaleAnim, {
        toValue: 1,
        duration: 1000,
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
            <ThemedText type="title" style={styles.headerTitle}>
              ThankMyTeacher
            </ThemedText>
          </ThemedView>
        </Animated.View>
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
              Everyone remembers the teachers who changed their life. But as we grow up and move away, it gets harder to show our gratitude. This website makes it easy to send your appreciation to them, no matter how far away you are. 
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