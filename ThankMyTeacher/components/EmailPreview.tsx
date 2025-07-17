import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { AppColors } from '../constants/Colors';

interface EmailPreviewProps {
  teacherName: string;
  message: string;
  senderName: string;
  schoolName?: string;
}

export function EmailPreview({ teacherName, message, senderName, schoolName }: EmailPreviewProps) {
  const hasContent = teacherName || message || senderName;

  if (!hasContent) {
    return (
      <ThemedView style={styles.previewContainer}>
        <ThemedView style={styles.previewHeader}>
          <ThemedText style={styles.previewTitle}>Email Preview</ThemedText>
          <ThemedText style={styles.previewSubtitle}>
            Start filling out the form to see your email preview
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.emptyPreview}>
          <ThemedText style={styles.emptyText}>
            Your message will appear here
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.previewContainer}>
      <ThemedView style={styles.previewHeader}>
        <ThemedText style={styles.previewTitle}>Email Preview</ThemedText>
        <ThemedText style={styles.previewSubtitle}>
          This is how your email will look
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.emailContainer}>
        {/* Email Header */}
        <ThemedView style={styles.emailHeader}>
          <ThemedText style={styles.emailSubject}>
            Subject: A Thank You Message from {senderName || 'a student'}
          </ThemedText>
          <ThemedText style={styles.emailTo}>
            To: {teacherName ? `${teacherName}${schoolName ? ` (${schoolName})` : ''}` : 'Teacher'}
          </ThemedText>
        </ThemedView>

        {/* Email Content */}
        <ThemedView style={styles.emailContent}>
          <ThemedText style={styles.greeting}>
            Dear {teacherName || 'Teacher'},
          </ThemedText>
          
          {message ? (
            <ThemedView style={styles.messageBox}>
              <ThemedText style={styles.messageText}>
                {message}
              </ThemedText>
            </ThemedView>
          ) : (
            <ThemedView style={styles.messagePlaceholder}>
              <ThemedText style={styles.placeholderText}>
                Your message will appear here...
              </ThemedText>
            </ThemedView>
          )}
          
          <ThemedText style={styles.signature}>
            Best,{'\n'}
            <ThemedText style={styles.senderName}>
              {senderName || 'a grateful student'}
            </ThemedText>
          </ThemedText>
        </ThemedView>

        {/* Email Footer */}
        <ThemedView style={styles.emailFooter}>
          <ThemedText style={styles.footerText}>
            This message was sent through{' '}
            <ThemedText style={styles.footerHighlight}>ThankMyTeacher.net</ThemedText>
            {'\n'}A platform dedicated to expressing gratitude to educators
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    backgroundColor: AppColors.backgroundLight,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: AppColors.border,
    minHeight: 500,
    height: '100%',
  },
  previewHeader: {
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: 8,
  },
  previewSubtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  emptyPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.card,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: AppColors.border,
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 16,
    color: AppColors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  emailContainer: {
    flex: 1,
    backgroundColor: AppColors.backgroundLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.border,
    overflow: 'hidden',
    width: '100%',
  },
  emailHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
    backgroundColor: AppColors.card,
  },
  emailSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: 4,
  },
  emailTo: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  emailContent: {
    flex: 1,
    padding: 24,
  },
  greeting: {
    fontSize: 16,
    color: AppColors.textPrimary,
    marginBottom: 16,
    fontWeight: '500',
  },
  messageBox: {
    backgroundColor: AppColors.card,
    padding: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.primary,
    marginBottom: 16,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: AppColors.textPrimary,
  },
  messagePlaceholder: {
    backgroundColor: AppColors.backgroundLight,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 15,
    color: AppColors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  signature: {
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },
  senderName: {
    color: AppColors.textPrimary,
    fontWeight: '600',
  },
  emailFooter: {
    padding: 16,
    backgroundColor: AppColors.card,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
  },
  footerText: {
    fontSize: 12,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  footerHighlight: {
    color: AppColors.primary,
    fontWeight: '600',
  },
}); 