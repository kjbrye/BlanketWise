import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pjbpzycakmzgnyvvlwws.supabase.co';
const supabaseAnonKey = 'sb_publishable_NK56IIvuXnZ4ec3JEwNRIA_YUVyd77i';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
