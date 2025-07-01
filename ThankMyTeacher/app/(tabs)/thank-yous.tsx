import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, RefreshControl, ActivityIndicator, Pressable } from 'react-native';
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
import { supabase } from '../../assets/supabase';
import { styles } from '../styles/styles';
import { AppColors } from '../../constants/Colors';

interface ThankYou {
  id: string;
  user_id: string;
  teacher_name: string;
  message: string;
  created_at: string;
  school_name: string;
}

export default function ThankYousScreen() {
  const { user } = useAuth();
  const [thankYous, setThankYous] = useState<ThankYou[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(30);
  const contentOpacity = useSharedValue(0);
  const contentScale = useSharedValue(0.95);
  
  // Card hover animations
  const cardHoverScales = useSharedValue<{ [key: string]: number }>({});

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
      
      // Initialize hover scales for each card
      const newCardHoverScales: { [key: string]: number } = {};
      data.forEach((ty) => {
        newCardHoverScales[ty.id] = 1;
      });
      cardHoverScales.value = newCardHoverScales;
    }
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    fetchThankYous();
  }, [fetchThankYous]);

  useEffect(() => {
    if (!loading) {
      // Start entrance animations
      headerOpacity.value = withTiming(1, { duration: 800 });
      headerTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 });
      
      contentOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
      contentScale.value = withDelay(200, withSpring(1, { damping: 15, stiffness: 100 }));
      
      setIsLoaded(true);
    }
  }, [loading, thankYous]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchThankYous();
    setRefreshing(false);
  };

  // Animated styles
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ scale: contentScale.value }],
  }));

  // Create a single animated style that handles all cards
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {};
  });

  return (
    <ScrollView
      style={styles.scrollContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.maxWidthContainer}>
        <View style={styles.contentContainer}>
          {/* Header */}
          <Animated.View style={[styles.section, headerAnimatedStyle]}>
            <ThemedText type="title" style={[styles.sectionTitleLarge, { marginBottom: 8 }]}>
              My Thank Yous
            </ThemedText>
            <ThemedText style={[styles.cardSubtitle, { color: AppColors.textSecondary }]}>
              {thankYous.length > 0 
                ? `${thankYous.length} message${thankYous.length === 1 ? '' : 's'} sent`
                : 'Send a message to get started!'
              }
            </ThemedText>
          </Animated.View>

          {/* Content */}
          <Animated.View style={[styles.section, contentAnimatedStyle]}>
            {loading ? (
              <View style={styles.centerContent}>
                <ActivityIndicator size="large" color={AppColors.primary} />
              </View>
            ) : thankYous.length === 0 ? (
              <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptySubtitle}>
                  You haven't sent any thank yous yet.
                </ThemedText>
                <ThemedText style={[styles.textMuted, { marginTop: 8 }]}>
                  Start by sending your first thank you message!
                </ThemedText>
              </View>
            ) : (
              thankYous.map((ty) => (
                <Pressable
                  key={ty.id}
                  style={[
                    styles.card,
                    hovered === ty.id && styles.cardHover,
                  ]}
                  onHoverIn={() => {
                    setHovered(ty.id);
                    cardHoverScales.value[ty.id] = withSpring(1.02, { damping: 15, stiffness: 300 });
                  }}
                  onHoverOut={() => {
                    setHovered(null);
                    cardHoverScales.value[ty.id] = withSpring(1, { damping: 15, stiffness: 300 });
                  }}
                >
                  <ThemedText style={[styles.cardTitle, styles.marginBottom4]}>
                    {"To: " + ty.teacher_name + " at " + ty.school_name}
                  </ThemedText>
                  <ThemedText style={[styles.cardSubtitle, styles.marginBottom8]}>
                    {ty.message}
                  </ThemedText>
                  <ThemedText style={styles.textMuted}>
                    {new Date(ty.created_at).toLocaleString()}
                  </ThemedText>
                </Pressable>
              ))
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