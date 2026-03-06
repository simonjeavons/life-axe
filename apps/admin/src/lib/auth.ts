import { supabase } from './supabase'

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error || !data.session) return null
  return data.session
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw new Error(error.message)
  return data
}

export async function logout() {
  await supabase.auth.signOut()
}

export function onAuthStateChange(
  callback: (session: unknown) => void
) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
}
