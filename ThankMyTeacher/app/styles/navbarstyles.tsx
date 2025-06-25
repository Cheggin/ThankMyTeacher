import { StyleSheet, Platform } from 'react-native';

export const navStyles = StyleSheet.create({
  // Desktop Navigation Styles
  desktopNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
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
    color: '#2D3436',
    fontFamily: 'Inter',
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
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  desktopNavItemText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  desktopNavItemTextActive: {
    color: '#FF6B6B',
  },

  // Mobile Navigation Styles
  mobileBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
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
    color: '#636E72',
    fontFamily: 'Inter',
  },
  mobileTabLabelActive: {
    color: '#FF6B6B',
    fontWeight: '600',
  },

  // Mobile Menu Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    minHeight: 300,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
    fontFamily: 'Inter',
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
    color: '#2D3436',
    fontFamily: 'Inter',
  },
});