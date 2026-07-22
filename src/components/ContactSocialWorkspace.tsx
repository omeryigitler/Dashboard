import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Eye,
  Instagram,
  LoaderCircle,
  Mail,
  MessageCircle,
  Monitor,
  Phone,
  Save,
  Smartphone,
} from 'lucide-react';

type ChannelId = 'whatsapp' | 'instagram' | 'phone' | 'email';

type ContactFabSettings = {
  fabEnabled: boolean;
  showOnMobile: boolean;
  showOnDesktop: boolean;
  whatsappUrl: string;
  instagramUrl: string;
  phone: string;
  email: string;
  labels: Record<ChannelId, string>;
  enabled: Record<ChannelId, boolean>;
  order: ChannelId[];
};

interface ContactSocialWorkspaceProps {
  selectedItemId: string;
}

const DEFAULT_SETTINGS: ContactFabSettings = {
  fabEnabled: true,
  showOnMobile: true,
  showOnDesktop: true,
  whatsappUrl: '',
  instagramUrl: '',
  phone: '',
  email: '',
  labels: {
    whatsapp: 'WhatsApp ile bize ulaşın',
    instagram: "Instagram'da bizi takip edin",
    phone: 'Telefonla bizi arayın',
    email: 'E-posta gönderin',
  },
  enabled: {
    whatsapp: true,
    instagram: true,
    phone: true,
    email: true,
  },
  order: ['whatsapp', 'instagram', 'phone', 'email'],
};

const CHANNELS = [
  {
    id: 'whatsapp' as const,
    title: 'WhatsApp',
    field: 'whatsappUrl' as const,
    placeholder: 'https://wa.me/90...',
    inputType: 'url',
    icon: MessageCircle,
  },
  {
    id: 'instagram' as const,
    title: 'Instagram',
    field: 'instagramUrl' as const,
    placeholder: 'https://instagram.com/...',
    inputType: 'url',
    icon: Instagram,
  },
  {
    id: 'phone' as const,
    title: 'Telefon',
    field: 'phone' as const,
    placeholder: '+90 5xx xxx xx xx',
    inputType: 'tel',
    icon: Phone,
  },
  {
    id: 'email' as const,
    title: 'E-posta',
    field: 'email' as const,
    placeholder: 'iletisim@berfinakbas.com',
    inputType: 'email',
    icon: Mail,
  },
];

const inputClassName =
  'w-full rounded-2xl border border-black/[0.09] bg-white px-3.5 py-3 text-[11px] font-bold text-gray-900 shadow-2xs outline-none transition focus:border-black/25 focus:ring-4 focus:ring-[#eafda8]/45 placeholder:text-gray-300 select-text';

