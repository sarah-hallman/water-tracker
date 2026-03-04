import { Droplets, Coffee, Wine } from 'lucide-react';
import { QuickAddOption } from '@/types/water';

interface Props {
  onQuickAdd: (amount: number, source: string) => void;
  isLoading: boolean;
}

const quickAddOptions: QuickAddOption[] = [
  { label: 'Small Glass', amount: 200, icon: '🥤' },
  { label: 'Large Glass', amount: 350, icon: '🥛' },
  { label: 'Water Bottle', amount: 500, icon: '🍼' },
  { label: 'Large Bottle', amount: 750, icon: '🍶' }
];

export default function QuickAddButtons({ onQuickAdd, isLoading }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Droplets className="h-5 w-5 text-blue-500" />
        Quick Add
      </h3>
      
      <div className="space-y-3">
        {quickAddOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => onQuickAdd(option.amount, 'glass')}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{option.icon}</span>
              <div className="text-left">
                <p className="font-medium text-gray-800">{option.label}</p>
                <p className="text-sm text-gray-600">{option.amount}ml</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold hover:bg-blue-600 transition-colors">
              +
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          💡 Tip: Regular small amounts are better than large infrequent drinks
        </p>
      </div>
    </div>
  );
}