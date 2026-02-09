export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  language: string;
  subscription_plan: string | null;
  subscription_status: string | null;
  created_at: string;
  updated_at: string;
}

export interface Onboarding {
  id: string;
  user_id: string;
  role: string | null;
  child_name: string | null;
  child_age: string | null;
  goal: string | null;
  symptoms: string[];
  diet_status: string | null;
  time_pain: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  status: string;
  trial_ends_at: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScanRecord {
  id: string;
  user_id: string;
  product_name: string;
  brand: string | null;
  emoji: string;
  status: "safe" | "flagged";
  reasons_to_keep: string[];
  reasons_to_avoid: string[];
  image_url: string | null;
  scanned_at: string;
}
