import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, RefreshControl, ScrollView, Pressable, Animated } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import ThankYouMap from '../../components/ThankYouMap';
import { fetchThankYouMapData, SchoolMapData } from '../../services/thankYouMapService';
import { styles } from '../styles/styles';
import { AppColors } from '../../constants/Colors';

export default function MapScreen() {
  const [schoolData, setSchoolData] = useState<SchoolMapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayStatsCount, setDisplayStatsCount] = useState(0);
  const [displayTotalCount, setDisplayTotalCount] = useState(0);

  // Animation values for staggered loading
  const titleAnim = useRef(new Animated.Value(0)).current;
  const mapAnim = useRef(new Animated.Value(0)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;
  const statsCountAnim = useRef(new Animated.Value(0)).current;
  const totalCountAnim = useRef(new Animated.Value(0)).current;
  const mapCardScaleAnim = useRef(new Animated.Value(1)).current;
  const statsCardScaleAnim = useRef(new Animated.Value(1)).current;

  const loadMapData = async () => {
    setLoading(true);
    try {
      const data = await fetchThankYouMapData();
      setSchoolData(data);
    } catch (error) {
      console.error('Error loading map data:', error);
    } finally {
      setLoading(false);
      // Start animations after data loads
      setTimeout(() => {
        setIsLoaded(true);
        animateSections();
      }, 200);
    }
  };

  const animateSections = () => {
    // Reset animation values
    titleAnim.setValue(0);
    mapAnim.setValue(0);
    statsAnim.setValue(0);
    statsCountAnim.setValue(0);
    totalCountAnim.setValue(0);

    // Staggered section animations
    Animated.stagger(200, [
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(mapAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(statsAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate stats counts
    if (schoolData.length > 0) {
      Animated.parallel([
        Animated.timing(statsCountAnim, {
          toValue: schoolData.length,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(totalCountAnim, {
          toValue: schoolData.reduce((total, school) => total + school.thankYouCount, 0),
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  useEffect(() => {
    loadMapData();
  }, []);

  // Animate stats when data changes
  useEffect(() => {
    if (schoolData.length > 0 && isLoaded) {
      Animated.parallel([
        Animated.timing(statsCountAnim, {
          toValue: schoolData.length,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(totalCountAnim, {
          toValue: schoolData.reduce((total, school) => total + school.thankYouCount, 0),
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setDisplayStatsCount(schoolData.length);
          setDisplayTotalCount(schoolData.reduce((total, school) => total + school.thankYouCount, 0));
        }
      });
    }
  }, [schoolData, isLoaded]);

  // Update display counts during animation
  useEffect(() => {
    const statsListener = statsCountAnim.addListener(({ value }) => {
      setDisplayStatsCount(Math.round(value));
    });
    const totalListener = totalCountAnim.addListener(({ value }) => {
      setDisplayTotalCount(Math.round(value));
    });
    return () => {
      statsCountAnim.removeListener(statsListener);
      totalCountAnim.removeListener(totalListener);
    };
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMapData();
    setRefreshing(false);
  };

  const handleSchoolPress = (school: SchoolMapData) => {
    // You can add navigation to a school detail page here
    console.log('School pressed:', school);
  };

  const handleCardHover = (cardId: string, isHovering: boolean) => {
    setHovered(isHovering ? cardId : null);
    
    // Enhanced hover animation for specific card
    let targetAnim: Animated.Value;
    switch (cardId) {
      case 'map':
        targetAnim = mapCardScaleAnim;
        break;
      case 'stats':
        targetAnim = statsCardScaleAnim;
        break;
      default:
        return;
    }
    
    Animated.timing(targetAnim, {
      toValue: isHovering ? 1.02 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
        <ThemedText style={styles.loadingText}>Loading thank you map...</ThemedText>
      </View>
    );
  }

  return (
      <ScrollView
      style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
      <View style={styles.maxWidthContainer}>
        <View style={styles.contentContainer}>
          <Animated.View
            style={{
              opacity: titleAnim,
              transform: [
                { translateY: titleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                })},
              ],
            }}
          >
            <ThemedText type="title" style={styles.sectionTitleLarge}>
            Thank You Map
          </ThemedText>
            <ThemedText style={styles.sectionSubtitle}>
            See where appreciation messages have been sent around the world
          </ThemedText>
          </Animated.View>
        </View>

        <Animated.View 
          style={[
            styles.card, 
            { 
              height: 400, 
              marginBottom: 20, 
              overflow: 'hidden',
            },
            {
              opacity: mapAnim,
              transform: [
                { translateY: mapAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                })},
              ],
            }
          ]}
        >
          <ThankYouMap 
            schoolData={schoolData} 
            onSchoolPress={handleSchoolPress}
          />
        </Animated.View>

        {schoolData.length > 0 && (
          <Animated.View 
            style={[
              styles.card, 
              { 
                marginBottom: 20,
              },
              {
                opacity: statsAnim,
                transform: [
                  { translateY: statsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  })},
                ],
              }
            ]}
          >
              <ThemedText type="subtitle" style={styles.sectionTitleLarge}>
              Map Statistics
            </ThemedText>
              <View style={[styles.row, styles.spaceBetween, { marginTop: 16 }]}>
                <View style={[styles.centerContent, { flex: 1 }]}>
                  <ThemedText style={[styles.sectionTitleLarge, { color: '#FF6B6B' }, styles.marginBottom4]}>
                    {displayStatsCount}
                  </ThemedText>
                  <ThemedText style={[styles.cardSubtitle, { textAlign: 'center' }]}>
                    Schools
                  </ThemedText>
              </View>
                <View style={[styles.centerContent, { flex: 1 }]}>
                  <ThemedText style={[styles.sectionTitleLarge, { color: '#FF6B6B' }, styles.marginBottom4]}>
                    {displayTotalCount}
                  </ThemedText>
                  <ThemedText style={[styles.cardSubtitle, { textAlign: 'center' }]}>
                    Total Thank Yous
                </ThemedText>
                </View>
              </View>
            </Animated.View>
        )}
        
        {/* Animated Divider */}
        <Animated.View 
          style={[
            styles.divider, 
            { 
              opacity: statsAnim,
              transform: [{ scaleX: statsAnim }],
            }
          ]} 
        />
        
        {/* Animated Footer */}
        <Animated.View 
          style={[
            styles.footer, 
            { 
              opacity: statsAnim,
              transform: [{ translateY: statsAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              })}],
            }
          ]}
        >
          <ThemedText style={{ color: AppColors.textSecondary, fontSize: 16 }}>
            © {new Date().getFullYear()} Reagan Hsu &nbsp;
            <ThemedText style={{ color: '#FF6B6B' }}>♥</ThemedText>
          </ThemedText>
        </Animated.View>
      </View>
      </ScrollView>
  );
} 