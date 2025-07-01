/**
 * Typography constants for the app
 * Using clean, modern fonts for a sophisticated look
 */

export const Typography = {
  // Primary font family - Clean and modern
  fontFamily: {
    primary: 'Inter', // Clean, modern sans-serif for body
    heading: 'OpenSans', // Sleek, modern for headings
    secondary: 'SF Pro Display', // Apple's system font as fallback
    mono: 'SF Mono', // For code/technical content
    display: 'OpenSans', // For headings and display text
  },

  // Font weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Font sizes (in px)
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },

  // Pixel-based line heights for each size (to prevent squishing)
  lineHeight: {
    xs: 18,    // 12px font
    sm: 20,    // 14px font
    base: 24,  // 16px font
    lg: 28,    // 18px font
    xl: 28,    // 20px font
    '2xl': 32, // 24px font
    '3xl': 38, // 30px font
    '4xl': 44, // 36px font
    '5xl': 56, // 48px font
    '6xl': 72, // 60px font
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
};

// Predefined text styles for consistency
export const TextStyles = {
  // Display styles
  display: {
    fontFamily: Typography.fontFamily.heading,
    fontWeight: '600',
    fontSize: Typography.fontSize['4xl'],
    lineHeight: Typography.lineHeight['4xl'],
    letterSpacing: 0.5,
  },

  // Heading styles
  h1: {
    fontFamily: Typography.fontFamily.heading,
    fontWeight: '600',
    fontSize: Typography.fontSize['3xl'],
    lineHeight: Typography.lineHeight['3xl'],
    letterSpacing: 0.5,
  },

  h2: {
    fontFamily: Typography.fontFamily.heading,
    fontWeight: '600',
    fontSize: Typography.fontSize['2xl'],
    lineHeight: Typography.lineHeight['2xl'],
    letterSpacing: 0.5,
  },

  h3: {
    fontFamily: Typography.fontFamily.heading,
    fontWeight: '600',
    fontSize: Typography.fontSize.xl,
    lineHeight: Typography.lineHeight.xl,
    letterSpacing: 0.5,
  },

  // Body text styles
  body: {
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.lineHeight.base,
    letterSpacing: Typography.letterSpacing.normal,
  },

  bodyLarge: {
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
    fontSize: Typography.fontSize.lg,
    lineHeight: Typography.lineHeight.lg,
    letterSpacing: Typography.letterSpacing.normal,
  },

  bodySmall: {
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.lineHeight.sm,
    letterSpacing: Typography.letterSpacing.normal,
  },

  // Caption and small text
  caption: {
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
    fontSize: Typography.fontSize.xs,
    lineHeight: Typography.lineHeight.xs,
    letterSpacing: Typography.letterSpacing.normal,
  },

  // Button text
  button: {
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '500',
    fontWeight: Typography.fontWeight.medium,
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.lineHeight.tight,
    letterSpacing: Typography.letterSpacing.wide,
  },

  // Link text
  link: {
    fontFamily: Typography.fontFamily.primary,
    fontWeight: Typography.fontWeight.medium,
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.lineHeight.normal,
    letterSpacing: Typography.letterSpacing.normal,
  },

  // Monospace for technical content
  mono: {
    fontFamily: Typography.fontFamily.mono,
    fontWeight: Typography.fontWeight.regular,
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.lineHeight.normal,
    letterSpacing: Typography.letterSpacing.normal,
  },
}; 