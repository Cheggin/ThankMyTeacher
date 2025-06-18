import React, { useState } from 'react';
import { View, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from './styles/authstyles';

export default function AuthScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    // TODO: Implement authentication logic
    console.log(isLogin ? 'Login' : 'Signup', { email, password, name });
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={['#FFE5E5', '#FFF0E6', '#E6F4F1']}
          style={styles.container}
        >
          <ThemedView style={styles.formContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Ionicons name="heart" size={60} color="#FF6B6B" />
              <ThemedText style={styles.title}>
                {isLogin ? 'Welcome Back!' : 'Join ThankMyTeacher'}
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                {isLogin 
                  ? 'Sign in to continue spreading gratitude' 
                  : 'Create an account to start thanking teachers'
                }
              </ThemedText>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {!isLogin && (
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.label}>Name</ThemedText>
                  <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
              )}

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Email</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Password</ThemedText>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Enter password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <Pressable
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                      size={20} 
                      color="#636E72" 
                    />
                  </Pressable>
                </View>
              </View>

              {/* Submit Button */}
              <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <LinearGradient
                  colors={['#FF8A80', '#FF6B6B']}
                  style={styles.submitGradient}
                >
                  <ThemedText style={styles.submitText}>
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </ThemedText>
                </LinearGradient>
              </Pressable>

              {/* Toggle Auth Mode */}
              <View style={styles.toggleContainer}>
                <ThemedText style={styles.toggleText}>
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </ThemedText>
                <Pressable onPress={() => setIsLogin(!isLogin)}>
                  <ThemedText style={styles.toggleLink}>
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </ThemedText>
                </Pressable>
              </View>

              {/* Social Login Options */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <ThemedText style={styles.dividerText}>OR</ThemedText>
                <View style={styles.dividerLine} />
              </View>

              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#4285F4" />
                <ThemedText style={styles.socialButtonText}>
                  Continue with Google
                </ThemedText>
              </Pressable>
            </View>

            {/* Back Button */}
            <Pressable 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#636E72" />
              <ThemedText style={styles.backText}>Back</ThemedText>
            </Pressable>
          </ThemedView>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}