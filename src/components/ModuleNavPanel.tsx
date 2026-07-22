import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
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
import { getModuleConfig } from '../data/moduleConfig';

interface ModuleNavPanelProps {
  activeMenuItem: string;
  selectedItemId: string;
  onSelectItem: (id: string) => void;
}

const CONTACT_SOCIAL_CONFIG = {
  title: 'İletişim ve Sosyal Medya',
  subtitle: 'FAB iletişim menüsünün tüm bağlantı, görünürlük, metin ve sıralama ayarları.',
  groups: [
    {
      title: 'Yönetim',
      items: [
        {
          id: 'genel-ayarlar',
          label: 'Tüm İletişim Ayarları',
          description: 'WhatsApp, Instagram, telefon, e-posta, görünürlük ve sıralama.',
        },
      ],
    },
  ],
  topActions: [],
};

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
  const isContactSocial = activeMenuItem === 'site-icerigi';
  const config = isContactSocial ? CONTACT_SOCIAL_CONFIG : getModuleConfig(activeMenuItem);
  const defaultItemId = config?.groups[0]?.items[0]?.id || '';
  const effectiveSelectedId = selectedItemId || defaultItemId;

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

  const firstActionId = config.groups.at(-1)?.items[0]?.id || defaultItemId;

  return (
    <div
      id="module-nav-panel"
      className="w-[340px] bg-crm-panel rounded-[2.5rem] border border-gray-300/40 shadow-sm flex flex-col overflow-hidden h-[calc(100vh-5rem)] shrink-0 select-none relative"
    >
      <style>{`
        #contact-social-workspace section:nth-of-type(2) article:first-child > div:first-child > div:first-child > span > svg {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff'%3E%3Cpath d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648a9.86 9.86 0 0 1-1.319-4.956c.002-5.45 4.437-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 7c-.003 5.45-4.437 9.884-9.884 9.884m8.413-18.297A11.82 11.82 0 0 0 12.481 0C5.905 0 .554 5.35.551 11.925c0 2.104.549 4.152 1.595 5.956L.451 24l6.259-1.643a11.88 11.88 0 0 0 5.767 1.469h.005c6.575 0 11.926-5.351 11.929-11.927A11.82 11.82 0 0 0 20.464 3.488Z'/%3E%3C/svg%3E");
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }

        #contact-social-workspace section:nth-of-type(3) > div:last-child > div:first-child > svg {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cf6747'%3E%3Cpath d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648a9.86 9.86 0 0 1-1.319-4.956c.002-5.45 4.437-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 7c-.003 5.45-4.437 9.884-9.884 9.884m8.413-18.297A11.82 11.82 0 0 0 12.481 0C5.905 0 .554 5.35.551 11.925c0 2.104.549 4.152 1.595 5.956L.451 24l6.259-1.643a11.88 11.88 0 0 0 5.767 1.469h.005c6.575 0 11.926-5.351 11.929-11.927A11.82 11.82 0 0 0 20.464 3.488Z'/%3E%3C/svg%3E");
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }

        #contact-social-workspace section:nth-of-type(2) article:first-child > div:first-child > div:first-child > span > svg *,
        #contact-social-workspace section:nth-of-type(3) > div:last-child > div:first-child > svg * {
          opacity: 0;
        }
      `}</style>

      <div className="p-5 pb-4 flex items-center justify-between border-b border-black/[0.025]">
        <div className="min-w-0">
          <h2 className="text-lg font-black text-gray-900 tracking-tight leading-none truncate">{config.title}</h2>
          <p className="text-[10px] text-gray-400 font-bold mt-1.5 leading-relaxed line-clamp-2">{config.subtitle}</p>
        </div>
        {!isContactSocial && (
          <button
            type="button"
            onClick={() => onSelectItem(firstActionId)}
            className="w-8 h-8 rounded-full bg-black text-[#eafda8] hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-sm shrink-0 ml-3"
            title={config.topActions[0] || 'Yeni kayıt'}
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {!isContactSocial && (
        <div className="px-4 py-3 border-b border-black/[0.02] bg-white/30">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              value={searchQuery}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
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
      )}

      <div className={`flex-1 overflow-y-auto px-4 ${isContactSocial ? 'py-5' : 'py-4'} space-y-5`}>
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
                        <span className="text-[12px] font-black text-gray-900 tracking-tight block">{item.label}</span>
                        <span className={`text-[9.5px] font-semibold block mt-0.5 leading-relaxed ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>
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
