import { useState } from 'react';
import {
  LayoutGrid,
  CalendarDays,
  MessageSquare,
  Users,
  Briefcase,
  CreditCard,
  FileText,
  Globe,
  BarChart3,
  ShieldCheck,
  Settings,
  Archive,
  Cat,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Grid
} from 'lucide-react';

interface SidebarProps {
  activeMenuItem: string;
  setActiveMenuItem: (item: string) => void;
  isCatVisible: boolean;
  onToggleCat: () => void;
}

export default function Sidebar({ activeMenuItem, setActiveMenuItem, isCatVisible, onToggleCat }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuGroups = [
    {
      title: 'Panel ve Planlama',
      items: [
        { id: 'ana-panel', label: 'Ana Panel', icon: LayoutGrid },
        { id: 'randevular', label: 'Randevular', icon: CalendarDays },
        { id: 'takvim-uygunluk', label: 'Takvim ve Uygunluk', icon: CalendarDays },
        { id: 'talepler-iletisim', label: 'Talepler ve İletişim', icon: MessageSquare },
      ]
    },
    {
      title: 'Hizmetler ve Danışanlar',
      items: [
        { id: 'danisanlar', label: 'Danışanlar', icon: Users },
        { id: 'hizmetler', label: 'Hizmetler', icon: Briefcase },
        { id: 'odeme-planlar', label: 'Ödeme ve Planlar', icon: CreditCard },
        { id: 'pdf-kaynaklar', label: 'PDF ve Kaynaklar', icon: FileText },
        { id: 'site-icerigi', label: 'İletişim ve Sosyal Medya', icon: Globe },
      ]
    },
    {
      title: 'Sistem ve Raporlar',
      items: [
        { id: 'raporlar', label: 'Raporlar', icon: BarChart3 },
        { id: 'kullanicilar-yetkiler', label: 'Kullanıcılar ve Yetkiler', icon: ShieldCheck },
        { id: 'ayarlar', label: 'Ayarlar', icon: Settings },
        { id: 'arsiv', label: 'Arşiv', icon: Archive },
        { id: 'kedi', label: 'Kedi', icon: Cat },
      ]
    }
  ];

  return (
    <div
      id="sidebar-container"
      className={`h-screen bg-crm-sidebar flex flex-col select-none transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      <style>{`
        @keyframes sidebar-label-scroll {
          0%, 18% { transform: translateX(0); }
          52%, 78% { transform: translateX(-46px); }
          100% { transform: translateX(0); }
        }

        .sidebar-label-viewport {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-align: left;
        }

        .sidebar-label-marquee {
          display: inline-block;
          padding-right: 12px;
          animation: sidebar-label-scroll 6s ease-in-out infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .sidebar-label-marquee {
            animation: none;
          }
        }
      `}</style>

      <div className={`flex items-center border-b border-[#e2e1df]/60 h-16 shrink-0 gap-3 transition-all duration-300 ${
        isCollapsed ? 'px-0 justify-center' : 'px-4'
      }`}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0">
          <Grid className="w-5 h-5 text-gray-700" />
        </div>
        {!isCollapsed && (
          <div className="flex items-center gap-2 whitespace-nowrap animate-fade-in">
            <span className="font-bold text-[#323130] text-sm tracking-tight font-sans">Berfin Akbaş</span>
            <span className="w-[1px] h-3.5 bg-[#dcdad3]"></span>
            <span className="text-xs text-[#605e5c] font-semibold font-sans">Yönetim</span>
          </div>
        )}
      </div>

      <div className={`flex-1 overflow-y-auto py-5 space-y-5 transition-all duration-300 pr-1 select-none scrollbar-thin ${
        isCollapsed ? 'px-2' : 'px-4'
      }`}>
        <div className={`flex items-center justify-between ${isCollapsed ? 'px-0 justify-center' : 'px-2'}`}>
          {!isCollapsed && (
            <span className="text-xl font-bold text-gray-800 tracking-tight font-sans animate-fade-in">
              Menü
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-7 h-7 rounded-full border border-gray-400/20 flex items-center justify-center hover:bg-white/30 text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none shrink-0"
            title={isCollapsed ? 'Menüyü genişlet' : 'Menüyü daralt'}
          >
            {isCollapsed ? (
              <ArrowRightFromLine className="w-4 h-4" />
            ) : (
              <ArrowLeftFromLine className="w-4 h-4" />
            )}
          </button>
        </div>

        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-1.5 pt-1">
            {!isCollapsed && (
              <span className="px-3 text-xs font-bold text-gray-700 block mb-1.5 mt-2.5 animate-fade-in">
                {group.title}
              </span>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const IconComponent = item.icon;
                const isKedi = item.id === 'kedi';
                const isSelected = activeMenuItem === item.id;
                const itemClassName = `w-full flex items-center gap-3.5 px-3 py-1.5 rounded-full text-sm transition-colors duration-200 focus:outline-none ${
                  isCollapsed ? 'justify-center px-1' : ''
                } ${
                  isSelected
                    ? 'bg-crm-accent text-black font-bold'
                    : 'text-gray-500 hover:bg-white/30 hover:text-black font-semibold'
                }`;

                if (isKedi) {
                  return (
                    <div key={item.id} className={itemClassName}>
                      <button
                        type="button"
                        onClick={onToggleCat}
                        aria-pressed={isCatVisible}
                        aria-label={isCatVisible ? 'Kediyi gizle' : 'Kediyi göster'}
                        title={isCatVisible ? 'Kediyi gizle' : 'Kediyi göster'}
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                          isCatVisible
                            ? 'border-black bg-black text-[#eafda8]'
                            : isSelected
                              ? 'border-black/15 text-lime-700'
                              : 'border-gray-400/20 text-gray-500 hover:border-black/20 hover:text-black'
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 ${isCatVisible || isSelected ? 'stroke-[2.5]' : ''}`} />
                      </button>
                      {!isCollapsed && (
                        <button
                          type="button"
                          onClick={() => setActiveMenuItem(item.id)}
                          className="sidebar-label-viewport cursor-pointer py-1 font-inherit text-left focus:outline-none"
                          title="Kedi ayarlarını aç"
                        >
                          <span>{item.label}</span>
                        </button>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveMenuItem(item.id)}
                    className={`${itemClassName} cursor-pointer`}
                    title={item.label}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                      isSelected ? 'border-black/15' : 'border-gray-400/20'
                    }`}>
                      <IconComponent className={`w-4 h-4 ${isSelected ? 'text-lime-700 stroke-[2.5]' : 'text-gray-500'}`} />
                    </div>
                    {!isCollapsed && (
                      <span className="sidebar-label-viewport">
                        <span className={item.id === 'site-icerigi' ? 'sidebar-label-marquee' : ''}>
                          {item.label}
                        </span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
