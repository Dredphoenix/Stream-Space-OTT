import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gqijyzksqrcvkbbcrsga.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxaWp5emtzcXJjdmtiYmNyc2dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNDg4NTEsImV4cCI6MjA3MTkyNDg1MX0.PNLBTCrCMeYLsg5kl84Zoz6URilqxcnnzDx6MhAdJN0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
