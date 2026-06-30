import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://trhnibzskdowyivyikfh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyaG5pYnpza2Rvd3lpdnlpa2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0OTEzMDYsImV4cCI6MjA5MzA2NzMwNn0.-TAWCuTEGKr7eEgiKnk4bhA1HSoWuiq90Tr8hnfLxwM';

export const supabase = createClient(supabaseUrl, supabaseKey);