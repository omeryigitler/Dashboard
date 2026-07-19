import React, { useState } from 'react';
import { ClientDetails, Appointment, Plan, DocumentRecord, PaymentRecord, PaymentInstallment } from '../types';
import { 
  Save, Plus, Trash2, RotateCw, Key, FileText, Award, GitBranch, MoreHorizontal,
  Mail, Phone, ShieldCheck, ChevronRight, Search, SlidersHorizontal, PlusCircle,
  HelpCircle, Check, Lock, Star, Sparkles, Building2, User2, RefreshCw, Calendar, 
  CreditCard, Activity, Landmark, Globe, History, Settings, LayoutDashboard, Clock, 
  Users, CheckSquare, Zap, TrendingUp, ArrowRight, AlertCircle, ThumbsUp, CheckCircle, 
  Ban, Video, MapPin, CalendarCheck, ArrowUpRight, UserPlus, ArrowLeft, Send, MessageSquare,
  FileDown, Trash, CheckCircle2, UserCheck, Archive, Eye, Download, FileUp, Circle, Copy
} from 'lucide-react';

interface ClientDetailsHubProps {
  client: ClientDetails;
  onUpdateClient: (id: string, updatedClient: ClientDetails) => void;
  onDeselect: () => void;
  onDeleteClient: (id: string) => void;
}

