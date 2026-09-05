import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ksprszoavkijyvqejjez.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_B_nG-neMRmJBNtfO-PpVxQ_InvQsIs-";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);