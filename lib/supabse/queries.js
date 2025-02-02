import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

// Helper function to handle errors
const handleError = async (error) => {
  if (error) {
    console.log('Error:', error);

    return null;
  }
};


export async function loginUser(credentials) {
    try {
      // Validate input
  
      // Sign in the user
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      
      if (error) throw error;
      window.location.reload();
      return { user: data.user, success: true };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

export async function registerUser(userData) {
    try {
   
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name,
          }
        }
      });
      if (authError) throw authError;
      delete userData.password
      // Insert user metadata
      const { error: metadataError } = await supabase
        .from('users')
        .insert({
          id: authData.user?.id,
          ...userData
        });
  
      if (metadataError) throw metadataError;

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }


  export async function logoutUser() {
    function clearSessionData() {
      // Clear all cookies
      const cookies = document.cookie.split(";");
    
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
    
      // Clear localStorage
      localStorage.clear();
    
      // Clear sessionStorage
      sessionStorage.clear();
    }
    const { error } = await supabase.auth.signOut();
       clearSessionData();
       window.location.reload();
  
    
    if (error) {
      console.error('Logout error:', error);
      throw error;
    }
    return true
  }
  