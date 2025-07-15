import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sjnbwxlymnbwzubwafky.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbmJ3eGx5bW5id3p1YndhZmt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1ODM1ODYsImV4cCI6MjA2ODE1OTU4Nn0.BxPwgxdLsD63uZmT8lMsf5beklhlkeJNc1SsJHYLjwk'

export const supabase = createClient(supabaseUrl, supabaseKey)
