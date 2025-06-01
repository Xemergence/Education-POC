import { supabase } from "../lib/supabase";
import { Database } from "../types/supabase";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type LanguageStats = Database["public"]["Tables"]["language_stats"]["Row"];
type RecentActivity = Database["public"]["Tables"]["recent_activities"]["Row"];
type PerformanceData = Database["public"]["Tables"]["performance_data"]["Row"];
type UpcomingLesson = Database["public"]["Tables"]["upcoming_lessons"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

export interface UserProfileData {
  profile: Profile;
  languageStats: LanguageStats | null;
  recentActivities: RecentActivity[];
  performanceData: PerformanceData[];
  upcomingLessons: UpcomingLesson[];
  subscription: Subscription | null;
}

export const fetchUserDashboardData = async (
  userId: string,
): Promise<UserProfileData | null> => {
  try {
    // Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching profile:", profileError);
      return null;
    }

    // Fetch language stats
    const { data: languageStats, error: languageStatsError } = await supabase
      .from("language_stats")
      .select("*")
      .eq("profile_id", profile.id)
      .single();

    if (languageStatsError) {
      console.error("Error fetching language stats:", languageStatsError);
    }

    // Fetch recent activities
    const { data: recentActivities, error: activitiesError } = await supabase
      .from("recent_activities")
      .select("*")
      .eq("profile_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (activitiesError) {
      console.error("Error fetching recent activities:", activitiesError);
    }

    // Fetch performance data
    const { data: performanceData, error: performanceError } = await supabase
      .from("performance_data")
      .select("*")
      .eq("profile_id", profile.id)
      .order("created_at", { ascending: true });

    if (performanceError) {
      console.error("Error fetching performance data:", performanceError);
    }

    // Fetch upcoming lessons
    const { data: upcomingLessons, error: lessonsError } = await supabase
      .from("upcoming_lessons")
      .select("*")
      .eq("profile_id", profile.id)
      .order("created_at", { ascending: true });

    if (lessonsError) {
      console.error("Error fetching upcoming lessons:", lessonsError);
    }

    // Fetch subscription
    const { data: subscription, error: subscriptionError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("profile_id", profile.id)
      .single();

    if (subscriptionError) {
      console.error("Error fetching subscription:", subscriptionError);
    }

    return {
      profile,
      languageStats: languageStats || null,
      recentActivities: recentActivities || [],
      performanceData: performanceData || [],
      upcomingLessons: upcomingLessons || [],
      subscription: subscription || null,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
};

// Mock user ID for demo purposes - in a real app this would come from auth
export const DEMO_USER_ID = "550e8400-e29b-41d4-a716-446655440000";
