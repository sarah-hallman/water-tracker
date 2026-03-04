import { PrismaClient } from '@prisma/client';
import { WaterEntry, WaterStats, DailyWaterGoal } from '@/types/water';
import { startOfDay, endOfDay, subDays, format } from 'date-fns';

const prisma = new PrismaClient();

const DEFAULT_DAILY_GOAL = 2000; // 2L in ml

export async function addWaterEntry(data: Omit<WaterEntry, 'id'>): Promise<WaterEntry> {
  const entry = await prisma.waterEntry.create({
    data: {
      userId: data.userId,
      amount: data.amount,
      timestamp: data.timestamp,
      source: data.source,
      notes: data.notes
    }
  });
  
  return entry as WaterEntry;
}

export async function getTodaysEntries(userId: string): Promise<WaterEntry[]> {
  const today = new Date();
  const entries = await prisma.waterEntry.findMany({
    where: {
      userId,
      timestamp: {
        gte: startOfDay(today),
        lte: endOfDay(today)
      }
    },
    orderBy: { timestamp: 'desc' }
  });
  
  return entries as WaterEntry[];
}

export async function getDailyGoal(userId: string, date: Date = new Date()): Promise<number> {
  const goal = await prisma.dailyWaterGoal.findFirst({
    where: {
      userId,
      date: {
        gte: startOfDay(date),
        lte: endOfDay(date)
      }
    }
  });
  
  return goal?.goalAmount || DEFAULT_DAILY_GOAL;
}

export async function getWaterStats(userId: string): Promise<WaterStats> {
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);
  
  // Get today's entries
  const todayEntries = await getTodaysEntries(userId);
  const totalToday = todayEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const goalToday = await getDailyGoal(userId, today);
  
  // Get past 7 days data
  const weeklyEntries = await prisma.waterEntry.findMany({
    where: {
      userId,
      timestamp: {
        gte: startOfDay(sevenDaysAgo),
        lte: endOfDay(today)
      }
    }
  });
  
  // Group by date
  const dailyTotals = new Map<string, number>();
  for (let i = 0; i < 7; i++) {
    const date = subDays(today, 6 - i);
    const dateKey = format(date, 'yyyy-MM-dd');
    dailyTotals.set(dateKey, 0);
  }
  
  weeklyEntries.forEach(entry => {
    const dateKey = format(entry.timestamp, 'yyyy-MM-dd');
    const current = dailyTotals.get(dateKey) || 0;
    dailyTotals.set(dateKey, current + entry.amount);
  });
  
  const weeklyData = Array.from(dailyTotals.entries()).map(([date, amount]) => ({
    date,
    amount
  }));
  
  const averageDaily = weeklyData.reduce((sum, day) => sum + day.amount, 0) / 7;
  
  return {
    totalToday,
    goalToday,
    percentageComplete: (totalToday / goalToday) * 100,
    entriesCount: todayEntries.length,
    averageDaily,
    weeklyData
  };
}

export async function updateDailyGoal(userId: string, goalAmount: number, date: Date = new Date()): Promise<DailyWaterGoal> {
  const goal = await prisma.dailyWaterGoal.upsert({
    where: {
      userId_date: {
        userId,
        date: startOfDay(date)
      }
    },
    update: { goalAmount },
    create: {
      userId,
      goalAmount,
      date: startOfDay(date)
    }
  });
  
  return goal as DailyWaterGoal;
}