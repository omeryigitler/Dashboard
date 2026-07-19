import { useMemo, useState } from 'react';
import {
  Search,
  X,
  Plus,
  ChevronRight,
  Layers3,
  CalendarDays,
  ListFilter,
  Settings2,
  FileText,
  BarChart3,
  ShieldCheck,
  Archive,
  CircleDollarSign,
  Globe2,
  MessageSquare,
} from 'lucide-react';
import { getDefaultModuleItemId, getModuleConfig } from '../data/moduleConfig';

interface ModuleNavPanelProps {
  activeMenuItem: string;
  selectedItemId: string;
  onSelectItem: (id: string) => void;
}

const iconPool = [
  Layers3,
  CalendarDays,
  ListFilter,
  Settings2,
  FileText,
  BarChart3,
  ShieldCheck,
  Archive,
  CircleDollarSign,
  Globe2,
  MessageSquare,
];

export default function ModuleNavPanel({ activeMenuItem, selectedItemId, onSelectItem }: ModuleNavPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const config = getModuleConfig(activeMenuItem);

  const effectiveSelectedId = selectedItemId || getDefaultModuleItemId(activeMenuItem);

  const filteredGroups = useMemo(() => {
    if (!config) return [];
    const query = searchQuery.trim().toLocaleLowerCase('tr-TR');
    if (!query) return config.groups;

    return config.groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.label.toLocaleLowerCase('tr-TR').includes(query) ||
          item.description.toLocaleLowerCase('tr-TR').includes(query),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [config, searchQuery]);

  if (!config) return null;

  const firstActionId = config.groups.at(-1)?.items[0]?.id || getDefaultModuleItemId(activeMenuItem);

  return (
    <div
      id="module-nav-panel"
      className="w-[340px] bg-crm-panel rounded-[2.5rem] border border-gray-300/40 shadow-sm flex flex-col overflow-hidden h-[calc(100vh-5rem)] shrink-0 select-none relative"
    >
      <div className="p-5 pb-4 flex items-center justify-between border-b border-black/[0.025]">
        <div className="min-w-0">
          <h2 className="text-lg font-black text-gray-900 tracking-tight leading-none truncate">{config.title}</h2>
          <p className="text-[10px] text-gray-400 font-bold mt-1.5 leading-relaxed line-clamp-2">{config.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => onSelectItem(firstActionId)}
          className="w-8 h-8 rounded-full bg-black text-[#eafda8] hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-sm shrink-0 ml-3"
          title={config.topActions[0] || 'Yeni kayıt'}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="px-4 py-3 border-b border-black/[0.02] bg-white/30">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={`${config.title} içinde ara...`}
            className="w-full bg-white border border-gray-200/80 rounded-2xl py-2 pl-9 pr-9 text-xs text-gray-950 placeholder-gray-400 focus:outline-none focus:border-black/25 shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-gray-400 hover:text-black cursor-pointer"
              aria-label="Aramayı temizle"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {filteredGroups.length === 0 ? (
          <div className="py-16 text-center">
            <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="text-xs font-black text-gray-500">Sonuç bulunamadı</p>
            <p className="text-[10px] text-gray-400 mt-1">Arama kelimesini değiştirin.</p>
          </div>
        ) : (
          filteredGroups.map((group, groupIndex) => (
            <section key={group.title} className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[9px] text-gray-400 font-black tracking-[0.16em] uppercase">{group.title}</span>
                <span className="text-[9px] text-gray-400 font-bold bg-gray-100 px-2 py-0.5 rounded-full">{group.items.length}</span>
              </div>

              <div className="space-y-2">
                {group.items.map((item, itemIndex) => {
                  const Icon = iconPool[(groupIndex * 3 + itemIndex) % iconPool.length];
                  const isActive = effectiveSelectedId === item.id;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => onSelectItem(item.id)}
                      className={`w-full rounded-[1.65rem] border p-3.5 text-left flex items-center gap-3 transition-all duration-200 cursor-pointer group ${
                        isActive
                          ? 'bg-gradient-to-br from-[#eafda8] to-[#dcfb61] border-black/10 shadow-md shadow-[#eafda8]/20'
                          : 'bg-white border-gray-100 hover:border-[#d2fc5c]/60 hover:bg-[#eafda8]/5'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${isActive ? 'bg-black text-[#eafda8] border-black' : 'bg-gray-50 text-gray-500 border-gray-100 group-hover:bg-white'}`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-[12px] font-black text-gray-900 tracking-tight block truncate">{item.label}</span>
                        <span className={`text-[9.5px] font-semibold block mt-0.5 truncate ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                          {item.description}
                        </span>
                      </div>

                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? 'text-black translate-x-0.5' : 'text-gray-300 group-hover:text-gray-600'}`} />
                    </button>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
