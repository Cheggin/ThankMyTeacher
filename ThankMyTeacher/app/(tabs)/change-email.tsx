import React, { useState } from 'react';
import { View, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../styles/styles';
import { AppColors } from '../../constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '../../assets/supabase';

export default function ChangeEmailScreen() {
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangeEmail = async () => {
    if (!newEmail || !confirmEmail) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
    if (newEmail !== confirmEmail) {
      Alert.alert('Error', 'Emails do not match.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.updateUser({ email: newEmail });
    setLoading(false);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Check your new email for a confirmation link.');
      router.replace('/(tabs)/account-settings');
    }
  };

  return (
    <ThemedView style={[styles.maxWidthContainer, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>  
      <ThemedText type="title" style={{ marginBottom: 32 }}>Change Email</ThemedText>
      
      <View style={styles.exploreInputGroup}>
        <ThemedText type="subtitle" style={styles.exploreInputLabel}>
          New Email
        </ThemedText>
        <TextInput
          style={styles.exploreTextInput}
          autoCapitalize="none"
          keyboardType="email-address"
          value={newEmail}
          onChangeText={setNewEmail}
          editable={!loading}
        />
      </View>
      
      <View style={styles.exploreInputGroup}>
        <ThemedText type="subtitle" style={styles.exploreInputLabel}>
          Confirm New Email
        </ThemedText>
        <TextInput
          style={styles.exploreTextInput}
          autoCapitalize="none"
          keyboardType="email-address"
          value={confirmEmail}
          onChangeText={setConfirmEmail}
          editable={!loading}
        />
      </View>
      
      <Pressable
        style={styles.buttonBlackBorder}
        onPress={handleChangeEmail}
        disabled={loading}
      >
        <ThemedText style={styles.ctaText}>{loading ? 'Changing...' : 'Change Email'}</ThemedText>
      </Pressable>
      
      <Pressable
        style={[styles.buttonBlackBorder, { marginTop: 16 }]}
        onPress={() => router.replace('/(tabs)/account-settings')}
      >
        <ThemedText style={styles.ctaText}>Back to Account Settings</ThemedText>
      </Pressable>
    </ThemedView>
  );
} 