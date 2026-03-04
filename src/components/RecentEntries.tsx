import { WaterEntry } from '@/types/water';
import { format } from 'date-fns';
import { Clock, Droplets } from 'lucide-react';

interface Props {
  entries: WaterEntry[];
}

const getSourceIcon = (source?: string) => {
  switch (source) {
    case 'bottle': return '🍼';
    case 'glass': return '🥛';
    default: return '💧';
  }
};

export default function RecentEntries({ entries }: Props) {
  const sortedEntries = entries.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 8);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-blue-500" />
        Today's Entries
      </h3>
      
      {sortedEntries.length === 0 ? (
        <div className="text-center py-8">
          <Droplets className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No entries yet today</p>
          <p className="text-sm text-gray-400">Start logging your water intake!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {sortedEntries.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xl">{getSourceIcon(entry.source)}</span>
                <div>
                  <p className="font-medium text-gray-800">{entry.amount}ml</p>
                  <p className="text-xs text-gray-600">
                    {format(new Date(entry.timestamp), 'h:mm a')}
                  </p>
                </div>
              </div>
              
              {entry.notes && (
                <div className="text-right">
                  <p className="text-sm text-gray-600 truncate max-w-24">
                    {entry.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}