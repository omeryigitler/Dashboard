export interface ModuleItem {
  id: string;
  label: string;
  description: string;
}

export interface ModuleGroup {
  title: string;
  items: ModuleItem[];
}

export interface ModuleSection {
  title: string;
  fields: string[];
  actions?: string[];
}

export interface ModuleStat {
  label: string;
  value: string;
  hint: string;
}

export interface ModuleConfig {
  title: string;
  subtitle: string;
  groups: ModuleGroup[];
  sections: ModuleSection[];
  topActions: string[];
  stats: ModuleStat[];
}

const slugify = (value: string) => value
  .toLocaleLowerCase('tr-TR')
  .replaceAll('ı', 'i')
  .replaceAll('ğ', 'g')
  .replaceAll('ü', 'u')
  .replaceAll('ş', 's')
  .replaceAll('ö', 'o')
  .replaceAll('ç', 'c')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const items = (...labels: string[]): ModuleItem[] => labels.map((label) => ({
  id: slugify(label),
  label,
  description: `${label} görünümünü ve ilişkili kayıtları açar.`,
}));

const group = (title: string, labels: string[]): ModuleGroup => ({ title, items: items(...labels) });
const section = (title: string, fields: string[], actions?: string[]): ModuleSection => ({ title, fields, actions });

