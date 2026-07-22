import { useState } from 'react';
import { 
  Search, 
  Clock, 
  Plus, 
  Lightbulb, 
  Filter, 
  Settings, 
  HelpCircle, 
  Headphones,
  X, 
  Info,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  onAddLeadClick?: () => void;
}

export default function Header({ 
  onAddLeadClick
}: HeaderProps) {
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);

  return (
    <header 
      id="main-app-header"
      className="h-16 px-6 flex items-center justify-between shrink-0 select-none relative"
    >
      {/* Sol alan, mevcut yerleşim dengesini korumak için boş bırakılır. */}
      <div className="flex-1 flex items-center gap-2">
      </div>

      {/* Sağ üst işlem ikonları */}
      <div className="flex items-center gap-1">
        
        {/* Arama */}
        <button
          className="w-9 h-9 rounded-full border border-gray-400/20 flex items-center justify-center hover:bg-white/30 text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none"
          title="Ara"
        >
          <Search className="w-5 h-5 stroke-[1.5]" />
        </button>
 
        {/* Son işlemler */}
        <button
          className="w-9 h-9 rounded-full border border-gray-400/20 flex items-center justify-center hover:bg-white/30 text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none"
          title="Son işlemler"
        >
          <Clock className="w-5 h-5 stroke-[1.5]" />
        </button>
 
        {/* Hızlı oluştur */}
        <button
          onClick={onAddLeadClick}
          className="w-9 h-9 rounded-full border border-gray-400/20 flex items-center justify-center hover:bg-white/30 text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none"
          title="Hızlı oluştur"
        >
          <Plus className="w-5 h-5 stroke-[1.5]" />
        </button>
 
        {/* Öngörüler */}
        <button
          className="w-9 h-9 rounded-full border border-gray-400/20 flex items-center justify-center hover:bg-white/30 text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none"
          title="Öngörüler"
        >
          <Lightbulb className="w-5 h-5 stroke-[1.5]" />
        </button>
 
        {/* Filtreler */}
        <button
          className="w-9 h-9 rounded-full border border-gray-400/20 flex items-center justify-center hover:bg-white/30 text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none"
          title="Filtreler"
        >
          <Filter className="w-5 h-5 stroke-[1.5]" />
        </button>
 
        {/* Ayarlar */}
        <button
          onClick={() => {
            setShowSettingsPanel(!showSettingsPanel);
          }}
          className="w-9 h-9 rounded-full border border-gray-400/20 flex items-center justify-center hover:bg-white/30 text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none"
          title="Ayarlar"
        >
          <Settings className="w-5 h-5 stroke-[1.5]" />
        </button>
 
        {/* Yardım */}
        <button
          className="w-9 h-9 rounded-full border border-gray-400/20 flex items-center justify-center hover:bg-white/30 text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none"
          title="Yardım"
        >
          <HelpCircle className="w-5 h-5 stroke-[1.5]" />
        </button>
 
        {/* Destek */}
        <button
          className="w-9 h-9 rounded-full border border-gray-400/20 flex items-center justify-center hover:bg-white/30 text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none"
          title="Destek"
        >
          <Headphones className="w-5 h-5 stroke-[1.5]" />
        </button>
 
        {/* Kullanıcı profili */}
        <div className="flex items-center pl-1 select-none">
          <div className="relative cursor-pointer group shrink-0">
            <div className="w-9 h-9 rounded-full bg-black text-[#eafda8] flex items-center justify-center font-bold text-xs border border-gray-400/20 group-hover:border-black/50 transition-all">
              ÖY
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
          </div>
        </div>
      </div>

      {/* Görünüm ayarları paneli */}
      {showSettingsPanel && (
        <div 
          id="settings-panel"
          className="absolute right-12 top-16 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50 animate-slide-down"
        >
          <div className="pb-2 mb-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-amber-500" />
              <h3 className="font-semibold text-gray-900 text-sm">Görünüm Ayarları</h3>
            </div>
            <button 
              onClick={() => setShowSettingsPanel(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
              title="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 flex items-start gap-2 text-xs text-gray-600">
              <Info className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <p>Berfin Akbaş yönetim panelinin görünüm ve kullanım ayarları.</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
