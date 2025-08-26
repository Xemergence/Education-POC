export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      conversations: {
        Row: {
          created_at: string | null
          id: string
          lesson_id: string | null
          model_response: string | null
          user_id: string
          user_input: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          model_response?: string | null
          user_id: string
          user_input?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          model_response?: string | null
          user_id?: string
          user_input?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          instructor: string | null
          level: string | null
          thumbnail: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          instructor?: string | null
          level?: string | null
          thumbnail?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          instructor?: string | null
          level?: string | null
          thumbnail?: string | null
          title?: string
        }
        Relationships: []
      }
      language_stats: {
        Row: {
          created_at: string | null
          english_fluency: number | null
          english_grammar: number | null
          english_pronunciation: number | null
          english_vocabulary: number | null
          id: string
          profile_id: string | null
          spanish_fluency: number | null
          spanish_grammar: number | null
          spanish_pronunciation: number | null
          spanish_vocabulary: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          english_fluency?: number | null
          english_grammar?: number | null
          english_pronunciation?: number | null
          english_vocabulary?: number | null
          id?: string
          profile_id?: string | null
          spanish_fluency?: number | null
          spanish_grammar?: number | null
          spanish_pronunciation?: number | null
          spanish_vocabulary?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          english_fluency?: number | null
          english_grammar?: number | null
          english_pronunciation?: number | null
          english_vocabulary?: number | null
          id?: string
          profile_id?: string | null
          spanish_fluency?: number | null
          spanish_grammar?: number | null
          spanish_pronunciation?: number | null
          spanish_vocabulary?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "language_stats_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          id: string
          order: number | null
          title: string
          transcript: string | null
          video_url: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          order?: number | null
          title: string
          transcript?: string | null
          video_url?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          order?: number | null
          title?: string
          transcript?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          created_at: string | null
          id: string
          lesson_id: string | null
          title: string | null
          type: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          title?: string | null
          type?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          title?: string | null
          type?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "materials_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_data: {
        Row: {
          created_at: string | null
          id: string
          name: string
          profile_id: string | null
          score: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          profile_id?: string | null
          score?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          profile_id?: string | null
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_data_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          cefr_level: string | null
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          learning_goals: string[] | null
          level: string | null
          level_number: number | null
          name: string
          preferred_language: string | null
          proficiency_level: string | null
          streak: number | null
          total_hours: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar?: string | null
          cefr_level?: string | null
          created_at?: string | null
          email: string
          id?: string
          join_date?: string | null
          learning_goals?: string[] | null
          level?: string | null
          level_number?: number | null
          name: string
          preferred_language?: string | null
          proficiency_level?: string | null
          streak?: number | null
          total_hours?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar?: string | null
          cefr_level?: string | null
          created_at?: string | null
          email?: string
          id?: string
          join_date?: string | null
          learning_goals?: string[] | null
          level?: string | null
          level_number?: number | null
          name?: string
          preferred_language?: string | null
          proficiency_level?: string | null
          streak?: number | null
          total_hours?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      recent_activities: {
        Row: {
          activity: string
          created_at: string | null
          date: string | null
          duration: string | null
          id: string
          profile_id: string | null
          score: number | null
        }
        Insert: {
          activity: string
          created_at?: string | null
          date?: string | null
          duration?: string | null
          id?: string
          profile_id?: string | null
          score?: number | null
        }
        Update: {
          activity?: string
          created_at?: string | null
          date?: string | null
          duration?: string | null
          id?: string
          profile_id?: string | null
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recent_activities_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          billing_cycle: string | null
          created_at: string | null
          features: string[] | null
          id: string
          next_payment: string | null
          plan: string | null
          profile_id: string | null
          renewal_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          billing_cycle?: string | null
          created_at?: string | null
          features?: string[] | null
          id?: string
          next_payment?: string | null
          plan?: string | null
          profile_id?: string | null
          renewal_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          billing_cycle?: string | null
          created_at?: string | null
          features?: string[] | null
          id?: string
          next_payment?: string | null
          plan?: string | null
          profile_id?: string | null
          renewal_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      upcoming_lessons: {
        Row: {
          created_at: string | null
          date: string | null
          duration: string | null
          id: string
          profile_id: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          duration?: string | null
          id?: string
          profile_id?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          date?: string | null
          duration?: string | null
          id?: string
          profile_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "upcoming_lessons_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          id: string
          last_viewed_at: string | null
          lesson_id: string | null
          practiced_open: boolean | null
          practiced_script: boolean | null
          read_transcript: boolean | null
          status: string
          user_id: string
          viewed_materials: boolean | null
          watched_video: boolean | null
        }
        Insert: {
          id?: string
          last_viewed_at?: string | null
          lesson_id?: string | null
          practiced_open?: boolean | null
          practiced_script?: boolean | null
          read_transcript?: boolean | null
          status: string
          user_id: string
          viewed_materials?: boolean | null
          watched_video?: boolean | null
        }
        Update: {
          id?: string
          last_viewed_at?: string | null
          lesson_id?: string | null
          practiced_open?: boolean | null
          practiced_script?: boolean | null
          read_transcript?: boolean | null
          status?: string
          user_id?: string
          viewed_materials?: boolean | null
          watched_video?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
