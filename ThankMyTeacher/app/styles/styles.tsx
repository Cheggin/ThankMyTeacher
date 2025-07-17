import { Platform, StyleSheet } from 'react-native';
import { AppColors } from '../../constants/Colors';
import { Typography, TextStyles } from '../../constants/Typography';

export const styles = StyleSheet.create({
  // Header Styles
  headerGradient: {
    width: '100%',
    height: Platform.OS === 'web' ? '100%' : 160,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
    marginTop: Platform.OS === 'web' ? 0 : 20,
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
    color: AppColors.textPrimary,
    fontSize: Platform.OS === 'web' ? 32 : 28,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: Typography.fontFamily.heading,
    padding: Platform.OS === 'web' ? 12 : 2,
    letterSpacing: 0.5,
    lineHeight: Platform.OS === 'web' ? Typography.lineHeight['6xl'] : Typography.lineHeight['2xl'],
    maxWidth: 300,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  headerSubtitle: {
    color: AppColors.textSecondary,
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontStyle: 'italic',
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
    lineHeight: Typography.lineHeight.base,
  },

  // Hero Section
  heroSection: {
    paddingVertical: 64,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: AppColors.backgroundLight,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
  // Special hero section for send-thank-you page (full width, no centering)
  heroSectionFullWidth: {
    paddingVertical: 64,
    paddingHorizontal: 24,
    backgroundColor: AppColors.backgroundLight,
    width: '100%',
    alignSelf: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: AppColors.textPrimary,
    lineHeight: Typography.lineHeight['4xl'],
    fontFamily: Typography.fontFamily.heading,
    letterSpacing: 0.5,
  },
  heroDescription: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: Typography.lineHeight.lg,
    color: AppColors.textSecondary,
    paddingHorizontal: 10,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
  },
  ctaButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: AppColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
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
    color: AppColors.primary,
    fontSize: 17,
    fontWeight: '600',
    fontFamily: Typography.fontFamily.primary,
    letterSpacing: Typography.letterSpacing.wide,
  },

  // Quote Section
  quoteSection: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: AppColors.backgroundWarm,
    width: '100%',
  },
  quoteText: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    color: AppColors.textPrimary,
    marginBottom: 12,
    lineHeight: Typography.lineHeight.xl,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
  },
  quoteAuthor: {
    fontSize: 14,
    color: AppColors.textSecondary,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
    lineHeight: Typography.lineHeight.sm,
  },

  // Stories Section
  storiesSection: {
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: AppColors.backgroundLight,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
    color: AppColors.textPrimary,
    paddingHorizontal: 20,
    fontFamily: Typography.fontFamily.heading,
    lineHeight: Typography.lineHeight['3xl'],
    letterSpacing: 0.5,
  },
  storiesScroll: {
    paddingLeft: 20,
  },
  storyCard: {
    backgroundColor: AppColors.card,
    padding: 24,
    borderRadius: 20,
    marginRight: 16,
    width: 280,
    shadowColor: AppColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  storyQuote: {
    fontSize: 15,
    lineHeight: Typography.lineHeight.sm,
    color: AppColors.textPrimary,
    marginBottom: 12,
    fontStyle: 'italic',
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
  },
  storyAuthor: {
    fontSize: 13,
    color: AppColors.primary,
    fontWeight: '500',
    fontFamily: Typography.fontFamily.primary,
    lineHeight: Typography.lineHeight.xs,
  },

  // Why Section
  whySection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: AppColors.backgroundMint,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
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
    backgroundColor: AppColors.overlayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: AppColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  reasonContent: {
    flex: 1,
  },
  reasonTitle: {
    fontSize: 18,
    marginBottom: 6,
    color: AppColors.textPrimary,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  reasonDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.textSecondary,
    fontFamily: 'Inter',
  },

  // Simple Steps Section
  simpleStepsSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: AppColors.backgroundLight,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
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
    backgroundColor: AppColors.subtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  stepNumber: {
    color: AppColors.primary,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  stepText: {
    fontSize: 16,
    color: AppColors.textPrimary,
    flex: 1,
    fontFamily: 'Inter',
  },

  // Final CTA Section
  finalCtaSection: {
    paddingVertical: 60,
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: AppColors.backgroundOrange,
    width: '100%',
    alignSelf: 'center',
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
    color: AppColors.textPrimary,
  },
  finalCtaDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 28,
    color: AppColors.textSecondary,
  },
  finalCtaButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: AppColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  finalCtaButtonText: {
    color: AppColors.textLight,
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
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  exploreFormContainerTwoColumn: {
    padding: 20,
    width: '100%',
    backgroundColor: AppColors.backgroundLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AppColors.border,
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
    borderColor: AppColors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: AppColors.background,
    color: AppColors.textPrimary,
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
    backgroundColor: AppColors.backgroundLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.border,
    maxHeight: 200,
    elevation: 10,
    shadowColor: AppColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    zIndex: 1001,
  },
  exploreSuggestionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.borderLight,
    backgroundColor: AppColors.backgroundLight,
  },
  exploreSuggestionText: {
    color: AppColors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  exploreSuggestionAddress: {
    color: AppColors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  exploreSuggestionType: {
    color: AppColors.primary,
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
    color: AppColors.textSecondary,
    fontSize: 14,
  },
  exploreNoResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  exploreNoResultsText: {
    color: AppColors.textSecondary,
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
    borderColor: AppColors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    backgroundColor: AppColors.overlayLight,
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
    shadowColor: AppColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  exploreSendGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
    backgroundColor: AppColors.primary,
  },
  exploreSendText: {
    color: AppColors.textLight,
    fontSize: 18,
    fontWeight: '600',
  },

  // Common Layout Styles
  container: {
    flex: 1,
    backgroundColor: AppColors.backgroundLight,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: AppColors.backgroundLight,
  },
  contentContainer: {
    padding: 32,
    paddingTop: 56,
  },
  section: {
    marginBottom: 56,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitleLarge: {
    fontSize: 28,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: 16,
    fontFamily: Typography.fontFamily.heading,
    lineHeight: Typography.lineHeight['2xl'],
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: AppColors.textSecondary,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
    lineHeight: Typography.lineHeight.base,
  },

  // Card Styles
  card: {
    backgroundColor: AppColors.card,
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: AppColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: AppColors.border,
    transitionProperty: 'box-shadow, transform',
    transitionDuration: '0.2s',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: AppColors.textPrimary,
    fontFamily: Typography.fontFamily.primary,
    lineHeight: Typography.lineHeight.base,
  },
  cardSubtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
    lineHeight: Typography.lineHeight.sm,
  },
  cardHover: {
    shadowOpacity: 0.16,
    shadowRadius: 16,
    transform: [{ scale: 1.02 }],
  },

  // Button Styles
  button: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: AppColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    gap: 8,
  },
  buttonText: {
    color: AppColors.textLight,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Typography.fontFamily.primary,
    letterSpacing: Typography.letterSpacing.wide,
    lineHeight: Typography.lineHeight.base,
  },
  buttonSecondary: {
    backgroundColor: AppColors.primary,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 25,
    shadowColor: AppColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonBlackBorder: {
    borderWidth: 1.5,
    borderColor: AppColors.primary,
    backgroundColor: AppColors.accent,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    transitionProperty: 'box-shadow, transform, background',
    transitionDuration: '0.2s',
  },
  buttonHover: {
    boxShadow: '0 4px 16px rgba(24,24,24,0.10)',
    transform: [{ scale: 1.03 }],
    backgroundColor: AppColors.cardHover,
  },

  // Text Styles
  textPrimary: {
    color: AppColors.textPrimary,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
  },
  textSecondary: {
    color: AppColors.textSecondary,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
  },
  textMuted: {
    color: AppColors.textMuted,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
  },
  textLight: {
    color: AppColors.textLight,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
  },
  textError: {
    color: AppColors.primary,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
  },
  textSuccess: {
    color: AppColors.success,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
  },

  // Navigation Styles
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
    fontFamily: Typography.fontFamily.primary,
    letterSpacing: Typography.letterSpacing.wide,
    lineHeight: Typography.lineHeight.lg,
  },

  // Loading and Empty States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.backgroundLight,
  },
  loadingText: {
    color: AppColors.textSecondary,
    fontSize: 14,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
    lineHeight: Typography.lineHeight.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.backgroundLight,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: 8,
    fontFamily: Typography.fontFamily.primary,
    lineHeight: Typography.lineHeight.lg,
  },
  emptySubtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
    lineHeight: Typography.lineHeight.sm,
  },

  // Utility Styles
  flex1: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  gap8: {
    gap: 8,
  },
  gap12: {
    gap: 12,
  },
  gap16: {
    gap: 16,
  },
  marginBottom4: {
    marginBottom: 4,
  },
  marginBottom8: {
    marginBottom: 8,
  },
  marginBottom12: {
    marginBottom: 12,
  },
  marginBottom16: {
    marginBottom: 16,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  marginBottom24: {
    marginBottom: 24,
  },
  marginBottom30: {
    marginBottom: 30,
  },
  padding16: {
    padding: 16,
  },
  padding20: {
    padding: 20,
  },
  padding24: {
    padding: 24,
  },
  maxWidthContainer: {
    maxWidth: 1400,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  // Full width container for send-thank-you page
  fullWidthContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.divider,
    marginVertical: 16,
  },
  footer: {
    width: '100%',
    paddingVertical: 32,
    alignItems: 'center',
    backgroundColor: AppColors.backgroundLight,
    marginTop: 64,
  },

  // --- Send Thank You Page Dropdown Styles ---
  searchGroupElevated: {
    zIndex: 10,
  },
  suggestionsOverlay: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    maxHeight: 210, // Exactly 3 items (70px each)
    zIndex: 20,
    marginTop: 4, // Small even margin instead of padding
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
    fontFamily: Typography.fontFamily.primary,
  },
  highlightedSuggestionAddress: {
    color: AppColors.textSecondary,
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
    fontFamily: Typography.fontFamily.primary,
  },

  // --- Two Column Layout Styles ---
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 32,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  formColumn: {
    flex: 1,
    width: '50%',
    paddingRight: 16,
  },
  previewColumn: {
    flex: 1,
    width: '50%',
    paddingLeft: 16,
  },
  responsiveContainer: {
    flexDirection: 'row',
    gap: 32,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'flex-start',
    minHeight: 600,
  },
  mobileContainer: {
    flexDirection: 'column',
    gap: 24,
    width: '100%',
  },
  // Responsive breakpoints for better layout handling
  responsiveContainerMobile: {
    flexDirection: 'column',
    gap: 24,
    width: '100%',
    alignSelf: 'center',
  },
  formColumnMobile: {
    width: '100%',
    maxWidth: '100%',
  },
  previewColumnMobile: {
    width: '100%',
    maxWidth: '100%',
    marginTop: 24,
  },
});