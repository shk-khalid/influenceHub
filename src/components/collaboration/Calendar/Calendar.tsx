import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '../../common/Button';
import { EventModal } from './EventModal';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  type: 'post' | 'story' | 'reel' | 'video';
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Instagram Post - Summer Collection',
      date: new Date(2024, 2, 15),
      status: 'approved',
      type: 'post'
    },
    {
      id: '2',
      title: 'TikTok Video - Product Review',
      date: new Date(2024, 2, 18),
      status: 'pending',
      type: 'video'
    }
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getStatusColor = (status: CalendarEvent['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousMonth}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setIsEventModalOpen(true)}
        >
          New Event
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 dark:bg-gray-800 p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
        
        {days.map((day) => {
          const dayEvents = events.filter(event => 
            format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          );

          return (
            <div
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              className={`
                min-h-[120px] p-2 bg-white dark:bg-gray-800 
                ${!isSameMonth(day, currentDate) && 'bg-gray-50 dark:bg-gray-900/50 text-gray-400'}
                ${isToday(day) && 'ring-2 ring-indigo-600 ring-inset'}
                hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer
              `}
            >
              <div className="font-medium text-sm mb-1">
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className={`
                      text-xs p-1 rounded
                      ${getStatusColor(event.status)}
                    `}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        selectedDate={selectedDate || new Date()}
      />
    </div>
  );
}