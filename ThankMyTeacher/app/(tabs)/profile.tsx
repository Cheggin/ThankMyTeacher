import React, { useEffect, useState } from 'react';
import { View, ScrollView, Pressable, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '../../contexts/AuthContext';
import { fetchUserData, UserData } from '../../services/userDataService';
import { styles } from '../styles/styles';

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
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadUserData();
    }
  }, [user?.id]);

  const loadUserData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const data = await fetchUserData(user.id);
      setUserData(data);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  };

  const handleSignOut = async () => {
    console.log('handleSignOut called');
    try {
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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFF5F5' }}>
      {/* Profile Content */}
      <ThemedView style={{ padding: 20, paddingTop: 40 }}>


        {/* Detailed Profile Data */}
        {userData && (
          <View style={{ marginBottom: 30 }}>
            <ThemedText type="title" style={{ fontSize: 24, marginBottom: 16 }}>
              My Profile Data
            </ThemedText>
            
            <View style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <View style={{ marginBottom: 16 }}>
                <ThemedText style={{ fontSize: 14, color: '#636E72', marginBottom: 4 }}>
                  User ID
                </ThemedText>
                <ThemedText style={{ fontSize: 12, color: '#636E72', fontFamily: 'SpaceMono' }}>
                  {userData.id}
                </ThemedText>
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <ThemedText style={{ fontSize: 14, color: '#636E72', marginBottom: 4 }}>
                  Email
                </ThemedText>
                <ThemedText style={{ fontSize: 16, fontWeight: '500' }}>
                  {userData.email}
                </ThemedText>
              </View>
              
              {userData.full_name && (
                <View style={{ marginBottom: 16 }}>
                  <ThemedText style={{ fontSize: 14, color: '#636E72', marginBottom: 4 }}>
                    Name
                  </ThemedText>
                  <ThemedText style={{ fontSize: 16, fontWeight: '500' }}>
                    {userData.full_name}
                  </ThemedText>
                </View>
              )}
              
              {userData.created_at && (
                <View style={{ marginBottom: 16 }}>
                  <ThemedText style={{ fontSize: 14, color: '#636E72', marginBottom: 4 }}>
                    Created On
                  </ThemedText>
                  <ThemedText style={{ fontSize: 16, fontWeight: '500' }}>
                    {formatDate(userData.created_at)}
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Settings */}
        <View style={{ marginBottom: 30 }}>
          <ThemedText type="title" style={{ fontSize: 24, marginBottom: 16 }}>
            Settings
          </ThemedText>
          
          <Pressable 
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => {
              console.log('Account Settings pressed');
              router.push('/(tabs)/account-settings');
            }}
          >
            <Ionicons name="settings-outline" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>
              Account Settings
            </ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#636E72" />
          </Pressable>
        </View>

        {/* Sign Out */}
        <View style={{ marginBottom: 30 }}>
          <Pressable 
            style={{
              backgroundColor: '#FF6B6B',
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
            onPress={() => {
              console.log('Sign Out pressed');
              handleSignOut();
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, color: 'white', fontWeight: '600' }}>
              Sign Out
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </ScrollView>
  );
} 