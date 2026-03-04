'use client';

import { useState } from 'react';
import { WaterStats, WaterEntry } from '@/types/water';
import WaterProgressCard from './WaterProgressCard';
import QuickAddButtons from './QuickAddButtons';
import WaterChart from './WaterChart';
import RecentEntries from './RecentEntries';
import { addWaterEntry } from '@/lib/water-service';
import { useRouter } from 'next/navigation';

interface Props {
  waterStats: WaterStats;
  todaysEntries: WaterEntry[];
  userId: string;
}

export default function WaterDashboard({ waterStats, todaysEntries, userId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleQuickAdd = async (amount: number, source: string) => {
    setIsLoading(true);
    try {
      await addWaterEntry({
        userId,
        amount,
        source: source as 'bottle' | 'glass' | 'other',
        timestamp: new Date()
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to add water entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WaterProgressCard waterStats={waterStats} />
        </div>
        <div>
          <QuickAddButtons onQuickAdd={handleQuickAdd} isLoading={isLoading} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WaterChart weeklyData={waterStats.weeklyData} />
        <RecentEntries entries={todaysEntries} />
      </div>
    </div>
  );
}