import { StyleSheet, Platform } from 'react-native';
import { AppColors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

export const navStyles = StyleSheet.create({
  // Desktop Navigation Styles
  desktopNav: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: AppColors.backgroundLight,
    ...Platform.select({
      ios: {
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0, // Remove shadow
        shadowRadius: 0,
      },
      android: {
        elevation: 0, // Remove elevation
      },
    }),
  },
  desktopGradient: {
    paddingVertical: 12,
  },
  desktopNavContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
    fontFamily: Typography.fontFamily.display,
    letterSpacing: Typography.letterSpacing.wide,
  },
  desktopNavItems: {
    flexDirection: 'row',
    gap: 24,
  },
  desktopNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  desktopNavItemActive: {
    backgroundColor: AppColors.overlayLight,
  },
  desktopNavItemText: {
    fontSize: 14,
    color: AppColors.textPrimary,
    fontWeight: '500',
    fontFamily: Typography.fontFamily.primary,
  },
  desktopNavItemTextActive: {
    color: AppColors.error,
  },

  // Mobile Navigation Styles
  mobileBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: AppColors.backgroundLight,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
    ...Platform.select({
      ios: {
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  mobileBottomGradient: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingBottom: 8,
  },
  mobileTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  mobileTabLabel: {
    fontSize: 11,
    marginTop: 4,
    color: AppColors.textPrimary,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
  },
  mobileTabLabelActive: {
    color: AppColors.error,
    fontWeight: '600',
  },

  // Mobile Menu Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: AppColors.overlay,
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: AppColors.backgroundLight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    minHeight: 300,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.divider,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.textPrimary,
    fontFamily: Typography.fontFamily.display,
  },
  menuItems: {
    gap: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: AppColors.textPrimary,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '400',
  },
});