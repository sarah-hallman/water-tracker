export interface WaterEntry {
  id: string;
  userId: string;
  amount: number; // in ml
  timestamp: Date;
  source?: 'bottle' | 'glass' | 'other';
  notes?: string;
}

export interface DailyWaterGoal {
  id: string;
  userId: string;
  goalAmount: number; // in ml
  date: Date;
}

export interface WaterStats {
  totalToday: number;
  goalToday: number;
  percentageComplete: number;
  entriesCount: number;
  averageDaily: number;
  weeklyData: Array<{
    date: string;
    amount: number;
  }>;
}

export interface QuickAddOption {
  label: string;
  amount: number;
  icon: string;
}