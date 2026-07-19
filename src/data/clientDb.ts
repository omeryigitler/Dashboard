import { ClientDetails } from '../types';

export const DANISAN_DETAILS_DATABASE: Record<string, ClientDetails> = {
  gabriela: {
    id: 'gabriela',
    name: 'Gabriela Christiansen',
    clientNumber: 'DNS-1001',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    status: 'Aktif',
    ageGroup: 'Yetişkin',
    phone: '0532-555-0149',
    whatsapp: '0532-555-0149',
    email: 'gabriela@e-posta.com',
    age: 28,
    birthDate: '1998-05-14',
    registrationDate: '2026-04-10',
    nextAppointment: '2026-07-22 09:30',
    lastAppointment: '2026-07-15 10:00',
    activePlan: '3 Aylık Takip',
    remainingBalance: 0,
    address: 'Cumhuriyet Cd. No:45, Şişli',
    city: 'İstanbul',
    district: 'Şişli',
    country: 'Türkiye',
    preferredContactMethod: 'WhatsApp',
    contactConsent: true,
    appointments: [
      { id: '1', date: '2026-07-22', time: '09:30', service: 'Diyet ve Beslenme', duration: '50 dk', status: 'Yaklaşan', payment: 'Bekleniyor', type: 'Online', note: 'Kilo kaybı değerlendirmesi' },
      { id: '2', date: '2026-07-15', time: '10:00', service: 'Diyet ve Beslenme', duration: '50 dk', status: 'Tamamlandı', payment: 'Ödendi', type: 'Online', note: 'Haftalık program revizyonu' },
      { id: '3', date: '2026-07-08', time: '10:00', service: 'Diyet ve Beslenme', duration: '50 dk', status: 'Tamamlandı', payment: 'Ödendi', type: 'Online' },
      { id: '4', date: '2026-07-01', time: '10:00', service: 'Diyet ve Beslenme', duration: '50 dk', status: 'Gelmedi', payment: 'Gecikmiş', type: 'Online' }
    ],
    plans: [
      {
        name: '3 Aylık Takip Planı',
        status: 'Aktif',
        totalSessions: 12,
        usedSessions: 11,
        remainingSessions: 1,
        startDate: '2026-04-10',
        endDate: '2026-07-24',
        usageHistory: [
          { date: '2026-07-15', sessionNumber: 11, note: 'Ketojenik diyet geçiş değerlendirmesi', specialist: 'Ömer Yiğitler' },
          { date: '2026-07-08', sessionNumber: 10, note: 'Yağ/kas oranı ölçümü ve analiz', specialist: 'Ömer Yiğitler' }
        ],
        note: 'Danışan istikrarlı kilo kaybı kaydediyor.'
      }
    ],
    payments: {
      totalPlanAmount: 18000,
      paidAmount: 18000,
      remainingAmount: 0,
      upcomingPayment: 'Yok',
      overduePayment: 'Yok',
      installments: [
        { dueDate: '2026-04-10', amount: 6000, status: 'Ödendi' },
        { dueDate: '2026-05-10', amount: 6000, status: 'Ödendi' },
        { dueDate: '2026-06-10', amount: 6000, status: 'Ödendi' }
      ],
      history: [
        { date: '2026-06-10', amount: 6000, type: 'Kredi Kartı', invoiceNo: 'INV-2026-033', note: '3. Taksit' },
        { date: '2026-05-10', amount: 6000, type: 'Kredi Kartı', invoiceNo: 'INV-2026-021', note: '2. Taksit' },
        { date: '2026-04-10', amount: 6000, type: 'Nakit', invoiceNo: 'INV-2026-012', note: 'Peşinat' }
      ],
      discounts: [{ name: 'Erken Kayıt İndirimi', amount: 1000 }],
      refunds: [],
      note: 'Ödemeler zamanında yapıldı.'
    },
    documents: [
      { id: 'doc-1', name: 'Danışan Bilgi Formu - Gabriela.pdf', type: 'Bilgi Formu', size: '1.2 MB', date: '2026-04-10', status: 'Aktif' },
      { id: 'doc-2', name: 'Beslenme Alışkanlıkları Anketi.pdf', type: 'Yüklenen Belge', size: '840 KB', date: '2026-04-11', status: 'Aktif' }
    ],
    contactHistory: [
      { id: 'ch-1', type: 'WhatsApp', date: '2026-07-18', content: 'Beslenme listesi güncellendi, WhatsApp üzerinden PDF iletildi.', result: 'Okundu ve onaylandı' },
      { id: 'ch-2', type: 'E-posta', date: '2026-07-14', content: 'Randevu hatırlatma e-postası', result: 'İletildi' }
    ],
    notes: {
      admin: 'Gıda hassasiyetleri konusunda hassas. Laktozsuz ürünler tercih edilmeli.',
      appointment: 'Haftalık kilo ölçümleri takip edilecek.',
      payment: 'Problem yok.',
      plan: 'Düşük karbonhidrat / yüksek protein planı.'
    },
    auditLog: [
      { id: 'a-1', date: '2026-04-10 11:30', action: 'Oluşturulma', detail: 'Yeni danışan kaydı Ömer Yiğitler tarafından oluşturuldu.', user: 'Ömer Yiğitler' },
      { id: 'a-2', date: '2026-07-15 10:50', action: 'Randevu Hareketi', detail: 'Seans tamamlandı olarak işaretlendi.', user: 'Ömer Yiğitler' }
    ]
  },
  halle: {
    id: 'halle',
    name: 'Halle Griffiths',
    clientNumber: 'DNS-1002',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    status: 'Aktif',
    ageGroup: 'Yetişkin',
    phone: '0532-555-0899',
    whatsapp: '0532-555-0899',
    email: 'h.griffiths@e-posta.com',
    age: 34,
    birthDate: '1992-09-22',
    registrationDate: '2026-05-18',
    nextAppointment: '2026-07-25 11:15',
    lastAppointment: '2026-07-18 11:15',
    activePlan: 'Haftalık Seans',
    remainingBalance: 4500,
    address: 'Bağdat Cd. No:112, Kadıköy',
    city: 'İstanbul',
    district: 'Kadıköy',
    country: 'Türkiye',
    preferredContactMethod: 'Telefon',
    contactConsent: true,
    appointments: [
      { id: '1', date: '2026-07-25', time: '11:15', service: 'Bireysel Yaşam Koçluğu', duration: '60 dk', status: 'Yaklaşan', payment: 'Bekleniyor', type: 'Yüz Yüze', note: 'Zaman yönetimi analizi' },
      { id: '2', date: '2026-07-18', time: '11:15', service: 'Bireysel Yaşam Koçluğu', duration: '60 dk', status: 'Tamamlandı', payment: 'Ödendi', type: 'Yüz Yüze' }
    ],
    plans: [
      {
        name: 'Haftalık Koçluk Paketi',
        status: 'Aktif',
        totalSessions: 8,
        usedSessions: 4,
        remainingSessions: 4,
        startDate: '2026-05-18',
        endDate: '2026-08-15',
        usageHistory: [
          { date: '2026-07-18', sessionNumber: 4, note: 'Özgüven ve liderlik egzersizleri', specialist: 'Ömer Yiğitler' }
        ]
      }
    ],
    payments: {
      totalPlanAmount: 12000,
      paidAmount: 7500,
      remainingAmount: 4500,
      upcomingPayment: '2026-07-25 (1,500 TL)',
      overduePayment: 'Yok',
      installments: [
        { dueDate: '2026-05-18', amount: 3000, status: 'Ödendi' },
        { dueDate: '2026-06-18', amount: 4500, status: 'Ödendi' },
        { dueDate: '2026-07-18', amount: 4500, status: 'Bekleniyor' }
      ],
      history: [
        { date: '2026-06-18', amount: 4500, type: 'Havale', invoiceNo: 'INV-2026-045', note: 'Haziran Seansları' }
      ],
      discounts: [],
      refunds: []
    },
    documents: [],
    contactHistory: [],
    notes: { admin: '', appointment: '', payment: '', plan: '' },
    auditLog: []
  },
  josiah: {
    id: 'josiah',
    name: 'Josiah Love',
    clientNumber: 'DNS-1003',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'Aktif',
    ageGroup: 'Yetişkin',
    phone: '0532-555-0723',
    whatsapp: '0532-555-0723',
    email: 'josiah.love@e-posta.com',
    age: 41,
    birthDate: '1985-03-12',
    registrationDate: '2026-07-05',
    nextAppointment: 'Yok',
    lastAppointment: '2026-07-17 14:00',
    activePlan: 'Haftalık Seans',
    remainingBalance: 0,
    address: 'Karanfil Sk. No:8, Çankaya',
    city: 'Ankara',
    district: 'Çankaya',
    country: 'Türkiye',
    preferredContactMethod: 'E-posta',
    contactConsent: true,
    appointments: [
      { id: '1', date: '2026-07-17', time: '14:00', service: 'Bireysel Psikoterapi', duration: '50 dk', status: 'Tamamlandı', payment: 'Ödendi', type: 'Online' }
    ],
    plans: [
      {
        name: 'Psikoterapi Seans Planı',
        status: 'Aktif',
        totalSessions: 10,
        usedSessions: 2,
        remainingSessions: 8,
        startDate: '2026-07-05',
        endDate: '2026-09-15',
        usageHistory: []
      }
    ],
    payments: {
      totalPlanAmount: 15000,
      paidAmount: 15000,
      remainingAmount: 0,
      upcomingPayment: 'Yok',
      overduePayment: 'Yok',
      installments: [],
      history: [],
      discounts: [],
      refunds: []
    },
    documents: [],
    contactHistory: [],
    notes: { admin: '', appointment: '', payment: '', plan: '' },
    auditLog: []
  },
  wyatt: {
    id: 'wyatt',
    name: 'Wyatt Wetmore',
    clientNumber: 'DNS-1004',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    status: 'Arşivlenmiş',
    ageGroup: 'Yetişkin',
    phone: '0532-555-0487',
    whatsapp: '0532-555-0487',
    email: 'wyatt@e-posta.com',
    age: 52,
    birthDate: '1974-07-01',
    registrationDate: '2025-09-12',
    nextAppointment: 'Yok',
    lastAppointment: '2026-03-10 15:00',
    activePlan: 'Yok',
    remainingBalance: 0,
    address: 'Nilüfer Cd. No:3, Nilüfer',
    city: 'Bursa',
    district: 'Nilüfer',
    country: 'Türkiye',
    preferredContactMethod: 'E-posta',
    contactConsent: true,
    appointments: [],
    plans: [],
    payments: {
      totalPlanAmount: 0,
      paidAmount: 0,
      remainingAmount: 0,
      upcomingPayment: 'Yok',
      overduePayment: 'Yok',
      installments: [],
      history: [],
      discounts: [],
      refunds: []
    },
    documents: [],
    contactHistory: [],
    notes: { admin: '', appointment: '', payment: '', plan: '' },
    auditLog: []
  },
  can_demir: {
    id: 'can_demir',
    name: 'Can Demir',
    clientNumber: 'DNS-1005',
    avatar: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=150&h=150&fit=crop',
    status: 'Potansiyel',
    ageGroup: 'Çocuk',
    phone: '0532-555-0219',
    whatsapp: '0532-555-0219',
    email: 'veli.demir@e-posta.com',
    age: 8,
    birthDate: '2018-04-12',
    registrationDate: '2026-07-12',
    nextAppointment: '2026-07-21 16:00',
    lastAppointment: 'Yok',
    activePlan: 'Yok',
    remainingBalance: 1500,
    address: 'Atatürk Mh. Orkide Sk, Ataşehir',
    city: 'İstanbul',
    district: 'Ataşehir',
    country: 'Türkiye',
    preferredContactMethod: 'WhatsApp',
    contactConsent: true,
    parentPrimaryName: 'Ahmet Demir',
    parentPrimaryRelation: 'Baba',
    parentPrimaryPhone: '0532-555-0219',
    parentPrimaryEmail: 'veli.demir@e-posta.com',
    parentSecondaryName: 'Ayşe Demir',
    parentSecondaryRelation: 'Anne',
    parentSecondaryPhone: '0532-555-0220',
    emergencyContact: 'Ahmet Demir (0532-555-0219)',
    appointments: [
      { id: '1', date: '2026-07-21', time: '16:00', service: 'Çocuk Gelişimi ve Pedagoji', duration: '50 dk', status: 'Yaklaşan', payment: 'Bekleniyor', type: 'Yüz Yüze' }
    ],
    plans: [],
    payments: {
      totalPlanAmount: 1500,
      paidAmount: 0,
      remainingAmount: 1500,
      upcomingPayment: '2026-07-21 (1,500 TL)',
      overduePayment: 'Yok',
      installments: [],
      history: [],
      discounts: [],
      refunds: []
    },
    documents: [
      { id: 'doc-3', name: 'Veli Onam Formu - Can Demir.pdf', type: 'Onam Formu', size: '1.4 MB', date: '2026-07-12', status: 'Aktif' }
    ],
    contactHistory: [],
    notes: { admin: 'Okulda konsantrasyon güçlüğü çekiyor.', appointment: '', payment: '', plan: '' },
    auditLog: []
  },
  melis_guney: {
    id: 'melis_guney',
    name: 'Melis Güney',
    clientNumber: 'DNS-1006',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop',
    status: 'Pasif',
    ageGroup: 'Çocuk',
    phone: '0533-444-1122',
    whatsapp: '0533-444-1122',
    email: 'veli.guney@e-posta.com',
    age: 10,
    birthDate: '2016-01-10',
    registrationDate: '2026-06-01',
    nextAppointment: 'Yok',
    lastAppointment: '2026-06-15 14:00',
    activePlan: 'Tek Seans',
    remainingBalance: 0,
    address: 'Lale Sk. No:5, Çankaya',
    city: 'Ankara',
    district: 'Çankaya',
    country: 'Türkiye',
    preferredContactMethod: 'WhatsApp',
    contactConsent: true,
    parentPrimaryName: 'Selin Güney',
    parentPrimaryRelation: 'Anne',
    parentPrimaryPhone: '0533-444-1122',
    parentPrimaryEmail: 'veli.guney@e-posta.com',
    emergencyContact: 'Selin Güney (0533-444-1122)',
    appointments: [
      { id: '1', date: '2026-06-15', time: '14:00', service: 'Çocuk Gelişimi ve Pedagoji', duration: '50 dk', status: 'Tamamlandı', payment: 'Ödendi', type: 'Online' }
    ],
    plans: [],
    payments: {
      totalPlanAmount: 1500,
      paidAmount: 1500,
      remainingAmount: 0,
      upcomingPayment: 'Yok',
      overduePayment: 'Yok',
      installments: [],
      history: [],
      discounts: [],
      refunds: []
    },
    documents: [],
    contactHistory: [],
    notes: { admin: '', appointment: '', payment: '', plan: '' },
    auditLog: []
  },
  baris_kartal: {
    id: 'baris_kartal',
    name: 'Barış Kartal',
    clientNumber: 'DNS-1007',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop',
    status: 'Aktif',
    ageGroup: 'Yetişkin',
    phone: '0544-333-2211',
    whatsapp: '0544-333-2211',
    email: 'baris@e-posta.com',
    age: 29,
    birthDate: '1997-11-20',
    registrationDate: '2026-05-20',
    nextAppointment: '2026-07-21 14:30',
    lastAppointment: '2026-07-14 10:00',
    activePlan: '3 Aylık Takip',
    remainingBalance: 3000,
    address: 'Eskişehir Yolu, Çankaya',
    city: 'Ankara',
    district: 'Çankaya',
    country: 'Türkiye',
    preferredContactMethod: 'WhatsApp',
    contactConsent: true,
    appointments: [
      { id: '1', date: '2026-07-21', time: '14:30', service: 'Bireysel Psikoterapi', duration: '50 dk', status: 'Yaklaşan', payment: 'Bekleniyor', type: 'Online' }
    ],
    plans: [
      { name: '3 Aylık Takip Planı', status: 'Aktif', totalSessions: 12, usedSessions: 11, remainingSessions: 1, startDate: '2026-05-20', endDate: '2026-08-20', usageHistory: [] }
    ],
    payments: {
      totalPlanAmount: 18000,
      paidAmount: 15000,
      remainingAmount: 3000,
      upcomingPayment: '2026-07-21 (3,000 TL)',
      overduePayment: 'Yok',
      installments: [],
      history: [],
      discounts: [],
      refunds: []
    },
    documents: [],
    contactHistory: [],
    notes: { admin: '', appointment: '', payment: '', plan: '' },
    auditLog: []
  },
  kemal_sayar: {
    id: 'kemal_sayar',
    name: 'Kemal Sayar',
    clientNumber: 'DNS-1008',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    status: 'Aktif',
    ageGroup: 'Yetişkin',
    phone: '0555-222-3344',
    whatsapp: '0555-222-3344',
    email: 'kemal.sayar@e-posta.com',
    age: 45,
    birthDate: '1981-08-15',
    registrationDate: '2026-02-15',
    nextAppointment: '2026-07-26 14:00',
    lastAppointment: '2026-07-19 14:00',
    activePlan: '6 Aylık Takip',
    remainingBalance: 0,
    address: 'Kordon Boyu, Konak',
    city: 'İzmir',
    district: 'Konak',
    country: 'Türkiye',
    preferredContactMethod: 'Telefon',
    contactConsent: true,
    appointments: [
      { id: '1', date: '2026-07-26', time: '14:00', service: 'Bireysel Psikoterapi', duration: '50 dk', status: 'Yaklaşan', payment: 'Bekleniyor', type: 'Online' }
    ],
    plans: [
      { name: '6 Aylık Takip Planı', status: 'Aktif', totalSessions: 24, usedSessions: 12, remainingSessions: 12, startDate: '2026-02-15', endDate: '2026-08-15', usageHistory: [] }
    ],
    payments: {
      totalPlanAmount: 36000,
      paidAmount: 36000,
      remainingAmount: 0,
      upcomingPayment: 'Yok',
      overduePayment: 'Yok',
      installments: [],
      history: [],
      discounts: [],
      refunds: []
    },
    documents: [],
    contactHistory: [],
    notes: { admin: '', appointment: '', payment: '', plan: '' },
    auditLog: []
  },
  ayse_yilmaz: {
    id: 'ayse_yilmaz',
    name: 'Ayşe Yılmaz',
    clientNumber: 'DNS-1009',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    status: 'Aktif',
    ageGroup: 'Yetişkin',
    phone: '0531-111-2233',
    whatsapp: '0531-111-2233',
    email: 'ayse.yilmaz@e-posta.com',
    age: 31,
    birthDate: '1995-12-10',
    registrationDate: '2026-06-10',
    nextAppointment: 'Yok',
    lastAppointment: '2026-07-16 11:00',
    activePlan: 'Aylık Takip',
    remainingBalance: 1500,
    address: 'Atatürk Bulvarı, Osmangazi',
    city: 'Bursa',
    district: 'Osmangazi',
    country: 'Türkiye',
    preferredContactMethod: 'WhatsApp',
    contactConsent: true,
    appointments: [
      { id: '1', date: '2026-07-16', time: '11:00', service: 'Diyet ve Beslenme', duration: '50 dk', status: 'Tamamlandı', payment: 'Gecikmiş', type: 'Online' }
    ],
    plans: [
      { name: 'Aylık Takip Planı', status: 'Aktif', totalSessions: 4, usedSessions: 2, remainingSessions: 2, startDate: '2026-06-10', endDate: '2026-07-10', usageHistory: [] }
    ],
    payments: {
      totalPlanAmount: 6000,
      paidAmount: 4500,
      remainingAmount: 1500,
      upcomingPayment: 'Yok',
      overduePayment: '1,500 TL',
      installments: [],
      history: [],
      discounts: [],
      refunds: []
    },
    documents: [],
    contactHistory: [],
    notes: { admin: '', appointment: '', payment: '', plan: '' },
    auditLog: []
  }
};
