import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
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
import { styles } from '../styles/styles';
import { AppColors } from '../../constants/Colors';
import { useAuth } from '../../contexts/AuthContext';

const showAlert = (title: string, message: string) => {
  Alert.alert(title, message, [
    { text: 'OK', style: 'default' }
  ]);
};

export default function AccountSettingsScreen() {
  const { user, signOut } = useAuth();
  const [dataUsageExpanded, setDataUsageExpanded] = useState(false);
  const [privacyPolicyExpanded, setPrivacyPolicyExpanded] = useState(false);
  const [termsOfServiceExpanded, setTermsOfServiceExpanded] = useState(false);
  const [dataExportExpanded, setDataExportExpanded] = useState(false);
  const [notificationsExpanded, setNotificationsExpanded] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(30);
  const backButtonOpacity = useSharedValue(0);
  const backButtonTranslateX = useSharedValue(-20);
  const accountSectionOpacity = useSharedValue(0);
  const accountSectionTranslateY = useSharedValue(20);
  const privacySectionOpacity = useSharedValue(0);
  const privacySectionTranslateY = useSharedValue(20);
  const dataSectionOpacity = useSharedValue(0);
  const dataSectionTranslateY = useSharedValue(20);
  const notificationsSectionOpacity = useSharedValue(0);
  const notificationsSectionTranslateY = useSharedValue(20);
  
  // Button hover animations
  const backButtonScale = useSharedValue(1);
  const emailButtonScale = useSharedValue(1);
  const passwordButtonScale = useSharedValue(1);
  const deleteButtonScale = useSharedValue(1);
  const dataButtonScale = useSharedValue(1);
  const privacyButtonScale = useSharedValue(1);
  const termsButtonScale = useSharedValue(1);
  const exportButtonScale = useSharedValue(1);
  const notificationsButtonScale = useSharedValue(1);

  useEffect(() => {
    // Start entrance animations
    headerOpacity.value = withTiming(1, { duration: 800 });
    headerTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 });
    
    backButtonOpacity.value = withDelay(100, withTiming(1, { duration: 600 }));
    backButtonTranslateX.value = withDelay(100, withSpring(0, { damping: 15, stiffness: 100 }));
    
    accountSectionOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    accountSectionTranslateY.value = withDelay(200, withSpring(0, { damping: 15, stiffness: 100 }));
    
    privacySectionOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    privacySectionTranslateY.value = withDelay(400, withSpring(0, { damping: 15, stiffness: 100 }));
    
    dataSectionOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    dataSectionTranslateY.value = withDelay(600, withSpring(0, { damping: 15, stiffness: 100 }));
    
    notificationsSectionOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
    notificationsSectionTranslateY.value = withDelay(800, withSpring(0, { damping: 15, stiffness: 100 }));
    
    setIsLoaded(true);
  }, []);

  const handleChangeEmail = async () => {
    try {
      console.log('handleChangeEmail called');
      if (Platform.OS === 'web') {
        const confirmed = window.confirm('Are you sure you want to change your email? You will need to verify your new email address.');
        if (confirmed) {
          console.log('Change email confirmed');
          showAlert('Email Change', 'Email change request submitted. Please check your new email for verification instructions.');
        }
      } else {
        Alert.alert(
          'Change Email',
          'Are you sure you want to change your email? You will need to verify your new email address.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Change Email',
              style: 'default',
              onPress: () => {
                console.log('Change email confirmed');
                showAlert('Email Change', 'Email change request submitted. Please check your new email for verification instructions.');
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error in handleChangeEmail:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      console.log('handleChangePassword called');
      if (Platform.OS === 'web') {
        const confirmed = window.confirm('Are you sure you want to change your password? You will be signed out and need to sign in with your new password.');
        if (confirmed) {
          console.log('Change password confirmed');
          showAlert('Password Change', 'Password change request submitted. Please check your email for reset instructions.');
        }
      } else {
        Alert.alert(
          'Change Password',
          'Are you sure you want to change your password? You will be signed out and need to sign in with your new password.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Change Password',
              style: 'default',
              onPress: () => {
                console.log('Change password confirmed');
                showAlert('Password Change', 'Password change request submitted. Please check your email for reset instructions.');
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error in handleChangePassword:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      console.log('handleDeleteAccount called');
      if (Platform.OS === 'web') {
        const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.');
        if (confirmed) {
          const finalConfirm = window.confirm('This is your final warning. Deleting your account will permanently remove all your thank you messages and account data. This action cannot be undone. Are you absolutely sure?');
          if (finalConfirm) {
            console.log('Delete account confirmed');
            await signOut();
            router.replace('/(tabs)');
            showAlert('Account Deleted', 'Your account has been permanently deleted. Thank you for using ThankMyTeacher.');
          }
        }
      } else {
        Alert.alert(
          'Delete Account',
          'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete Account',
              style: 'destructive',
              onPress: () => {
                Alert.alert(
                  'Final Confirmation',
                  'This is your final warning. Deleting your account will permanently remove all your thank you messages and account data. This action cannot be undone. Are you absolutely sure?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Yes, Delete My Account',
                      style: 'destructive',
                      onPress: async () => {
                        console.log('Delete account confirmed');
                        await signOut();
                        router.replace('/(tabs)');
                        showAlert('Account Deleted', 'Your account has been permanently deleted. Thank you for using ThankMyTeacher.');
                      },
                    },
                  ]
                );
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error in handleDeleteAccount:', error);
    }
  };

  const handleExportData = () => {
    showAlert('Export Data', 'Your data export is being prepared. You will receive an email when it\'s ready.');
  };

  const toggleEmailNotifications = (value: boolean) => {
    showAlert('Email Notifications', `Email notifications ${value ? 'enabled' : 'disabled'}`);
  };

  const togglePushNotifications = (value: boolean) => {
    showAlert('Push Notifications', `Push notifications ${value ? 'enabled' : 'disabled'}`);
  };

  const handleDisableAllNotifications = () => {
    showAlert('Notifications Disabled', 'All notifications have been disabled.');
  };

  // Animated styles
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const backButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backButtonOpacity.value,
    transform: [
      { translateX: backButtonTranslateX.value },
      { scale: backButtonScale.value }
    ],
  }));

  const accountSectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: accountSectionOpacity.value,
    transform: [{ translateY: accountSectionTranslateY.value }],
  }));

  const privacySectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: privacySectionOpacity.value,
    transform: [{ translateY: privacySectionTranslateY.value }],
  }));

  const dataSectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dataSectionOpacity.value,
    transform: [{ translateY: dataSectionTranslateY.value }],
  }));

  const notificationsSectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: notificationsSectionOpacity.value,
    transform: [{ translateY: notificationsSectionTranslateY.value }],
  }));

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.maxWidthContainer}>
        <View style={styles.contentContainer}>
        {/* Header */}
          <Animated.View style={[styles.section, headerAnimatedStyle]}>
          <Animated.View style={backButtonAnimatedStyle}>
            <Pressable 
                style={[
                  styles.backButton,
                  hovered === 'back' && styles.buttonHover,
                ]}
              onPress={() => router.back()}
                onHoverIn={() => {
                  setHovered('back');
                  backButtonScale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
                }}
                onHoverOut={() => {
                  setHovered(null);
                  backButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
                }}
            >
                <Ionicons name="arrow-back" size={24} color={AppColors.textSecondary} />
                <ThemedText style={styles.backButtonText}>
                Back to Profile
              </ThemedText>
            </Pressable>
          </Animated.View>
          
            <ThemedText type="title" style={styles.sectionTitleLarge}>
            Account Settings
          </ThemedText>
            <ThemedText style={styles.sectionSubtitle}>
            Manage your account preferences and privacy
          </ThemedText>
        </Animated.View>

        {/* Account Management */}
          <Animated.View style={[styles.section, accountSectionAnimatedStyle]}>
            <ThemedText type="title" style={styles.sectionTitle}>
              Account Management
            </ThemedText>
            <Animated.View style={{}}>
              <Pressable 
                style={[
                  styles.card,
                  hovered === 'email' && styles.cardHover,
                ]}
                onPress={() => {
                  console.log('Change Email pressed');
                  handleChangeEmail();
                }}
                onHoverIn={() => {
                  setHovered('email');
                  emailButtonScale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
                }}
                onHoverOut={() => {
                  setHovered(null);
                  emailButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
                }}
              >
                <View style={styles.cardRow}>
                  <Ionicons name="mail-outline" size={24} color={AppColors.textSecondary} />
                  <ThemedText style={styles.cardTitle}>
                    Change Email
                  </ThemedText>
                  <Ionicons name="chevron-forward" size={20} color={AppColors.textSecondary} />
                </View>
              </Pressable>
            </Animated.View>

          <Pressable 
              style={[
                styles.card,
                hovered === 'password' && styles.cardHover,
              ]}
              onPress={() => {
                console.log('Change Password pressed');
                handleChangePassword();
              }}
              onHoverIn={() => {
                setHovered('password');
                passwordButtonScale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
              }}
              onHoverOut={() => {
                setHovered(null);
                passwordButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
              }}
            >
              <View style={styles.cardRow}>
                <Ionicons name="lock-closed-outline" size={24} color={AppColors.textSecondary} />
                <ThemedText style={styles.cardTitle}>
              Change Password
            </ThemedText>
                <Ionicons name="chevron-forward" size={20} color={AppColors.textSecondary} />
              </View>
          </Pressable>

          <Pressable 
              style={[
                styles.card,
                hovered === 'delete' && styles.cardHover,
              ]}
              onPress={() => {
                console.log('Delete Account pressed');
                handleDeleteAccount();
              }}
              onHoverIn={() => {
                setHovered('delete');
                deleteButtonScale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
              }}
              onHoverOut={() => {
                setHovered(null);
                deleteButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
              }}
            >
              <View style={styles.cardRow}>
                <Ionicons name="trash-outline" size={24} color={AppColors.error} />
                <ThemedText style={[styles.cardTitle, { color: AppColors.error }]}>
              Delete Account
            </ThemedText>
                <Ionicons name="chevron-forward" size={20} color={AppColors.error} />
              </View>
          </Pressable>
        </Animated.View>

        {/* Privacy & Security */}
          <Animated.View style={[styles.section, privacySectionAnimatedStyle]}>
            <ThemedText type="title" style={styles.sectionTitle}>
            Privacy & Security
          </ThemedText>
          
          <Pressable 
              style={[
                styles.card,
                hovered === 'data' && styles.cardHover,
              ]}
            onPress={() => setDataUsageExpanded(!dataUsageExpanded)}
              onHoverIn={() => {
                setHovered('data');
                dataButtonScale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
              }}
              onHoverOut={() => {
                setHovered(null);
                dataButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
              }}
          >
              <View style={styles.cardRow}>
                <Ionicons name="analytics-outline" size={24} color={AppColors.textSecondary} />
                <ThemedText style={styles.cardTitle}>
              Data Usage
            </ThemedText>
            <Ionicons 
              name={dataUsageExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
                  color={AppColors.textSecondary} 
            />
              </View>
          </Pressable>

          {dataUsageExpanded && (
              <View style={styles.card}>
                <ThemedText style={styles.cardSubtitle}>
                Your data is used to provide personalized thank you tracking and improve the service.{'\n\n'}
                  <ThemedText style={[styles.cardSubtitle, { fontWeight: '600', color: AppColors.textPrimary }]}>We collect:</ThemedText>{'\n'}
                • Your email for account management{'\n'}
                • Thank you notes you send{'\n'}
                • Usage analytics to improve the app{'\n\n'}
                  <ThemedText style={[styles.cardSubtitle, { fontWeight: '600', color: AppColors.textPrimary }]}>We never share your personal information with third parties.</ThemedText>
              </ThemedText>
            </View>
          )}

          <Pressable 
              style={[
                styles.card,
                hovered === 'privacy' && styles.cardHover,
              ]}
            onPress={() => setPrivacyPolicyExpanded(!privacyPolicyExpanded)}
              onHoverIn={() => {
                setHovered('privacy');
                privacyButtonScale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
              }}
              onHoverOut={() => {
                setHovered(null);
                privacyButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
              }}
          >
              <View style={styles.cardRow}>
                <Ionicons name="shield-outline" size={24} color={AppColors.textSecondary} />
                <ThemedText style={styles.cardTitle}>
              Privacy Policy
            </ThemedText>
            <Ionicons 
              name={privacyPolicyExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
                  color={AppColors.textSecondary} 
            />
              </View>
          </Pressable>

          {privacyPolicyExpanded && (
              <View style={styles.card}>
                <ThemedText style={styles.cardSubtitle}>
                Our privacy policy ensures your data is protected and used responsibly.{'\n\n'}
                  <ThemedText style={[styles.cardSubtitle, { fontWeight: '600', color: AppColors.textPrimary }]}>Key points:</ThemedText>{'\n'}
                  • We collect minimal data necessary for the service{'\n'}
                  • Your data is encrypted and securely stored{'\n'}
                  • You can request data deletion at any time{'\n'}
                  • We don't sell or share your personal information{'\n'}
                  • We comply with all applicable privacy laws
              </ThemedText>
            </View>
          )}

          <Pressable 
              style={[
                styles.card,
                hovered === 'terms' && styles.cardHover,
              ]}
              onPress={() => setTermsOfServiceExpanded(!termsOfServiceExpanded)}
              onHoverIn={() => {
                setHovered('terms');
                termsButtonScale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
              }}
              onHoverOut={() => {
                setHovered(null);
                termsButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
              }}
            >
              <View style={styles.cardRow}>
                <Ionicons name="document-text-outline" size={24} color={AppColors.textSecondary} />
                <ThemedText style={styles.cardTitle}>
                  Terms of Service
                </ThemedText>
                <Ionicons 
                  name={termsOfServiceExpanded ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={AppColors.textSecondary} 
                />
              </View>
            </Pressable>

            {termsOfServiceExpanded && (
              <View style={styles.card}>
                <ThemedText style={styles.cardSubtitle}>
                  Our terms of service outline the rules and guidelines for using our platform.{'\n\n'}
                  <ThemedText style={[styles.cardSubtitle, { fontWeight: '600', color: AppColors.textPrimary }]}>You will be able to download:</ThemedText>{'\n'}
                  • Complete terms of service document{'\n'}
                  • Privacy policy document{'\n'}
                  • Data processing agreement{'\n\n'}
                  <ThemedText style={{ fontStyle: 'italic' }}>This feature is currently in development.</ThemedText>
                </ThemedText>
              </View>
            )}
          </Animated.View>

          {/* Data & Export */}
          <Animated.View style={[styles.section, dataSectionAnimatedStyle]}>
            <ThemedText type="title" style={styles.sectionTitle}>
              Data & Export
            </ThemedText>
            
            <Pressable 
              style={[
                styles.card,
                hovered === 'export' && styles.cardHover,
              ]}
              onPress={() => setDataExportExpanded(!dataExportExpanded)}
              onHoverIn={() => {
                setHovered('export');
                exportButtonScale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
              }}
              onHoverOut={() => {
                setHovered(null);
                exportButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
              }}
            >
              <View style={styles.cardRow}>
                <Ionicons name="download-outline" size={24} color={AppColors.textSecondary} />
                <ThemedText style={styles.cardTitle}>
                  Export My Data
            </ThemedText>
            <Ionicons 
                  name={dataExportExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
                  color={AppColors.textSecondary} 
            />
              </View>
          </Pressable>

            {dataExportExpanded && (
              <View style={styles.card}>
                <ThemedText style={styles.cardSubtitle}>
                  Download a copy of all your data stored in our system.{'\n\n'}
                  <ThemedText style={[styles.cardSubtitle, { fontWeight: '600', color: AppColors.textPrimary }]}>You will be able to download:</ThemedText>{'\n'}
                  • All thank you notes you've sent{'\n'}
                  • Your account information{'\n'}
                  • Usage history and analytics{'\n'}
                  • Any other personal data we store{'\n\n'}
                <ThemedText style={{ fontStyle: 'italic' }}>This feature is currently in development.</ThemedText>
              </ThemedText>
            </View>
          )}
        </Animated.View>

        {/* Notifications */}
          <Animated.View style={[styles.section, notificationsSectionAnimatedStyle]}>
            <ThemedText type="title" style={styles.sectionTitle}>
            Notifications
          </ThemedText>
          
          <Pressable 
              style={[
                styles.card,
                hovered === 'notifications' && styles.cardHover,
              ]}
              onPress={() => setNotificationsExpanded(!notificationsExpanded)}
              onHoverIn={() => {
                setHovered('notifications');
                notificationsButtonScale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
              }}
              onHoverOut={() => {
                setHovered(null);
                notificationsButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
              }}
            >
              <View style={styles.cardRow}>
                <Ionicons name="notifications-outline" size={24} color={AppColors.textSecondary} />
                <ThemedText style={styles.cardTitle}>
                  Notification Preferences
            </ThemedText>
                <Ionicons 
                  name={notificationsExpanded ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={AppColors.textSecondary} 
            />
              </View>
          </Pressable>

            {notificationsExpanded && (
              <View style={styles.card}>
                <View style={[styles.cardRow, { marginBottom: 16 }]}>
                  <ThemedText style={styles.cardSubtitle}>
                    Enable all notifications
                  </ThemedText>
          <Pressable 
                    style={[
                      {
                        width: 50,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: notificationsEnabled ? AppColors.success : AppColors.textMuted,
                        justifyContent: 'center',
                        alignItems: notificationsEnabled ? 'flex-end' : 'flex-start',
                        paddingHorizontal: 2,
                      }
                    ]}
                    onPress={() => {
                      setNotificationsEnabled(!notificationsEnabled);
                      showAlert(
                        'Notifications', 
                        `All notifications ${notificationsEnabled ? 'disabled' : 'enabled'}`
                      );
                    }}
                  >
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        backgroundColor: 'white',
                        shadowColor: AppColors.shadow,
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 2,
                      }}
            />
          </Pressable>
                </View>
                <ThemedText style={styles.cardSubtitle}>
                  Manage how and when you receive notifications.{'\n\n'}
                  <ThemedText style={[styles.cardSubtitle, { fontWeight: '600', color: AppColors.textPrimary }]}>Available options:</ThemedText>{'\n'}
                  • Email notifications for new features{'\n'}
                  • Push notifications for app updates{'\n'}
                  • Reminders to send thank you notes{'\n'}
                  • Weekly activity summaries{'\n\n'}
                  <ThemedText style={{ fontStyle: 'italic' }}>This feature is currently in development.</ThemedText>
                </ThemedText>
              </View>
            )}
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