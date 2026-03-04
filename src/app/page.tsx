import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import WaterDashboard from '@/components/WaterDashboard';
import { getWaterStats, getTodaysEntries } from '@/lib/water-service';

export default async function HomePage() {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const user = await currentUser();
  const waterStats = await getWaterStats(userId);
  const todaysEntries = await getTodaysEntries(userId);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}! 💧
          </h1>
          <p className="text-gray-600">
            Stay hydrated and track your daily water intake
          </p>
        </div>
        
        <WaterDashboard 
          waterStats={waterStats} 
          todaysEntries={todaysEntries}
          userId={userId}
        />
      </div>
    </main>
  );
}