export default function ClientDetailsHub({ client, onUpdateClient, onDeselect, onDeleteClient }: ClientDetailsHubProps) {
  // Helpers
  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    triggerToast(`${label} panoya kopyalandı!`);
  };

  // Tabs Navigation
  const [activeTab, setActiveTab] = useState<'genel-bakis' | 'iletisim' | 'veli' | 'randevular' | 'planlar' | 'odemeler' | 'belgeler' | 'iletisim-gecmisi' | 'notlar' | 'islem-gecmisi'>('genel-bakis');
  
  // Notification Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Client progress stage state (Dribbble CRM Stepper style)
  const [currentStage, setCurrentStage] = useState<number>(3);

  // Synchronize stage based on client status
  React.useEffect(() => {
    if (client.status === 'Potansiyel') setCurrentStage(1);
    else if (client.status === 'Pasif') setCurrentStage(4);
    else if (client.status === 'Arşivlenmiş') setCurrentStage(5);
    else setCurrentStage(3); // Active therapy default
  }, [client.id, client.status]);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);

  // Field edit states
  const [editForm, setEditForm] = useState({
    name: client.name,
    phone: client.phone,
    whatsapp: client.whatsapp,
    email: client.email,
    age: client.age,
    birthDate: client.birthDate,
    address: client.address,
    city: client.city,
    district: client.district,
    country: client.country,
    preferredContactMethod: client.preferredContactMethod,
    contactConsent: client.contactConsent,
    parentPrimaryName: client.parentPrimaryName || '',
    parentPrimaryPhone: client.parentPrimaryPhone || '',
    parentPrimaryEmail: client.parentPrimaryEmail || '',
    emergencyContact: client.emergencyContact || '',
  });

  // New Appointment Form State
  const [appForm, setAppForm] = useState({
    date: '2026-07-25',
    time: '11:00',
    service: client.ageGroup === 'Çocuk' ? 'Çocuk Gelişimi ve Pedagoji' : 'Diyet ve Beslenme',
    duration: '50 dk',
    type: 'Online' as 'Online' | 'Yüz Yüze',
    note: ''
  });

  // New Plan Form State
  const [planForm, setPlanForm] = useState({
    name: client.ageGroup === 'Çocuk' ? 'Oyun Terapisi Seans Planı' : 'Detaylı Yaşam Koçluğu Planı',
    totalSessions: 10,
    startDate: '2026-07-20',
    endDate: '2026-10-20',
    note: ''
  });

  // New Payment Form State
  const [payForm, setPayForm] = useState({
    amount: 1500,
    type: 'Kredi Kartı' as 'Kredi Kartı' | 'Nakit' | 'Havale',
    note: 'Haftalık seans ücreti tahsilatı'
  });

  // New Document upload state
  const [docForm, setDocForm] = useState({
    name: 'Gelişim Gözlem Formu.pdf',
    type: 'Yüklenen Belge' as 'Bilgi Formu' | 'Onam Formu' | 'Yüklenen Belge' | 'Paylaşılan PDF',
  });

  // Notes state
  const [notesForm, setNotesForm] = useState({
    admin: client.notes.admin,
    appointment: client.notes.appointment,
    payment: client.notes.payment,
    plan: client.notes.plan
  });

  // Save general client details edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ClientDetails = {
      ...client,
      name: editForm.name,
      phone: editForm.phone,
      whatsapp: editForm.whatsapp,
      email: editForm.email,
      age: Number(editForm.age),
      birthDate: editForm.birthDate,
      address: editForm.address,
      city: editForm.city,
      district: editForm.district,
      country: editForm.country,
      preferredContactMethod: editForm.preferredContactMethod as any,
      contactConsent: editForm.contactConsent,
      parentPrimaryName: editForm.parentPrimaryName,
      parentPrimaryPhone: editForm.parentPrimaryPhone,
      parentPrimaryEmail: editForm.parentPrimaryEmail,
      emergencyContact: editForm.emergencyContact,
      auditLog: [
        {
          id: Math.random().toString(),
          date: new Date().toLocaleString('tr-TR'),
          action: 'Güncelleme',
          detail: 'Danışan iletişim ve temel bilgileri güncellendi.',
          user: 'Ömer Yiğitler'
        },
        ...client.auditLog
      ]
    };
    onUpdateClient(client.id, updated);
    setIsEditing(false);
    triggerToast('Danışan bilgileri başarıyla güncellendi!');
  };

  // Add Appointment
  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: Appointment = {
      id: Math.random().toString(),
      date: appForm.date,
      time: appForm.time,
      service: appForm.service,
      duration: appForm.duration,
      status: 'Yaklaşan',
      payment: 'Bekleniyor',
      type: appForm.type,
      note: appForm.note
    };

    const updated: ClientDetails = {
      ...client,
      nextAppointment: `${appForm.date} ${appForm.time}`,
      appointments: [newApp, ...client.appointments],
      auditLog: [
        {
          id: Math.random().toString(),
          date: new Date().toLocaleString('tr-TR'),
          action: 'Randevu Hareketi',
          detail: `Yeni randevu planlandı: ${appForm.date} Saat: ${appForm.time}`,
          user: 'Ömer Yiğitler'
        },
        ...client.auditLog
      ]
    };

    onUpdateClient(client.id, updated);
    setIsAddingAppointment(false);
    triggerToast('Yeni randevu başarıyla eklendi ve takvime işlendi!');
  };

  // Add Plan
  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan: Plan = {
      name: planForm.name,
      status: 'Aktif',
      totalSessions: planForm.totalSessions,
      usedSessions: 0,
      remainingSessions: planForm.totalSessions,
      startDate: planForm.startDate,
      endDate: planForm.endDate,
      usageHistory: [],
      note: planForm.note
    };

    const updated: ClientDetails = {
      ...client,
      activePlan: planForm.name,
      plans: [newPlan, ...client.plans],
      auditLog: [
        {
          id: Math.random().toString(),
          date: new Date().toLocaleString('tr-TR'),
          action: 'Durum Değişikliği',
          detail: `Yeni seans programı tanımlandı: ${planForm.name}`,
          user: 'Ömer Yiğitler'
        },
        ...client.auditLog
      ]
    };

    onUpdateClient(client.id, updated);
    setIsCreatingPlan(false);
    triggerToast('Yeni seans planı başarıyla oluşturuldu!');
  };

  // Add Payment
  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(payForm.amount);
    
    const newPayRecord: PaymentRecord = {
      date: new Date().toISOString().split('T')[0],
      amount: amt,
      type: payForm.type,
      invoiceNo: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      note: payForm.note
    };

    const nextPaid = client.payments.paidAmount + amt;
    const nextRem = Math.max(0, client.payments.remainingAmount - amt);
    const nextBal = Math.max(0, client.remainingBalance - amt);

    const updated: ClientDetails = {
      ...client,
      remainingBalance: nextBal,
      payments: {
        ...client.payments,
        paidAmount: nextPaid,
        remainingAmount: nextRem,
        history: [newPayRecord, ...client.payments.history]
      },
      auditLog: [
        {
          id: Math.random().toString(),
          date: new Date().toLocaleString('tr-TR'),
          action: 'Ödeme Hareketi',
          detail: `${amt} TL tutarında ${payForm.type} ödemesi alındı.`,
          user: 'Ömer Yiğitler'
        },
        ...client.auditLog
      ]
    };

    onUpdateClient(client.id, updated);
    setIsAddingPayment(false);
    triggerToast(`${amt} TL ödeme başarıyla tahsil edildi!`);
  };

  // Upload Document Mock
  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: DocumentRecord = {
      id: `doc-${Math.random().toString()}`,
      name: docForm.name,
      type: docForm.type,
      size: '1.2 MB',
      date: new Date().toISOString().split('T')[0],
      status: 'Aktif'
    };

    const updated: ClientDetails = {
      ...client,
      documents: [newDoc, ...client.documents],
      auditLog: [
        {
          id: Math.random().toString(),
          date: new Date().toLocaleString('tr-TR'),
          action: 'Güncelleme',
          detail: `Yeni döküman sisteme yüklendi: ${docForm.name}`,
          user: 'Ömer Yiğitler'
        },
        ...client.auditLog
      ]
    };

    onUpdateClient(client.id, updated);
    setIsUploadingDoc(false);
    triggerToast('Dosya başarıyla sisteme yüklendi!');
  };

  // Save Notes
  const handleSaveNotes = () => {
    const updated: ClientDetails = {
      ...client,
      notes: {
        admin: notesForm.admin,
        appointment: notesForm.appointment,
        payment: notesForm.payment,
        plan: notesForm.plan
      },
      auditLog: [
        {
          id: Math.random().toString(),
          date: new Date().toLocaleString('tr-TR'),
          action: 'Güncelleme',
          detail: 'Operasyonel ve idari notlar güncellendi.',
          user: 'Ömer Yiğitler'
        },
        ...client.auditLog
      ]
    };
    onUpdateClient(client.id, updated);
    triggerToast('Notlar başarıyla kaydedildi!');
  };

  // Status transitions
  const handleToggleStatus = (newStatus: 'Aktif' | 'Pasif' | 'Arşivlenmiş' | 'Potansiyel') => {
    const updated: ClientDetails = {
      ...client,
      status: newStatus,
      auditLog: [
        {
          id: Math.random().toString(),
          date: new Date().toLocaleString('tr-TR'),
          action: 'Durum Değişikliği',
          detail: `Danışan durumu "${client.status}" değerinden "${newStatus}" değerine güncellendi.`,
          user: 'Ömer Yiğitler'
        },
        ...client.auditLog
      ]
    };
    onUpdateClient(client.id, updated);
    triggerToast(`Danışan durumu "${newStatus}" olarak güncellendi!`);
  };

  // Stage change transition (Dribbble CRM Stepper style)
  const handleStageClick = (stage: number, stageName: string) => {
    setCurrentStage(stage);
    
    // Auto map status if relevant
    let newStatus = client.status;
    if (stage === 1) newStatus = 'Potansiyel';
    else if (stage === 4) newStatus = 'Pasif';
    else if (stage === 5) newStatus = 'Arşivlenmiş';
    else newStatus = 'Aktif';

    const updated: ClientDetails = {
      ...client,
      status: newStatus,
      auditLog: [
        {
          id: Math.random().toString(),
          date: new Date().toLocaleString('tr-TR'),
          action: 'Süreç Güncellemesi',
          detail: `Süreç "${stageName}" (Aşama ${stage}) olarak güncellendi.`,
          user: 'Ömer Yiğitler'
        },
        ...client.auditLog
      ]
    };
    onUpdateClient(client.id, updated);
    triggerToast(`Süreç "${stageName}" aşamasına taşındı!`);
  };

  // Mark next upcoming session complete and log it
  const handleMarkSessionComplete = () => {
    // Find the first upcoming appointment
    const upcomingIdx = client.appointments.findIndex(a => a.status === 'Yaklaşan');
    if (upcomingIdx === -1) {
      triggerToast('Yaklaşan bir randevu bulunamadı.', 'error');
      return;
    }

    const appt = client.appointments[upcomingIdx];
    const updatedAppointments = [...client.appointments];
    updatedAppointments[upcomingIdx] = {
      ...appt,
      status: 'Tamamlandı',
      payment: 'Ödendi'
    };

    // Update plans session usage if there's an active plan
    let updatedPlans = [...client.plans];
    if (updatedPlans[0]) {
      const activePlan = updatedPlans[0];
      const nextUsed = Math.min(activePlan.totalSessions, activePlan.usedSessions + 1);
      const nextRemaining = Math.max(0, activePlan.totalSessions - nextUsed);
      updatedPlans[0] = {
        ...activePlan,
        usedSessions: nextUsed,
        remainingSessions: nextRemaining,
        usageHistory: [
          {
            date: new Date().toISOString().split('T')[0],
            sessionNumber: nextUsed,
            note: `${appt.service} seansı başarıyla tamamlandı.`,
            specialist: 'Ömer Yiğitler'
          },
          ...activePlan.usageHistory
        ]
      };
    }

    const updated: ClientDetails = {
      ...client,
      lastAppointment: `${appt.date} ${appt.time}`,
      nextAppointment: 'Planlanmadı',
      appointments: updatedAppointments,
      plans: updatedPlans,
      auditLog: [
        {
          id: Math.random().toString(),
          date: new Date().toLocaleString('tr-TR'),
          action: 'Randevu Hareketi',
          detail: `Randevu tamamlandı olarak işaretlendi: ${appt.date} ${appt.time} - ${appt.service}`,
          user: 'Ömer Yiğitler'
        },
        ...client.auditLog
      ]
    };

    onUpdateClient(client.id, updated);
    triggerToast('Seans tamamlandı olarak işaretlendi ve kullanım geçmişine eklendi!');
  };

  // WhatsApp Message Mock
  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(`Merhaba ${client.name}, nasılsınız? Randevu hatırlatması ve takibiniz için yazıyorum.`);
    window.open(`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    triggerToast('WhatsApp mesajlaşma penceresi açıldı!', 'info');
  };

  // Send Email Mock
  const handleSendEmail = () => {
    triggerToast(`Randevu hatırlatma maili ${client.email} adresine iletildi!`);
  };

  // PDF Export Mock
  const handlePdfExport = () => {
    triggerToast('Danışan detay dosyası PDF formatında dışa aktarıldı ve indirildi.');
  };

  return (
    <div id="client-details-hub-panel" className="flex-1 bg-gradient-to-r from-[#eafda8]/90 via-white/30 to-white rounded-[2.5rem] border border-gray-300/40 p-6 flex flex-col h-[calc(100vh-5rem)] shadow-sm overflow-y-auto select-none gap-5 transition-all duration-300 animate-fade-in relative">
      
      {/* Toast Alert */}
      {toast && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black text-[#eafda8] border border-[#eafda8]/20 px-5 py-3 rounded-2xl flex items-center gap-2.5 shadow-xl animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300 shrink-0" />
          <span className="text-xs font-black uppercase tracking-tight">{toast.message}</span>
        </div>
      )}

      {/* 1. SEAMLESS UNIFIED HEADER CONTENT (DIRECTLY ON PANEL BACKGROUND - NO 3RD LAYER CARD) */}
      <div className="flex flex-col gap-6 relative px-2 pt-2">
        {/* Top Actions Row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 relative">
          <div className="flex flex-wrap items-center gap-2">
            {/* Düzenle / Kaydet button */}
            <button 
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all border ${
                isEditing 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white/30 hover:bg-white/60 border-black/10 text-gray-700'
              }`}
            >
              {isEditing ? <Check className="w-3.5 h-3.5" /> : <Settings className="w-3.5 h-3.5 text-gray-400" />}
              <span>{isEditing ? 'Kaydet' : 'Düzenle'}</span>
            </button>

            {/* Yeni Randevu (+ New) */}
            <button 
              type="button"
              onClick={() => setIsAddingAppointment(!isAddingAppointment)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all border ${
                isAddingAppointment 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white/30 hover:bg-white/60 border-black/10 text-gray-700'
              }`}
            >
              <Plus className="w-3.5 h-3.5 text-gray-400" />
              <span>+ Yeni</span>
            </button>

            {/* Sil */}
            <button 
              type="button"
              onClick={() => {
                if (confirm(`${client.name} isimli danışan kaydını tamamen silmek istediğinize emin misiniz?`)) {
                  onDeleteClient(client.id);
                }
              }}
              className="px-3 py-1 bg-white/30 hover:bg-rose-50 hover:text-rose-700 border border-black/10 text-gray-700 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5 text-gray-400" />
              <span>Sil</span>
            </button>

            {/* Yenile (Refresh) */}
            <button 
              type="button"
              onClick={() => triggerToast('Danışan bilgileri başarıyla güncellendi!', 'success')}
              className="px-3 py-1 bg-white/30 hover:bg-white/60 border border-black/10 text-gray-700 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all"
            >
              <RotateCw className="w-3.5 h-3.5 text-gray-400" />
              <span>Yenile</span>
            </button>

            {/* Plan Tanımla */}
            <button 
              type="button"
              onClick={() => setIsCreatingPlan(!isCreatingPlan)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all border ${
                isCreatingPlan 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white/30 hover:bg-white/60 border-black/10 text-gray-700'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-gray-400" />
              <span>Plan Tanımla</span>
            </button>

            {/* To PDF */}
            <button 
              type="button"
              onClick={handlePdfExport}
              className="px-3 py-1 bg-white/30 hover:bg-white/60 border border-black/10 text-gray-700 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all"
            >
              <FileDown className="w-3.5 h-3.5 text-gray-400" />
              <span>To PDF</span>
            </button>

            {/* Ödeme Al */}
            <button 
              type="button"
              onClick={() => setIsAddingPayment(!isAddingPayment)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all border ${
                isAddingPayment 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white/30 hover:bg-white/60 border-black/10 text-gray-700'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-gray-400" />
              <span>Ödeme Al</span>
            </button>

            {/* Süreç */}
            <button 
              type="button"
              onClick={() => {
                const el = document.getElementById('therapy-journey-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                triggerToast('Terapi Süreci takip paneline yönlendirildiniz.', 'info');
              }}
              className="px-3 py-1 bg-white/30 hover:bg-white/60 border border-black/10 text-gray-700 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all"
            >
              <GitBranch className="w-3.5 h-3.5 text-gray-400" />
              <span>Süreç</span>
            </button>

            {/* More actions (...) */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setShowMoreActions(!showMoreActions)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border ${
                  showMoreActions ? 'bg-black text-white border-black' : 'bg-white/30 hover:bg-white/60 border-black/10 text-gray-600'
                }`}
                title="Daha Fazla İşlem"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>

              {showMoreActions && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setShowMoreActions(false)} />
                  <div className="absolute left-0 mt-1 z-30 bg-white border border-black/10 rounded-xl shadow-md p-1 min-w-[170px] flex flex-col gap-0.5 animate-fade-in">
                    <button 
                      type="button"
                      onClick={() => {
                        handleOpenWhatsApp();
                        setShowMoreActions(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded-lg hover:bg-black/5 text-[11px] font-medium text-gray-800 flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3 h-3 text-emerald-600" />
                      <span>WhatsApp Aç</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => {
                        handleSendEmail();
                        setShowMoreActions(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded-lg hover:bg-black/5 text-[11px] font-medium text-gray-800 flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3 h-3 text-blue-600" />
                      <span>E-posta Gönder</span>
                    </button>

                    {client.status !== 'Pasif' ? (
                      <button 
                        type="button"
                        onClick={() => {
                          handleToggleStatus('Pasif');
                          setShowMoreActions(false);
                        }}
                        className="w-full text-left px-2 py-1 rounded-lg hover:bg-black/5 text-[11px] font-medium text-gray-800 flex items-center gap-1.5 transition-colors"
                      >
                        <Ban className="w-3 h-3 text-amber-500" />
                        <span>Pasife Al</span>
                      </button>
                    ) : (
                      <button 
                        type="button"
                        onClick={() => {
                          handleToggleStatus('Aktif');
                          setShowMoreActions(false);
                        }}
                        className="w-full text-left px-2 py-1 rounded-lg hover:bg-black/5 text-[11px] font-medium text-gray-800 flex items-center gap-1.5 transition-colors"
                      >
                        <UserCheck className="w-3 h-3 text-emerald-600" />
                        <span>Aktifleştir</span>
                      </button>
                    )}

                    {client.status !== 'Arşivlenmiş' && (
                      <button 
                        type="button"
                        onClick={() => {
                          handleToggleStatus('Arşivlenmiş');
                          setShowMoreActions(false);
                        }}
                        className="w-full text-left px-2 py-1 rounded-lg hover:bg-black/5 text-[11px] font-medium text-gray-800 flex items-center gap-1.5 transition-colors"
                      >
                        <Archive className="w-3 h-3 text-zinc-500" />
                        <span>Arşivle</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Close button aligned right */}
          <button 
            type="button"
            onClick={onDeselect}
            className="flex items-center gap-1 px-3 py-1 bg-white/30 hover:bg-white/60 text-gray-700 border border-black/10 rounded-full text-[11px] font-medium transition-all cursor-pointer ml-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-400" />
            <span>Geri Dön</span>
          </button>
        </div>

        {/* Client Name & Info Row */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mt-2">
          <div className="flex items-center gap-4 shrink-0">
            {/* Photo initials circle */}
            <div className="w-14 h-14 rounded-full bg-black text-[#eafda8] flex items-center justify-center font-bold text-lg border border-black/10 shrink-0">
              {getInitials(client.name)}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-light tracking-tight text-gray-900 leading-tight">
                  {client.name.split(' ').slice(0, -1).join(' ')} <span className="font-semibold">{client.name.split(' ').slice(-1)[0]}</span>
                </h1>
                <span className="text-[10px] font-medium text-gray-500 bg-transparent px-2 py-0.5 rounded-full border border-black/10">{client.clientNumber}</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                <span className="px-2 py-0.5 border border-black/10 text-gray-900 rounded-full text-[8px] font-medium uppercase tracking-wider">
                  {client.status}
                </span>

                <span className="px-2 py-0.5 border border-black/10 text-gray-900 rounded-full text-[8px] font-medium uppercase tracking-wider">
                  {client.ageGroup} Danışan
                </span>

                <span className="px-2 py-0.5 border border-black/10 text-gray-900 rounded-full text-[8px] font-medium uppercase tracking-wider">
                  {client.age} Yaşında
                </span>
              </div>
            </div>
          </div>

          {/* Key Properties & Terapist */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-700 w-full lg:w-auto">
            <div className="flex flex-col">
              <span className="text-[8px] font-medium text-gray-500 uppercase tracking-wider">Kayıt Tarihi</span>
              <span className="text-[11px] font-semibold text-gray-900 mt-0.5">{client.registrationDate}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[8px] font-medium text-gray-500 uppercase tracking-wider">Kalan Bakiye</span>
              <span className="text-[11px] font-semibold text-gray-900 mt-0.5">
                {client.remainingBalance.toLocaleString('tr-TR')} TL
              </span>
            </div>

            <div className="flex flex-col max-w-[120px]">
              <span className="text-[8px] font-medium text-gray-500 uppercase tracking-wider">Aktif Plan</span>
              <span className="text-[11px] font-semibold text-gray-900 mt-0.5 truncate" title={client.activePlan}>{client.activePlan}</span>
            </div>

            {/* Owner Bubble (Kinney Smith Style) */}
            <div className="flex items-center gap-2 border border-black/10 p-1 pr-3 rounded-full shrink-0 ml-auto lg:ml-0">
              <div className="w-6 h-6 rounded-full bg-black text-[#eafda8] flex items-center justify-center text-[9px] font-bold">
                ÖY
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[7px] font-medium text-gray-400 uppercase tracking-wider leading-none">Temsilci</span>
                <span className="text-[10px] font-semibold text-gray-900 leading-none mt-0.5">Ömer Yiğitler</span>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Horizontal Process Stepper */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-1.5 w-full border-t border-black/10 pt-4 mt-2">
          {/* Stepper Steps Wrapper */}
          <div className="flex-1 flex flex-wrap md:flex-nowrap items-center gap-1.5">
            {[
              { stage: 1, name: 'Ön Görüşme', desc: 'İlk Temas' },
              { stage: 2, name: 'Değerlendirme', desc: 'Analiz' },
              { stage: 3, name: 'Aktif Terapi', desc: 'Seanslar' },
              { stage: 4, name: 'Gelişim Takibi', desc: 'Kontrol' },
              { stage: 5, name: 'Mezuniyet', desc: 'Mezun' },
            ].map((item, idx, arr) => {
              const isActive = currentStage === item.stage;
              const isCompleted = currentStage > item.stage;
              return (
                <React.Fragment key={item.stage}>
                  <button
                    type="button"
                    onClick={() => handleStageClick(item.stage, item.name)}
                    className={`flex-1 py-1.5 px-3 rounded-full border transition-all duration-300 flex items-center justify-center gap-1.5 min-w-[90px] text-[11px] ${
                      isActive 
                        ? 'bg-black text-white border-black font-semibold' 
                        : isCompleted
                          ? 'bg-[#10b981]/10 text-[#059669] border-[#059669]/20 font-semibold hover:bg-[#10b981]/20'
                          : 'bg-white/50 text-gray-400 border-gray-200'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3 shrink-0 stroke-[3]" />
                    ) : isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#eafda8] animate-ping shrink-0" />
                    ) : (
                      <Lock className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                    )}
                    <span>{item.name}</span>
                  </button>

                  {idx < arr.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-gray-400 shrink-0 hidden md:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* SLIDE-DOWN FORMS FOR OPERATIONS */}
      
      {/* Edit Form Panel */}
      {isEditing && (
        <form onSubmit={handleSaveEdit} className="bg-white border-2 border-black/10 rounded-[2rem] p-5 flex flex-col gap-4 shadow-lg animate-fade-in">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <Settings className="w-4.5 h-4.5" />
            <span>Danışan Bilgilerini Düzenle</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            <div>
              <label className="block text-gray-500 font-bold mb-1">Adı Soyadı</label>
              <input type="text" required value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-black font-semibold text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Telefon</label>
              <input type="text" required value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-black font-semibold text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">WhatsApp</label>
              <input type="text" required value={editForm.whatsapp} onChange={e => setEditForm({...editForm, whatsapp: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-black font-semibold text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">E-posta</label>
              <input type="email" required value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-black font-semibold text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Yaş</label>
              <input type="number" required value={editForm.age} onChange={e => setEditForm({...editForm, age: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-black font-semibold text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Doğum Tarihi</label>
              <input type="date" required value={editForm.birthDate} onChange={e => setEditForm({...editForm, birthDate: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-black font-semibold text-gray-900" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-gray-500 font-bold mb-1">Adres</label>
              <input type="text" required value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-black font-semibold text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">İl</label>
              <input type="text" required value={editForm.city} onChange={e => setEditForm({...editForm, city: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-black font-semibold text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">İlçe</label>
              <input type="text" required value={editForm.district} onChange={e => setEditForm({...editForm, district: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-black font-semibold text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Ülke</label>
              <input type="text" required value={editForm.country} onChange={e => setEditForm({...editForm, country: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-black font-semibold text-gray-900" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Tercih Edilen İletişim Yolu</label>
              <select value={editForm.preferredContactMethod} onChange={e => setEditForm({...editForm, preferredContactMethod: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold focus:outline-none focus:border-black">
                <option value="Telefon">Telefon</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="E-posta">E-posta</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" id="consent-check" checked={editForm.contactConsent} onChange={e => setEditForm({...editForm, contactConsent: e.target.checked})} className="w-4 h-4 rounded border-gray-300 focus:ring-black" />
              <label htmlFor="consent-check" className="font-extrabold text-gray-800 cursor-pointer select-none">İletişim İzni Var</label>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-100 rounded-xl text-gray-600 font-extrabold hover:bg-gray-200 transition-all">İptal</button>
            <button type="submit" className="px-5 py-2 bg-black text-[#eafda8] rounded-xl font-black shadow-md hover:bg-gray-900 transition-all">Değişiklikleri Kaydet</button>
          </div>
        </form>
      )}

      {/* Appointment scheduling panel */}
      {isAddingAppointment && (
        <form onSubmit={handleAddAppointment} className="bg-white border-2 border-black/10 rounded-[2rem] p-5 flex flex-col gap-4 shadow-lg animate-fade-in">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4.5 h-4.5" />
            <span>Yeni Randevu Planla</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            <div>
              <label className="block text-gray-500 font-bold mb-1">Randevu Tarihi</label>
              <input type="date" required value={appForm.date} onChange={e => setAppForm({...appForm, date: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Randevu Saati</label>
              <input type="time" required value={appForm.time} onChange={e => setAppForm({...appForm, time: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Görüşme Tipi</label>
              <select value={appForm.type} onChange={e => setAppForm({...appForm, type: e.target.value as any})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900 focus:outline-none focus:border-black">
                <option value="Online">Online</option>
                <option value="Yüz Yüze">Yüz Yüze</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-500 font-bold mb-1">Hizmet / Seans Türü</label>
              <input type="text" required value={appForm.service} onChange={e => setAppForm({...appForm, service: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold text-gray-900 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Seans Süresi</label>
              <input type="text" required value={appForm.duration} onChange={e => setAppForm({...appForm, duration: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900 focus:outline-none focus:border-black" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-gray-500 font-bold mb-1">Operasyonel Notlar</label>
              <input type="text" value={appForm.note} placeholder="Örn: İlk ısınma seansı yapılacak, veli katılımı istenecek" onChange={e => setAppForm({...appForm, note: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold text-gray-900 focus:outline-none focus:border-black" />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button type="button" onClick={() => setIsAddingAppointment(false)} className="px-4 py-2 bg-gray-100 rounded-xl text-gray-600 font-extrabold hover:bg-gray-200 transition-all">İptal</button>
            <button type="submit" className="px-5 py-2 bg-black text-[#eafda8] rounded-xl font-black shadow-md hover:bg-gray-900 transition-all">Randevuyu Kaydet</button>
          </div>
        </form>
      )}

      {/* Plan oluştur panel */}
      {isCreatingPlan && (
        <form onSubmit={handleAddPlan} className="bg-white border-2 border-black/10 rounded-[2rem] p-5 flex flex-col gap-4 shadow-lg animate-fade-in">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4.5 h-4.5" />
            <span>Yeni Seans Planı Tanımla</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            <div className="md:col-span-2">
              <label className="block text-gray-500 font-bold mb-1">Plan / Paket Adı</label>
              <input type="text" required value={planForm.name} onChange={e => setPlanForm({...planForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Toplam Seans Adedi</label>
              <input type="number" required value={planForm.totalSessions} onChange={e => setPlanForm({...planForm, totalSessions: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Başlangıç Tarihi</label>
              <input type="date" required value={planForm.startDate} onChange={e => setPlanForm({...planForm, startDate: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Plan Bitiş Tarihi</label>
              <input type="date" required value={planForm.endDate} onChange={e => setPlanForm({...planForm, endDate: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900 focus:outline-none focus:border-black" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-500 font-bold mb-1">Planlama ve Kapsam Notu</label>
              <input type="text" value={planForm.note} placeholder="Örn: Haftalık düzenli takip, aylık yağ-kas analizi ve gelişim takibi içerir" onChange={e => setPlanForm({...planForm, note: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold text-gray-900 focus:outline-none focus:border-black" />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button type="button" onClick={() => setIsCreatingPlan(false)} className="px-4 py-2 bg-gray-100 rounded-xl text-gray-600 font-extrabold hover:bg-gray-200 transition-all">İptal</button>
            <button type="submit" className="px-5 py-2 bg-black text-[#eafda8] rounded-xl font-black shadow-md hover:bg-gray-900 transition-all">Planı Aktif Et</button>
          </div>
        </form>
      )}

      {/* Ödeme ekle panel */}
      {isAddingPayment && (
        <form onSubmit={handleAddPayment} className="bg-white border-2 border-black/10 rounded-[2rem] p-5 flex flex-col gap-4 shadow-lg animate-fade-in">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <CreditCard className="w-4.5 h-4.5" />
            <span>Ödeme / Tahsilat Girişi Yap</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            <div>
              <label className="block text-gray-500 font-bold mb-1">Alınan Tutar (TL)</label>
              <input type="number" required value={payForm.amount} onChange={e => setPayForm({...payForm, amount: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-black text-gray-900 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Ödeme Türü</label>
              <select value={payForm.type} onChange={e => setPayForm({...payForm, type: e.target.value as any})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900 focus:outline-none focus:border-black">
                <option value="Kredi Kartı">Kredi Kartı</option>
                <option value="Nakit">Nakit</option>
                <option value="Havale">Havale / EFT</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-500 font-bold mb-1">Ödeme Notu</label>
              <input type="text" required value={payForm.note} onChange={e => setPayForm({...payForm, note: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold text-gray-900 focus:outline-none focus:border-black" />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button type="button" onClick={() => setIsAddingPayment(false)} className="px-4 py-2 bg-gray-100 rounded-xl text-gray-600 font-extrabold hover:bg-gray-200 transition-all">İptal</button>
            <button type="submit" className="px-5 py-2 bg-black text-[#eafda8] rounded-xl font-black shadow-md hover:bg-gray-900 transition-all">Ödemeyi İşle</button>
          </div>
        </form>
      )}

      {/* Document Upload Mock Panel */}
      {isUploadingDoc && (
        <form onSubmit={handleAddDocument} className="bg-white border-2 border-black/10 rounded-[2rem] p-5 flex flex-col gap-4 shadow-lg animate-fade-in">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <FileUp className="w-4.5 h-4.5" />
            <span>Sisteme Belge Yükle</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            <div>
              <label className="block text-gray-500 font-bold mb-1">Belge Adı</label>
              <input type="text" required value={docForm.name} onChange={e => setDocForm({...docForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-gray-500 font-bold mb-1">Belge Kategorisi</label>
              <select value={docForm.type} onChange={e => setDocForm({...docForm, type: e.target.value as any})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900 focus:outline-none focus:border-black">
                <option value="Bilgi Formu">Danışan Bilgi Formu</option>
                <option value="Onam Formu">Veli Onam Formu</option>
                <option value="Yüklenen Belge">Yüklenen Rapor / Dosya</option>
                <option value="Paylaşılan PDF">Paylaşılan PDF Kılavuz</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button type="button" onClick={() => setIsUploadingDoc(false)} className="px-4 py-2 bg-gray-100 rounded-xl text-gray-600 font-extrabold hover:bg-gray-200 transition-all">İptal</button>
            <button type="submit" className="px-5 py-2 bg-black text-[#eafda8] rounded-xl font-black shadow-md hover:bg-gray-900 transition-all">Yüklemeyi Tamamla</button>
          </div>
        </form>
      )}


      {/* 3. TABS NAVIGATION */}
      <div className="flex flex-wrap items-center gap-1 border-b border-black/[0.04] pb-1 text-xs font-bold scrollbar-none overflow-x-auto">
        <button 
          onClick={() => setActiveTab('genel-bakis')}
          className={`px-4 py-2 rounded-full transition-all ${activeTab === 'genel-bakis' ? 'bg-black text-white shadow-3xs' : 'text-gray-500 hover:text-black'}`}
        >
          Genel Bakış
        </button>
        <button 
          onClick={() => setActiveTab('iletisim')}
          className={`px-4 py-2 rounded-full transition-all ${activeTab === 'iletisim' ? 'bg-black text-white shadow-3xs' : 'text-gray-500 hover:text-black'}`}
        >
          İletişim Bilgileri
        </button>

        {/* Veli ve Yakın Bilgileri Tab (ONLY visible if child!) */}
        {client.ageGroup === 'Çocuk' && (
          <button 
            onClick={() => setActiveTab('veli')}
            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'veli' ? 'bg-black text-white shadow-3xs' : 'text-gray-500 hover:text-black'}`}
          >
            Veli ve Yakın Bilgileri
          </button>
        )}

        <button 
          onClick={() => setActiveTab('randevular')}
          className={`px-4 py-2 rounded-full transition-all ${activeTab === 'randevular' ? 'bg-black text-white shadow-3xs' : 'text-gray-500 hover:text-black'}`}
        >
          Randevular
        </button>
        <button 
          onClick={() => setActiveTab('planlar')}
          className={`px-4 py-2 rounded-full transition-all ${activeTab === 'planlar' ? 'bg-black text-white shadow-3xs' : 'text-gray-500 hover:text-black'}`}
        >
          Plan ve Seanslar
        </button>
        <button 
          onClick={() => setActiveTab('odemeler')}
          className={`px-4 py-2 rounded-full transition-all ${activeTab === 'odemeler' ? 'bg-black text-white shadow-3xs' : 'text-gray-500 hover:text-black'}`}
        >
          Ödemeler
        </button>
        <button 
          onClick={() => setActiveTab('belgeler')}
          className={`px-4 py-2 rounded-full transition-all ${activeTab === 'belgeler' ? 'bg-black text-white shadow-3xs' : 'text-gray-500 hover:text-black'}`}
        >
          Belgeler
        </button>
        <button 
          onClick={() => setActiveTab('iletisim-gecmisi')}
          className={`px-4 py-2 rounded-full transition-all ${activeTab === 'iletisim-gecmisi' ? 'bg-black text-white shadow-3xs' : 'text-gray-500 hover:text-black'}`}
        >
          İletişim Geçmişi
        </button>
        <button 
          onClick={() => setActiveTab('notlar')}
          className={`px-4 py-2 rounded-full transition-all ${activeTab === 'notlar' ? 'bg-black text-white shadow-3xs' : 'text-gray-500 hover:text-black'}`}
        >
          Operasyonel Notlar
        </button>
        <button 
          onClick={() => setActiveTab('islem-gecmisi')}
          className={`px-4 py-2 rounded-full transition-all ${activeTab === 'islem-gecmisi' ? 'bg-black text-white shadow-3xs' : 'text-gray-500 hover:text-black'}`}
        >
          İşlem Geçmişi
        </button>
      </div>

      {/* 4. TAB PANELS CONTENT */}
      <div className="flex-1 min-h-[400px]">
        
        {/* TAB 1: Genel Bakış */}
        {activeTab === 'genel-bakis' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Column 1: Danışan İletişim & Veli Bilgileri */}
            <div className="flex flex-col gap-6">
              {/* İletişim Kartı */}
              <div className="bg-white border border-gray-150 p-5 rounded-[2rem] flex flex-col gap-4 shadow-3xs hover:border-gray-300 transition-colors">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
                  <User2 className="w-4 h-4 text-gray-500" />
                  <span>İLETİŞİM BİLGİLERİ</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wide">Telefon</span>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-950 font-bold">{client.phone}</span>
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(client.phone, 'Telefon numarası')}
                        className="p-1 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wide">E-posta</span>
                    <div className="flex items-center justify-between">
                      <span className="text-sky-600 font-bold truncate pr-2" title={client.email}>{client.email}</span>
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(client.email, 'E-posta adresi')}
                        className="p-1 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wide">İletişim Tercihi</span>
                    <span className="px-2.5 py-0.5 bg-black text-[#eafda8] text-[9px] font-black rounded-full uppercase">{client.preferredContactMethod}</span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wide">İl / İlçe</span>
                    <span className="text-gray-900 font-bold">{client.district} / {client.city}</span>
                  </div>
                </div>
              </div>

              {/* Veli & Refakatçi Detayları (Çocuk ise) */}
              {client.ageGroup === 'Çocuk' ? (
                <div className="bg-white border border-gray-150 p-5 rounded-[2rem] flex flex-col gap-4 shadow-3xs hover:border-gray-300 transition-colors">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>VELİ & YAKIN BİLGİSİ</span>
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center"><span className="text-gray-400 font-bold">Birincil Veli</span><span className="text-gray-950 font-black">{client.parentPrimaryName || 'Ahmet Demir'}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-400 font-bold">Yakınlık Derecesi</span><span className="text-gray-950 font-bold">{client.parentPrimaryRelation || 'Baba'}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-400 font-bold">Veli Telefon</span><span className="text-gray-950 font-bold">{client.parentPrimaryPhone || client.phone}</span></div>
                    <div className="flex flex-col gap-1.5 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100/50">
                      <span className="text-[9px] text-rose-700 font-black uppercase tracking-widest">ACİL DURUM İLETİŞİMİ</span>
                      <span className="text-gray-950 font-bold text-[11.5px]">{client.emergencyContact || 'Ahmet Demir'}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-150 p-5 rounded-[2rem] flex flex-col gap-4 shadow-3xs text-center py-8">
                  <ShieldCheck className="w-10 h-10 text-gray-300 mx-auto" />
                  <span className="text-xs text-gray-400 font-bold">Bu danışan Yetişkin grubundadır, Veli bilgisi gerekmemektedir.</span>
                </div>
              )}
            </div>

            {/* Column 2: Sıradaki Adım (Up Next) & Zaman Tüneli */}
            <div className="flex flex-col gap-6">
              {/* Sıradaki Randevu Kartı (Dribbble Up Next) */}
              <div className="bg-[#eafda8]/20 border border-black/10 p-5 rounded-[2rem] flex flex-col gap-4 shadow-3xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#eafda8]/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-black text-[#eafda8] text-[9px] font-black rounded-full uppercase tracking-wider">SIRADAKİ ADIM</span>
                  <span className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {client.nextAppointment !== 'Planlanmadı' ? 'Yaklaşıyor' : 'Tarih Yok'}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400 font-bold">Randevu Tarih & Saati</span>
                  <span className="text-lg font-black text-gray-950 tracking-tight leading-none">
                    {client.nextAppointment || 'Planlanmış seans yok'}
                  </span>
                </div>

                {client.nextAppointment !== 'Planlanmadı' && (
                  <div className="space-y-2.5 pt-1.5">
                    <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-black/[0.04] text-xs">
                      <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="font-bold text-gray-800">
                        Hizmet: {client.appointments.find(a => a.status === 'Yaklaşan')?.service || 'Dil ve Konuşma Terapisi'}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={handleMarkSessionComplete}
                        className="flex-1 py-2 bg-black hover:bg-gray-900 text-white font-black text-[10.5px] rounded-xl shadow-sm transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#eafda8]" />
                        <span>Tamamlandı</span>
                      </button>

                      <button 
                        type="button"
                        onClick={handleOpenWhatsApp}
                        className="py-2 px-3 bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10.5px] rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer shadow-3xs"
                        title="Randevuyu WhatsApp'tan hatırlat"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Hatırlat</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Terapist Zaman Tüneli (Timeline) */}
              <div className="bg-white border border-gray-150 p-5 rounded-[2rem] flex flex-col gap-4 shadow-3xs flex-1">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
                  <History className="w-4 h-4 text-gray-500" />
                  <span>TERAPİ ZAMAN TÜNELİ</span>
                </h3>
                
                <div className="space-y-3.5 max-h-[180px] overflow-y-auto scrollbar-none pr-1">
                  {client.auditLog.slice(0, 3).map((log, idx) => (
                    <div key={log.id} className="flex gap-3 text-xs">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
                        {idx < 2 && <div className="w-0.5 bg-gray-200 flex-1 my-1" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-gray-400 font-bold">{log.date}</span>
                        <p className="text-gray-900 font-bold truncate leading-tight mt-0.5" title={log.detail}>{log.detail}</p>
                        <span className="text-[9px] text-gray-400 font-semibold">• {log.user}</span>
                      </div>
                    </div>
                  ))}
                  {client.auditLog.length === 0 && (
                    <div className="text-center py-6 text-gray-400 font-semibold text-xs">Zaman tüneli geçmişi bulunmuyor.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Column 3: Gelişim Skoru & Finansal Durum */}
            <div className="flex flex-col gap-6">
              {/* Gelişim Skoru (Dribbble Progress Score Widget) */}
              <div className="bg-white border border-gray-150 p-5 rounded-[2rem] flex flex-col gap-4 shadow-3xs hover:border-gray-300 transition-colors">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
                  <Activity className="w-4 h-4 text-gray-500" />
                  <span>DANIŞAN GELİŞİM SKORU</span>
                </h3>

                <div className="flex items-center gap-5">
                  {/* Circular progress SVG */}
                  <div className="relative w-16 h-16 shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-100"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-black"
                        strokeDasharray="92, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-gray-950">
                      92%
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[12.5px] text-gray-900 font-black tracking-tight leading-tight block">Kapsamlı Gelişim</span>
                    <span className="text-[11px] text-gray-500 font-semibold mt-1 block">Ses çıkarma, artikülasyon ve akıcılık parametrelerinde yüksek başarı.</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10.5px] font-bold bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-bold uppercase text-[8px] tracking-wider">Hedef Dil</span>
                    <span className="text-gray-900">Uyumlu</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-bold uppercase text-[8px] tracking-wider">Akıcılık</span>
                    <span className="text-emerald-600 font-black">Mükemmel</span>
                  </div>
                </div>
              </div>

              {/* Finansal & Plan Özeti */}
              <div className="bg-white border border-gray-150 p-5 rounded-[2rem] flex flex-col gap-4 shadow-3xs hover:border-gray-300 transition-colors">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span>FİNANSAL GÖSTERGELER</span>
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-bold">Toplam Plan Tutarı</span>
                    <span className="text-gray-950 font-black">{client.payments.totalPlanAmount.toLocaleString('tr-TR')} TL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-bold">Ödenen Tutar</span>
                    <span className="text-emerald-600 font-black">{client.payments.paidAmount.toLocaleString('tr-TR')} TL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-bold">Kalan Borç Tutarı</span>
                    <span className={`font-black ${client.payments.remainingAmount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {client.payments.remainingAmount.toLocaleString('tr-TR')} TL
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-2.5">
                    <span className="text-gray-400 font-bold">Yaklaşan Ödeme</span>
                    <span className="text-gray-900 font-extrabold">{client.payments.upcomingPayment}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: İletişim Bilgileri */}
        {activeTab === 'iletisim' && (
          <div className="bg-white border border-gray-100 rounded-[1.8rem] p-6 flex flex-col gap-5 animate-fade-in">
            <h3 className="text-sm font-black text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <User2 className="w-5 h-5 text-gray-500" />
              <span>Detaylı İletişim Kartı</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-gray-600">
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center"><span className="text-gray-400 font-extrabold uppercase text-[9px] tracking-wider">Adı</span><span className="text-gray-950 font-bold">{client.name.split(' ')[0]}</span></div>
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center"><span className="text-gray-400 font-extrabold uppercase text-[9px] tracking-wider">Soyadı</span><span className="text-gray-950 font-bold">{client.name.split(' ').slice(1).join(' ')}</span></div>
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center min-w-0">
                <span className="text-gray-400 font-extrabold uppercase text-[9px] tracking-wider shrink-0 mr-2">Telefon</span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-gray-950 font-bold truncate" title={client.phone}>{client.phone}</span>
                  <button 
                    onClick={() => copyToClipboard(client.phone, 'Telefon numarası')}
                    className="p-1 text-gray-400 hover:text-black hover:bg-gray-200 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Kopyala"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center min-w-0"><span className="text-gray-400 font-extrabold uppercase text-[9px] tracking-wider">WhatsApp Link</span><span className="text-emerald-700 font-black truncate">{client.whatsapp}</span></div>
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center min-w-0">
                <span className="text-gray-400 font-extrabold uppercase text-[9px] tracking-wider shrink-0 mr-2">E-posta</span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-sky-600 font-bold truncate" title={client.email}>{client.email}</span>
                  <button 
                    onClick={() => copyToClipboard(client.email, 'E-posta adresi')}
                    className="p-1 text-gray-400 hover:text-black hover:bg-gray-200 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Kopyala"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center"><span className="text-gray-400 font-extrabold uppercase text-[9px] tracking-wider">Doğum Tarihi</span><span className="text-gray-950 font-bold">{client.birthDate}</span></div>
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center lg:col-span-3"><span className="text-gray-400 font-extrabold uppercase text-[9px] tracking-wider shrink-0 mr-4">Tam Adres</span><span className="text-gray-950 font-semibold">{client.address}</span></div>
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center"><span className="text-gray-400 font-extrabold uppercase text-[9px] tracking-wider">İl</span><span className="text-gray-950 font-bold">{client.city}</span></div>
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center"><span className="text-gray-400 font-extrabold uppercase text-[9px] tracking-wider">İlçe</span><span className="text-gray-950 font-bold">{client.district}</span></div>
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center"><span className="text-gray-400 font-extrabold uppercase text-[9px] tracking-wider">Ülke</span><span className="text-gray-950 font-bold">{client.country}</span></div>
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center"><span className="text-gray-400 font-extrabold uppercase text-[9px] tracking-wider">Tercih Edilen İletişim</span><span className="px-2.5 py-1 bg-black text-white text-[10px] font-black rounded-lg">{client.preferredContactMethod}</span></div>
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center"><span className="text-gray-400 font-extrabold uppercase text-[9px] tracking-wider">İletişim İzni</span><span className="flex items-center gap-1 font-bold text-emerald-700">{client.contactConsent ? 'Onay Verildi' : 'Onay Yok'}</span></div>
            </div>
          </div>
        )}

        {/* TAB 3: Veli ve Yakın Bilgileri */}
        {activeTab === 'veli' && client.ageGroup === 'Çocuk' && (
          <div className="bg-white border border-gray-100 rounded-[1.8rem] p-6 flex flex-col gap-5 animate-fade-in">
            <h3 className="text-sm font-black text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Users className="w-5 h-5 text-gray-500" />
              <span>Veli ve Yakın İletişim Bilgileri</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-gray-600">
              {/* Birincil veli */}
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex flex-col gap-3">
                <span className="text-[10px] font-black text-purple-700 uppercase tracking-widest border-b border-gray-150 pb-1.5">BİRİNCİL VELİ</span>
                <div className="flex justify-between"><span className="text-gray-400 font-bold">Veli Adı Soyadı</span><span className="text-gray-950 font-black">{client.parentPrimaryName || 'Ahmet Demir'}</span></div>
                <div className="flex justify-between"><span className="text-gray-400 font-bold">Yakınlık Derecesi</span><span className="text-gray-950 font-bold">{client.parentPrimaryRelation || 'Baba'}</span></div>
                <div className="flex justify-between"><span className="text-gray-400 font-bold">Telefon Numarası</span><span className="text-gray-950 font-bold">{client.parentPrimaryPhone || client.phone}</span></div>
                <div className="flex justify-between"><span className="text-gray-400 font-bold">E-posta Adresi</span><span className="text-sky-600 font-bold">{client.parentPrimaryEmail || 'veli.demir@e-posta.com'}</span></div>
              </div>

              {/* İkinci veli */}
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex flex-col gap-3">
                <span className="text-[10px] font-black text-purple-700 uppercase tracking-widest border-b border-gray-150 pb-1.5">İKİNCİ VELİ & ACİL DURUM</span>
                <div className="flex justify-between"><span className="text-gray-400 font-bold">İkinci Veli Adı</span><span className="text-gray-950 font-semibold">{client.parentSecondaryName || 'Ayşe Demir'}</span></div>
                <div className="flex justify-between"><span className="text-gray-400 font-bold">Yakınlık Derecesi</span><span className="text-gray-950 font-bold">{client.parentSecondaryRelation || 'Anne'}</span></div>
                <div className="flex justify-between"><span className="text-gray-400 font-bold">Telefon Numarası</span><span className="text-gray-950 font-bold">{client.parentSecondaryPhone || '0532-555-0220'}</span></div>
                <div className="flex justify-between"><span className="text-gray-400 font-bold">Acil Durum Aranacak</span><span className="text-rose-600 font-black">{client.emergencyContact || 'Ahmet Demir (0532-555-0219)'}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Randevular */}
        {activeTab === 'randevular' && (
          <div className="bg-white border border-gray-100 rounded-[1.8rem] p-6 flex flex-col gap-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-950 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span>Randevu Seans Listeleri</span>
              </h3>
              <button 
                onClick={() => setIsAddingAppointment(true)} 
                className="px-3 py-1 bg-black text-[#eafda8] text-xs font-black rounded-xl hover:bg-gray-800 transition-colors shadow-3xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Randevu Ekle</span>
              </button>
            </div>

            <div className="space-y-4">
              {client.appointments.length === 0 ? (
                <div className="p-10 text-center text-gray-400 text-xs">Bu danışan adına planlanmış randevu geçmişi bulunmamaktadır.</div>
              ) : (
                <div className="flex flex-col gap-3">
                  {client.appointments.map((appt) => (
                    <div key={appt.id} className="p-4 bg-gray-50 hover:bg-gray-100/70 border border-gray-150 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3.5 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-black text-[#eafda8] flex flex-col items-center justify-center font-extrabold">
                          <span className="text-[10px] leading-none">{appt.time}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900">{appt.service}</span>
                          <span className="text-gray-400 mt-0.5 font-bold">{appt.date} • {appt.duration} • {appt.type}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-stretch md:self-auto justify-between">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                          appt.status === 'Tamamlandı' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          appt.status === 'Yaklaşan' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 animate-pulse' :
                          appt.status === 'İptal Edildi' ? 'bg-rose-50 text-rose-600' :
                          'bg-amber-50 text-amber-700'
                        }`}>
                          {appt.status}
                        </span>

                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                          appt.payment === 'Ödendi' ? 'bg-lime-50 text-lime-900 border border-lime-200' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {appt.payment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: Plan ve Seanslar */}
        {activeTab === 'planlar' && (
          <div className="bg-white border border-gray-100 rounded-[1.8rem] p-6 flex flex-col gap-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-950 flex items-center gap-2">
                <Award className="w-5 h-5 text-gray-500" />
                <span>Tanımlı Seans Planları ve Tüketim Takibi</span>
              </h3>
              <button 
                onClick={() => setIsCreatingPlan(true)} 
                className="px-3 py-1 bg-black text-[#eafda8] text-xs font-black rounded-xl hover:bg-gray-800 transition-colors shadow-3xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Plan Oluştur</span>
              </button>
            </div>

            {client.plans.length === 0 ? (
              <div className="p-10 text-center text-gray-400 text-xs">Tanımlanmış aktif veya tamamlanmış bir seans programı bulunmamaktadır.</div>
            ) : (
              <div className="flex flex-col gap-6">
                {client.plans.map((p, idx) => {
                  const ratio = Math.round((p.usedSessions / p.totalSessions) * 100) || 0;
                  return (
                    <div key={idx} className="border border-gray-150 rounded-2.5rem p-5 flex flex-col gap-4">
                      <div className="flex justify-between items-center border-b border-gray-50 pb-2.5">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-sm">{p.name}</span>
                          <span className="text-[10.5px] text-gray-400 mt-0.5 font-bold">Kapsam Tarihleri: {p.startDate} - {p.endDate}</span>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-100">Aktif Kullanımda</span>
                      </div>

                      {/* Usage progress bar */}
                      <div className="flex flex-col gap-1.5 pt-1.5">
                        <div className="flex justify-between text-xs font-bold text-gray-600">
                          <span>Seans Paket Tüketimi</span>
                          <span>{p.usedSessions} / {p.totalSessions} Seans ({ratio}%)</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-black h-full rounded-full transition-all" style={{ width: `${ratio}%` }} />
                        </div>
                      </div>

                      {/* Session history block inside plan */}
                      <div className="flex flex-col gap-2 pt-2">
                        <span className="text-[9.5px] font-black text-gray-400 uppercase tracking-wider block">SEANS KULLANIM GEÇMİŞİ</span>
                        {p.usageHistory.length === 0 ? (
                          <span className="text-[11px] text-gray-400 font-semibold italic pl-1">Seans kullanım geçmişi logu bulunmuyor.</span>
                        ) : (
                          <div className="space-y-1.5">
                            {p.usageHistory.map((historyItem, subIdx) => (
                              <div key={subIdx} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                                  <span className="font-semibold text-gray-800">Seans #{historyItem.sessionNumber} - {historyItem.date}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-gray-900 font-bold">{historyItem.specialist}</span>
                                  <span className="text-gray-400 text-[10px] block font-semibold">{historyItem.note}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: Ödemeler */}
        {activeTab === 'odemeler' && (
          <div className="bg-white border border-gray-100 rounded-[1.8rem] p-6 flex flex-col gap-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-950 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <span>Ödeme Taksitleri ve Tahsilat Geçmişi</span>
              </h3>
              <button 
                onClick={() => setIsAddingPayment(true)} 
                className="px-3 py-1 bg-black text-[#eafda8] text-xs font-black rounded-xl hover:bg-gray-800 transition-colors shadow-3xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ödeme Ekle</span>
              </button>
            </div>

            {/* Top Cards Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-gray-50 border border-gray-150 rounded-2xl">
                <span className="text-[10px] text-gray-400 font-black block uppercase">Toplam Plan Tutarı</span>
                <span className="text-xl font-black text-gray-900 mt-1 block">{client.payments.totalPlanAmount.toLocaleString('tr-TR')} TL</span>
              </div>
              <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-2xl">
                <span className="text-[10px] text-emerald-800 font-black block uppercase">Toplam Alınan</span>
                <span className="text-xl font-black text-emerald-600 mt-1 block">{client.payments.paidAmount.toLocaleString('tr-TR')} TL</span>
              </div>
              <div className="p-4 bg-rose-50/40 border border-rose-100 rounded-2xl">
                <span className="text-[10px] text-rose-800 font-black block uppercase">Kalan Borç Bakiyesi</span>
                <span className="text-xl font-black text-rose-600 mt-1 block">{client.payments.remainingAmount.toLocaleString('tr-TR')} TL</span>
              </div>
            </div>

            {/* Installments & History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
              {/* Taksitler */}
              <div className="flex flex-col gap-3">
                <span className="text-[10.5px] font-black text-gray-400 uppercase tracking-widest block border-b border-gray-50 pb-1.5">ÖDEME TAKSİTLERİ (TAKSİTLER)</span>
                {client.payments.installments.length === 0 ? (
                  <span className="text-xs text-gray-400 italic">Planlanmış vadeli ödeme taksiti bulunmuyor.</span>
                ) : (
                  <div className="space-y-2 text-xs">
                    {client.payments.installments.map((inst, idx) => (
                      <div key={idx} className="p-3 bg-gray-50/60 border border-gray-150 rounded-xl flex justify-between items-center">
                        <div>
                          <span className="font-bold text-gray-900 block">{inst.amount.toLocaleString('tr-TR')} TL</span>
                          <span className="text-gray-400 text-[10px] font-bold">Vade: {inst.dueDate}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                          inst.status === 'Ödendi' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}>{inst.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Geçmiş ödemeler */}
              <div className="flex flex-col gap-3">
                <span className="text-[10.5px] font-black text-gray-400 uppercase tracking-widest block border-b border-gray-50 pb-1.5">ÖDEME GEÇMİŞİ</span>
                {client.payments.history.length === 0 ? (
                  <span className="text-xs text-gray-400 italic">Henüz bir ödeme tahsil edilmedi.</span>
                ) : (
                  <div className="space-y-2 text-xs">
                    {client.payments.history.map((record, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex flex-col gap-1 hover:shadow-2xs transition-all">
                        <div className="flex justify-between items-center">
                          <span className="font-black text-emerald-600">+{record.amount.toLocaleString('tr-TR')} TL</span>
                          <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[8px] font-black uppercase">{record.type}</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                          <span>No: {record.invoiceNo} • {record.date}</span>
                          <span className="text-gray-600">{record.note}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: Belgeler */}
        {activeTab === 'belgeler' && (
          <div className="bg-white border border-gray-100 rounded-[1.8rem] p-6 flex flex-col gap-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-950 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-500" />
                <span>Doküman Kitaplığı ve Formlar</span>
              </h3>
              <button 
                onClick={() => setIsUploadingDoc(true)} 
                className="px-3 py-1 bg-black text-[#eafda8] text-xs font-black rounded-xl hover:bg-gray-800 transition-colors shadow-3xs flex items-center gap-1 cursor-pointer"
              >
                <FileUp className="w-3.5 h-3.5" />
                <span>Belge Yükle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {client.documents.length === 0 ? (
                <div className="p-10 text-center text-gray-400 text-xs md:col-span-2">Yüklenmiş bilgi veya onam formu bulunmuyor.</div>
              ) : (
                client.documents.map((doc) => (
                  <div key={doc.id} className="p-4 bg-gray-50 border border-gray-150 rounded-2xl flex items-center justify-between gap-4 text-xs group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-black text-[#eafda8] flex items-center justify-center font-extrabold shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 leading-snug group-hover:text-black truncate max-w-[180px]">{doc.name}</span>
                        <span className="text-[10px] text-gray-400 font-bold mt-0.5">{doc.type} • {doc.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* Belge Görüntüle */}
                      <button 
                        onClick={() => triggerToast(`${doc.name} başarıyla görüntülendi.`)} 
                        className="w-7 h-7 rounded-lg hover:bg-black hover:text-white flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
                        title="Görüntüle"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      
                      {/* Belge İndir */}
                      <button 
                        onClick={() => triggerToast(`${doc.name} indirme işlemi tamamlandı.`)} 
                        className="w-7 h-7 rounded-lg hover:bg-black hover:text-white flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
                        title="İndir"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      {/* Belge Arşivle */}
                      <button 
                        onClick={() => triggerToast(`${doc.name} arşive taşındı.`)} 
                        className="w-7 h-7 rounded-lg hover:bg-black hover:text-white flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
                        title="Arşivle"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 8: İletişim Geçmişi */}
        {activeTab === 'iletisim-gecmisi' && (
          <div className="bg-white border border-gray-100 rounded-[1.8rem] p-6 flex flex-col gap-5 animate-fade-in">
            <h3 className="text-sm font-black text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <History className="w-5 h-5 text-gray-500" />
              <span>İletişim ve Randevu Hatırlatma Kayıtları</span>
            </h3>

            <div className="space-y-3.5">
              {client.contactHistory.length === 0 ? (
                <div className="p-10 text-center text-gray-400 text-xs">Sistem üzerinden gönderilmiş aktif e-posta veya SMS logu bulunmuyor.</div>
              ) : (
                client.contactHistory.map((ch) => (
                  <div key={ch.id} className="p-4 bg-gray-50 border border-gray-150 rounded-2xl flex flex-col gap-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                          ch.type === 'WhatsApp' ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-blue-800'
                        }`}>{ch.type}</span>
                        <span className="text-gray-400 text-[10px] font-bold">{ch.date}</span>
                      </div>
                      <span className="text-gray-500 font-bold">Sonuç: {ch.result}</span>
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed bg-white/50 p-2.5 rounded-xl border border-gray-100">{ch.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 9: Operasyonel Notlar */}
        {activeTab === 'notlar' && (
          <div className="bg-white border border-gray-100 rounded-[1.8rem] p-6 flex flex-col gap-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-950 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-500" />
                <span>Operasyonel ve İdari Not Girişleri</span>
              </h3>
              <button 
                onClick={handleSaveNotes}
                className="px-4 py-1.5 bg-black text-[#eafda8] text-xs font-black rounded-xl hover:bg-gray-800 transition-colors shadow-3xs flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Değişiklikleri Kaydet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-gray-700">
              {/* Yönetici Notu */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-500 font-extrabold uppercase text-[9.5px] tracking-wider">Yönetici Notu</label>
                <textarea 
                  value={notesForm.admin}
                  onChange={e => setNotesForm({ ...notesForm, admin: e.target.value })}
                  placeholder="Yönetimsel ve idari notları buraya girebilirsiniz..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 focus:outline-none focus:border-black font-semibold h-28 resize-none"
                />
              </div>

              {/* Randevu Notu */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-500 font-extrabold uppercase text-[9.5px] tracking-wider">Randevu Notu</label>
                <textarea 
                  value={notesForm.appointment}
                  onChange={e => setNotesForm({ ...notesForm, appointment: e.target.value })}
                  placeholder="Randevu seansları, katılım detayları ve özel gün notları..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 focus:outline-none focus:border-black font-semibold h-28 resize-none"
                />
              </div>

              {/* Ödeme Notu */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-500 font-extrabold uppercase text-[9.5px] tracking-wider">Ödeme Notu</label>
                <textarea 
                  value={notesForm.payment}
                  onChange={e => setNotesForm({ ...notesForm, payment: e.target.value })}
                  placeholder="Fatura, taksit vadesi veya tahsilat vadeli ertelemeleri..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 focus:outline-none focus:border-black font-semibold h-28 resize-none"
                />
              </div>

              {/* Plan Notu */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-500 font-extrabold uppercase text-[9.5px] tracking-wider">Plan Notu</label>
                <textarea 
                  value={notesForm.plan}
                  onChange={e => setNotesForm({ ...notesForm, plan: e.target.value })}
                  placeholder="Hizmet paketi seans ilerlemesi, seans sıklığı ve hedefler..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 focus:outline-none focus:border-black font-semibold h-28 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: İşlem Geçmişi */}
        {activeTab === 'islem-gecmisi' && (
          <div className="bg-white border border-gray-100 rounded-[1.8rem] p-6 flex flex-col gap-5 animate-fade-in">
            <h3 className="text-sm font-black text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <History className="w-5 h-5 text-gray-500" />
              <span>Sistem Hareket Logları (Audit Log)</span>
            </h3>

            <div className="space-y-3">
              {client.auditLog.length === 0 ? (
                <div className="p-10 text-center text-gray-400 text-xs">Bu danışan adına henüz bir işlem logu kaydedilmemiştir.</div>
              ) : (
                client.auditLog.map((log) => (
                  <div key={log.id} className="p-4 bg-gray-50 border border-gray-150 rounded-2xl flex gap-3.5 text-xs">
                    <div className="w-2 h-2 rounded-full bg-black shrink-0 mt-1.5" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-gray-900">{log.detail}</span>
                        <span className="text-[10px] text-gray-400 font-semibold">{log.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[8px] font-black uppercase">{log.action}</span>
                        <span className="text-[10px] text-gray-400 font-bold">• İşlemi Yapan: {log.user}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
