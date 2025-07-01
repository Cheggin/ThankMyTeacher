import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '../styles/styles';
import { AppColors } from '../../constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function GoodbyeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={[styles.maxWidthContainer, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>  
      <View style={{ alignItems: 'center', marginTop: 80 }}>
        <Ionicons name="heart-outline" size={96} color={AppColors.primary} style={{ marginBottom: 24 }} />
        <ThemedText type="title" style={{ color: AppColors.textPrimary, fontSize: 36, marginBottom: 12 }}>
          Goodbye!
        </ThemedText>
        <ThemedText style={{ color: AppColors.textSecondary, fontSize: 18, textAlign: 'center', marginBottom: 32 }}>
          Your account has been successfully deleted.<br />
          Thank you for using ThankMyTeacher!
        </ThemedText>
        <Pressable
          style={styles.buttonBlackBorder}
          onPress={() => router.replace('/(tabs)')}
        >
          <ThemedText style={styles.ctaText}>Return to Homepage</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
} 