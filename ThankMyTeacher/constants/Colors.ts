/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

// App-wide color palette
export const AppColors = {
  // Awwwards-inspired palette
  primary: '#181818', // Main text (almost black)
  secondary: '#222222', // Slightly lighter for headings if needed
  accent: '#FFFFFF', // White for cards, nav, buttons

  // Backgrounds
  background: '#F5F6F8', // Main site background
  backgroundLight: '#FFFFFF', // For cards/sections
  backgroundWarm: '#FFFFFF',
  backgroundMint: '#FFFFFF',
  backgroundOrange: '#FFFFFF',

  // Card Colors
  card: '#FFFFFF',
  cardHover: '#F0F1F3', // Slightly off-white for hover

  // Text Colors
  textPrimary: '#181818', // Main text
  textSecondary: '#444444', // Secondary text
  textMuted: '#888888', // Muted text
  textLight: '#FFFFFF', // For text on black buttons (rare)

  // Status Colors
  success: '#00D4AA',
  error: '#FF6B6B',
  warning: '#FFB800',
  info: '#3B82F6',

  // Border Colors
  border: '#E5E6EB', // Subtle border
  borderLight: '#F0F1F3', // Even lighter border

  // Overlay Colors
  overlay: 'rgba(24,24,24,0.05)', // Very subtle dark overlay
  overlayLight: 'rgba(255,255,255,0.7)',

  // Shadow Colors
  shadow: 'rgba(24,24,24,0.06)', // Very subtle shadow

  // Divider Colors
  divider: '#E5E6EB',

  // Interactive Colors
  interactive: '#181818', // Black for links/buttons
  interactiveHover: '#222222',

  // Gradient Colors (rarely used)
  gradientStart: '#FFFFFF',
  gradientEnd: '#F5F6F8',

  // Special Purpose
  highlight: '#FFFFFF',
  subtle: '#F0F1F3',
  muted: '#888888',
};

// Warm, homey color palette
export const WarmColors = {
  // Primary colors (muted and warm)
  primary: '#8B5A3C', // Warm brown
  primaryLight: '#A67C52', // Lighter warm brown
  primaryDark: '#6B4423', // Darker warm brown
  
  // Secondary colors
  secondary: '#9B8B7A', // Muted sage
  secondaryLight: '#B8A898', // Light sage
  secondaryDark: '#7A6B5A', // Dark sage
  
  // Background colors
  background: '#FDF8F3', // Warm off-white
  backgroundLight: '#FEFCF9', // Very light warm white
  backgroundDark: '#F5E6D3', // Warm light beige
  
  // Text colors
  textPrimary: '#2C1810', // Warm dark brown
  textSecondary: '#8B7355', // Muted brown
  textMuted: '#A69B8C', // Very muted brown
  
  // Accent colors (muted versions of original bright colors)
  accent: '#D4A574', // Warm beige (replaces bright red)
  accentLight: '#E6C9A3', // Light warm beige
  accentDark: '#B8945A', // Dark warm beige
  
  // Success/positive colors
  success: '#7A9B7A', // Muted sage green
  successLight: '#9BB89B', // Light sage green
  
  // Warning colors
  warning: '#D4A574', // Warm beige (replaces bright orange)
  warningLight: '#E6C9A3', // Light warm beige
  
  // Border and divider colors
  border: '#E6D9C7', // Warm light brown
  borderLight: '#F0E6D9', // Very light warm brown
  divider: '#D4C4B0', // Muted warm brown
  
  // Card and surface colors
  card: '#FFFFFF', // Pure white for cards
  cardHover: '#FEFCF9', // Very light warm white for hover
  surface: '#FDF8F3', // Warm off-white for surfaces
  
  // Shadow colors (warm tones)
  shadow: 'rgba(139, 90, 60, 0.1)', // Warm brown shadow
  shadowLight: 'rgba(139, 90, 60, 0.05)', // Light warm brown shadow
};
