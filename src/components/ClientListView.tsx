import { useState } from 'react';
import { ClientDetails } from '../types';
import { 
  Search, Users, Sparkles, Phone, Mail, MapPin, 
  ChevronRight, Calendar, User, UserCheck, ShieldAlert 
} from 'lucide-react';

interface ClientListViewProps {
  clientsDb: Record<string, ClientDetails>;
  onSelectLead: (id: string) => void;
}

export default function ClientListView({ clientsDb, onSelectLead }: ClientListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState<'Hepsi' | 'Yetişkin' | 'Çocuk'>('Hepsi');
  const [statusFilter, setStatusFilter] = useState<string>('Hepsi');

  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const clients = Object.values(clientsDb);

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.clientNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAge = ageFilter === 'Hepsi' || c.ageGroup === ageFilter;
    const matchesStatus = statusFilter === 'Hepsi' || c.status === statusFilter;
    return matchesSearch && matchesAge && matchesStatus;
  });

  return (
    <div id="client-list-workspace-view" className="flex-1 bg-gradient-to-br from-[#eafda8]/50 via-white to-white rounded-[2.5rem] border border-gray-300/40 p-8 flex flex-col h-[calc(100vh-5rem)] shadow-sm overflow-y-auto select-none gap-6 transition-all duration-300 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.04] pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-black" />
            <span>Danışan Portföyü</span>
          </h1>
          <p className="text-xs text-gray-500 font-semibold mt-1">Sisteminizde kayıtlı tüm çocuk ve yetişkin danışanların genel durum göstergeleri.</p>
        </div>
        <div className="flex items-center gap-2 bg-black text-[#eafda8] px-4 py-2 rounded-full shadow-xs">
          <span className="text-xs font-black uppercase tracking-wider">{filteredClients.length} Danışan Bulundu</span>
        </div>
      </div>

      {/* Filters bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 bg-white/60 p-3.5 rounded-2xl border border-gray-100 shadow-3xs">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="İsim veya protokol no ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200/80 rounded-xl py-2 pl-9 pr-4 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-all"
          />
        </div>

        {/* Age Group Selector */}
        <div className="flex bg-gray-100/80 p-0.5 rounded-xl text-xs font-bold gap-0.5">
          {(['Hepsi', 'Yetişkin', 'Çocuk'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setAgeFilter(tab)}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                ageFilter === tab 
                  ? 'bg-white text-black shadow-3xs' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-50 border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-black transition-all cursor-pointer"
        >
          <option value="Hepsi">Tüm Durumlar</option>
          <option value="Aktif">Aktif</option>
          <option value="Potansiyel">Potansiyel</option>
          <option value="Pasif">Pasif</option>
          <option value="Arşivlenmiş">Arşivlenmiş</option>
        </select>
      </div>

      {/* Grid of Clients */}
      {filteredClients.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-3xl p-10 text-center">
          <ShieldAlert className="w-10 h-10 text-gray-300 mb-3" />
          <h3 className="text-sm font-bold text-gray-700">Arama Kriterine Uygun Danışan Bulunamadı</h3>
          <p className="text-xs text-gray-400 mt-1">Filtreleri değiştirmeyi veya arama terimini temizlemeyi deneyebilirsiniz.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filteredClients.map((client) => {
            const hasOverdue = client.payments.remainingAmount > 0;
            return (
              <div 
                key={client.id}
                onClick={() => onSelectLead(client.id)}
                className="bg-white border border-gray-100 hover:border-black/15 hover:shadow-md transition-all duration-300 rounded-[2rem] p-5 flex flex-col justify-between gap-4 cursor-pointer relative group overflow-hidden"
              >
                {/* Visual Accent Hover Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#eafda8] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Upper Row: Avatar + Name + Basic Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    {/* Avatar Replacement with Initials */}
                    <div className="relative shrink-0">
                      <div className="w-13 h-13 rounded-full bg-black text-[#eafda8] flex items-center justify-center font-black text-sm border-2 border-white/60 shadow-xs">
                        {getInitials(client.name)}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-black text-gray-950 tracking-tight leading-snug group-hover:text-black">
                          {client.name}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">
                          {client.clientNumber}
                        </span>
                      </div>
                      <span className="text-[10.5px] font-bold text-gray-400 mt-0.5 leading-none">
                        {client.ageGroup} • {client.age} Yaş
                      </span>
                    </div>
                  </div>

                  {/* Status & Type Badges */}
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider uppercase ${
                      client.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      client.status === 'Potansiyel' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                      client.status === 'Pasif' ? 'bg-gray-50 text-gray-600 border border-gray-200' :
                      'bg-zinc-100 text-zinc-700'
                    }`}>
                      {client.status}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                      client.ageGroup === 'Çocuk' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}>
                      {client.ageGroup}
                    </span>
                  </div>
                </div>

                {/* Mid section: Fast details */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-black/[0.03]">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400 font-extrabold text-[9px] uppercase tracking-wider">Aktif Plan</span>
                    <span className="text-gray-800 font-semibold truncate">
                      {client.activePlan !== 'Yok' ? client.activePlan : 'Plan Tanımlanmamış'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-right">
                    <span className="text-gray-400 font-extrabold text-[9px] uppercase tracking-wider">Sonraki Randevu</span>
                    <span className="text-gray-800 font-bold flex items-center justify-end gap-1">
                      <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
                      {client.nextAppointment !== 'Yok' ? client.nextAppointment.split(' ')[0] : 'Planlanmadı'}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Financial Status + Arrow Action */}
                <div className="flex items-center justify-between pt-3 border-t border-black/[0.03]">
                  <div className="flex items-center gap-4">
                    {/* Remaining sessions */}
                    {client.plans[0] && (
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400 font-extrabold uppercase">Kalan Seans</span>
                        <span className="text-xs font-black text-gray-900 mt-0.5">
                          {client.plans[0].remainingSessions} / {client.plans[0].totalSessions} Seans
                        </span>
                      </div>
                    )}

                    {/* Outstanding balance */}
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-extrabold uppercase">Bakiye</span>
                      <span className={`text-xs font-black mt-0.5 ${hasOverdue ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {client.payments.remainingAmount.toLocaleString('tr-TR')} TL
                      </span>
                    </div>
                  </div>

                  {/* Arrow Action */}
                  <div className="flex items-center gap-1 text-[10.5px] font-black text-black group-hover:text-emerald-700 transition-colors">
                    <span>Profili Aç</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom info banner */}
      <div className="border border-dashed border-gray-300 rounded-[2rem] p-5 bg-white/30 flex items-center gap-4 mt-auto">
        <Sparkles className="w-8 h-8 text-[#a9df20] shrink-0 animate-pulse" />
        <div>
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-tight">Hızlı Bilgilendirme</h3>
          <p className="text-[11px] text-gray-500 font-semibold mt-0.5 leading-relaxed">
            Müşteri listesini daraltmak için yukarıdaki hızlı arama ve filtre çubuğunu kullanabilirsiniz. Detaylı bilgilere, veli onam formlarına, aktif seans ve ödeme taksit tablosuna erişmek için dilediğiniz danışanın kartına tıklamanız yeterlidir.
          </p>
        </div>
      </div>
    </div>
  );
}
