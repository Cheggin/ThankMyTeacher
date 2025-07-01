import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '../styles/styles';
import { AppColors } from '../../constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SentScreen() {
  const router = useRouter();

  return (
    <ThemedView style={[styles.maxWidthContainer, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>  
      <View style={{ alignItems: 'center', marginTop: 80 }}>
        <Ionicons name="checkmark-circle" size={96} color={AppColors.success} style={{ marginBottom: 24 }} />
        <ThemedText type="title" style={{ color: AppColors.success, fontSize: 36, marginBottom: 12 }}>
          Sent!
        </ThemedText>
        <ThemedText style={{ color: AppColors.textPrimary, fontSize: 18, textAlign: 'center', marginBottom: 32 }}>
          Your thank you message has been delivered.<br />
          Thank you for spreading gratitude!
        </ThemedText>
        <Pressable
          style={[styles.buttonBlackBorder, { marginBottom: 16 }]}
          onPress={() => router.replace('/(tabs)/send-thank-you')}
        >
          <ThemedText style={styles.ctaText}>Send Another</ThemedText>
        </Pressable>
        <Pressable
          style={styles.buttonBlackBorder}
          onPress={() => router.replace('/(tabs)/dashboard')}
        >
          <ThemedText style={styles.ctaText}>Go to Dashboard</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
} 