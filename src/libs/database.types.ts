export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      board: {
        Row: {
          archived: boolean
          code: string
          createdAt: string
          id: string
          owner_id: string
          public: boolean
          title: string
          updated_at: string
        }
        Insert: {
          archived?: boolean
          code?: string
          createdAt?: string
          id?: string
          owner_id: string
          public?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          archived?: boolean
          code?: string
          createdAt?: string
          id?: string
          owner_id?: string
          public?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "board_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "board_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "my_boards"
            referencedColumns: ["user_id"]
          }
        ]
      }
      board_invite: {
        Row: {
          board: string
          created_at: string
          expired: boolean
          from_user_id: string
          id: string
          status: string
          user: string
        }
        Insert: {
          board: string
          created_at?: string
          expired?: boolean
          from_user_id: string
          id?: string
          status?: string
          user: string
        }
        Update: {
          board?: string
          created_at?: string
          expired?: boolean
          from_user_id?: string
          id?: string
          status?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "board_invite_board_fkey"
            columns: ["board"]
            referencedRelation: "board"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "board_invite_board_fkey"
            columns: ["board"]
            referencedRelation: "my_boards"
            referencedColumns: ["board_id"]
          },
          {
            foreignKeyName: "board_invite_from_user_id_fkey"
            columns: ["from_user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "board_invite_from_user_id_fkey"
            columns: ["from_user_id"]
            referencedRelation: "my_boards"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "board_invite_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "board_invite_user_fkey"
            columns: ["user"]
            referencedRelation: "my_boards"
            referencedColumns: ["user_id"]
          }
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      members: {
        Row: {
          board_id: string
          created_at: string
          update_at: string
          user_id: string
        }
        Insert: {
          board_id: string
          created_at?: string
          update_at?: string
          user_id: string
        }
        Update: {
          board_id?: string
          created_at?: string
          update_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_board_id_fkey"
            columns: ["board_id"]
            referencedRelation: "board"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_board_id_fkey"
            columns: ["board_id"]
            referencedRelation: "my_boards"
            referencedColumns: ["board_id"]
          },
          {
            foreignKeyName: "members_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "my_boards"
            referencedColumns: ["user_id"]
          }
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          payment_method: Json | null
          update_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          payment_method?: Json | null
          update_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          payment_method?: Json | null
          update_at?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      my_boards: {
        Row: {
          archived: boolean | null
          avatar_url: string | null
          billing_address: Json | null
          board_id: string | null
          code: string | null
          createdAt: string | null
          email: string | null
          full_name: string | null
          member_board_id: string | null
          member_created_at: string | null
          member_user_id: string | null
          owner_id: string | null
          payment_method: Json | null
          public: boolean | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "board_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "board_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "my_boards"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "members_board_id_fkey"
            columns: ["member_board_id"]
            referencedRelation: "board"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_board_id_fkey"
            columns: ["member_board_id"]
            referencedRelation: "my_boards"
            referencedColumns: ["board_id"]
          },
          {
            foreignKeyName: "members_user_id_fkey"
            columns: ["member_user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_user_id_fkey"
            columns: ["member_user_id"]
            referencedRelation: "my_boards"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
