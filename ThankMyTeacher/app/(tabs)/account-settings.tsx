import React, { useState } from 'react';
import { View, ScrollView, Pressable, Platform, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '../../contexts/AuthContext';

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

export default function AccountSettingsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  
  // State for dropdowns
  const [dataUsageExpanded, setDataUsageExpanded] = useState(false);
  const [privacyPolicyExpanded, setPrivacyPolicyExpanded] = useState(false);
  const [exportDataExpanded, setExportDataExpanded] = useState(false);
  
  // State for notification toggles
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);

  const handleChangeEmail = () => {
    showAlert('Change Email', 'Email change functionality will be available soon!\n\nYou will be able to update your email address and verify the new email.');
  };

  const handleChangePassword = () => {
    showAlert('Change Password', 'Password change functionality will be available soon!\n\nYou will be able to update your password securely.');
  };

  const handleDeleteAccount = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('This action cannot be undone. Are you sure you want to delete your account?');
      if (confirmed) {
        showAlert('Coming Soon', 'Account deletion will be available soon!');
      }
    } else {
      const { Alert } = require('react-native');
      Alert.alert(
        'Delete Account',
        'This action cannot be undone. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive',
            onPress: () => showAlert('Coming Soon', 'Account deletion will be available soon!')
          }
        ]
      );
    }
  };

  const handleExportData = () => {
    showAlert('Export Data', 'Data export functionality will be available soon!\n\nYou will be able to download all your data including:\n• Your thank you notes\n• Account information\n• Usage history');
  };

  const toggleEmailNotifications = (value: boolean) => {
    setEmailNotificationsEnabled(value);
  };

  const togglePushNotifications = (value: boolean) => {
    setPushNotificationsEnabled(value);
  };

  const handleDisableAllNotifications = () => {
    setEmailNotificationsEnabled(false);
    setPushNotificationsEnabled(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFF5F5' }}>
      <ThemedView style={{ padding: 20, paddingTop: 40 }}>
        {/* Header */}
        <View style={{ marginBottom: 30 }}>
          <Pressable 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 8, fontSize: 18, fontWeight: '600' }}>
              Back to Profile
            </ThemedText>
          </Pressable>
          
          <ThemedText type="title" style={{ fontSize: 28, marginBottom: 8 }}>
            Account Settings
          </ThemedText>
          <ThemedText style={{ fontSize: 16, color: '#636E72' }}>
            Manage your account preferences and privacy
          </ThemedText>
        </View>

        {/* Account Information */}
        <View style={{ marginBottom: 30 }}>
          <ThemedText type="title" style={{ fontSize: 20, marginBottom: 16 }}>
            Account Information
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
                Email
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: '500' }}>
                {user?.email}
              </ThemedText>
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <ThemedText style={{ fontSize: 14, color: '#636E72', marginBottom: 4 }}>
                User ID
              </ThemedText>
              <ThemedText style={{ fontSize: 12, color: '#636E72', fontFamily: 'SpaceMono' }}>
                {user?.id}
              </ThemedText>
            </View>
            
            <View>
              <ThemedText style={{ fontSize: 14, color: '#636E72', marginBottom: 4 }}>
                Member Since
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: '500' }}>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Account Management */}
        <View style={{ marginBottom: 30 }}>
          <ThemedText type="title" style={{ fontSize: 20, marginBottom: 16 }}>
            Account Management
          </ThemedText>
          
          <Pressable 
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={handleChangeEmail}
          >
            <Ionicons name="mail-outline" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>
              Change Email
            </ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#636E72" />
          </Pressable>

          <Pressable 
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={handleChangePassword}
          >
            <Ionicons name="lock-closed-outline" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>
              Change Password
            </ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#636E72" />
          </Pressable>

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
            onPress={handleDeleteAccount}
          >
            <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1, color: '#FF6B6B' }}>
              Delete Account
            </ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#FF6B6B" />
          </Pressable>
        </View>

        {/* Privacy & Security */}
        <View style={{ marginBottom: 30 }}>
          <ThemedText type="title" style={{ fontSize: 20, marginBottom: 16 }}>
            Privacy & Security
          </ThemedText>
          
          <Pressable 
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => setDataUsageExpanded(!dataUsageExpanded)}
          >
            <Ionicons name="analytics-outline" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>
              Data Usage
            </ThemedText>
            <Ionicons 
              name={dataUsageExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#636E72" 
            />
          </Pressable>

          {dataUsageExpanded && (
            <View style={{
              backgroundColor: 'white',
              marginBottom: 12,
              borderRadius: 12,
              padding: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <ThemedText style={{ fontSize: 14, lineHeight: 20, color: '#636E72' }}>
                Your data is used to provide personalized thank you tracking and improve the service.{'\n\n'}
                <ThemedText style={{ fontWeight: '600', color: '#2D3436' }}>We collect:</ThemedText>{'\n'}
                • Your email for account management{'\n'}
                • Thank you notes you send{'\n'}
                • Usage analytics to improve the app{'\n\n'}
                <ThemedText style={{ fontWeight: '600', color: '#2D3436' }}>We never share your personal information with third parties.</ThemedText>
              </ThemedText>
            </View>
          )}

          <Pressable 
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => setPrivacyPolicyExpanded(!privacyPolicyExpanded)}
          >
            <Ionicons name="shield-outline" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>
              Privacy Policy
            </ThemedText>
            <Ionicons 
              name={privacyPolicyExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#636E72" 
            />
          </Pressable>

          {privacyPolicyExpanded && (
            <View style={{
              backgroundColor: 'white',
              marginBottom: 12,
              borderRadius: 12,
              padding: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <ThemedText style={{ fontSize: 14, lineHeight: 20, color: '#636E72' }}>
                Our privacy policy ensures your data is protected and used responsibly.{'\n\n'}
                <ThemedText style={{ fontWeight: '600', color: '#2D3436' }}>Key points:</ThemedText>{'\n'}
                • We protect your personal information{'\n'}
                • We use data only for app functionality{'\n'}
                • We don't sell your data{'\n'}
              </ThemedText>
            </View>
          )}

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
            onPress={() => setExportDataExpanded(!exportDataExpanded)}
          >
            <Ionicons name="download-outline" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>
              Export Data
            </ThemedText>
            <Ionicons 
              name={exportDataExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#636E72" 
            />
          </Pressable>

          {exportDataExpanded && (
            <View style={{
              backgroundColor: 'white',
              marginBottom: 12,
              borderRadius: 12,
              padding: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <ThemedText style={{ fontSize: 14, lineHeight: 20, color: '#636E72' }}>
                Data export functionality will be available soon!{'\n\n'}
                <ThemedText style={{ fontWeight: '600', color: '#2D3436' }}>You will be able to download:</ThemedText>{'\n'}
                • Your thank you notes{'\n'}
                • Account information{'\n'}
                • Usage history{'\n\n'}
                <ThemedText style={{ fontStyle: 'italic' }}>This feature is currently in development.</ThemedText>
              </ThemedText>
            </View>
          )}
        </View>

        {/* Notifications */}
        <View style={{ marginBottom: 30 }}>
          <ThemedText type="title" style={{ fontSize: 20, marginBottom: 16 }}>
            Notifications
          </ThemedText>
          
          <Pressable 
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Ionicons name="mail-outline" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>
              Email Notifications
            </ThemedText>
            <Switch
              value={emailNotificationsEnabled}
              onValueChange={(value) => toggleEmailNotifications(value)}
            />
          </Pressable>

          <Pressable 
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Ionicons name="notifications-outline" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>
              Push Notifications
            </ThemedText>
            <Switch
              value={pushNotificationsEnabled}
              onValueChange={(value) => togglePushNotifications(value)}
            />
          </Pressable>

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
            onPress={handleDisableAllNotifications}
          >
            <Ionicons name="notifications-off-outline" size={24} color="#636E72" />
            <ThemedText style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>
              Disable All Notifications
            </ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#636E72" />
          </Pressable>
        </View>
      </ThemedView>
    </ScrollView>
  );
} 