import { supabase } from '../assets/supabase';

// Define the profiles table structure
export interface UserData {
  id: string; // UUID from auth.users
  email: string;
  avatar_url?: string;
  // Optional fields that might be added later
  full_name?: string;
  emails_sent?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Fetch user data from the profiles table
 * @param userId - The authenticated user's ID
 * @returns UserData object or null if not found
 */
export const fetchUserData = async (userId: string): Promise<UserData | null> => {
  try {
    console.log('🔍 Fetching user data for:', userId);
    
    // Query using the id column (which should match the auth.users id)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('❌ Error fetching user data:', error);
      
      // If user doesn't exist, create a new record
      if (error.code === 'PGRST116') { // No rows returned
        console.log('🆕 Creating new profile record...');
        
        // Get the current user's email from auth
        const { data: { user } } = await supabase.auth.getUser();
        
        const newProfile = {
          id: userId,
          email: user?.email || '',
          avatar_url: null,
          emails_sent: 0,
        };
        
        const { data: createdData, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('❌ Error creating profile:', createError);
          return null;
        }

        console.log('✅ Profile created successfully:', createdData);
        return createdData;
      }
      
      return null;
    }

    console.log('✅ User data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Exception fetching user data:', error);
    return null;
  }
};

/**
 * Create or update user data in the profiles table
 * @param userId - The authenticated user's ID
 * @param userData - The data to insert/update
 * @returns Success status
 */
export const upsertUserData = async (userId: string, userData: Partial<UserData>): Promise<boolean> => {
  try {
    console.log('💾 Upserting user data for:', userId);
    console.log('📊 User data to upsert:', userData);
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...userData,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('❌ Error upserting user data:', error);
      return false;
    }

    console.log('✅ User data upserted successfully');
    return true;
  } catch (error) {
    console.error('❌ Exception upserting user data:', error);
    return false;
  }
};

/**
 * Get user statistics from the profiles table
 * @param userId - The authenticated user's ID
 * @returns Object with user statistics
 */
export const getUserStats = async (userId: string) => {
  try {
    const userData = await fetchUserData(userId);
    
    if (!userData) {
      return {
        thankYouCount: 0,
        lastActivity: null,
      };
    }

    return {
      thankYouCount: userData.emails_sent || 0,
      lastActivity: userData.updated_at || userData.created_at,
    };
  } catch (error) {
    console.error('❌ Error getting user stats:', error);
    return {
      thankYouCount: 0,
      lastActivity: null,
    };
  }
}; 