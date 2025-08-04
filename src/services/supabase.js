import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rvxjbtuvxrkqihpgutnf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eGpidHV2eHJrcWlocGd1dG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNDcyODIsImV4cCI6MjA2OTgyMzI4Mn0.8dFe6bIxPKzDrGy7SFnRJcgJkf1abQ1Mh4y5lA1VsUE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
