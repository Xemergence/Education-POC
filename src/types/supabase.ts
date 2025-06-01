export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
          level: string | null
          level_number: number | null
          name: string
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
          level?: string | null
          level_number?: number | null
          name: string
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
          level?: string | null
          level_number?: number | null
          name?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
