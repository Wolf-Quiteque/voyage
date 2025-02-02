import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const getUserSession = async () => {
  const supabase = createClientComponentClient();

  try {
    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();

    // If no session exists, return null
    if (!session) return null;

    // Fetch additional user metadata
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error fetching user:', userError);
      return null;
    }



    // Return combined session and user information
    return {
      session,
      user: {
        id: user?.id,
        email: user?.email,
        metadata: user?.user_metadata,
      }
    };
  } catch (error) {
    console.log(error)
    console.error('Error getting user session:', error);
    return null;
  }
};
