import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

const MONTHS_TR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const DAYS_TR = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pa'];

interface CustomDatePickerProps {
  label?: string;
  value: string; // YYYY-MM-DD format
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  required = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subview state: 'calendar' | 'months' | 'years'
  const [activeSubView, setActiveSubView] = useState<'calendar' | 'months' | 'years'>('calendar');

  // Helper: Parse YYYY-MM-DD to Date object
  const parseDateString = (str: string): Date | null => {
    if (!str) return null;
    const parts = str.split('-');
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed
    const day = parseInt(parts[2], 10);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    return new Date(year, month, day);
  };

  const selectedDate = parseDateString(value);
  const today = new Date();

  // Calendar View State (which month/year is currently being viewed)
  const [viewMonth, setViewMonth] = useState(selectedDate ? selectedDate.getMonth() : today.getMonth());
  const [viewYear, setViewYear] = useState(selectedDate ? selectedDate.getFullYear() : today.getFullYear());

  // Year pagination start year for custom years picker
  const [yearPageStart, setYearPageStart] = useState(Math.floor((selectedDate ? selectedDate.getFullYear() : today.getFullYear()) / 16) * 16);

  // Sync view date if external value changes
  useEffect(() => {
    if (selectedDate) {
      setViewMonth(selectedDate.getMonth());
      setViewYear(selectedDate.getFullYear());
      setYearPageStart(Math.floor(selectedDate.getFullYear() / 16) * 16);
    }
  }, [value]);

  // Close calendar on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveSubView('calendar');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper: Format date as DD.MM.YYYY or display-friendly
  const getDisplayValue = () => {
    if (!selectedDate) return 'Tarih Seçiniz...';
    const day = selectedDate.getDate();
    const monthName = MONTHS_TR[selectedDate.getMonth()];
    const year = selectedDate.getFullYear();
    return `${day} ${monthName} ${year}`;
  };

