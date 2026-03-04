import { WaterStats } from '@/types/water';
import { Droplets, Target, TrendingUp } from 'lucide-react';

interface Props {
  waterStats: WaterStats;
}

export default function WaterProgressCard({ waterStats }: Props) {
  const { totalToday, goalToday, percentageComplete, entriesCount, averageDaily } = waterStats;
  
  const progressWidth = Math.min(percentageComplete, 100);
  const isGoalMet = percentageComplete >= 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          Today's Progress
        </h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          isGoalMet ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {isGoalMet ? '🎉 Goal Reached!' : `${Math.round(percentageComplete)}%`}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold text-gray-900">
              {totalToday}ml
            </span>
            <span className="text-gray-600">of {goalToday}ml</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                isGoalMet ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Entries Today</p>
              <p className="font-semibold">{entriesCount}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">7-Day Average</p>
              <p className="font-semibold">{Math.round(averageDaily)}ml</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}