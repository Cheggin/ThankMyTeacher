// app/_layout.tsx
import React, { useState } from 'react';
import { Stack, useRouter, usePathname } from 'expo-router';
import { View, useWindowDimensions, Pressable, Modal, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { navStyles as styles } from '../styles/navbarstyles';

export default function RootLayout() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', route: '/' as const, icon: 'home' },
    { label: 'Send Thanks', route: '/send-thank-you' as const, icon: 'heart' },
    { label: 'Why', route: '/why' as const, icon: 'information-circle' },
  ];

  const isActive = (route: string) => {
    if (route === '/') return pathname === '/';
    if (route === '/send-thank-you') return pathname.includes('send-thank-you');
    return pathname.startsWith(route);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Desktop Navigation Bar */}
      {!isMobile && (
        <View style={[styles.desktopNav, { paddingTop: insets.top }]}>
          <LinearGradient
            colors={['#FFFFFF', '#FFF5F5']}
            style={styles.desktopGradient}
          >
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
                      color={isActive(item.route) ? '#FF6B6B' : '#636E72'} 
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
                
                {/* Login Button */}
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
                    color={pathname === '/auth' ? '#FF6B6B' : '#636E72'} 
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
              </View>
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Main Content Stack */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            paddingTop: !isMobile ? 80 : 0,
            paddingBottom: isMobile ? 80 : 0,
          },
        }}
      >
        <Stack.Screen name="auth" options={{ presentation: 'modal' }} />
        <Stack.Screen name="why" />
        <Stack.Screen name="+not-found" />
      </Stack>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <>
          <View style={[styles.mobileBottomBar, { paddingBottom: insets.bottom }]}>
            <LinearGradient
              colors={['#FFFFFF', '#FFF5F5']}
              style={styles.mobileBottomGradient}
            >
              {navItems.map((item) => (
                <Pressable
                  key={item.route}
                  onPress={() => router.push(item.route)}
                  style={styles.mobileTabItem}
                >
                  <Ionicons
                    name={isActive(item.route) ? item.icon : `${item.icon}-outline` as any}
                    size={24}
                    color={isActive(item.route) ? '#FF6B6B' : '#636E72'}
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
                  color="#636E72"
                />
                <ThemedText style={styles.mobileTabLabel}>More</ThemedText>
              </Pressable>
            </LinearGradient>
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
                    <Ionicons name="close" size={28} color="#636E72" />
                  </Pressable>
                </View>

                <View style={styles.menuItems}>
                  <Pressable 
                    style={styles.menuItem}
                    onPress={() => {
                      router.push('/auth');
                      setMenuOpen(false);
                    }}
                  >
                    <Ionicons name="person-outline" size={24} color="#636E72" />
                    <ThemedText style={styles.menuItemText}>Login / Sign Up</ThemedText>
                  </Pressable>

                  <Pressable 
                    style={styles.menuItem}
                    onPress={() => {
                      // TODO: Add settings route
                      setMenuOpen(false);
                    }}
                  >
                    <Ionicons name="settings-outline" size={24} color="#636E72" />
                    <ThemedText style={styles.menuItemText}>Settings</ThemedText>
                  </Pressable>

                  <Pressable 
                    style={styles.menuItem}
                    onPress={() => {
                      // TODO: Add contact route
                      setMenuOpen(false);
                    }}
                  >
                    <Ionicons name="mail-outline" size={24} color="#636E72" />
                    <ThemedText style={styles.menuItemText}>Contact</ThemedText>
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