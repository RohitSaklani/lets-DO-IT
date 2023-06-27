import { supabase } from "../redux/Slice";
export const signUp = async (email, pass) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: pass,
  });

  if (error) {
    console.log("error", error);
    return { res: false, error: error };
  }

  return { res: true };
};

export const signIn = async (email, pass) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: pass,
  });

  if (error) {
    console.log("error", error);
    return { res: false, error: error };
  }

  return { res: true };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { res: false, error: error };
  }

  return { res: true };
};
