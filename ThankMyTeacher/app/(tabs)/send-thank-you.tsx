import { useState, useEffect, useRef } from 'react';
import { ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform, StyleSheet, View, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles as externalStyles } from '../styles/styles';
import { searchSchools, School } from '../../assets/schoolDataService';
import { supabase } from '../../assets/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function TabTwoScreen() {
  const { user } = useAuth();
  
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

    setIsSending(true);

    try {
      // Create email content
      const emailSubject = `A Thank You Message from ${senderName || 'a student'}`;
      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #FF6B6B;">A Thank You Message</h2>
          
          <p><strong>Dear ${teacherName},</strong></p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="font-style: italic; font-size: 16px; line-height: 1.6; margin: 0;">
              "${message}"
            </p>
          </div>
          
          <p><strong>From:</strong> ${senderName || 'A grateful student'}</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #666; font-size: 12px;">
            This message was sent through ThankMyTeacher - a platform for expressing gratitude to educators.
          </p>
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
        }

        // Show success message
        Alert.alert(
          'Thank You Sent!',
          'Your message has been sent successfully. Thank you for expressing your gratitude!',
          [
            {
              text: 'Send Another',
              onPress: () => {
                // Reset form
                setTeacherName('');
                setTeacherEmail('');
                setMessage('');
                setSenderName('');
                setSelectedSchool(null);
                setSchoolSearch('');
              },
            },
            { text: 'OK' },
          ]
        );
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
      borderBottomColor: '#F0F0F0',
      backgroundColor: '#F8F9FA',
      borderLeftWidth: 3,
      borderLeftColor: '#FF6B6B',
      height: 70, // Fixed height
    },
    suggestionItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
      backgroundColor: '#FFFFFF',
      height: 70, // Fixed height
    },
    highlightedSuggestionText: {
      color: '#000000',
      fontSize: 16,
      fontWeight: '600',
    },
    highlightedSuggestionAddress: {
      color: '#666666',
      fontSize: 12,
      marginTop: 2,
      fontWeight: '500',
    }
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FF6B6B', dark: '#C92A2A' }}
      headerImage={
        <LinearGradient
          colors={['#FF6B6B', '#4ECDC4']}
          style={styles.exploreHeaderGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="mail" size={100} color="white" style={styles.exploreHeaderIcon} />
        </LinearGradient>
      }>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.exploreKeyboardView}
      >
        <ThemedView style={styles.exploreTitleContainer}>
          <ThemedText type="title">Send a Thank You</ThemedText>
          <ThemedText style={styles.exploreSubtitle}>
            Express your gratitude to a teacher who made a difference
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.exploreFormContainer}>
          {/* School Search */}
          <ThemedView style={[styles.exploreInputGroup, styles.searchGroupElevated]}>
            <ThemedText type="subtitle" style={styles.exploreInputLabel}>
              Find Your School
            </ThemedText>
            <ThemedView style={styles.exploreSearchWrapper}>
              <ThemedView style={styles.exploreSearchContainer}>
                <TextInput
                  ref={searchInputRef}
                  style={styles.exploreTextInput}
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
                <Ionicons name="search" size={20} color="#999" style={styles.exploreSearchIcon} />
              </ThemedView>

              {showSchoolSuggestions && foundSchools.length > 0 && (
                <ScrollView
                  ref={scrollViewRef}
                  style={[styles.exploreSuggestionsContainer, styles.suggestionsOverlay]}
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
                        style={index === highlightedIndex ? styles.highlightedSuggestionItem : styles.suggestionItem}
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
                          style={index === highlightedIndex ? styles.highlightedSuggestionText : styles.exploreSuggestionText}
                        >
                          {school.name}
                        </ThemedText>
                        <ThemedText 
                          style={index === highlightedIndex ? styles.highlightedSuggestionAddress : styles.exploreSuggestionAddress}
                        >
                          {school.location}
                        </ThemedText>
                      </Pressable>
                    </View>
                  ))}
                </ScrollView>
              )}
            </ThemedView>
          </ThemedView>

          {/* Teacher Name */}
          <ThemedView style={styles.exploreInputGroup}>
            <ThemedText type="subtitle" style={styles.exploreInputLabel}>
              Teacher's Name
            </ThemedText>
            <TextInput
              style={styles.exploreTextInput}
              placeholder="Enter teacher's full name"
              placeholderTextColor="#999"
              value={teacherName}
              onChangeText={setTeacherName}
            />
          </ThemedView>

          {/* Teacher Email */}
          <ThemedView style={styles.exploreInputGroup}>
            <ThemedText type="subtitle" style={styles.exploreInputLabel}>
              Teacher's Email
            </ThemedText>
            <TextInput
              style={styles.exploreTextInput}
              placeholder="teacher@school.edu"
              placeholderTextColor="#999"
              value={teacherEmail}
              onChangeText={setTeacherEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </ThemedView>

          {/* Message */}
          <ThemedView style={styles.exploreInputGroup}>
            <ThemedText type="subtitle" style={styles.exploreInputLabel}>
              Your Message
            </ThemedText>
            <TextInput
              style={[styles.exploreTextInput, styles.exploreMessageInput]}
              placeholder="Write your message here!"
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            <ThemedText style={styles.exploreCharCount}>
              {message.length} / 500 characters
            </ThemedText>
          </ThemedView>

          {/* Your Name (Optional) */}
          <ThemedView style={styles.exploreInputGroup}>
            <ThemedText type="subtitle" style={styles.exploreInputLabel}>
              Your Name (Optional)
            </ThemedText>
            <TextInput
              style={styles.exploreTextInput}
              placeholder="Add your name if you'd like"
              placeholderTextColor="#999"
              value={senderName}
              onChangeText={setSenderName}
            />
          </ThemedView>

          {/* Animation Preview */}
          <ThemedView style={styles.exploreAnimationSection}>
            <ThemedText type="subtitle" style={styles.exploreInputLabel}>
              Add Animation (Coming Soon!)
            </ThemedText>
            <ThemedView style={styles.exploreAnimationPreview}>
              <Ionicons name="sparkles" size={32} color="#4ECDC4" />
              <ThemedText style={styles.exploreAnimationText}>
                Soon you'll be able to add beautiful animations to make your thank you message extra special!
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Send Button */}
          <Pressable
            style={styles.exploreSendButton}
            onPress={handleSendThankYou}
            disabled={!selectedSchool || !teacherName || !teacherEmail || !message || isSending}
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF8E53']}
              style={styles.exploreSendGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ThemedText style={styles.exploreSendText}>
                {isSending ? 'Sending...' : 'Send Thank You'}
              </ThemedText>
              <Ionicons 
                name={isSending ? "hourglass" : "send"} 
                size={20} 
                color="white" 
              />
            </LinearGradient>
          </Pressable>
        </ThemedView>
      </KeyboardAvoidingView>
    </ParallaxScrollView>
  );
}