export const MODULE_CONFIGS: Record<string, ModuleConfig> = {
  randevular: {
    title: 'Randevular',
    subtitle: 'Randevu listeleri, görünümler, durumlar ve operasyon işlemleri.',
    groups: [
      group('Görünümler', ['Bugünkü Randevular', 'Takvim Görünümü', 'Liste Görünümü', 'Günlük Görünüm', 'Haftalık Görünüm', 'Aylık Görünüm', 'Yaklaşan Randevular', 'Geçmiş Randevular']),
      group('Durumlar', ['Onay Bekleyen', 'Onaylanan', 'Tamamlanan', 'Ödeme Bekleyen', 'Yeniden Planlanan', 'İptal Edilen', 'Gelmedi']),
      group('İşlemler', ['Yeni Randevu', 'Randevu Ara', 'Tarih Filtresi', 'Danışan Filtresi', 'Hizmet Filtresi', 'Durum Filtresi', 'Ödeme Filtresi']),
    ],
    sections: [
      section('Randevu Listesi', ['Tarih', 'Saat', 'Danışan', 'Hizmet', 'Süre', 'Online / yüz yüze', 'Durum', 'Ödeme durumu']),
      section('Randevu Detayı', ['Danışan bilgisi', 'Veli bilgisi', 'Hizmet', 'Tarih', 'Başlangıç saati', 'Bitiş saati', 'Süre', 'Görüşme türü', 'Konum veya görüşme bağlantısı', 'Ücret', 'Plan bağlantısı', 'Ödeme durumu', 'Hatırlatma durumu', 'Randevu notu', 'Oluşturulma tarihi', 'Güncelleme tarihi']),
      section('Randevu İşlemleri', [], ['Onayla', 'Tamamlandı olarak işaretle', 'Yeniden planla', 'İptal et', 'Gelmedi olarak işaretle', 'Ödeme ekle', 'Hatırlatma gönder', 'Danışanı aç', 'Planı aç']),
      section('Yeni Randevu Formu', ['Danışan seç', 'Yeni danışan oluştur', 'Hizmet seç', 'Tarih', 'Başlangıç saati', 'Süre: 15 dakika', 'Süre: 30 dakika', 'Süre: 45 dakika', 'Özel süre', 'Online / yüz yüze', 'Konum', 'Görüşme bağlantısı', 'Ücret', 'Plan içinden düş', 'Hatırlatma gönder', 'Not']),
    ],
    topActions: ['Yeni randevu', 'Filtrele', 'Görünüm', 'Dışa aktar'],
    stats: [
      { label: 'Bugünkü', value: '8', hint: '2 tamamlandı' },
      { label: 'Yaklaşan', value: '24', hint: 'Bu hafta' },
      { label: 'Onay Bekleyen', value: '3', hint: 'Aksiyon gerekli' },
      { label: 'Doluluk', value: '%82', hint: 'Haftalık oran' },
    ],
  },

  'takvim-uygunluk': {
    title: 'Takvim ve Uygunluk',
    subtitle: 'Çalışma saatleri, kapalı zamanlar, rezervasyon kuralları ve takvim entegrasyonları.',
    groups: [
      group('Takvim', ['Takvim', 'Haftalık Çalışma Saatleri', 'Tarihe Özel Saatler', 'Kapalı Zamanlar']),
      group('Kurallar', ['Randevu Kuralları', 'İlk Görüşme Ayarları', 'İptal ve Değişiklik Kuralları']),
      group('Entegrasyonlar', ['Takvim Entegrasyonları', 'Google Takvim', 'Senkronizasyon Durumu']),
    ],
    sections: [
      section('Takvim', ['Günlük görünüm', 'Haftalık görünüm', 'Aylık görünüm', 'Randevular', 'Kapalı saatler', 'Uygun saatler'], ['Yeni randevu', 'Zamanı kapat']),
      section('Haftalık Çalışma Saatleri', ['Aktif / kapalı', 'Başlangıç', 'Bitiş', 'Ara saatleri', 'İkinci çalışma aralığı']),
      section('Tarihe Özel Saatler', ['Tarih seç', 'Özel başlangıç', 'Özel bitiş', 'Ek çalışma saati', 'Belirli hizmetlere aç', 'Normal programı geçersiz kıl']),
      section('Kapalı Zamanlar', ['Tek saatlik blok', 'Tam gün izin', 'Tarih aralığı', 'Resmî tatil', 'Kişisel izin', 'Açıklama']),
      section('Randevu Kuralları', ['Varsayılan randevu süresi', 'Seanslar arası boşluk', 'Hazırlık süresi', 'Seans sonrası tampon', 'En erken rezervasyon süresi', 'En ileri rezervasyon tarihi', 'Aynı gün randevu', 'Çakışma engeli']),
      section('İlk Görüşme Ayarları', ['İlk görüşme aktif mi', 'Varsayılan süre', '15 / 30 / 45 dakika', 'Özel süre', 'Ücret', 'Ücretsiz seçeneği', 'Online / yüz yüze', 'Kullanılabilir saatler']),
      section('İptal Kuralları', ['İptal süresi', 'Yeniden planlama süresi', 'Geç iptal davranışı', 'Gelmedi davranışı', 'Seans hakkı düşürülsün mü', 'Bilgilendirme mesajı']),
      section('Entegrasyonlar', ['Google Takvim', 'Senkronizasyon durumu', 'Kullanılan takvim', 'Dış takvim doluluklarını kapatma'], ['Bağlantıyı kesme']),
    ],
    topActions: ['Yeni randevu', 'Zamanı kapat', 'Bugüne dön', 'Senkronize et'],
    stats: [
      { label: 'Bugün Uygun', value: '6 saat', hint: '09:00–18:00' },
      { label: 'Kapalı Blok', value: '2', hint: 'Bu hafta' },
      { label: 'Doluluk', value: '%74', hint: '7 günlük' },
      { label: 'Senkronizasyon', value: 'Aktif', hint: 'Google Takvim' },
    ],
  },

  'talepler-iletisim': {
    title: 'Talepler ve İletişim',
    subtitle: 'Yeni başvurular, iletişim kaynakları, mesaj şablonları ve gönderim geçmişi.',
    groups: [
      group('Talep Durumları', ['Tüm Talepler', 'Yeni Talepler', 'İnceleniyor', 'İletişime Geçildi', 'Yanıt Bekleniyor', 'Randevu Oluşturuldu', 'Danışana Dönüştürüldü', 'Sonuçsuz', 'Spam', 'Arşiv']),
      group('Talep Kaynakları', ['İletişim Formu', 'Randevu Formu', 'WhatsApp', 'Telefon', 'E-posta', 'Manuel Kayıt']),
      group('İletişim Araçları', ['Mesaj Şablonları', 'Gönderim Geçmişi', 'İletişim İzinleri']),
    ],
    sections: [
      section('Talep Detayı', ['Ad soyad', 'Telefon', 'E-posta', 'Talep konusu', 'Mesaj', 'İlgilendiği hizmet', 'Tercih edilen tarih', 'Talep kaynağı', 'Oluşturulma tarihi', 'Talep durumu', 'Son işlem', 'Yönetici notu']),
      section('Talep İşlemleri', [], ['Ara', 'WhatsApp aç', 'E-posta gönder', 'Not ekle', 'Randevu oluştur', 'Danışana dönüştür', 'Durum değiştir', 'Spam olarak işaretle', 'Arşivle']),
      section('Mesaj Şablonları', ['İlk yanıt', 'Randevu onayı', 'Randevu hatırlatması', 'Randevu iptali', 'Randevu değişikliği', 'Ödeme hatırlatması', 'Plan bitiş bildirimi', 'PDF gönderimi']),
    ],
    topActions: ['Yeni talep', 'Mesaj gönder', 'Filtrele', 'Şablonlar'],
    stats: [
      { label: 'Yeni Talep', value: '12', hint: 'Son 7 gün' },
      { label: 'Yanıt Bekleyen', value: '4', hint: 'Aksiyon gerekli' },
      { label: 'Dönüşüm', value: '%38', hint: 'Randevuya' },
      { label: 'Ort. Yanıt', value: '18 dk', hint: 'Bu ay' },
    ],
  },

  hizmetler: {
    title: 'Hizmetler',
    subtitle: 'Hizmet tanımları, randevu ve ücret ayarları, site görünümü ve performans.',
    groups: [
      group('Hizmet Görünümleri', ['Tüm Hizmetler', 'Aktif Hizmetler', 'Pasif Hizmetler', 'Sitede Yayınlananlar', 'Taslak Hizmetler', 'Çocuk Hizmetleri', 'Yetişkin Hizmetleri', 'Online Hizmetler', 'Yüz Yüze Hizmetler']),
      group('İşlemler', ['Yeni Hizmet']),
    ],
    sections: [
      section('Hizmet Genel Bilgileri', ['Hizmet adı', 'Kısa açıklama', 'Detaylı açıklama', 'Kategori', 'Hedef yaş grubu', 'Aktif / pasif']),
      section('Randevu Ayarları', ['Varsayılan süre', 'Alternatif süreler', 'Özel süre', 'Online uygunluğu', 'Yüz yüze uygunluğu', 'İlk görüşme', 'Takvimde kullanılabilirlik']),
      section('Ücret Ayarları', ['Standart ücret', 'İlk görüşme ücreti', 'Özel fiyat', 'Paket oluşturma izni']),
      section('Site Görünümü', ['Sitede göster', 'Kapak görseli', 'Liste sırası', 'Buton metni', 'URL', 'SEO başlığı', 'SEO açıklaması']),
      section('Hizmet İstatistikleri', ['Aktif danışan', 'Yaklaşan randevu', 'Toplam randevu', 'Bağlı plan', 'Hizmet geliri']),
    ],
    topActions: ['Yeni hizmet', 'Düzenle', 'Yayınla', 'Sıralama'],
    stats: [
      { label: 'Aktif Hizmet', value: '9', hint: '2 taslak' },
      { label: 'Bağlı Danışan', value: '42', hint: 'Aktif' },
      { label: 'Yaklaşan Seans', value: '18', hint: '7 gün' },
      { label: 'Aylık Gelir', value: '₺64.500', hint: 'Hizmet bazlı' },
    ],
  },

  'odeme-planlar': {
    title: 'Ödeme ve Planlar',
    subtitle: 'Finans özeti, planlar, tahsilatlar, taksitler ve ödeme hareketleri.',
    groups: [
      group('Genel Bakış', ['Finans Özeti', 'Bugünkü Tahsilatlar', 'Yaklaşan Ödemeler', 'Gecikmiş Ödemeler']),
      group('Planlar', ['Tüm Planlar', 'Aktif Planlar', 'Tamamlanan Planlar', 'Süresi Dolan Planlar', 'İptal Edilen Planlar', 'Seansı Azalan Planlar', 'Eksik Ödemeli Planlar']),
      group('Ödemeler', ['Tüm Ödemeler', 'Bugünkü Ödemeler', 'Bu Haftaki Ödemeler', 'Bu Ayki Ödemeler', 'Tamamlanan Ödemeler', 'Bekleyen Ödemeler', 'Gecikmiş Ödemeler', 'Kısmi Ödemeler', 'İade Edilenler']),
      group('İşlemler', ['Yeni Plan', 'Yeni Ödeme', 'Finans Filtresi', 'Dışa Aktar']),
    ],
    sections: [
      section('Finans Genel Bakış', ['Bu ay alınan ödeme', 'Bu ay beklenen ödeme', 'Toplam alacak', 'Gecikmiş ödeme', 'Yaklaşan ödeme', 'Aktif plan değeri', 'İade edilen ödeme']),
      section('Plan Detayı', ['Danışan', 'Plan adı', 'Plan durumu', 'Başlangıç', 'Bitiş', 'Toplam seans', 'Kullanılan seans', 'Kalan seans']),
      section('Ödeme Planı', ['Toplam ücret', 'İndirim', 'Son fiyat', 'Ödenen', 'Kalan', 'Taksitler', 'Yaklaşan ödeme', 'Geciken ödeme']),
      section('Seans Kullanımı', ['Randevu tarihi', 'Kullanılan hak', 'Kalan hak', 'İptal durumu', 'Gelmedi durumu']),
      section('Hareket Geçmişi', ['Plan oluşturuldu', 'Seans eklendi', 'Seans düşüldü', 'Süre uzatıldı', 'Ödeme eklendi', 'Plan tamamlandı']),
      section('Plan İşlemleri', [], ['Düzenle', 'Seans ekle', 'Seans düş', 'Süreyi uzat', 'Ödeme ekle', 'Tamamla', 'İptal et', 'Yeni plana dönüştür']),
      section('Ödeme Detayı', ['Danışan', 'Bağlı plan', 'Tutar', 'Para birimi', 'Ödeme tarihi', 'Ödeme yöntemi', 'Tam / kısmi', 'Açıklama', 'Makbuz', 'İşlemi yapan kullanıcı']),
      section('Ödeme İşlemleri', [], ['Düzenle', 'İade kaydı', 'İndirim', 'Makbuz görüntüle', 'Danışanı aç', 'Planı aç', 'Dışa aktar']),
    ],
    topActions: ['Yeni plan', 'Yeni ödeme', 'Filtrele', 'Dışa aktar'],
    stats: [
      { label: 'Bu Ay Alınan', value: '₺46.500', hint: '+%12' },
      { label: 'Beklenen', value: '₺18.000', hint: 'Bu ay' },
      { label: 'Gecikmiş', value: '₺4.500', hint: '3 kayıt' },
      { label: 'Aktif Plan', value: '31', hint: '₺122.000 değer' },
    ],
  },

  'site-icerigi': {
    title: 'Site İçeriği',
    subtitle: 'Sayfa içerikleri, menü, footer, yasal metinler, SEO ve medya yönetimi.',
    groups: [
      group('Sayfalar', ['Ana Sayfa', 'Hakkında', 'Hizmet Sayfaları', 'Sık Sorulan Sorular', 'Yorumlar ve Referanslar', 'İletişim Sayfası']),
      group('Navigasyon ve Yasal', ['Menü', 'Footer', 'Yasal Sayfalar']),
      group('Optimizasyon ve Medya', ['SEO', 'Medya Kütüphanesi']),
    ],
    sections: [
      section('Ana Sayfa', ['Hero başlığı', 'Hero açıklaması', 'Hero medya', 'Ana buton', 'İkinci buton', 'Öne çıkan hizmetler', 'Hakkında kısa alanı', 'Sık sorulan sorular', 'İletişim çağrısı', 'Bölüm sıralaması', 'Görünürlük ayarları']),
      section('Hakkında', ['Başlık', 'Kısa biyografi', 'Uzun biyografi', 'Profil görseli', 'Eğitimler', 'Deneyim', 'Uzmanlık alanları', 'Sertifikalar']),
      section('Hizmet Sayfaları', ['Hizmet seç', 'Başlık', 'Açıklama', 'Kimler için', 'Süreç', 'Görsel', 'Sık sorulan sorular', 'Randevu butonu', 'Yayın durumu']),
      section('Sık Sorulan Sorular', ['Kategori', 'Soru', 'Cevap', 'Sıralama', 'Aktif / pasif']),
      section('Yorumlar', ['Yorum', 'Görünen isim', 'İsim gizleme', 'Danışan onayı', 'Yayın durumu', 'Öne çıkarma', 'Sıralama']),
      section('İletişim', ['Telefon', 'WhatsApp', 'E-posta', 'Adres', 'Harita', 'Çalışma saatleri', 'Sosyal medya', 'Form başlığı', 'Form açıklaması']),
      section('Menü ve Footer', ['Menü bağlantıları', 'Menü sıralaması', 'Footer metni', 'Sosyal medya', 'İletişim bilgileri', 'Yasal bağlantılar', 'Copyright']),
      section('Yasal Sayfalar', ['KVKK', 'Gizlilik politikası', 'Çerez politikası', 'Açık rıza', 'İletişim izni']),
      section('SEO', ['Sayfa başlığı', 'Meta açıklaması', 'Sosyal paylaşım görseli', 'URL', 'Canonical', 'İndeksleme', 'Sitemap görünürlüğü']),
      section('Medya Kütüphanesi', ['Görseller', 'Videolar', 'Logolar', 'Sertifikalar', 'PDF kapakları', 'Kullanıldığı alanlar'], ['Dosya yükle', 'Dosya değiştir', 'Dosya sil']),
    ],
    topActions: ['Önizle', 'Kaydet', 'Yayınla', 'Medya yükle'],
    stats: [
      { label: 'Yayındaki Sayfa', value: '18', hint: '2 taslak' },
      { label: 'Medya', value: '126', hint: 'Görsel ve video' },
      { label: 'SEO Skoru', value: '%91', hint: 'Genel' },
      { label: 'Son Güncelleme', value: 'Bugün', hint: '21:18' },
    ],
  },

  'pdf-kaynaklar': {
    title: 'PDF ve Kaynaklar',
    subtitle: 'PDF dosyaları, dil ve yayın durumları, talep kayıtları ve gönderim ayarları.',
    groups: [
      group('PDF Görünümleri', ['Tüm PDF’ler', 'Türkçe PDF’ler', 'İngilizce PDF’ler', 'Aktif PDF’ler', 'Taslaklar', 'Arşivlenenler', 'Ücretsiz Kaynaklar', 'E-posta ile Gönderilenler']),
      group('Talep ve Gönderim', ['PDF Talep Kayıtları', 'Gönderim Ayarları']),
      group('İşlemler', ['Yeni PDF']),
    ],
    sections: [
      section('PDF Detayı', ['Başlık', 'Açıklama', 'Dil', 'Kategori', 'PDF dosyası', 'Kapak görseli', 'E-posta karşılığı mı', 'Direkt indirilebilir mi', 'Sitede gösterilsin mi', 'Yayın tarihi', 'Sıralama', 'İndirme sayısı', 'Talep sayısı', 'Kullanıldığı alan']),
      section('PDF İşlemleri', [], ['Önizle', 'Aç', 'Düzenle', 'Dosyayı değiştir', 'Kopyala', 'Yayınla', 'Yayından kaldır', 'Arşivle', 'Sil']),
      section('PDF Talep Kayıtları', ['Ad', 'E-posta', 'PDF', 'Dil', 'Talep tarihi', 'Gönderim durumu', 'Pazarlama izni'], ['Yeniden gönder', 'Kaydı sil']),
      section('Gönderim Ayarları', ['Gönderen adı', 'Gönderen e-posta', 'E-posta konusu', 'E-posta metni', 'TR şablonu', 'EN şablonu', 'Başarı mesajı', 'Hata mesajı']),
    ],
    topActions: ['Yeni PDF', 'Dosya yükle', 'Filtrele', 'Gönderim geçmişi'],
    stats: [
      { label: 'Aktif PDF', value: '14', hint: 'TR + EN' },
      { label: 'Toplam İndirme', value: '2.418', hint: 'Tüm zamanlar' },
      { label: 'Yeni Talep', value: '26', hint: 'Bu ay' },
      { label: 'Gönderim Başarısı', value: '%98', hint: 'E-posta' },
    ],
  },

  raporlar: {
    title: 'Raporlar',
    subtitle: 'Finans, randevu, danışan, plan ve talep dönüşüm raporları.',
    groups: [
      group('Rapor Türleri', ['Finans Raporları', 'Randevu Raporları', 'Danışan Raporları', 'Plan Raporları', 'Talep ve Dönüşüm Raporları']),
      group('Kayıt ve Aktarım', ['Kayıtlı Raporlar', 'Dışa Aktarımlar']),
    ],
    sections: [
      section('Finans Raporları', ['Günlük gelir', 'Haftalık gelir', 'Aylık gelir', 'Beklenen gelir', 'Gecikmiş ödeme', 'Ödeme yöntemleri', 'Danışan bazlı gelir', 'Hizmet bazlı gelir']),
      section('Randevu Raporları', ['Toplam randevu', 'Tamamlanan', 'İptal oranı', 'Gelmeme oranı', 'Online / yüz yüze', 'Hizmet dağılımı', 'Yoğun günler', 'Yoğun saatler']),
      section('Danışan Raporları', ['Yeni danışan', 'Aktif danışan', 'Pasif danışan', 'Çocuk / yetişkin', 'Danışan kaynakları', 'Devam oranı', 'Randevuya dönüşmeyenler']),
      section('Plan Raporları', ['Satılan planlar', 'Aktif planlar', 'Tamamlanan planlar', 'Süresi dolanlar', 'Kullanılmayan seans', 'Ortalama plan değeri']),
      section('Talep Raporları', ['Toplam talep', 'Randevuya dönüşüm', 'Danışana dönüşüm', 'Talep kaynakları', 'Yanıt süresi', 'Sonuçsuz talepler']),
      section('Rapor Üst İşlemleri', ['Tarih aralığı', 'Önceki dönem karşılaştırması'], ['Filtrele', 'Excel aktar', 'CSV aktar', 'PDF oluştur', 'Yazdır']),
    ],
    topActions: ['Tarih aralığı', 'Karşılaştır', 'Filtrele', 'Dışa aktar'],
    stats: [
      { label: 'Aylık Gelir', value: '₺64.500', hint: '+%12' },
      { label: 'Tamamlanan', value: '86', hint: 'Randevu' },
      { label: 'Yeni Danışan', value: '14', hint: 'Bu ay' },
      { label: 'Dönüşüm', value: '%41', hint: 'Talep → danışan' },
    ],
  },

  'kullanicilar-yetkiler': {
    title: 'Kullanıcılar ve Yetkiler',
    subtitle: 'Kullanıcı hesapları, roller, yetki grupları, davetler ve erişim geçmişi.',
    groups: [
      group('Kullanıcılar', ['Tüm Kullanıcılar', 'Aktif Kullanıcılar', 'Pasif Kullanıcılar', 'Kullanıcı Davetleri']),
      group('Yetkilendirme', ['Roller', 'Yetki Grupları', 'Yönetici E-posta İzinleri']),
      group('Güvenlik', ['Giriş Geçmişi']),
    ],
    sections: [
      section('Kullanıcı Detayı', ['Ad soyad', 'E-posta', 'Rol', 'Durum', 'Son giriş', 'Oluşturulma tarihi']),
      section('Roller', ['Sahip', 'Yönetici', 'Terapist', 'Resepsiyon', 'Finans', 'İçerik yöneticisi', 'Sadece görüntüleme']),
      section('Yetkiler', ['Danışan görüntüleme', 'Danışan düzenleme', 'Randevu oluşturma', 'Randevu silme', 'Plan oluşturma', 'Ödeme görüntüleme', 'Ödeme düzenleme', 'Rapor görüntüleme', 'Site içeriği yönetimi', 'PDF yönetimi', 'Kullanıcı yönetimi', 'Ayar yönetimi']),
      section('Kullanıcı İşlemleri', [], ['Rol değiştir', 'Yetkileri düzenle', 'Aktif et', 'Devre dışı bırak', 'Oturumları kapat', 'Erişimi kaldır']),
    ],
    topActions: ['Kullanıcı davet et', 'Rol oluştur', 'Yetki grubu', 'Giriş geçmişi'],
    stats: [
      { label: 'Aktif Kullanıcı', value: '7', hint: '1 davet bekliyor' },
      { label: 'Rol', value: '6', hint: 'Tanımlı' },
      { label: 'Aktif Oturum', value: '4', hint: 'Şu anda' },
      { label: 'Son Giriş', value: '2 dk', hint: 'Ömer Yiğitler' },
    ],
  },

  ayarlar: {
    title: 'Ayarlar',
    subtitle: 'İşletme, danışan, randevu, finans, bildirim, entegrasyon ve veri ayarları.',
    groups: [
      group('Genel', ['İşletme Bilgileri', 'Danışan Ayarları', 'Randevu Ayarları', 'Finans Ayarları']),
      group('İletişim', ['Bildirim Ayarları', 'E-posta Şablonları']),
      group('Sistem', ['Entegrasyonlar', 'KVKK ve Veri', 'Görünüm Ayarları']),
    ],
    sections: [
      section('İşletme Bilgileri', ['İşletme adı', 'Yetkili', 'Telefon', 'WhatsApp', 'E-posta', 'Adres', 'Logo', 'Favicon']),
      section('Danışan Ayarları', ['Varsayılan danışan durumu', 'Varsayılan ülke', 'İletişim tercihi', 'Çocuk danışanda veli zorunluluğu', 'Zorunlu alanlar']),
      section('Randevu Ayarları', ['Varsayılan süre', 'İlk görüşme süresi', 'Varsayılan hizmet', 'Görüşme türü', 'Fiyat', 'Hatırlatma zamanı', 'İptal kuralları']),
      section('Finans Ayarları', ['Para birimi', 'Ödeme yöntemleri', 'Varsayılan vade', 'Gecikmiş ödeme tanımı', 'Plan bitiş uyarısı', 'Kalan seans uyarısı', 'Makbuz numarası']),
      section('Bildirim Ayarları', ['Yeni randevu', 'İptal', 'Yeni talep', 'Geciken ödeme', 'Plan bitişi', 'PDF gönderim hatası', 'Bildirim alıcısı']),
      section('E-posta Şablonları', ['Randevu onayı', 'Hatırlatma', 'İptal', 'Ödeme hatırlatması', 'Plan bitişi', 'PDF gönderimi', 'Talep yanıtı']),
      section('Entegrasyonlar', ['Google giriş', 'Google Takvim', 'E-posta servisi', 'Dosya depolama', 'WhatsApp', 'Ödeme sistemi']),
      section('KVKK ve Veri', ['Açık rıza metni', 'İletişim izni', 'Pazarlama izni', 'Veri saklama süresi', 'Veri dışa aktarma', 'Anonimleştirme', 'Silme talepleri']),
    ],
    topActions: ['Kaydet', 'Değişiklikleri geri al', 'Bağlantıları test et'],
    stats: [
      { label: 'Entegrasyon', value: '5/6', hint: 'Aktif' },
      { label: 'Bildirim', value: 'Açık', hint: '7 olay türü' },
      { label: 'Veri Saklama', value: '10 yıl', hint: 'KVKK ayarı' },
      { label: 'Son Kayıt', value: 'Bugün', hint: '21:24' },
    ],
  },

  arsiv: {
    title: 'Arşiv',
    subtitle: 'Arşivlenen ve silinen kayıtlar ile ayrıntılı işlem geçmişi.',
    groups: [
      group('Arşivlenenler', ['Arşivlenen Danışanlar', 'Arşivlenen Randevular', 'Arşivlenen Planlar', 'Arşivlenen PDF’ler', 'Arşivlenen İçerikler']),
      group('Silinenler ve Geçmiş', ['Çöp Kutusu', 'İşlem Geçmişi']),
    ],
    sections: [
      section('Arşiv Detayı', ['Kayıt adı', 'Kayıt türü', 'Arşivlenme tarihi', 'Arşivleyen kullanıcı', 'Arşiv nedeni'], ['Geri yükle', 'Kalıcı sil']),
      section('Çöp Kutusu', ['Silinen kayıtlar', 'Silinme tarihi', 'Silen kullanıcı'], ['Geri yükleme', 'Kalıcı silme']),
      section('İşlem Geçmişi', ['Kullanıcı', 'İşlem türü', 'Değiştirilen kayıt', 'Önceki değer', 'Yeni değer', 'Tarih ve saat', 'IP veya oturum bilgisi — yalnızca gerekiyorsa']),
    ],
    topActions: ['Filtrele', 'Geri yükle', 'İşlem geçmişi', 'Dışa aktar'],
    stats: [
      { label: 'Arşiv Kayıtları', value: '38', hint: 'Tüm türler' },
      { label: 'Çöp Kutusu', value: '5', hint: '30 gün içinde' },
      { label: 'Bugünkü İşlem', value: '24', hint: 'Sistem geneli' },
      { label: 'Son Arşiv', value: '18:42', hint: 'Bugün' },
    ],
  },
};

export const getModuleConfig = (moduleId: string) => MODULE_CONFIGS[moduleId];

export const getDefaultModuleItemId = (moduleId: string) => {
  const config = MODULE_CONFIGS[moduleId];
  return config?.groups[0]?.items[0]?.id || '';
};

export const findModuleItem = (moduleId: string, itemId: string) => {
  const config = MODULE_CONFIGS[moduleId];
  if (!config) return undefined;
  return config.groups.flatMap((entry) => entry.items).find((item) => item.id === itemId);
};
