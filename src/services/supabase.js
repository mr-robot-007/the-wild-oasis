import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hvtjlffeippxnsjqjjgt.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dGpsZmZlaXBweG5zanFqamd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2ODg4NjUsImV4cCI6MjAyMDI2NDg2NX0.vGMhVmH8sVAF1iY1nljjnA924UTbC2KanGA_tK2XEWw";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
// const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
