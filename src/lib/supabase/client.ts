import { createBrowserClient } from '@supabase/ssr'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('URL do Supabase não encontrada')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Chave anônima do Supabase não encontrada')
}

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) 