import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../assets/supabase';

interface ThankYou {
  id: string;
  user_id: string;
  teacher_name: string;
  message: string;
  created_at: string;
}

export default function ThankYousScreen() {
  const { user } = useAuth();
  const [thankYous, setThankYous] = useState<ThankYou[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchThankYous = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('thank_yous')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (!error && data) {
      setThankYous(data);
    }
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    fetchThankYous();
  }, [fetchThankYous]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchThankYous();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFF5F5' }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <ThemedView style={{ padding: 20, paddingTop: 40 }}>
        <ThemedText type="title" style={{ fontSize: 24, marginBottom: 16 }}>
          My Thank Yous
        </ThemedText>
        {loading ? (
          <ActivityIndicator size="large" color="#FF6B6B" />
        ) : thankYous.length === 0 ? (
          <ThemedText style={{ color: '#636E72', marginTop: 20 }}>
            You haven't sent any thank yous yet.
          </ThemedText>
        ) : (
          thankYous.map((ty) => (
            <View
              key={ty.id}
              style={{
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <ThemedText style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
                {ty.teacher_name}
              </ThemedText>
              <ThemedText style={{ color: '#636E72', marginBottom: 8 }}>
                {ty.message}
              </ThemedText>
              <ThemedText style={{ fontSize: 12, color: '#B2BEC3' }}>
                {new Date(ty.created_at).toLocaleString()}
              </ThemedText>
            </View>
          ))
        )}
      </ThemedView>
    </ScrollView>
  );
} 