  // Helper: Format Date object to YYYY-MM-DD
  const formatDateToString = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Navigation handlers
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(prev => prev - 1);
    } else {
      setViewMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(prev => prev + 1);
    } else {
      setViewMonth(prev => prev + 1);
    }
  };

  const handleDaySelect = (day: number, month: number, year: number) => {
    const targetDate = new Date(year, month, day);
    onChange(formatDateToString(targetDate));
    setIsOpen(false);
    setActiveSubView('calendar');
  };

  const handleSelectToday = () => {
    onChange(formatDateToString(today));
    setViewMonth(today.getMonth());
    setViewYear(today.getFullYear());
    setIsOpen(false);
    setActiveSubView('calendar');
  };

  const handleClear = () => {
    if (!required) {
      onChange('');
      setIsOpen(false);
      setActiveSubView('calendar');
    }
  };

  // Generate 42 calendar grid cells
  const getGridCells = () => {
    const cells = [];

    // Days in current month
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    // Day of the week for the 1st of the current month (Monday-indexed: 0 = Mon, 6 = Sun)
    const rawFirstDay = new Date(viewYear, viewMonth, 1).getDay();
    const firstDayOfWeek = rawFirstDay === 0 ? 6 : rawFirstDay - 1;

    // Days in previous month
    const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    // 1. Add faded trailing days of previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      cells.push({
        day: daysInPrevMonth - i,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false
      });
    }

    // 2. Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({
        day: i,
        month: viewMonth,
        year: viewYear,
        isCurrentMonth: true
      });
    }

    // 3. Add faded leading days of next month
    const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    const remainingCells = 42 - cells.length;
    for (let i = 1; i <= remainingCells; i++) {
      cells.push({
        day: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false
      });
    }

    return cells;
  };

  const gridCells = getGridCells();

  return (
    <div ref={containerRef} className="relative w-full" id="custom-datepicker-container">
      {label && (
        <label className="text-[9.5px] font-black text-gray-500 uppercase tracking-wider block mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-black/30 flex items-center justify-between transition-all cursor-pointer select-none ${className}`}
        >
          <span className={selectedDate ? 'text-gray-900 font-bold' : 'text-gray-400 font-medium'}>
            {getDisplayValue()}
          </span>
          <Calendar className="w-4 h-4 text-gray-400 shrink-0 ml-1.5" />
        </button>

        {selectedDate && !required && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="absolute right-9 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-full left-0 right-0 animate-in fade-in duration-100">
          
          {activeSubView === 'calendar' && (
            <>
              {/* Calendar Header with Custom Interactive Elements */}
              <div className="flex items-center justify-between mb-3.5 gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg border border-gray-100 hover:bg-gray-50 text-gray-600 hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Custom Trigger buttons for Month / Year overlays */}
                <div className="flex items-center gap-1 flex-1 justify-center">
                  <button
                    type="button"
                    onClick={() => setActiveSubView('months')}
                    className="px-2 py-1 rounded-lg hover:bg-gray-50 font-black text-xs text-gray-900 transition-colors cursor-pointer flex items-center gap-0.5 select-none"
                  >
                    {MONTHS_TR[viewMonth]}
                    <span className="text-[10px] text-gray-400">▼</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setYearPageStart(Math.floor(viewYear / 16) * 16);
                      setActiveSubView('years');
                    }}
                    className="px-2 py-1 rounded-lg hover:bg-gray-50 font-black text-xs text-gray-900 transition-colors cursor-pointer flex items-center gap-0.5 select-none"
                  >
                    {viewYear}
                    <span className="text-[10px] text-gray-400">▼</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg border border-gray-100 hover:bg-gray-50 text-gray-600 hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Weekday Labels */}
              <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                {DAYS_TR.map((day, idx) => (
                  <span key={idx} className="text-[10px] font-black text-gray-400 uppercase">
                    {day}
                  </span>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {gridCells.map((cell, idx) => {
                  const isSelected = selectedDate && 
                    selectedDate.getDate() === cell.day && 
                    selectedDate.getMonth() === cell.month && 
                    selectedDate.getFullYear() === cell.year;

                  const isToday = today.getDate() === cell.day && 
                    today.getMonth() === cell.month && 
                    today.getFullYear() === cell.year;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleDaySelect(cell.day, cell.month, cell.year)}
                      className={`
                        h-8 w-full text-xs font-semibold rounded-lg flex items-center justify-center transition-all cursor-pointer relative
                        ${cell.isCurrentMonth ? 'text-gray-800' : 'text-gray-300'}
                        ${isSelected 
                          ? 'bg-[#eafda8] text-black font-black border border-black scale-105 shadow-3xs' 
                          : 'hover:bg-gray-50'
                        }
                      `}
                    >
                      {cell.day}
                      
                      {isToday && !isSelected && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick Action Footer */}
              <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-gray-100 text-[10.5px] font-extrabold">
                <button
                  type="button"
                  onClick={handleSelectToday}
                  className="text-black hover:underline cursor-pointer text-[10.5px] font-extrabold"
                >
                  Bugün
                </button>
                
                {!required && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer text-[10.5px] font-extrabold"
                  >
                    Temizle
                  </button>
                )}
              </div>
            </>
          )}

          {activeSubView === 'months' && (
            <>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <span className="text-[10.5px] font-black text-gray-500 uppercase tracking-wider">Ay Seçiniz</span>
                <button
                  type="button"
                  onClick={() => setActiveSubView('calendar')}
                  className="text-[10px] font-black text-black hover:underline cursor-pointer"
                >
                  Vazgeç
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {MONTHS_TR.map((m, idx) => {
                  const isSelected = viewMonth === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setViewMonth(idx);
                        setActiveSubView('calendar');
                      }}
                      className={`py-2 text-[11px] font-extrabold rounded-xl transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-[#eafda8] text-black font-black border border-black shadow-3xs'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {activeSubView === 'years' && (
            <>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <button
                  type="button"
                  onClick={() => setYearPageStart(prev => prev - 16)}
                  className="p-1 rounded-lg border border-gray-100 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10.5px] font-black text-gray-500 uppercase tracking-wider">
                  {yearPageStart} - {yearPageStart + 15}
                </span>
                <button
                  type="button"
                  onClick={() => setYearPageStart(prev => prev + 16)}
                  className="p-1 rounded-lg border border-gray-100 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {Array.from({ length: 16 }).map((_, idx) => {
                  const y = yearPageStart + idx;
                  const isSelected = viewYear === y;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => {
                        setViewYear(y);
                        setActiveSubView('calendar');
                      }}
                      className={`py-2 text-[10.5px] font-extrabold rounded-xl transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-[#eafda8] text-black font-black border border-black shadow-3xs'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end mt-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setActiveSubView('calendar')}
                  className="text-[10px] font-black text-black hover:underline cursor-pointer"
                >
                  Geri Dön
                </button>
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
};
