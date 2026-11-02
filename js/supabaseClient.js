// Create one client used by both Supabase data files.
export const supabaseClient = window.supabase.createClient(
    // The project address and public key tell the library where to send requests.
    "https://hmxtphuwftiukvojpwvh.supabase.co",
    "sb_publishable_9y0S1WEmnKi3HdbJ9V9m8Q_Gmkvp-Pi"
);

// Storage bucket for image files. The photos table stores their paths and details.
export const bucketName = "gallery-photos";




