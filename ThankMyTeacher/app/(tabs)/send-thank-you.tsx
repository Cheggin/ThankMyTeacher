import { useState, useEffect, useRef } from 'react';
import { ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform, StyleSheet, View, Alert, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { EmailPreview } from '@/components/EmailPreview';
import { styles as externalStyles } from '../styles/styles';
import { AppColors } from '../../constants/Colors';
import { searchSchools, School } from '../../assets/schoolDataService';
import { supabase } from '../../assets/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { upsertUserData } from '../../services/userDataService';
import { useDeviceType } from '../../hooks/useDeviceType';

export default function TabTwoScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { isMobile } = useDeviceType();
  
  // Responsive layout logic
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  // Handle window resize
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);
  
  // State for user inputs
  const [schoolSearch, setSchoolSearch] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');

  // State for search functionality
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [foundSchools, setFoundSchools] = useState<School[]>([]);
  const [showSchoolSuggestions, setShowSchoolSuggestions] = useState(false);
  
  // State for keyboard navigation
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isNavigatingWithKeyboard, setIsNavigatingWithKeyboard] = useState(false);
  const searchInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const itemRefs = useRef<{ [key: number]: View | null }>({});

  // State for sending
  const [isSending, setIsSending] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation values for staggered loading
  const headerAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const schoolSearchAnim = useRef(new Animated.Value(0)).current;
  const teacherNameAnim = useRef(new Animated.Value(0)).current;
  const teacherEmailAnim = useRef(new Animated.Value(0)).current;
  const messageAnim = useRef(new Animated.Value(0)).current;
  const senderNameAnim = useRef(new Animated.Value(0)).current;
  const animationPreviewAnim = useRef(new Animated.Value(0)).current;
  const sendButtonAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  // Start animations when component mounts
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      animateSections();
    }, 300);
  }, []);

  const animateSections = () => {
    // Staggered section animations
    Animated.stagger(150, [
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(schoolSearchAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(teacherNameAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(teacherEmailAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(messageAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(senderNameAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(animationPreviewAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(sendButtonAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Debounce the search to avoid excessive calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Only search if the input isn't the currently selected school's name
      if (schoolSearch.length > 2 && schoolSearch !== selectedSchool?.name) {
        const results = searchSchools(schoolSearch);
        setFoundSchools(results);
        setHighlightedIndex(-1); // Reset highlight when new results
      } else {
        setFoundSchools([]);
        setHighlightedIndex(-1);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [schoolSearch, selectedSchool]);

  // Auto-scroll to highlighted item
  useEffect(() => {
    if (highlightedIndex >= 0 && isNavigatingWithKeyboard && scrollViewRef.current) {
      const itemHeight = 70; // Actual height of each school item (padding + text + border)
      const visibleItems = 3; // Exactly 3 items visible
      const dropdownHeight = itemHeight * visibleItems; // 210px for 3 items
      
      // Calculate scroll position to show exactly 3 items
      let scrollY = 0;
      
      if (highlightedIndex >= visibleItems) {
        // If we're past the first 3 items, scroll to show the current item and 2 above it
        scrollY = (highlightedIndex - visibleItems + 1) * itemHeight;
      }
      
      // Ensure we don't scroll past the end
      const maxScroll = Math.max(0, (foundSchools.length - visibleItems) * itemHeight);
      scrollY = Math.min(scrollY, maxScroll);
      
      scrollViewRef.current?.scrollTo({
        y: scrollY,
        animated: true,
      });
    }
  }, [highlightedIndex, isNavigatingWithKeyboard, foundSchools.length]);

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    setSchoolSearch(school.name); // Display the selected school name in the input
    setShowSchoolSuggestions(false);
    setHighlightedIndex(-1);
    setIsNavigatingWithKeyboard(false);
  };

  const handleKeyPress = (e: any) => {
    if (!showSchoolSuggestions || foundSchools.length === 0) return;

    const key = e.nativeEvent?.key || e.key;
    
    switch (key) {
      case 'ArrowDown':
        e.preventDefault();
        setIsNavigatingWithKeyboard(true);
        // Add a small delay to prevent too rapid selection changes
        setTimeout(() => {
          setHighlightedIndex(prev => 
            prev < foundSchools.length - 1 ? prev + 1 : 0
          );
        }, 10);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setIsNavigatingWithKeyboard(true);
        // Add a small delay to prevent too rapid selection changes
        setTimeout(() => {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : foundSchools.length - 1
          );
        }, 10);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < foundSchools.length) {
          handleSchoolSelect(foundSchools[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowSchoolSuggestions(false);
        setHighlightedIndex(-1);
        setIsNavigatingWithKeyboard(false);
        break;
    }
  };

  const handleSendThankYou = async () => {
    if (!selectedSchool || !teacherName || !teacherEmail || !message) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsSending(true);

    try {
      // Create email content
      const emailSubject = `A Thank You Message from ${senderName || 'a student'}`;
      const emailContent = `
        <div style="font-family: 'Montserrat', 'Inter', 'Open Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 0; background: ${AppColors.backgroundLight};">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="font-size: 32px; font-weight: 700; color: ${AppColors.primary}; letter-spacing: 1px; font-family: 'Montserrat', 'Inter', 'Open Sans', Arial, sans-serif;">ThankMyTeacher</div>
            <div style="width: 64px; height: 4px; background: linear-gradient(90deg, ${AppColors.primary}, ${AppColors.secondary}); border-radius: 2px; margin: 16px auto 0 auto;"></div>
          </div>
          <div style="background: #fff; border: 1px solid ${AppColors.border}; border-radius: 14px; padding: 32px 28px; margin-bottom: 28px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);">
            <p style="color: ${AppColors.textPrimary}; font-size: 18px; margin: 0 0 24px 0; font-weight: 600;">Dear ${teacherName},</p>
            <div style="background: ${AppColors.card}; padding: 22px; border-radius: 8px; border-left: 4px solid ${AppColors.primary}; margin: 18px 0;">
              <p style="font-size: 17px; line-height: 1.7; margin: 0; color: ${AppColors.textPrimary};">${message}</p>
            </div>
            <p style="color: ${AppColors.textSecondary}; font-size: 15px; margin: 24px 0 0 0;">Best,<br><span style="color: ${AppColors.textPrimary}; font-weight: 700;">${senderName || 'a grateful student'}</span></p>
          </div>
          <div style="text-align: center; padding: 18px; background: ${AppColors.backgroundLight}; border-radius: 10px;">
            <p style="color: ${AppColors.textSecondary}; font-size: 13px; margin: 0; line-height: 1.5;">
              This message was sent through <span style="color: ${AppColors.primary}; font-weight: 600;">ThankMyTeacher.net</span><br>
              A platform dedicated to expressing gratitude to educators
            </p>
          </div>
        </div>
      `;

      // Call the Edge Function to send email
      const { data, error } = await supabase.functions.invoke('send-thank-you', {
        body: {
          to: teacherEmail,
          subject: emailSubject,
          message: emailContent,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        // Save to database
        const { error: dbError } = await supabase
          .from('thank_yous')
          .insert({
            user_id: user?.id,
            school_id: selectedSchool.id,
            school_name: selectedSchool.name,
            teacher_name: teacherName,
            teacher_email: teacherEmail,
            message: message,
            sender_name: senderName || null,
          });

        if (dbError) {
          console.error('Database error:', dbError);
          throw new Error('Failed to save thank you to database');
        }

        // Update user's emails_sent count in profiles table
        if (user?.id) {
          const { data: userData } = await supabase
            .from('profiles')
            .select('emails_sent')
            .eq('id', user.id)
            .single();

          const currentCount = userData?.emails_sent || 0;
          const newCount = currentCount + 1;

          const { error: updateError } = await supabase
            .from('profiles')
            .update({ 
              emails_sent: newCount,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id);

          if (updateError) {
            console.error('Error updating user stats:', updateError);
            // Don't throw error here as the thank you was already saved
          }
        }

        // Navigate to Sent page and reset form
        router.replace('/(tabs)/sent');
        setTeacherName('');
        setTeacherEmail('');
        setMessage('');
        setSenderName('');
        setSelectedSchool(null);
        setSchoolSearch('');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending thank you:', error);
      Alert.alert(
        'Error',
        'Failed to send your thank you message. Please try again later.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleButtonHover = (isHovering: boolean) => {
    setHovered(isHovering);
    
    // Enhanced hover animation
    Animated.timing(buttonScaleAnim, {
      toValue: isHovering ? 1.02 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  // Combining original styles with fixes
  const styles = StyleSheet.create({
    ...externalStyles,
    suggestionsOverlay: {
      position: 'absolute',
      top: '100%',
      width: '100%',
      maxHeight: 210, // Exactly 3 items (70px each)
      zIndex: 20,
      marginTop: 4, // Small even margin instead of padding
    },
    searchGroupElevated: {
      zIndex: 10,
    },
    highlightedSuggestionItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: AppColors.borderLight,
      backgroundColor: AppColors.cardHover,
      borderLeftWidth: 3,
      borderLeftColor: AppColors.error,
      height: 70, // Fixed height
    },
    suggestionItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: AppColors.borderLight,
      backgroundColor: AppColors.backgroundLight,
      height: 70, // Fixed height
    },
    highlightedSuggestionText: {
      color: AppColors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    highlightedSuggestionAddress: {
      color: AppColors.textSecondary,
      fontSize: 12,
      marginTop: 2,
      fontWeight: '500',
    }
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: AppColors.backgroundLight, dark: AppColors.backgroundLight }}
      headerImage={
        <Animated.View 
          style={[
            externalStyles.headerGradient, 
            { backgroundColor: AppColors.background },
            {
              opacity: headerAnim,
              transform: [
                { translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                })},
              ],
            }
          ]}
        >
          <ThemedView style={externalStyles.headerContent}>
            <Animated.View 
              style={[
                externalStyles.headerIconGroup,
                {
                  transform: [{ scale: headerAnim }],
                }
              ]}
            >
              <Ionicons name="heart" size={80} color="#FF6B6B" style={externalStyles.headerIconMain} />
            </Animated.View>
            <Animated.Text 
              style={[
                externalStyles.headerTitle,
                {
                  opacity: headerAnim,
                  transform: [
                    { translateY: headerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    })},
                  ],
                }
              ]}
            >
              Send a Thank You Note
            </Animated.Text>
          </ThemedView>
        </Animated.View>
      }
    >
      <View style={externalStyles.fullWidthContainer}>
        <ThemedView style={externalStyles.heroSectionFullWidth}>
          <KeyboardAvoidingView
            behavior={isMobile ? 'padding' : 'height'}
            style={externalStyles.exploreKeyboardView}
          >
            <Animated.View 
              style={[
                externalStyles.exploreTitleContainer,
                {
                  opacity: titleAnim,
                  transform: [
                    { translateY: titleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    })},
                  ],
                }
              ]}
            >
            </Animated.View>

            <ThemedView style={isMobile ? externalStyles.responsiveContainerMobile : externalStyles.responsiveContainer}>
              {/* Form Column */}
              <ThemedView style={isMobile ? externalStyles.formColumnMobile : externalStyles.formColumn}>
                <ThemedView style={externalStyles.exploreFormContainerTwoColumn}>
              {/* School Search */}
              <Animated.View 
                style={[
                  externalStyles.exploreInputGroup, 
                  externalStyles.searchGroupElevated,
                  {
                    opacity: schoolSearchAnim,
                    transform: [
                      { translateY: schoolSearchAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      })},
                    ],
                  }
                ]}
              >
                <ThemedText type="subtitle" style={externalStyles.exploreInputLabel}>
                  Find Your School
                </ThemedText>
                <ThemedView style={externalStyles.exploreSearchWrapper}>
                  <ThemedView style={externalStyles.exploreSearchContainer}>
                    <TextInput
                      ref={searchInputRef}
                      style={externalStyles.exploreTextInput}
                      placeholder="Search for your school..."
                      placeholderTextColor="#999"
                      value={schoolSearch}
                      onChangeText={(text) => {
                        setSchoolSearch(text);
                        if(text === '') setSelectedSchool(null);
                        setShowSchoolSuggestions(true);
                      }}
                      onFocus={() => setShowSchoolSuggestions(true)}
                      onBlur={() => {
                        setTimeout(() => setShowSchoolSuggestions(false), 200);
                      }}
                      onKeyPress={handleKeyPress}
                    />
                    <Ionicons name="search" size={20} color="#999" style={externalStyles.exploreSearchIcon} />
                  </ThemedView>

                  {showSchoolSuggestions && foundSchools.length > 0 && (
                    <ScrollView
                      ref={scrollViewRef}
                      style={[externalStyles.exploreSuggestionsContainer, externalStyles.suggestionsOverlay]}
                      keyboardShouldPersistTaps="handled"
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={true}
                    >
                      {foundSchools.map((school, index) => (
                        <View
                          key={school.id}
                          ref={(ref) => {
                            itemRefs.current[index] = ref;
                          }}
                        >
                          <Pressable
                            style={index === highlightedIndex ? externalStyles.highlightedSuggestionItem : externalStyles.suggestionItem}
                            onPress={() => handleSchoolSelect(school)}
                            onHoverIn={() => {
                              if (!isNavigatingWithKeyboard) {
                                setHighlightedIndex(index);
                              }
                            }}
                            onHoverOut={() => {
                              if (!isNavigatingWithKeyboard) {
                                setHighlightedIndex(-1);
                              }
                            }}
                          >
                            <ThemedText 
                              style={index === highlightedIndex ? externalStyles.highlightedSuggestionText : externalStyles.exploreSuggestionText}
                            >
                              {school.name}
                            </ThemedText>
                            <ThemedText 
                              style={index === highlightedIndex ? externalStyles.highlightedSuggestionAddress : externalStyles.exploreSuggestionAddress}
                            >
                              {school.location}
                            </ThemedText>
                          </Pressable>
                        </View>
                      ))}
                    </ScrollView>
                  )}
                </ThemedView>
              </Animated.View>

              {/* Teacher Name */}
              <Animated.View 
                style={[
                  externalStyles.exploreInputGroup,
                  {
                    opacity: teacherNameAnim,
                    transform: [
                      { translateY: teacherNameAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      })},
                    ],
                  }
                ]}
              >
                <ThemedText type="subtitle" style={externalStyles.exploreInputLabel}>
                  Teacher's Name
                </ThemedText>
                <TextInput
                  style={externalStyles.exploreTextInput}
                  placeholder="Enter teacher's full name"
                  placeholderTextColor="#999"
                  value={teacherName}
                  onChangeText={setTeacherName}
                />
              </Animated.View>

              {/* Teacher Email */}
              <Animated.View 
                style={[
                  externalStyles.exploreInputGroup,
                  {
                    opacity: teacherEmailAnim,
                    transform: [
                      { translateY: teacherEmailAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      })},
                    ],
                  }
                ]}
              >
                <ThemedText type="subtitle" style={externalStyles.exploreInputLabel}>
                  Teacher's Email
                </ThemedText>
                <TextInput
                  style={externalStyles.exploreTextInput}
                  placeholder="teacher@school.edu"
                  placeholderTextColor="#999"
                  value={teacherEmail}
                  onChangeText={setTeacherEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Animated.View>

              {/* Message */}
              <Animated.View 
                style={[
                  externalStyles.exploreInputGroup,
                  {
                    opacity: messageAnim,
                    transform: [
                      { translateY: messageAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      })},
                    ],
                  }
                ]}
              >
                <ThemedText type="subtitle" style={externalStyles.exploreInputLabel}>
                  Your Message
                </ThemedText>
                <TextInput
                  style={[externalStyles.exploreTextInput, externalStyles.exploreMessageInput]}
                  placeholder="Write your message here!"
                  placeholderTextColor="#999"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
                <ThemedText style={externalStyles.exploreCharCount}>
                  {message.length} / 500 characters
                </ThemedText>
              </Animated.View>

              {/* Your Name (Optional) */}
              <Animated.View 
                style={[
                  externalStyles.exploreInputGroup,
                  {
                    opacity: senderNameAnim,
                    transform: [
                      { translateY: senderNameAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      })},
                    ],
                  }
                ]}
              >
                <ThemedText type="subtitle" style={externalStyles.exploreInputLabel}>
                  Your Name (Optional)
                </ThemedText>
                <TextInput
                  style={externalStyles.exploreTextInput}
                  placeholder="Add your name if you'd like"
                  placeholderTextColor="#999"
                  value={senderName}
                  onChangeText={setSenderName}
                />
              </Animated.View>

              {/* Animation Preview */}
              <Animated.View 
                style={[
                  externalStyles.exploreAnimationSection,
                  {
                    opacity: animationPreviewAnim,
                    transform: [
                      { translateY: animationPreviewAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      })},
                    ],
                  }
                ]}
              >
                <ThemedText type="subtitle" style={externalStyles.exploreInputLabel}>
                  Add Animation (Coming Soon!)
                </ThemedText>
                <ThemedView style={externalStyles.exploreAnimationPreview}>
                  <Ionicons name="sparkles" size={32} color="#4ECDC4" />
                  <ThemedText style={externalStyles.exploreAnimationText}>
                    Soon you'll be able to add beautiful animations to make your thank you message extra special!
                  </ThemedText>
                </ThemedView>
              </Animated.View>

              {/* Send Button */}
              <Animated.View 
                style={[
                  {
                    opacity: sendButtonAnim,
                    transform: [
                      { translateY: sendButtonAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      })},
                      { scale: buttonScaleAnim },
                    ],
                  }
                ]}
              >
                <Pressable
                  style={[
                    externalStyles.exploreSendButton,
                    hovered && externalStyles.buttonHover,
                    {
                      shadowOpacity: hovered ? 0.3 : 0.1,
                      shadowRadius: hovered ? 8 : 4,
                    }
                  ]}
                  onPress={handleSendThankYou}
                  onHoverIn={() => handleButtonHover(true)}
                  onHoverOut={() => handleButtonHover(false)}
                  disabled={!selectedSchool || !teacherName || !teacherEmail || !message || isSending}
                >
                  <View style={externalStyles.exploreSendGradient}>
                    <ThemedText style={externalStyles.exploreSendText}>
                      {isSending ? 'Sending...' : 'Send Thank You'}
                    </ThemedText>
                    <Ionicons 
                      name={isSending ? "hourglass" : "send"} 
                      size={20} 
                      color="white" 
                    />
                  </View>
                </Pressable>
              </Animated.View>
                </ThemedView>
              </ThemedView>

              {/* Preview Column */}
              <ThemedView style={isMobile ? externalStyles.previewColumnMobile : externalStyles.previewColumn}>
                <EmailPreview
                  teacherName={teacherName}
                  message={message}
                  senderName={senderName}
                  schoolName={selectedSchool?.name}
                />
              </ThemedView>
            </ThemedView>
          </KeyboardAvoidingView>
        </ThemedView>
        
        {/* Animated Divider */}
        <Animated.View 
          style={[
            externalStyles.divider, 
            { 
              opacity: sendButtonAnim,
              transform: [{ scaleX: sendButtonAnim }],
            }
          ]} 
        />
        
        {/* Animated Footer */}
        <Animated.View 
          style={[
            externalStyles.footer, 
            { 
              opacity: sendButtonAnim,
              transform: [{ translateY: sendButtonAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              })}],
            }
          ]}
        >
          <ThemedText style={{ color: AppColors.textSecondary, fontSize: 16 }}>
            © {new Date().getFullYear()} Reagan Hsu &nbsp;
            <Ionicons name="heart" size={16} color="#FF6B6B" />
          </ThemedText>
        </Animated.View>
      </View>
    </ParallaxScrollView>
  );
}