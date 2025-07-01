import React, { useEffect, useState } from 'react';
import { View, ScrollView, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withSequence,
  withDelay,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useAuth } from '../../contexts/AuthContext';
import { fetchUserData } from '../../services/userDataService';
import { styles } from '../styles/styles';
import { AppColors } from '../../constants/Colors';

// Web-compatible alert function
const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    // For mobile, we can use React Native's Alert
    const { Alert } = require('react-native');
    Alert.alert(title, message);
  }
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(30);
  const profileCardOpacity = useSharedValue(0);
  const profileCardScale = useSharedValue(0.9);
  const settingsCardOpacity = useSharedValue(0);
  const settingsCardTranslateX = useSharedValue(-20);
  const signOutCardOpacity = useSharedValue(0);
  const signOutCardScale = useSharedValue(0.95);
  
  // Button hover animations
  const accountButtonScale = useSharedValue(1);
  const signOutButtonScale = useSharedValue(1);
  const profileCardHoverScale = useSharedValue(1);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      // Start entrance animations
      headerOpacity.value = withTiming(1, { duration: 800 });
      headerTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 });
      
      // Staggered content loading
      profileCardOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
      profileCardScale.value = withDelay(200, withSpring(1, { damping: 15, stiffness: 100 }));
      
      settingsCardOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
      settingsCardTranslateX.value = withDelay(400, withSpring(0, { damping: 15, stiffness: 100 }));
      
      signOutCardOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
      signOutCardScale.value = withDelay(600, withSpring(1, { damping: 15, stiffness: 100 }));
      
      setIsLoaded(true);
    }
  }, [userData]);

  const loadUserData = async () => {
    try {
      if (user?.id) {
        const data = await fetchUserData(user.id);
        setUserData(data);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const handleSignOut = async () => {
    try {
      console.log('handleSignOut called');
      if (Platform.OS === 'web') {
        const confirmed = window.confirm('Are you sure you want to sign out?');
        if (confirmed) {
          console.log('Sign out confirmed');
          await signOut();
          router.replace('/(tabs)');
        }
      } else {
        const { Alert } = require('react-native');
        Alert.alert(
          'Sign Out',
          'Are you sure you want to sign out?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Sign Out',
              style: 'destructive',
              onPress: async () => {
                console.log('Sign out confirmed');
                await signOut();
                router.replace('/(tabs)');
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error in handleSignOut:', error);
    }
  };

  const handleAccountSettings = () => {
    console.log('handleAccountSettings called');
    try {
      showAlert('Account Settings', 'What would you like to change?\n\n• Change Email\n• Change Password\n• Delete Account\n\n(Coming soon!)');
    } catch (error) {
      console.error('Error in handleAccountSettings:', error);
    }
  };

  const handlePrivacySettings = () => {
    console.log('handlePrivacySettings called');
    try {
      showAlert('Privacy & Security', 'Privacy settings:\n\n• Data Usage: Your data is used to provide personalized thank you tracking\n• Privacy Policy: Available on our website\n• Export Data: Coming soon!');
    } catch (error) {
      console.error('Error in handlePrivacySettings:', error);
    }
  };

  const handleNotifications = () => {
    console.log('handleNotifications called');
    try {
      showAlert('Notification Settings', 'Notification preferences:\n\n• Email Notifications: Currently enabled\n• Push Notifications: Currently enabled\n• You can disable all notifications from this menu');
    } catch (error) {
      console.error('Error in handleNotifications:', error);
    }
  };

  const handleHelpCenter = () => {
    console.log('handleHelpCenter called');
    try {
      showAlert('Help Center', 'How to send thank yous:\n\n1. Go to "Send Thanks" tab\n2. Enter teacher information\n3. Write your thank you message\n4. Submit and track your thank you!\n\nFor account issues, please contact support.');
    } catch (error) {
      console.error('Error in handleHelpCenter:', error);
    }
  };

  const handleContactSupport = () => {
    console.log('handleContactSupport called');
    try {
      showAlert('Contact Support', 'Contact options:\n\n• Email Support: support@thankmyteacher.com\n• Report a Bug: bugs@thankmyteacher.com\n• Feature Request: features@thankmyteacher.com\n\nPlease include details about your issue.');
    } catch (error) {
      console.error('Error in handleContactSupport:', error);
    }
  };

  // Animated styles
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const profileCardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: profileCardOpacity.value,
    transform: [
      { scale: profileCardScale.value * profileCardHoverScale.value }
    ],
  }));

  const settingsCardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: settingsCardOpacity.value,
    transform: [
      { translateX: settingsCardTranslateX.value },
      { scale: accountButtonScale.value }
    ],
  }));

  const signOutCardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: signOutCardOpacity.value,
    transform: [
      { scale: signOutCardScale.value * signOutButtonScale.value }
    ],
  }));

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.maxWidthContainer}>
        {/* Profile Content */}
        <View style={styles.contentContainer}>
          {/* Header */}
          <Animated.View style={[styles.section, headerAnimatedStyle]}>
            <ThemedText type="title" style={[styles.sectionTitleLarge, { marginBottom: 8 }]}>
              Profile
            </ThemedText>
            <ThemedText style={[styles.cardSubtitle, { color: AppColors.textSecondary }]}>
              Manage your account and preferences
            </ThemedText>
          </Animated.View>

          {/* Detailed Profile Data */}
          {userData && (
            <Animated.View style={[styles.section, profileCardAnimatedStyle]}>
              <ThemedText type="title" style={styles.sectionTitleLarge}>
                My Profile Data
              </ThemedText>
              
              <Pressable 
                style={[
                  styles.card,
                  hovered === 'profile' && styles.cardHover,
                ]}
                onHoverIn={() => {
                  setHovered('profile');
                  profileCardHoverScale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
                }}
                onHoverOut={() => {
                  setHovered(null);
                  profileCardHoverScale.value = withSpring(1, { damping: 15, stiffness: 300 });
                }}
              >
                <View style={styles.marginBottom16}>
                  <ThemedText style={[styles.cardSubtitle, styles.marginBottom4]}>
                    User ID
                  </ThemedText>
                  <ThemedText style={[styles.cardSubtitle, { fontFamily: 'SpaceMono' }]}>
                    {userData.id}
                  </ThemedText>
                </View>
                
                <View style={styles.marginBottom16}>
                  <ThemedText style={[styles.cardSubtitle, styles.marginBottom4]}>
                    Email
                  </ThemedText>
                  <ThemedText style={[styles.cardTitle, { fontSize: 16 }]}>
                    {userData.email}
                  </ThemedText>
                </View>
                
                {userData.full_name && (
                  <View style={styles.marginBottom16}>
                    <ThemedText style={[styles.cardSubtitle, styles.marginBottom4]}>
                      Name
                    </ThemedText>
                    <ThemedText style={[styles.cardTitle, { fontSize: 16 }]}>
                      {userData.full_name}
                    </ThemedText>
                  </View>
                )}
                
                {userData.created_at && (
                  <View style={styles.marginBottom16}>
                    <ThemedText style={[styles.cardSubtitle, styles.marginBottom4]}>
                      Created On
                    </ThemedText>
                    <ThemedText style={[styles.cardTitle, { fontSize: 16 }]}>
                      {formatDate(userData.created_at)}
                    </ThemedText>
                  </View>
                )}
              </Pressable>
            </Animated.View>
          )}

          {/* Settings */}
          <Animated.View style={[styles.section, settingsCardAnimatedStyle]}>
            <ThemedText type="title" style={styles.sectionTitleLarge}>
              Settings
            </ThemedText>
            
            <Pressable 
              style={[
                styles.card,
                hovered === 'account' && styles.cardHover,
              ]}
              onPress={() => {
                console.log('Account Settings pressed');
                router.push('/(tabs)/account-settings');
              }}
              onHoverIn={() => {
                setHovered('account');
                accountButtonScale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
              }}
              onHoverOut={() => {
                setHovered(null);
                accountButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
              }}
            >
              <View style={styles.cardRow}>
                <Ionicons name="settings-outline" size={24} color={AppColors.textSecondary} />
                <ThemedText style={styles.cardTitle}>
                  Account Settings
                </ThemedText>
                <Ionicons name="chevron-forward" size={20} color={AppColors.textSecondary} />
              </View>
            </Pressable>
          </Animated.View>

          {/* Sign Out */}
          <Animated.View style={[styles.section, signOutCardAnimatedStyle]}>
            <Pressable 
              style={[
                styles.card, 
                { backgroundColor: '#FF6B6B' },
                hovered === 'signout' && styles.buttonHover,
              ]}
              onPress={() => {
                console.log('Sign Out pressed');
                handleSignOut();
              }}
              onHoverIn={() => {
                setHovered('signout');
                signOutButtonScale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
              }}
              onHoverOut={() => {
                setHovered(null);
                signOutButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
              }}
            >
              <View style={styles.cardRow}>
                <Ionicons name="log-out-outline" size={24} color={AppColors.textPrimary} />
                <ThemedText style={[styles.cardTitle, { color: AppColors.textPrimary }]}>
                  Sign Out
                </ThemedText>
              </View>
            </Pressable>
          </Animated.View>
        </View>
        
        {/* Divider for visual separation */}
        <View style={styles.divider} />
        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={{ color: AppColors.textSecondary, fontSize: 16 }}>
            © {new Date().getFullYear()} Reagan Hsu &nbsp;
            <ThemedText style={{ color: '#FF6B6B' }}>♥</ThemedText>
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
} 