// app/_layout.tsx
import React, { useState, useEffect } from 'react';
import { Stack, useRouter, usePathname } from 'expo-router';
import { View, useWindowDimensions, Pressable, Modal, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { navStyles as styles } from '../styles/navbarstyles';
import { AppColors } from '../../constants/Colors';

export default function RootLayout() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const { user } = useAuth();

  // Prevent layout flash by ensuring dimensions are stable
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLayoutReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const navItems = user ? [
    { label: 'Home', route: '/' as const, icon: 'home' },
    { label: 'Send Thanks', route: '/send-thank-you' as const, icon: 'heart' },
    { label: 'Map', route: '/map' as const, icon: 'map' },
    { label: 'Why I Made This', route: '/why' as const, icon: 'information-circle' },
  ] : [
    { label: 'Home', route: '/' as const, icon: 'home' },
    { label: 'Send Thanks', route: '/send-thank-you' as const, icon: 'heart' },
    { label: 'Map', route: '/map' as const, icon: 'map' },
    { label: 'Why I Made This', route: '/why' as const, icon: 'information-circle' },
  ];

  const isActive = (route: string) => {
    if (route === '/') return pathname === '/';
    if (route === '/send-thank-you') return pathname.includes('send-thank-you');
    if (route === '/map') return pathname.includes('map');
    if (route === '/dashboard') return pathname.includes('dashboard');
    return pathname.startsWith(route);
  };

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.background }}>
      {/* Desktop Navigation Bar - Only render when layout is ready and not mobile */}
      {isLayoutReady && !isMobile && (
        <View style={[styles.desktopNav, { paddingTop: insets.top, backgroundColor: AppColors.accent }]}>
            <View style={styles.desktopNavContent}>
              {/* Logo/Brand */}
              <Pressable onPress={() => router.push('/')} style={styles.logoContainer}>
                <Ionicons name="heart" size={24} color="#FF6B6B" />
                <ThemedText style={styles.logoText}>ThankMyTeacher</ThemedText>
              </Pressable>

              {/* Desktop Navigation Items */}
              <View style={styles.desktopNavItems}>
                {navItems.map((item) => (
                  <Pressable
                    key={item.route}
                    onPress={() => router.push(item.route)}
                    style={[
                      styles.desktopNavItem,
                      isActive(item.route) && styles.desktopNavItemActive
                    ]}
                  >
                    <Ionicons 
                      name={`${item.icon}-outline` as any} 
                      size={20} 
                    color={isActive(item.route) ? AppColors.error : AppColors.primary} 
                    />
                    <ThemedText 
                      style={[
                        styles.desktopNavItemText,
                        isActive(item.route) && styles.desktopNavItemTextActive
                      ]}
                    >
                      {item.label}
                    </ThemedText>
                  </Pressable>
                ))}
                
                {/* Login/Profile Button */}
                {user ? (
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Pressable
                      onPress={() => router.push('/dashboard')}
                      style={[
                        styles.desktopNavItem,
                        pathname === '/dashboard' && styles.desktopNavItemActive
                      ]}
                    >
                      <Ionicons 
                        name="analytics" 
                        size={20} 
                      color={pathname === '/dashboard' ? AppColors.error : AppColors.primary} 
                      />
                      <ThemedText 
                        style={[
                          styles.desktopNavItemText,
                          pathname === '/dashboard' && styles.desktopNavItemTextActive
                        ]}
                      >
                        Dashboard
                      </ThemedText>
                    </Pressable>
                    
                    <Pressable
                      onPress={() => router.push('/profile')}
                      style={[
                        styles.desktopNavItem,
                        pathname === '/profile' && styles.desktopNavItemActive
                      ]}
                    >
                      <Ionicons 
                        name="person-circle" 
                        size={20} 
                      color={pathname === '/profile' ? AppColors.error : AppColors.primary} 
                      />
                      <ThemedText 
                        style={[
                          styles.desktopNavItemText,
                          pathname === '/profile' && styles.desktopNavItemTextActive
                        ]}
                      >
                        Profile
                      </ThemedText>
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => router.push('/auth')}
                    style={[
                      styles.desktopNavItem,
                      pathname === '/auth' && styles.desktopNavItemActive
                    ]}
                  >
                    <Ionicons 
                      name="person-outline" 
                      size={20} 
                    color={pathname === '/auth' ? AppColors.error : AppColors.primary} 
                    />
                    <ThemedText 
                      style={[
                        styles.desktopNavItemText,
                        pathname === '/auth' && styles.desktopNavItemTextActive
                      ]}
                    >
                      Login
                    </ThemedText>
                  </Pressable>
                )}
              </View>
            </View>
        </View>
      )}

      {/* Main Content Stack */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            paddingTop: isLayoutReady && !isMobile ? 80 : 0,
            paddingBottom: isLayoutReady && isMobile ? 80 : 0,
          },
        }}
      >
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="account-settings" />
        <Stack.Screen name="why" />
        <Stack.Screen name="send-thank-you" />
        <Stack.Screen name="map" />
        <Stack.Screen name="index" />
      </Stack>

      {/* Mobile Bottom Navigation - Only render when layout is ready and mobile */}
      {isLayoutReady && isMobile && (
        <>
          <View style={[styles.mobileBottomBar, { paddingBottom: insets.bottom, backgroundColor: AppColors.accent }]}>
            <View style={styles.mobileBottomGradient}>
              {navItems.map((item) => (
                <Pressable
                  key={item.route}
                  onPress={() => router.push(item.route)}
                  style={styles.mobileTabItem}
                >
                  <Ionicons
                    name={`${item.icon}-outline` as any}
                    size={22}
                    color={isActive(item.route) ? AppColors.error : AppColors.primary}
                  />
                  <ThemedText
                    style={[
                      styles.mobileTabLabel,
                      isActive(item.route) && styles.mobileTabLabelActive
                    ]}
                  >
                    {item.label}
                  </ThemedText>
                </Pressable>
              ))}
              
              {/* More Menu Button */}
              <Pressable
                onPress={() => setMenuOpen(true)}
                style={styles.mobileTabItem}
              >
                <Ionicons
                  name="menu-outline"
                  size={24}
                  color={AppColors.primary}
                />
                <ThemedText style={styles.mobileTabLabel}>More</ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Mobile Menu Modal */}
          <Modal
            visible={menuOpen}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setMenuOpen(false)}
          >
            <Pressable 
              style={styles.modalOverlay} 
              onPress={() => setMenuOpen(false)}
            >
              <ThemedView style={[styles.menuContainer, { paddingBottom: insets.bottom + 20 }]}>
                <View style={styles.menuHeader}>
                  <ThemedText style={styles.menuTitle}>Menu</ThemedText>
                  <Pressable onPress={() => setMenuOpen(false)}>
                    <Ionicons name="close" size={28} color={AppColors.primary} />
                  </Pressable>
                </View>

                <View style={styles.menuItems}>
                  {user ? (
                    <>
                      <Pressable 
                        style={styles.menuItem}
                        onPress={() => {
                          router.push('/dashboard');
                          setMenuOpen(false);
                        }}
                      >
                        <Ionicons name="analytics" size={24} color={AppColors.primary} />
                        <ThemedText style={styles.menuItemText}>Dashboard</ThemedText>
                      </Pressable>
                      
                      <Pressable 
                        style={styles.menuItem}
                        onPress={() => {
                          router.push('/profile');
                          setMenuOpen(false);
                        }}
                      >
                        <Ionicons name="person-circle" size={24} color={AppColors.primary} />
                        <ThemedText style={styles.menuItemText}>Profile</ThemedText>
                      </Pressable>
                      
                      <Pressable 
                        style={styles.menuItem}
                        onPress={() => {
                          // TODO: Add sign out functionality
                          setMenuOpen(false);
                        }}
                      >
                        <Ionicons name="log-out-outline" size={24} color={AppColors.interactive} />
                        <ThemedText style={[styles.menuItemText, { color: AppColors.interactive }]}>Sign Out</ThemedText>
                      </Pressable>
                    </>
                  ) : (
                    <Pressable 
                      style={styles.menuItem}
                      onPress={() => {
                        router.push('/auth');
                        setMenuOpen(false);
                      }}
                    >
                      <Ionicons name="person-outline" size={24} color={AppColors.primary} />
                      <ThemedText style={styles.menuItemText}>Login / Sign Up</ThemedText>
                    </Pressable>
                  )}

                  <Pressable 
                    style={styles.menuItem}
                    onPress={() => {
                      router.push('/account-settings');
                      setMenuOpen(false);
                    }}
                  >
                    <Ionicons name="settings-outline" size={24} color={AppColors.primary} />
                    <ThemedText style={styles.menuItemText}>Settings</ThemedText>
                  </Pressable>
                </View>
              </ThemedView>
            </Pressable>
          </Modal>
        </>
      )}
    </View>
  );
}