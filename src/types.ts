export interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  duration: string;
  status: 'Tamamlandı' | 'Yeniden Planlandı' | 'İptal Edildi' | 'Gelmedi' | 'Yaklaşan';
  payment: 'Ödendi' | 'Bekleniyor' | 'Gecikmiş';
  type: 'Online' | 'Yüz Yüze';
  note?: string;
}

export interface SessionUsage {
  date: string;
  sessionNumber: number;
  note: string;
  specialist: string;
}

export interface Plan {
  name: string;
  status: 'Aktif' | 'Tamamlandı' | 'İptal Edildi';
  totalSessions: number;
  usedSessions: number;
  remainingSessions: number;
  startDate: string;
  endDate: string;
  usageHistory: SessionUsage[];
  note?: string;
}

export interface PaymentInstallment {
  dueDate: string;
  amount: number;
  status: 'Ödendi' | 'Bekleniyor' | 'Gecikmiş';
}

export interface PaymentRecord {
  date: string;
  amount: number;
  type: 'Kredi Kartı' | 'Nakit' | 'Havale';
  invoiceNo: string;
  note: string;
}

export interface DiscountRecord {
  name: string;
  amount: number;
}

export interface RefundRecord {
  date: string;
  amount: number;
  note: string;
}

export interface PaymentDetails {
  totalPlanAmount: number;
  paidAmount: number;
  remainingAmount: number;
  upcomingPayment: string;
  overduePayment: string;
  installments: PaymentInstallment[];
  history: PaymentRecord[];
  discounts: DiscountRecord[];
  refunds: RefundRecord[];
  note?: string;
}

export interface DocumentRecord {
  id: string;
  name: string;
  type: 'Bilgi Formu' | 'Onam Formu' | 'Yüklenen Belge' | 'Paylaşılan PDF';
  size: string;
  date: string;
  status: 'Aktif' | 'Arşivli';
}

export interface ContactHistoryItem {
  id: string;
  type: 'E-posta' | 'WhatsApp' | 'Hatırlatıcı';
  date: string;
  content: string;
  result: string;
}

export interface ClientNotes {
  admin: string;
  appointment: string;
  payment: string;
  plan: string;
}

export interface AuditLogItem {
  id: string;
  date: string;
  action: string; // "Oluşturulma" | "Güncelleme" | "Durum Değişikliği" | "Randevu Hareketi" | "Ödeme Hareketi"
  detail: string;
  user: string;
}

export interface ClientDetails {
  id: string;
  name: string;
  clientNumber: string;
  avatar: string;
  status: 'Aktif' | 'Potansiyel' | 'Pasif' | 'Arşivlenmiş';
  ageGroup: 'Yetişkin' | 'Çocuk';
  phone: string;
  whatsapp: string;
  email: string;
  age: number;
  birthDate: string;
  registrationDate: string;
  nextAppointment: string;
  lastAppointment: string;
  activePlan: string;
  remainingBalance: number;
  
  // İletişim Bilgileri
  address: string;
  city: string;
  district: string;
  country: string;
  preferredContactMethod: 'Telefon' | 'WhatsApp' | 'E-posta';
  contactConsent: boolean;
  
  // Veli ve Yakın Bilgileri (Çocuk danışanlar için)
  parentPrimaryName?: string;
  parentPrimaryRelation?: string;
  parentPrimaryPhone?: string;
  parentPrimaryEmail?: string;
  parentSecondaryName?: string;
  parentSecondaryRelation?: string;
  parentSecondaryPhone?: string;
  emergencyContact?: string;
  
  appointments: Appointment[];
  plans: Plan[];
  payments: PaymentDetails;
  documents: DocumentRecord[];
  contactHistory: ContactHistoryItem[];
  notes: ClientNotes;
  auditLog: AuditLogItem[];
}
