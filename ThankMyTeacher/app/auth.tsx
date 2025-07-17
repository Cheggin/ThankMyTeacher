import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  ActivityIndicator, 
  Text 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from './styles/authstyles';
import { supabase } from '../assets/supabase';
import { upsertUserData } from '../services/userDataService';
import { useDeviceType } from '../hooks/useDeviceType';

// Define the component with React's Functional Component type
const AuthScreen: React.FC = () => {
  const router = useRouter();
  const { isMobile } = useDeviceType();
  
  // Add explicit types for all state variables
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    setError('');

    try {
      console.log('🔐 Attempting authentication...');
      console.log('Email:', email);
      console.log('Is login:', isLogin);
      
      if (isLogin) {
        console.log('📝 Signing in with password...');
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        
        console.log('Sign in response:', { data, error: signInError });
        
        if (signInError) {
          console.error('❌ Sign in error:', signInError);
          throw signInError;
        }
        
        console.log('✅ Sign in successful, navigating to dashboard...');
        router.replace('/(tabs)/dashboard');
      } else {
        console.log('📝 Signing up...');
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: { full_name: name },
          },
        });
        
        console.log('Sign up response:', { data, error: signUpError });
        
        if (signUpError) {
          console.error('❌ Sign up error:', signUpError);
          throw signUpError;
        }
        
        console.log('✅ Sign up successful, creating user data...');
        
        // Create user data record
        if (data.user) {
          await upsertUserData(data.user.id, {
            full_name: name,
            email: email,
            emails_sent: 0,
          });
        }
        
        router.replace('/(tabs)/dashboard');
      }
    } catch (err) {
      console.error('❌ Authentication error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleSignIn = async (): Promise<void> => {
  //   setLoading(true);
  //   setError('');
  //   try {
  //     console.log('🔐 Attempting Google sign in...');
  //     const { data, error } = await supabase.auth.signInWithOAuth({
  //       provider: 'google',
  //     });
  //     
  //     console.log('Google sign in response:', { data, error });
  //     
  //     if (error) {
  //       console.error('❌ Google sign in error:', error);
  //       throw error;
  //     }
  //     
  //     console.log('✅ Google sign in initiated successfully');
  //   } catch (err) {
  //     console.error('❌ Google authentication error:', err);
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError('Could not sign in with Google. Please try again.');
  //     }
  //     setLoading(false);
  //   }
  // };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={isMobile ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
          <ThemedView style={styles.formContainer}>
            <View style={styles.header}>
              <Ionicons name="heart" size={60} color="#FF6B6B" />
              <ThemedText style={styles.title}>
                {isLogin ? 'Welcome Back!' : 'Join ThankMyTeacher'}
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                {isLogin 
                  ? 'Sign in to continue' 
                  : 'Create an account to start'
                }
              </ThemedText>
            </View>

            <View style={styles.form}>
              {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

              {!isLogin && (
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.label}>Name</ThemedText>
                  <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    editable={!loading}
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
                  editable={!loading}
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
                    editable={!loading}
                  />
                  <Pressable
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <Ionicons 
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                      size={20} 
                      color="#636E72" 
                    />
                  </Pressable>
                </View>
              </View>

              <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
                <LinearGradient
                  colors={['#FF8A80', '#FF6B6B']}
                  style={styles.submitGradient}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <ThemedText style={styles.submitText}>
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </ThemedText>
                  )}
                </LinearGradient>
              </Pressable>
              
              <View style={styles.toggleContainer}>
                <ThemedText style={styles.toggleText}>
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </ThemedText>
                <Pressable onPress={() => setIsLogin(!isLogin)} disabled={loading}>
                  <ThemedText style={styles.toggleLink}>
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </ThemedText>
                </Pressable>
              </View>

              {/*
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <ThemedText style={styles.dividerText}>OR</ThemedText>
                <View style={styles.dividerLine} />
              </View>
              */}

              {/*
              <Pressable style={styles.socialButton} onPress={handleGoogleSignIn} disabled={loading}>
                <Ionicons name="logo-google" size={20} color="#4285F4" />
                <ThemedText style={styles.socialButtonText}>
                  Continue with Google
                </ThemedText>
              </Pressable>
              */}
            </View>
            
            <Pressable 
              style={styles.backButton}
              onPress={() => router.back()}
              disabled={loading}
            >
              <Ionicons name="arrow-back" size={24} color="#636E72" />
              <ThemedText style={styles.backText}>Back</ThemedText>
            </Pressable>
          </ThemedView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AuthScreen;