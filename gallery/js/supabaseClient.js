// All files use this one connection to Supabase.
export const supabaseClient = window.supabase.createClient(
    // Project URL and public browser key used to send requests.
    "https://hmxtphuwftiukvojpwvh.supabase.co",
    "sb_publishable_9y0S1WEmnKi3HdbJ9V9m8Q_Gmkvp-Pi"
);

// This Storage bucket holds the image files; the photos table holds their details.
export const bucketName = "gallery-photos";




