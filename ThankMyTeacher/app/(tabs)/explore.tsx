import { useState, useEffect } from 'react';
import { ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles as externalStyles } from '../styles/styles';
// Make sure this path correctly points to your service file
import { searchSchools, School } from '../../assets/schoolDataService';

export default function TabTwoScreen() {
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

  // Debounce the search to avoid excessive calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Only search if the input isn't the currently selected school's name
      if (schoolSearch.length > 1 && schoolSearch !== selectedSchool?.name) {
        const results = searchSchools(schoolSearch);
        setFoundSchools(results);
      } else {
        setFoundSchools([]);
      }
    }, 100); // 100ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [schoolSearch, selectedSchool]);

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    setSchoolSearch(school.name); // Display the selected school name in the input
    setShowSchoolSuggestions(false);
  };

  const handleSendThankYou = () => {
    if (!selectedSchool) return;
    // Handle sending the thank you message
    console.log({
      schoolId: selectedSchool.id,
      schoolName: selectedSchool.name,
      teacherName,
      teacherEmail,
      message,
      senderName,
    });
  };

  // Combining original styles with fixes
  const styles = StyleSheet.create({
    ...externalStyles,
    suggestionsOverlay: {
      position: 'absolute',
      top: '100%',
      width: '100%',
      maxHeight: 250,
      zIndex: 20,
    },
    searchGroupElevated: {
      zIndex: 10,
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
                />
                <Ionicons name="search" size={20} color="#999" style={styles.exploreSearchIcon} />
              </ThemedView>

              {showSchoolSuggestions && foundSchools.length > 0 && (
                <ScrollView
                  style={[styles.exploreSuggestionsContainer, styles.suggestionsOverlay]}
                  keyboardShouldPersistTaps="handled"
                  nestedScrollEnabled={true}
                >
                  {foundSchools.map((school) => (
                    <Pressable
                      key={school.id}
                      style={styles.exploreSuggestionItem}
                      onPress={() => handleSchoolSelect(school)}
                    >
                      <ThemedText style={styles.exploreSuggestionText}>{school.name}</ThemedText>
                      {/* Make sure your styles file has exploreSuggestionAddress */}
                      <ThemedText style={styles.exploreSuggestionAddress}>{school.location}</ThemedText>
                    </Pressable>
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
              placeholder="Write your heartfelt message here..."
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
            disabled={!selectedSchool || !teacherName || !teacherEmail || !message}
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF8E53']}
              style={styles.exploreSendGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ThemedText style={styles.exploreSendText}>Send Thank You</ThemedText>
              <Ionicons name="send" size={20} color="white" />
            </LinearGradient>
          </Pressable>
        </ThemedView>
      </KeyboardAvoidingView>
    </ParallaxScrollView>
  );
}