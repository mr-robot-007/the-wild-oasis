import { createClient } from "@supabase/supabase-js";

// export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
export const supabaseUrl = "https://hvtjlffeippxnsjqjjgt.supabase.co";

const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
// const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
