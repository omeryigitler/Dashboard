import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CustomTimePickerProps {
  value: string; // "HH:MM" format
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  value,
  onChange,
  required = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse hour and minute from value
  const parseTime = (str: string) => {
    if (!str || !str.includes(':')) return { hour: '09', minute: '00' };
    const parts = str.split(':');
    return {
      hour: parts[0].padStart(2, '0'),
      minute: parts[1].padStart(2, '0')
    };
  };

  const { hour: currentHour, minute: currentMinute } = parseTime(value);

  // Lists for picker
  const HOURS = Array.from({ length: 24 }).map((_, i) => String(i).padStart(2, '0'));
  const MINUTES = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleHourSelect = (h: string) => {
    onChange(`${h}:${currentMinute}`);
  };

  const handleMinuteSelect = (m: string) => {
    onChange(`${currentHour}:${m}`);
  };

  // Safe display value (e.g. 09:30)
  const displayValue = value ? value : 'Saat Seçin';

  return (
    <div ref={containerRef} className="relative w-full" id="custom-timepicker-container">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-black/30 flex items-center justify-between transition-all cursor-pointer select-none ${className}`}
      >
        <span className={value ? 'text-gray-900 font-bold' : 'text-gray-400 font-medium'}>
          {displayValue}
        </span>
        <Clock className="w-4 h-4 text-gray-400 shrink-0 ml-1.5" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 w-full left-0 right-0 animate-in fade-in duration-100">
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2 text-center pb-1 border-b border-gray-50">
            Saat Ayarı
          </div>
          
          <div className="grid grid-cols-2 gap-2 h-44">
            {/* Hours Column */}
            <div className="flex flex-col overflow-y-auto pr-1 border-r border-gray-100 scrollbar-thin scrollbar-thumb-gray-200">
              <span className="text-[9px] font-black text-gray-400 uppercase text-center mb-1 sticky top-0 bg-white py-0.5">Saat</span>
              {HOURS.map((h) => {
                const isSelected = currentHour === h;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => handleHourSelect(h)}
                    className={`py-1.5 text-xs rounded-lg transition-all text-center mb-0.5 cursor-pointer font-bold ${
                      isSelected
                        ? 'bg-[#eafda8] text-black font-black border border-black/80 shadow-3xs scale-95'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {h}
                  </button>
                );
              })}
            </div>

            {/* Minutes Column */}
            <div className="flex flex-col overflow-y-auto pl-1 scrollbar-thin scrollbar-thumb-gray-200">
              <span className="text-[9px] font-black text-gray-400 uppercase text-center mb-1 sticky top-0 bg-white py-0.5">Dakika</span>
              {MINUTES.map((m) => {
                const isSelected = currentMinute === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleMinuteSelect(m)}
                    className={`py-1.5 text-xs rounded-lg transition-all text-center mb-0.5 cursor-pointer font-bold ${
                      isSelected
                        ? 'bg-[#eafda8] text-black font-black border border-black/80 shadow-3xs scale-95'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            <span className="text-[10.5px] font-black text-gray-800">
              Seçilen: {currentHour}:{currentMinute}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[10px] font-black text-black hover:underline cursor-pointer"
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
