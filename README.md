# Berfin Akbaş Yönetim Paneli

Berfin Akbaş Dil ve Konuşma Terapisi hizmetleri için danışan, randevu, ödeme, plan, içerik ve yönetim işlemlerini tek arayüzde toplayan yönetim paneli.

## Yerel geliştirme

Gereksinimler: Node.js ve npm.

1. Bağımlılıkları kurun: `npm install`
2. Geliştirme sunucusunu başlatın: `npm run dev`
3. Uygulamayı `http://localhost:3000` adresinde açın.

## Komutlar

- `npm run dev` — geliştirme sunucusu
- `npm run build` — production derlemesi
- `npm run preview` — derlenmiş sürümü yerelde önizleme
- `npm run lint` — TypeScript kontrolü

## Ana projeyle bağlantı

Bu arayüz, `berfinakbas.com` reposunun production build sürecinde sabit bir commit SHA üzerinden alınır ve `/yonetim` altında yayınlanır. Kaynak commit değiştirildiğinde ana projedeki `scripts/build-dashboard-source.mjs` dosyasında bulunan commit SHA da güncellenmelidir.
