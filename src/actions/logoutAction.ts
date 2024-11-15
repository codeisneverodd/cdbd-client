'use server';
import { redirect } from 'next/navigation';

import { supaServerClient } from '@/lib/supabase/createServerClient';
import { isRedirectError } from 'next/dist/client/components/redirect';

export const logout = async (prevState?: any, formData?: FormData) => {
  const supabase = supaServerClient();
  try {
    const result = await supabase.auth.signOut();

    redirect('/');

    return { success: true };
  } catch (error) {
    // bypass redirect errors (info: next redirect works by throwing errors, so we need to bypass them here, or they will be caught by the catch block and the error will be returned to the client as a failed login attempt)
    if (isRedirectError(error)) {
      throw error;
    }

    console.log('Google Sign in result error: ', error);
    return { error: 'Failed to sign in' };
  }
};
