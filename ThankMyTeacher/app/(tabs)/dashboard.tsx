import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Pressable, ActivityIndicator, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useAuth } from '../../contexts/AuthContext';
import { fetchUserData, getUserStats } from '../../services/userDataService';
import { styles } from '../styles/styles';
import { AppColors } from '../../constants/Colors';

interface Stats {
  thankYouCount: number;
  lastActivity: string | null;
}

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [stats, setStats] = useState<Stats>({
    thankYouCount: 0,
    lastActivity: null,
  });
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);

  // Animation values for staggered loading
  const quickActionsAnim = useRef(new Animated.Value(0)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;
  const navigationAnim = useRef(new Animated.Value(0)).current;
  const statsCountAnim = useRef(new Animated.Value(0)).current;

  // Individual animation values for each interactive element
  const ctaButtonAnim = useRef(new Animated.Value(1)).current;
  const historyCardAnim = useRef(new Animated.Value(1)).current;
  const statsCardAnim = useRef(new Animated.Value(1)).current;
  const lastActivityCardAnim = useRef(new Animated.Value(1)).current;
  const profileCardAnim = useRef(new Animated.Value(1)).current;
  const homeCardAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (user?.id) {
      loadUserData();
    }
  }, [user?.id]);

  // Animate stats count when stats change
  useEffect(() => {
    if (stats.thankYouCount > 0 && isLoaded) {
      Animated.timing(statsCountAnim, {
        toValue: stats.thankYouCount,
        duration: 1500,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          setDisplayCount(stats.thankYouCount);
        }
      });
    }
  }, [stats.thankYouCount, isLoaded]);

  // Update display count during animation
  useEffect(() => {
    const listener = statsCountAnim.addListener(({ value }) => {
      setDisplayCount(Math.round(value));
    });
    return () => statsCountAnim.removeListener(listener);
  }, []);

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
      // Start staggered animations after data loads
      setTimeout(() => {
        setIsLoaded(true);
        animateSections();
      }, 200);
    }
  };

  const animateSections = () => {
    // Reset animation values
    quickActionsAnim.setValue(0);
    statsAnim.setValue(0);
    navigationAnim.setValue(0);
    statsCountAnim.setValue(0);

    // Staggered section animations
    Animated.stagger(200, [
      Animated.timing(quickActionsAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(statsAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(navigationAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate stats count
    Animated.timing(statsCountAnim, {
      toValue: stats.thankYouCount,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  const handleSendThankYou = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(ctaButtonAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(ctaButtonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/(tabs)/send-thank-you');
    });
  };

  const handleViewHistory = () => {
    // Card press animation
    Animated.sequence([
      Animated.timing(historyCardAnim, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(historyCardAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/(tabs)/thank-yous');
    });
  };

  const handleViewProfile = () => {
    // Card press animation
    Animated.sequence([
      Animated.timing(profileCardAnim, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(profileCardAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/(tabs)/profile');
    });
  };

  const handleHomeNavigation = () => {
    // Card press animation
    Animated.sequence([
      Animated.timing(homeCardAnim, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(homeCardAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/(tabs)');
    });
  };

  const handleButtonHover = (buttonId: string, isHovering: boolean) => {
    setHovered(isHovering ? buttonId : null);
    
    // Enhanced hover animation for specific button
    Animated.timing(ctaButtonAnim, {
      toValue: isHovering ? 1.02 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleCardHover = (cardId: string, isHovering: boolean) => {
    setHovered(isHovering ? cardId : null);
    
    // Enhanced hover animation for specific card
    let targetAnim: Animated.Value;
    switch (cardId) {
      case 'history':
        targetAnim = historyCardAnim;
        break;
      case 'profile':
        targetAnim = profileCardAnim;
        break;
      case 'home':
        targetAnim = homeCardAnim;
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
        <ThemedText style={[styles.loadingText, styles.marginBottom20]}>Loading your dashboard...</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.maxWidthContainer}>
        <View style={styles.contentContainer}>
          {/* Quick Actions */}
          <Animated.View 
            className="dashboard-section" 
            style={[
              styles.section,
              {
                opacity: quickActionsAnim,
                transform: [
                  { translateY: quickActionsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  })},
                ],
              }
            ]}
          >
            <ThemedText type="title" style={styles.sectionTitleLarge}>
              Quick Actions
            </ThemedText>
            <Animated.View style={{ transform: [{ scale: ctaButtonAnim }] }}>
              <Pressable
                style={[
                  styles.buttonBlackBorder,
                  hovered === 'cta' && styles.buttonHover,
                  {
                    shadowOpacity: hovered === 'cta' ? 0.3 : 0.1,
                    shadowRadius: hovered === 'cta' ? 8 : 4,
                  }
                ]}
                onPress={handleSendThankYou}
                onHoverIn={() => handleButtonHover('cta', true)}
                onHoverOut={() => handleButtonHover('cta', false)}
                android_ripple={{ color: AppColors.cardHover }}
              >
                <Ionicons name="heart-outline" size={20} color={AppColors.primary} />
                <ThemedText style={styles.ctaText}>Send a Thank You</ThemedText>
              </Pressable>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: historyCardAnim }], marginTop: 20 }}>
              <Pressable
                style={[
                  styles.card,
                  styles.marginBottom12,
                  hovered === 'history' && styles.cardHover,
                  {
                    shadowOpacity: hovered === 'history' ? 0.3 : 0.1,
                    shadowRadius: hovered === 'history' ? 8 : 4,
                    borderWidth: 1,
                    borderColor: AppColors.textPrimary,
                  }
                ]}
                onPress={handleViewHistory}
                onHoverIn={() => handleCardHover('history', true)}
                onHoverOut={() => handleCardHover('history', false)}
              >
                <View style={styles.cardRow}>
                  <Ionicons name="time-outline" size={24} color={AppColors.textSecondary} />
                  <ThemedText style={styles.cardTitle}>
                    View My Past Messages
                  </ThemedText>
                  <Ionicons name="chevron-forward" size={20} color={AppColors.textSecondary} />
                </View>
              </Pressable>
            </Animated.View>
          </Animated.View>

          {/* Stats Section */}
          <Animated.View 
            className="dashboard-section" 
            style={[
              styles.section,
              {
                opacity: statsAnim,
                transform: [
                  { translateY: statsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  })},
                ],
              }
            ]}
          >
            <ThemedText type="title" style={styles.sectionTitleLarge}>
              My Stats
            </ThemedText>
            <View style={styles.row}>
              <Animated.View style={[
                styles.card,
                { flex: 1, marginRight: 8, alignItems: 'center' },
                {
                  transform: [{ scale: statsCardAnim }],
                }
              ]}>
                <Ionicons name="heart" size={32} color="#FF6B6B" />
                <ThemedText type="title" style={[styles.sectionTitleLarge, { marginTop: 8 }]}> 
                  {displayCount}
                </ThemedText>
                <ThemedText style={[styles.cardSubtitle, { textAlign: 'center' }]}> 
                  Thank Yous Sent
                </ThemedText>
              </Animated.View>
            </View>
            <Animated.View style={[
              styles.card,
              {
                transform: [{ scale: lastActivityCardAnim }],
              }
            ]}>
              <View style={styles.cardRow}>
                <Ionicons name="calendar-outline" size={24} color={AppColors.textSecondary} />
                <View style={styles.cardContent}>
                  <ThemedText style={styles.cardSubtitle}>
                    Last Activity
                  </ThemedText>
                  <ThemedText style={styles.cardTitle}>
                    {formatDate(stats.lastActivity)}
                  </ThemedText>
                </View>
              </View>
            </Animated.View>
          </Animated.View>

          {/* Navigation */}
          <Animated.View 
            className="dashboard-section" 
            style={[
              styles.section,
              {
                opacity: navigationAnim,
                transform: [
                  { translateY: navigationAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  })},
                ],
              }
            ]}
          >
            <ThemedText type="title" style={styles.sectionTitleLarge}>
              Navigation
            </ThemedText>
            <Animated.View style={{ transform: [{ scale: profileCardAnim }] }}>
              <Pressable
                style={[
                  styles.card,
                  hovered === 'profile' && styles.cardHover,
                  {
                    shadowOpacity: hovered === 'profile' ? 0.3 : 0.1,
                    shadowRadius: hovered === 'profile' ? 8 : 4,
                  }
                ]}
                onPress={handleViewProfile}
                onHoverIn={() => handleCardHover('profile', true)}
                onHoverOut={() => handleCardHover('profile', false)}
              >
                <View style={styles.cardRow}>
                  <Ionicons name="person-circle-outline" size={24} color={AppColors.textSecondary} />
                  <ThemedText style={styles.cardTitle}>
                    View Profile
                  </ThemedText>
                  <Ionicons name="chevron-forward" size={20} color={AppColors.textSecondary} />
                </View>
              </Pressable>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: homeCardAnim }] }}>
              <Pressable
                style={[
                  styles.card,
                  hovered === 'home' && styles.cardHover,
                  {
                    shadowOpacity: hovered === 'home' ? 0.3 : 0.1,
                    shadowRadius: hovered === 'home' ? 8 : 4,
                  }
                ]}
                onPress={handleHomeNavigation}
                onHoverIn={() => handleCardHover('home', true)}
                onHoverOut={() => handleCardHover('home', false)}
              >
                <View style={styles.cardRow}>
                  <Ionicons name="home-outline" size={24} color={AppColors.textSecondary} />
                  <ThemedText style={styles.cardTitle}>
                    Go to Home
                  </ThemedText>
                  <Ionicons name="chevron-forward" size={20} color={AppColors.textSecondary} />
                </View>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </View>
        
        {/* Animated Divider */}
        <Animated.View 
          style={[
            styles.divider, 
            { 
              opacity: navigationAnim,
              transform: [{ scaleX: navigationAnim }],
            }
          ]} 
        />
        
        {/* Animated Footer */}
        <Animated.View 
          style={[
            styles.footer, 
            { 
              opacity: navigationAnim,
              transform: [{ translateY: navigationAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              })}],
            }
          ]}
        >
          <ThemedText style={{ color: AppColors.textSecondary, fontSize: 16 }}>
            © {new Date().getFullYear()} Reagan Hsu &nbsp; <Ionicons name="heart" size={16} color="#FF6B6B" />
          </ThemedText>
        </Animated.View>
      </View>
    </ScrollView>
  );
} 