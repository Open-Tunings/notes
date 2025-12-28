
export const authRepository = (supabase) => ({
  async login({ email, password }) {

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password 
    })

    if (error) throw error
    
    return data
  }
})