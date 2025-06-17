import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Header Styles
  headerGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  headerIconGroup: {
    position: 'relative',
    marginBottom: 15,
  },
  headerIconMain: {
    opacity: 0.9,
  },
  sparkleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sparkle1: {
    position: 'absolute',
    top: -10,
    right: -20,
  },
  sparkle2: {
    position: 'absolute',
    bottom: -5,
    left: -15,
  },
  sparkle3: {
    position: 'absolute',
    top: 10,
    left: -25,
  },
  headerTitle: {
    color: '#2D3436',
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#636E72',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontStyle: 'italic',
  },

  // Hero Section
  heroSection: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2D3436',
    lineHeight: 36,
  },
  heroDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    color: '#636E72',
    paddingHorizontal: 10,
  },
  ctaButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 28,
    gap: 10,
  },
  ctaText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },

  // Quote Section
  quoteSection: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: '#FFEBEB',
  },
  quoteText: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#2D3436',
    marginBottom: 12,
    lineHeight: 28,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#636E72',
  },

  // Stories Section
  storiesSection: {
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2D3436',
    paddingHorizontal: 20,
  },
  storiesScroll: {
    paddingLeft: 20,
  },
  storyCard: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 20,
    marginRight: 16,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.1)',
  },
  storyQuote: {
    fontSize: 15,
    lineHeight: 22,
    color: '#2D3436',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  storyAuthor: {
    fontSize: 13,
    color: '#FF6B6B',
    fontWeight: '500',
  },

  // Why Section
  whySection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#E6F9F5',
  },
  reasonCard: {
    flexDirection: 'row',
    marginBottom: 28,
    alignItems: 'center',
  },
  reasonIconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  reasonContent: {
    flex: 1,
  },
  reasonTitle: {
    fontSize: 18,
    marginBottom: 6,
    color: '#2D3436',
    fontWeight: '500',
  },
  reasonDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#636E72',
  },

  // Simple Steps Section
  simpleStepsSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  stepNumberCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  stepNumber: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: '600',
  },
  stepText: {
    fontSize: 16,
    color: '#2D3436',
    flex: 1,
  },

  // Final CTA Section
  finalCtaSection: {
    paddingVertical: 60,
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: '#FFF0E6',
  },
  finalCtaEmoji: {
    fontSize: 48,
    marginBottom: 20,
  },
  finalCtaTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    color: '#2D3436',
  },
  finalCtaDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 28,
    color: '#636E72',
  },
  finalCtaButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  finalCtaButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },

  // Explore/Send Thank You Page Styles
  exploreHeaderGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreHeaderIcon: {
    opacity: 0.9,
  },
  exploreKeyboardView: {
    flex: 1,
  },
  exploreTitleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  exploreSubtitle: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 8,
  },
  exploreFormContainer: {
    padding: 20,
  },
  exploreInputGroup: {
    marginBottom: 24,
  },
  exploreInputLabel: {
    marginBottom: 8,
    fontSize: 16,
  },
  exploreTextInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  exploreSearchWrapper: {
    position: 'relative',
    zIndex: 999,
  },
  exploreSearchContainer: {
    position: 'relative',
  },
  exploreSearchIcon: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  exploreSuggestionsContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    maxHeight: 200,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 1001,
  },
  exploreSuggestionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  exploreSuggestionText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  exploreSuggestionAddress: {
    color: '#666666',
    fontSize: 12,
    marginTop: 2,
  },
  exploreSuggestionType: {
    color: '#4ECDC4',
    fontSize: 11,
    marginTop: 2,
    fontStyle: 'italic',
  },
  exploreLoadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  exploreLoadingText: {
    color: '#666666',
    fontSize: 14,
  },
  exploreNoResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  exploreNoResultsText: {
    color: '#666666',
    fontSize: 14,
  },
  exploreMessageInput: {
    minHeight: 120,
    paddingTop: 16,
    textAlignVertical: 'top',
  },
  exploreCharCount: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
    textAlign: 'right',
  },
  exploreAnimationSection: {
    marginBottom: 32,
  },
  exploreAnimationPreview: {
    borderWidth: 2,
    borderColor: '#4ECDC4',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(78, 205, 196, 0.05)',
  },
  exploreAnimationText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.8,
  },
  exploreSendButton: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  exploreSendGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  exploreSendText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});