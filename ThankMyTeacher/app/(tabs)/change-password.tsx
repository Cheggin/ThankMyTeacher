import React, { useState } from 'react';
import { View, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../styles/styles';
import { AppColors } from '../../constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '../../assets/supabase';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }
    setLoading(true);
    // Supabase requires re-authentication for password change
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: (await supabase.auth.getUser()).data.user?.email,
      password: currentPassword,
    });
    if (signInError) {
      setLoading(false);
      Alert.alert('Error', 'Current password is incorrect.');
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Password changed successfully. Please log in again.');
      router.replace('/(tabs)/account-settings');
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.maxWidthContainer}>
        <View style={styles.contentContainer}>
          <ThemedText type="title" style={styles.sectionTitleLarge}>
            Change Password
          </ThemedText>
          
          <ThemedView style={styles.heroSection}>
            <View style={styles.exploreInputGroup}>
              <ThemedText type="subtitle" style={styles.exploreInputLabel}>
                Current Password
              </ThemedText>
              <TextInput
                style={styles.exploreTextInput}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
                editable={!loading}
              />
            </View>
            
            <View style={styles.exploreInputGroup}>
              <ThemedText type="subtitle" style={styles.exploreInputLabel}>
                New Password
              </ThemedText>
              <TextInput
                style={styles.exploreTextInput}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                editable={!loading}
              />
            </View>
            
            <View style={styles.exploreInputGroup}>
              <ThemedText type="subtitle" style={styles.exploreInputLabel}>
                Confirm New Password
              </ThemedText>
              <TextInput
                style={styles.exploreTextInput}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!loading}
              />
            </View>
            
            <Pressable
              style={styles.buttonBlackBorder}
              onPress={handleChangePassword}
              disabled={loading}
            >
              <ThemedText style={styles.ctaText}>{loading ? 'Changing...' : 'Change Password'}</ThemedText>
            </Pressable>
            
            <Pressable
              style={[styles.buttonBlackBorder, { marginTop: 16 }]}
              onPress={() => router.replace('/(tabs)/account-settings')}
            >
              <ThemedText style={styles.ctaText}>Back to Account Settings</ThemedText>
            </Pressable>
          </ThemedView>
        </View>
      </View>
    </ScrollView>
  );
} 