export default function ContactSocialWorkspace({ selectedItemId }: ContactSocialWorkspaceProps) {
  const [settings, setSettings] = useState<ContactFabSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetch('/api/site-contact', { cache: 'no-store', credentials: 'include' })
      .then(async (response) => {
        if (!response.ok) throw new Error('İletişim ayarları yüklenemedi.');
        return response.json() as Promise<ContactFabSettings>;
      })
      .then((data) => {
        if (!active) return;
        setSettings(data);
        setError('');
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : 'İletişim ayarları yüklenemedi.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const activeChannelCount = useMemo(
    () => CHANNELS.filter((channel) => settings.enabled[channel.id]).length,
    [settings.enabled],
  );

  const selectedLabel = useMemo(() => {
    const labels: Record<string, string> = {
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      telefon: 'Telefon',
      'e-posta': 'E-posta',
      gorunurluk: 'Görünürlük',
      'siralama-ve-metinler': 'Sıralama ve metinler',
    };
    return labels[selectedItemId] || 'İletişim ve sosyal medya';
  }, [selectedItemId]);

  const updateChannelValue = (
    field: 'whatsappUrl' | 'instagramUrl' | 'phone' | 'email',
    value: string,
  ) => {
    setSettings((current) => ({ ...current, [field]: value }));
  };

  const updateChannelLabel = (id: ChannelId, value: string) => {
    setSettings((current) => ({
      ...current,
      labels: { ...current.labels, [id]: value },
    }));
  };

  const toggleChannel = (id: ChannelId) => {
    setSettings((current) => ({
      ...current,
      enabled: { ...current.enabled, [id]: !current.enabled[id] },
    }));
  };

  const moveChannel = (id: ChannelId, direction: -1 | 1) => {
    setSettings((current) => {
      const order = [...current.order];
      const index = order.indexOf(id);
      const targetIndex = index + direction;
      if (index < 0 || targetIndex < 0 || targetIndex >= order.length) return current;
      [order[index], order[targetIndex]] = [order[targetIndex], order[index]];
      return { ...current, order };
    });
  };

  const saveSettings = async () => {
    setSaving(true);
    setError('');
    setNotice('');

    try {
      const response = await fetch('/api/site-contact', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const payload = (await response.json().catch(() => null)) as
        | ContactFabSettings
        | { error?: string }
        | null;

      if (!response.ok) {
        const message = payload && 'error' in payload ? payload.error : undefined;
        throw new Error(message || 'Ayarlar kaydedilemedi.');
      }

      setSettings(payload as ContactFabSettings);
      setNotice('İletişim ve sosyal medya ayarları kaydedildi.');
      window.setTimeout(() => setNotice(''), 3000);
    } catch (saveError: unknown) {
      setError(saveError instanceof Error ? saveError.message : 'Ayarlar kaydedilemedi.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 rounded-[2.5rem] border border-gray-300/40 bg-white h-[calc(100vh-5rem)] grid place-items-center shadow-sm">
        <div className="flex items-center gap-3 text-xs font-black text-gray-500">
          <LoaderCircle className="w-5 h-5 animate-spin" />
          İletişim ayarları yükleniyor
        </div>
      </div>
    );
  }

  return (
    <div
      id="contact-social-workspace"
      className="flex-1 rounded-[2.5rem] border border-gray-300/40 p-6 flex flex-col h-[calc(100vh-5rem)] shadow-sm overflow-y-auto gap-5 transition-all duration-300 animate-fade-in relative"
      style={{ background: 'linear-gradient(118deg, #eafda8 0%, #fff8ed 28%, #ffffff 55%, #fff8f4 100%)' }}
    >
      {(notice || error) && (
        <div
          className={`sticky top-0 z-40 mx-auto -mb-12 rounded-full px-4 py-2 text-[10px] font-black shadow-xl flex items-center gap-2 animate-fade-in ${
            error ? 'bg-[#9f3f35] text-white' : 'bg-black text-[#eafda8]'
          }`}
        >
          {error ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
          {error || notice}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={saveSettings}
            disabled={saving}
            className="px-4 py-2 rounded-full border border-black bg-black text-[#eafda8] text-[10px] font-black flex items-center gap-2 transition-all cursor-pointer disabled:cursor-wait disabled:opacity-60"
          >
            {saving ? <LoaderCircle className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? 'Kaydediliyor' : 'Değişiklikleri kaydet'}
          </button>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 rounded-full border border-black/10 bg-white/65 text-gray-700 text-[10px] font-black flex items-center gap-2 hover:bg-white transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            Siteyi aç
          </a>
        </div>
        <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.12em]">
          Gerçek site verisine bağlı
        </span>
      </div>

      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-black/[0.06] pb-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-black text-[#eafda8] text-[8px] font-black uppercase tracking-[0.13em]">
              Site yönetimi
            </span>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-wider truncate">{selectedLabel}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-950 tracking-tight">İletişim ve Sosyal Medya</h1>
          <p className="text-[11px] text-gray-500 font-semibold mt-1 max-w-3xl leading-relaxed">
            Sitedeki sabit iletişim menüsünün bağlantılarını, metinlerini, sırasını ve cihaz görünürlüğünü yönetin.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <StatusCard label="FAB menüsü" value={settings.fabEnabled ? 'Aktif' : 'Pasif'} hint="Site geneli" />
        <StatusCard label="Aktif kanal" value={String(activeChannelCount)} hint="4 kanal içinden" />
        <StatusCard label="Mobil" value={settings.showOnMobile ? 'Görünür' : 'Gizli'} hint="980 px ve altı" />
        <StatusCard label="Masaüstü" value={settings.showOnDesktop ? 'Görünür' : 'Gizli'} hint="981 px ve üstü" />
      </div>

      <section className="rounded-[2rem] border border-black/[0.07] bg-white/82 p-5 shadow-3xs">
        <div className="flex items-start justify-between gap-4 border-b border-black/[0.05] pb-4">
          <div>
            <h2 className="text-[13px] font-black text-gray-900">Görünürlük</h2>
            <p className="text-[10px] font-semibold text-gray-400 mt-1">FAB menüsünü ve cihaz bazlı görünürlüğünü açıp kapatın.</p>
          </div>
          <Monitor className="w-5 h-5 text-gray-300" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <ToggleCard
            title="FAB menüsü"
            description="Tüm sitede iletişim düğmesini göster"
            checked={settings.fabEnabled}
            onChange={() => setSettings((current) => ({ ...current, fabEnabled: !current.fabEnabled }))}
            icon={<Eye className="w-4 h-4" />}
          />
          <ToggleCard
            title="Mobil görünüm"
            description="Telefon ve tablet ekranlarında göster"
            checked={settings.showOnMobile}
            onChange={() => setSettings((current) => ({ ...current, showOnMobile: !current.showOnMobile }))}
            icon={<Smartphone className="w-4 h-4" />}
          />
          <ToggleCard
            title="Masaüstü görünüm"
            description="Geniş ekranlarda iletişim kartı olarak göster"
            checked={settings.showOnDesktop}
            onChange={() => setSettings((current) => ({ ...current, showOnDesktop: !current.showOnDesktop }))}
            icon={<Monitor className="w-4 h-4" />}
          />
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/[0.07] bg-white/82 p-5 shadow-3xs">
        <div className="border-b border-black/[0.05] pb-4">
          <h2 className="text-[13px] font-black text-gray-900">İletişim kanalları</h2>
          <p className="text-[10px] font-semibold text-gray-400 mt-1">Her kanalın hedefini, görünen metnini ve aktif durumunu ayrı yönetin.</p>
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 mt-4">
          {CHANNELS.map((channel) => {
            const Icon = channel.icon;
            return (
              <article key={channel.id} className="rounded-[1.7rem] border border-black/[0.07] bg-[#faf9f6] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#dc6f4e] text-white grid place-items-center shadow-sm">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <h3 className="text-[12px] font-black text-gray-900">{channel.title}</h3>
                      <span className="text-[9px] font-bold text-gray-400">FAB iletişim kanalı</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleChannel(channel.id)}
                    className={`rounded-full px-3 py-1.5 text-[9px] font-black border transition-all cursor-pointer ${
                      settings.enabled[channel.id]
                        ? 'bg-black border-black text-[#eafda8]'
                        : 'bg-white border-black/10 text-gray-400'
                    }`}
                  >
                    {settings.enabled[channel.id] ? 'Aktif' : 'Pasif'}
                  </button>
                </div>

                <label className="block mt-4">
                  <span className="text-[8px] font-black uppercase tracking-[0.12em] text-gray-400">Bağlantı / değer</span>
                  <input
                    className={`${inputClassName} mt-1.5`}
                    type={channel.inputType}
                    value={settings[channel.field]}
                    placeholder={channel.placeholder}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => updateChannelValue(channel.field, event.target.value)}
                  />
                </label>

                <label className="block mt-3">
                  <span className="text-[8px] font-black uppercase tracking-[0.12em] text-gray-400">Buton metni</span>
                  <input
                    className={`${inputClassName} mt-1.5`}
                    value={settings.labels[channel.id]}
                    maxLength={80}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => updateChannelLabel(channel.id, event.target.value)}
                  />
                </label>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/[0.07] bg-white/82 p-5 shadow-3xs">
        <div className="border-b border-black/[0.05] pb-4">
          <h2 className="text-[13px] font-black text-gray-900">Sıralama</h2>
          <p className="text-[10px] font-semibold text-gray-400 mt-1">FAB açıldığında kanalların yukarıdan aşağıya gösterim sırasını belirleyin.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">
          {settings.order.map((channelId, index) => {
            const channel = CHANNELS.find((entry) => entry.id === channelId) ?? CHANNELS[0];
            const Icon = channel.icon;
            return (
              <div key={channelId} className="rounded-2xl border border-black/[0.06] bg-[#faf9f6] px-4 py-3 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-black text-[#eafda8] grid place-items-center text-[9px] font-black">{index + 1}</span>
                <Icon className="w-4 h-4 text-[#cf6747]" />
                <div className="min-w-0 flex-1">
                  <strong className="text-[11px] font-black text-gray-900 block">{channel.title}</strong>
                  <span className="text-[9px] font-semibold text-gray-400 truncate block">{settings.labels[channelId]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveChannel(channelId, -1)}
                    className="w-8 h-8 rounded-full border border-black/10 bg-white grid place-items-center text-gray-500 disabled:opacity-25 cursor-pointer disabled:cursor-default"
                    aria-label={`${channel.title} kanalını yukarı taşı`}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === settings.order.length - 1}
                    onClick={() => moveChannel(channelId, 1)}
                    className="w-8 h-8 rounded-full border border-black/10 bg-white grid place-items-center text-gray-500 disabled:opacity-25 cursor-pointer disabled:cursor-default"
                    aria-label={`${channel.title} kanalını aşağı taşı`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StatusCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-[1.6rem] bg-white/72 border border-black/[0.06] p-4 shadow-3xs min-w-0">
      <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.12em] truncate block">{label}</span>
      <span className="text-xl font-black text-gray-950 tracking-tight block mt-2 truncate">{value}</span>
      <span className="text-[9px] text-gray-400 font-bold block mt-1 truncate">{hint}</span>
    </div>
  );
}

function ToggleCard({
  title,
  description,
  checked,
  onChange,
  icon,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`rounded-[1.5rem] border p-4 text-left flex items-center gap-3 transition-all cursor-pointer ${
        checked ? 'border-black/10 bg-[#eafda8]' : 'border-black/[0.06] bg-[#faf9f6]'
      }`}
    >
      <span className={`w-9 h-9 rounded-full grid place-items-center ${checked ? 'bg-black text-[#eafda8]' : 'bg-white text-gray-400'}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <strong className="text-[11px] font-black text-gray-900 block">{title}</strong>
        <small className="text-[9px] font-semibold text-gray-500 block mt-0.5 leading-relaxed">{description}</small>
      </span>
      <span className={`w-10 h-6 rounded-full p-1 transition-all ${checked ? 'bg-black' : 'bg-gray-200'}`}>
        <span className={`block w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-4 bg-[#eafda8]' : 'translate-x-0 bg-white'}`} />
      </span>
    </button>
  );
}
