# PhysioVisit – Google Ads & SEO Rehberi

Bu klasör, **physiovisit.co.uk** için Google Ads reklamlarına gereken her şeyi içerir:
hazır reklam görselleri (masaüstü + mobil), logolar, tüm reklam metinleri, anahtar kelimeler,
negatif kelimeler, uzantılar (sitelink, callout vb.) ve bu rehber.

> **Okuma sırası:** Önce "1. Bölüm – SEO" (ücretsiz trafik ve reklamın kalitesini artırır), sonra
> "2–3. Bölüm – Hesap ve dönüşüm takibi" (bunlar yapılmadan reklam açmak para yakmaktır), sonra
> "4. Bölüm – Arama kampanyası". Görüntülü (banner) reklamlar en son, 6. Bölüm'de.

---

## İçindekiler

0. [Klasörde ne var?](#0-klasörde-ne-var)
1. [SEO – Google'da organik olarak öne çıkmak](#1-seo--googleda-organik-olarak-öne-çıkmak)
2. [Google Ads hesabını doğru açmak](#2-google-ads-hesabını-doğru-açmak)
3. [Dönüşüm takibi (en kritik adım)](#3-dönüşüm-takibi-en-kritik-adım)
4. [Arama (Search) kampanyası – adım adım](#4-arama-search-kampanyası--adım-adım)
5. [Reklam uzantıları / öğeler (assets)](#5-reklam-uzantıları--öğeler-assets)
6. [Görüntülü reklamlar – masaüstü ve mobil banner'lar](#6-görüntülü-reklamlar--masaüstü-ve-mobil-bannerlar)
7. [Bütçe, teklif ve beklentiler](#7-bütçe-teklif-ve-beklentiler)
8. [Yasal ve politika kuralları (UK sağlık reklamı)](#8-yasal-ve-politika-kuralları-uk-sağlık-reklamı)
9. [Optimizasyon rutini (günlük / haftalık / aylık)](#9-optimizasyon-rutini)
10. [Sık yapılan hatalar](#10-sık-yapılan-hatalar)
11. [Görselleri ve metinleri yeniden üretmek](#11-görselleri-ve-metinleri-yeniden-üretmek)
12. [Yayına almadan önce son kontrol listesi](#12-yayına-almadan-önce-son-kontrol-listesi)

---

## 0. Klasörde ne var?

```
google-ads/
├── README.md                     ← bu rehber
├── render.ps1                    ← tüm görselleri tek komutla yeniden üretir
├── photos/                       ← kaynak fotoğraflar (değiştirmek için buraya koy)
│   ├── living-room.jpg           (fizyoterapist + yaşlı hasta, oturma odası – yatay)
│   ├── hallway.jpg               (yürüteçle koridorda yürüme – kare)
│   ├── sit-to-stand.jpg          (oturup kalkma egzersizi – dikey)
│   ├── crutches.jpg              (sitedeki ana fotoğraf)
│   └── logo.png                  (PhysioVisit logosu)
├── templates/                    ← görselleri üreten HTML şablonlar
│   ├── banner.html               (yazılı banner reklamlar + site paylaşım görseli)
│   ├── photo.html                (yazısız temiz fotoğraf kırpımı)
│   └── logo.html                 (kare / yatay logo)
├── output/                       ← GOOGLE ADS'E YÜKLENECEK DOSYALAR
│   ├── responsive-display/       (duyarlı görüntülü reklam + PMax + arama reklamı görselleri)
│   ├── logos/                    (işletme logosu – kare ve yatay)
│   └── display-banners/
│       ├── desktop/              (masaüstü banner'lar – 9 boyut)
│       └── mobile/               (mobil banner'lar – 4 boyut)
└── ad-copy/                      ← TÜM REKLAM METİNLERİ
    ├── build.mjs                 (tek kaynak: metinleri burada düzenle)
    ├── ad-copy.md                (okunabilir hali – web arayüzüne kopyala-yapıştır için)
    ├── ads-rsa.csv               (7 reklam grubu × 15 başlık + 4 açıklama)
    ├── keywords.csv              (196 anahtar kelime)
    ├── negative-keywords.csv/.txt(56 negatif kelime)
    ├── sitelinks.csv             (6 site bağlantısı)
    ├── callouts.csv              (10 açıklama metni)
    ├── structured-snippets.csv   (hizmetler + bölgeler)
    └── locations.txt             (hedeflenecek 21 kasaba)
```

Ayrıca sitenin kendisine `public/og-image.jpg` eklendi: site WhatsApp, Facebook, LinkedIn'de
paylaşıldığında çıkan önizleme görseli.

### Reklam linki

Tüm reklamların hedef adresi: **https://www.physiovisit.co.uk** (www'lu, https'li hali – sitenin
"resmi" adresi budur, www'suz adres otomatik oraya yönlenir). Her hizmet reklam grubu kendi
hizmet sayfasına gider:

| Reklam grubu | Hedef sayfa (Final URL) |
|---|---|
| Home Physio - General | https://www.physiovisit.co.uk/ |
| Elderly Physio | https://www.physiovisit.co.uk/services/elderly-physiotherapy |
| Falls & Balance | https://www.physiovisit.co.uk/services/falls-prevention-physiotherapy |
| Neuro & Stroke | https://www.physiovisit.co.uk/services/neurological-physiotherapy |
| Post-Op Rehab | https://www.physiovisit.co.uk/services/post-operative-rehabilitation |
| Back & Joint Pain | https://www.physiovisit.co.uk/services/musculoskeletal-physiotherapy |
| Respiratory | https://www.physiovisit.co.uk/services/respiratory-physiotherapy |

---

## 1. SEO – Google'da organik olarak öne çıkmak

### 1.1 Sitede yapılanlar (kod tarafı – hazır)

- **Kritik hata düzeltildi:** Canlı sitede Google'a "asıl adresim `homephysio-pi.vercel.app`"
  deniyordu (canonical etiketleri, sitemap ve robots.txt yanlış adresi gösteriyordu). Bu,
  Google'ın physiovisit.co.uk'yi sıralamamasına yol açar. Artık her şey
  `https://www.physiovisit.co.uk`'yi gösteriyor ve vercel.app adresi kalıcı olarak (301/308)
  ana domaine yönleniyor.
- **6 ayrı hizmet sayfası** eklendi (`/services/...`). Her biri kendi başlığı, açıklaması,
  "neden evde?" bölümü, tedavi edilen durumlar, SSS ve iletişim butonlarıyla. Google artık
  "stroke physio at home Stockport" gibi aramalarda doğrudan ilgili sayfayı gösterebilir.
  Ayrıca reklamların **Kalite Puanı**'nı (Quality Score) yükseltir → tıklama başına daha az ödersin.
- **Yapılandırılmış veri (JSON-LD):** Google'a sayfanın bir fizyoterapi işletmesi olduğunu,
  hangi 21 kasabaya hizmet verdiğini, fizyoterapistin HCPC kaydını, fiyatları, SSS'leri ve
  sayfa hiyerarşisini (breadcrumb) makine diliyle anlatır. Arama sonuçlarında zengin görünüm sağlar.
- **Başlık ve açıklamalar** her sayfa için ayrı ve yerel anahtar kelimeli
  (ör. "Home Physiotherapy Manchester, Stockport & Cheshire | PhysioVisit").
- **Sitemap** (`/sitemap.xml`) tüm sayfaları listeliyor; **robots.txt** doğru.
- **Paylaşım görseli** (og-image) 1200×630 olarak eklendi.
- **Hız:** ana görsel öncelikli yükleniyor, gereksiz font kaldırıldı.
- **Gizlilik & çerez politikası** sayfası (`/privacy`) eklendi – hem UK GDPR hem Google Ads
  politikası için gerekli.

### 1.2 SENİN yapman gerekenler (SEO) – sırayla

1. **Vercel'de eski değişkeni sil**
   Vercel → Project (homephysio) → Settings → Environment Variables →
   `NEXT_PUBLIC_SITE_URL` satırını bul → `⋯` → **Delete**. (Artık kullanılmıyor; durması zararsız
   ama karışıklık yaratmasın.)

2. **Google Search Console'u kur** – https://search.google.com/search-console
   - "Add property" → **URL prefix** → `https://www.physiovisit.co.uk` yaz.
   - Doğrulama yöntemi olarak **HTML tag** seç. Sana
     `<meta name="google-site-verification" content="AbCdEf123..." />` gibi bir satır verir.
   - Sadece tırnak içindeki `content` değerini kopyala (`AbCdEf123...`).
   - Vercel → Settings → Environment Variables → **Add**:
     - Key: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
     - Value: kopyaladığın değer
     - Environments: Production (ve Preview) işaretli.
   - Vercel → Deployments → en üstteki → `⋯` → **Redeploy**. 1–2 dakika bekle.
   - Search Console'a dön → **Verify**.
   - Alternatif (daha da iyi): **Domain property** seçip DNS'e TXT kaydı eklemek – domain
     sağlayıcının (ör. 123-reg, GoDaddy, Cloudflare) DNS ayarlarından yapılır; www'lu/www'suz
     her şeyi kapsar.

3. **Sitemap'i gönder** – Search Console → Sitemaps → `sitemap.xml` yaz → Submit.
   Sonra **URL Inspection** ile ana sayfayı ve 6 hizmet sayfasını tek tek "Request indexing" yap.

4. **Google Business Profile (en önemli yerel SEO adımı)** – https://business.google.com
   "physio near me" gibi aramalarda çıkan **harita paketinde** (3'lü harita listesi) görünmenin
   tek yolu budur. Ev ziyareti yapan işletmeler için:
   - İşletme adı: **PhysioVisit** (sadece gerçek ticari adın; anahtar kelime ekleme – "PhysioVisit
     Home Physio Manchester" gibi isimler hesabın askıya alınmasına neden olur).
   - Kategori: birincil **Physiotherapist**; ikincil olarak "Physical therapy clinic" EKLEME
     (klinik değilsin). "Rehabilitation center" da ekleme.
   - "Do you want to add a location customers can visit?" → **No** (adres gizli kalır, ev ziyareti).
   - **Service areas:** 21 kasabayı ekle (liste: `ad-copy/locations.txt`). Google en fazla 20 alan
     kabul eder; ekleyemediğin en küçüğünü (ör. Partington) atla.
   - Telefon: 07466 012234, Web sitesi: https://www.physiovisit.co.uk
   - Hizmetler bölümüne 6 hizmeti ekle, açıklamalara sitedeki metinleri kullan.
   - **Gerçek fotoğraflar** yükle: kendi profesyonel portren, ekipmanın, araban (logo varsa) vb.
   - Doğrulama (genelde video ile) gerekir – telefonla kendini, ekipmanını ve iş belgeni çekersin.
   - Doğrulandıktan sonra Google Ads hesabına bağla (Bölüm 5.6).

5. **Yorum (review) topla** – Yerel sıralamada en güçlü etken. Her tedavi sonu hastaya GBP'deki
   "Ask for reviews" linkini WhatsApp'tan gönder. Hedef: ilk 3 ayda 10+ yorum. Yorumlara mutlaka
   cevap ver. (Yorum karşılığı indirim/hediye vermek yasaktır.)

6. **Yerel dizinler (citations)** – Aynı ad/telefon/site bilgisiyle kaydol:
   - CSP "Find a Physio" (Physio2u) – CSP üyesi olarak ücretsiz/indirimli olabilir
   - Physio First (özel muayenehane fizyoterapistleri derneği)
   - Bing Places (https://www.bingplaces.com – Google profilini tek tıkla içe aktarır)
   - Apple Business Connect (iPhone Haritalar için)
   - Yell.com, Thomson Local, Doctify, Top Doctors UK, Nextdoor
   Bilgilerin her yerde **birebir aynı** olması önemli ("PhysioVisit", "07466 012234").

7. **İçerik (opsiyonel ama güçlü)** – Zamanla şu tarz rehber yazıları eklemek organik trafiği
   çok artırır: "Knee replacement recovery timeline", "How to prevent falls at home",
   "Exercises after a stroke". İstediğinde blog bölümünü kurarım.

8. **2–4 hafta sonra kontrol:** Search Console → Pages → "Indexed" sayısı 8 civarında olmalı
   (ana sayfa + 6 hizmet + gizlilik). Performance → hangi aramalarda çıktığını gösterir; bu
   kelimeleri Google Ads'teki anahtar kelimelerle karşılaştır.

---

## 2. Google Ads hesabını doğru açmak

1. https://ads.google.com → **Start now** → işletme e-postanla (ör. contact@physiovisit.co.uk'yi
   yöneten Google hesabı) giriş yap.
2. Google seni "Smart campaign" (akıllı kampanya) sihirbazına sokmaya çalışır. **Sayfanın altındaki
   küçük "Switch to Expert Mode" linkine tıkla.** Akıllı kampanyalar kontrol vermez ve genelde
   alakasız tıklamalara para harcatır.
3. Sonra **"Create an account without a campaign"** (kampanya olmadan hesap oluştur) seç.
4. Hesap ayarları – **bunlar sonradan DEĞİŞTİRİLEMEZ:**
   - Billing country: **United Kingdom**
   - Time zone: **(GMT+00:00) London**
   - Currency: **British Pound (GBP £)**
5. **Faturalama:** Tools (🔧) → Billing → Settings → kart ekle. Ödeme profili "Business" olsun,
   işletme adı: Ismail Aram Physiotherapy (veya şirketinin yasal adı).
6. **Reklamveren doğrulaması (Advertiser verification):** Google birkaç gün/hafta içinde e-posta
   ile isteyecek. Kimlik ve (varsa) şirket belgeleriyle 30 gün içinde tamamla, yoksa reklamlar durur.
7. **Otomatik önerileri KAPAT:** Recommendations → **Auto-apply** → tüm kutucukların işaretini
   kaldır. (Aksi halde Google kendi kendine geniş eşleme açar, bütçeyi artırır vb.)
8. **Otomatik oluşturulan öğeleri kapat:** kampanya kurulurken / Campaign settings →
   "Automatically created assets" → Off. Sağlık reklamında Google'ın uydurduğu metinler riskli.

---

## 3. Dönüşüm takibi (en kritik adım)

Dönüşüm = reklama tıklayan birinin **seni araması, WhatsApp'tan yazması, SMS/e-posta atması
veya formu göndermesi.** Bunu ölçmezsen hangi kelimenin hasta getirdiğini asla bilemezsin ve
Google'ın akıllı teklif sistemi çalışamaz.

Site hazır: telefon / WhatsApp / SMS / e-posta linklerine tıklama ve form gönderimi otomatik
yakalanıyor. Senin yapacağın sadece Google'dan ID'leri alıp Vercel'e yapıştırmak.

### 3.1 Dönüşüm işlemlerini oluştur

Google Ads → **Goals (Hedefler) → Conversions → Summary → + New conversion action → Website**
→ domain olarak `https://www.physiovisit.co.uk` yaz → Scan → **"Add a conversion action manually"**
(Manuel ekle). Aşağıdaki 5 işlemi tek tek oluştur:

| # | Conversion name | Goal category | Value | Count | Primary/Secondary | Vercel değişkeni |
|---|---|---|---|---|---|---|
| 1 | Form submitted | Submit lead form | £60 (aynı değer) | **One** | Primary | `NEXT_PUBLIC_GADS_LABEL_FORM` |
| 2 | WhatsApp click | Contact | £40 | **One** | Primary | `NEXT_PUBLIC_GADS_LABEL_WHATSAPP` |
| 3 | Phone click | Phone call lead | £40 | **One** | Primary | `NEXT_PUBLIC_GADS_LABEL_CALL` |
| 4 | SMS click | Contact | £20 | One | Secondary | `NEXT_PUBLIC_GADS_LABEL_SMS` |
| 5 | Email click | Contact | £20 | One | Secondary | `NEXT_PUBLIC_GADS_LABEL_EMAIL` |

Her biri için:
- **Value:** "Use the same value for each conversion" → yukarıdaki tutar. (Değerler tahmini
  "potansiyel hasta" değeridir; bir hastanın ortalama değeri: £100 değerlendirme + ~5×£90 = ~£550.
  Her temasın hastaya dönüşme ihtimali hesaba katılarak düşük tutuldu.)
- **Count:** **One** (aynı kişi 3 kez tıklarsa 1 sayılır).
- **Click-through conversion window:** 30 days. **Engaged-view:** 3 days. **View-through:** 1 day.
- **Attribution:** Data-driven.
- Kaydettikten sonra **"Use Google tag manually"** / "Install the tag yourself" bölümünü aç.
  Orada şöyle bir kod görürsün:
  ```
  gtag('event', 'conversion', {'send_to': 'AW-123456789/AbC-dEfGhIjKl'});
  ```
  - `AW-123456789` → **Google Ads ID** (5 işlemde de aynı)
  - `/`'den sonraki `AbC-dEfGhIjKl` → o işlemin **etiketi (label)** – her işlemde farklı.
  - Siteye kod YAPIŞTIRMA – site zaten hazır. Sadece bu değerleri not al.

> **Not:** "Phone click" dışında, reklamdaki telefon numarasına doğrudan basılan aramalar için
> Google ayrıca **"Calls from ads"** dönüşümünü otomatik oluşturur (Bölüm 5.4'te açıyoruz).
> Süresini **60 saniye** yap (Goals → Conversions → Calls from ads → Edit → Call length 60s).

### 3.2 Değerleri Vercel'e gir

Vercel → homephysio → Settings → Environment Variables → her biri için **Add**:

| Key | Value (örnek) |
|---|---|
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `AW-123456789` |
| `NEXT_PUBLIC_GADS_LABEL_FORM` | form işleminin etiketi |
| `NEXT_PUBLIC_GADS_LABEL_WHATSAPP` | WhatsApp işleminin etiketi |
| `NEXT_PUBLIC_GADS_LABEL_CALL` | telefon işleminin etiketi |
| `NEXT_PUBLIC_GADS_LABEL_SMS` | SMS işleminin etiketi |
| `NEXT_PUBLIC_GADS_LABEL_EMAIL` | e-posta işleminin etiketi |

Hepsini **Production** ortamına ekle → Deployments → **Redeploy** (değişkenler sadece yeni
derlemede devreye girer).

### 3.3 Çerez onayı (Consent Mode v2) – otomatik

`NEXT_PUBLIC_GOOGLE_ADS_ID` girildiği anda sitede alt kısımda **çerez onay bandı** çıkmaya başlar
("Accept" / "Decline"). UK yasası (PECR) reklam çerezlerinden önce onay ister. Site Google'ın
**Consent Mode v2** sistemini kullanıyor:
- Ziyaretçi kabul ederse → tam ölçüm.
- Reddederse → çerez yazılmaz, Google sadece anonim "ping" alır ve dönüşümleri modelleyerek
  tahmin eder. Yani reddedenler yüzünden veri tamamen kaybolmaz.
- Google Ads → Goals → Conversions → Summary sayfasında "Consent mode" durumunun **Active**
  görünmesi 1–2 hafta sürebilir.

### 3.4 Test et

1. Chrome'a **Google Tag Assistant** eklentisini kur veya https://tagassistant.google.com aç →
   `https://www.physiovisit.co.uk` bağla.
2. Çerez bandında **Accept**'e bas.
3. WhatsApp butonuna, telefon numarasına tıkla, test formu gönder.
4. Tag Assistant'ta her tıklamada `conversion` olayı ve doğru `send_to` görünmeli.
5. Google Ads'te dönüşüm durumu 24–48 saat içinde "Unverified" → "Recording conversions" olur.

---

## 4. Arama (Search) kampanyası – adım adım

**Neden Search ile başlıyoruz?** Biri "home physio Stockport" yazdığında o an fizyoterapist arıyor
demektir – en yüksek niyet, en hızlı geri dönüş. Banner (Display) reklamlar ise bilinirlik içindir;
bütçe kısıtlıysa ikinci aşama.

### 4.1 Kampanyayı oluştur

Campaigns → **+ New campaign** →
- Objective: **Leads** (Potansiyel müşteriler) → Conversion goals: sadece Bölüm 3'teki Primary
  hedefler (Submit lead form, Contact, Phone call lead) seçili kalsın.
- Campaign type: **Search**
- "Ways to reach your goal": **Website visits** ✔ ve **Phone calls** ✔ → numara: +44 7466 012234.
- Campaign name: `Search - Home Physio - Manchester & Cheshire` (CSV dosyalarındaki adla aynı olmalı).

### 4.2 Ayarlar (Settings) – tek tek

| Ayar | Değer | Neden |
|---|---|---|
| **Networks → Search partners** | ✘ KAPAT | Düşük kaliteli sitelerde görünür |
| **Networks → Display Network** | ✘ KAPAT | Search kampanyası içinde banner = para israfı |
| **Locations** | 21 kasaba (aşağıda) | |
| **Location options → Include** | **Presence: People in or regularly in your included locations** | Varsayılan "interest" seçeneği Londra'dan, yurtdışından tıklamaları da alır. MUTLAKA değiştir. |
| **Location options → Exclude** | Presence: People in your excluded locations | |
| **Languages** | English | |
| **Audience segments** | Hiçbir şey ekleme / "Observation" | Sağlık kategorisinde kişiselleştirilmiş hedefleme kısıtlı |
| **Broad match keywords** | **Off** | İlk aylar kontrol bizde olsun |
| **AI Max for Search** (varsa) | **Off** | Google'ın kelimeleri kendisi genişletmesini kapatır |
| **Automatically created assets** | Off | |
| **Ad rotation** | Optimise | |
| **Start / end date** | Başlangıç: bugün, bitiş: yok | |
| **Ad schedule** | Bölüm 4.3 | |
| **Final URL expansion** | Off (görünüyorsa) | Google'ın gizlilik sayfasına vb. trafik göndermesini engeller |

**Konum hedefleme (Locations):**
"Advanced search" → **Bulk locations** → `ad-copy/locations.txt` içindekileri yapıştır →
Search → **Target all**. 21 kasabanın her biri ayrı eklenecek (Manchester, Stockport, Altrincham,
Wilmslow, Macclesfield...). Biddulph, Congleton, Sandbach sınır bölgeler; Google bazen sadece
ilçe olarak bulur, bulduğunu ekle.

Alternatif (daha basit): **Radius** → "Stockport, UK" merkezli **20 mil** yarıçap. Bu, Liverpool'a
kadar uzanmadan tüm hizmet alanını kapsar; ama Bolton/Oldham gibi gitmediğin yerleri de içerir.
Kasaba listesi daha hassastır – önerim kasaba listesi.

Konumları ekledikten sonra kampanyada **Locations → "Bid adjustment"** sütununda ileride en çok
hasta gelen kasabalara +%10–20 verebilirsin (ilk ay dokunma).

### 4.3 Reklam saatleri (Ad schedule)

Telefonu açabildiğin saatlerde reklam göstermek, cevapsız aramaya para ödememek demek.
- Başlangıç önerisi: **Her gün 07:00 – 21:00.**
- Gece WhatsApp mesajı da değerlidir; ilk ay 24 saat açık bırakıp ardından
  Campaigns → **Ad schedule → Day & time** raporuna bakarak dönüşüm gelmeyen saatleri kısabilirsin.
- Hasta yakınları (ör. yaşlı ebeveyni için arayan 40–60 yaş çocuklar) genelde akşam 19–22 ve hafta
  sonu arar – bu saatleri kapatma.

### 4.4 Cihazlar (masaüstü – mobil – tablet)

- **Hiçbir cihazı kapatma.** UK'de bu tür aramaların ~%65–75'i mobilden gelir.
- Mobilde reklam: başlık + telefon butonu + sitelink'ler; tıklayan kişi direkt WhatsApp/Call
  butonuna ulaşır (site mobil uyumlu, butonlar ilk ekranda).
- Masaüstünde: hasta yakınları genelde masaüstünden araştırıp form doldurur.
- 30 gün sonra Campaigns → **Devices** raporuna bak; bir cihazın dönüşüm maliyeti diğerlerinin 2
  katıysa o cihaza −%20 teklif ayarı ver.

### 4.5 Bütçe ve teklif (Bidding)

- **Günlük bütçe:** £15 (≈ £455/ay). Minimum anlamlı rakam £10/gün.
- **Teklif stratejisi – 1. aşama (ilk 2–4 hafta):** **Maximise clicks** +
  **Maximum CPC bid limit: £3.00**. Amaç: veri toplamak.
- **2. aşama (en az 15–30 dönüşüm olunca):** **Maximise conversions** (hedef CPA girmeden).
- **3. aşama (50+ dönüşüm / ay):** Maximise conversions + **Target CPA** (gerçekleşen ortalamanın
  %10–20 üstüyle başla, kademeli düşür).
- Stratejiyi değiştirdikten sonra **en az 2 hafta dokunma** (öğrenme dönemi).

### 4.6 Reklam grupları ve anahtar kelimeler

7 reklam grubu var (tablo Bölüm 0'da). Her grubun kendi kelimeleri, kendi reklamı ve kendi
hedef sayfası var – bu, Kalite Puanı'nı yükseltir.

**Eşleme türleri (Match types):**
- `"home physio"` → **Phrase (sıralı eşleme):** "home physio in sale", "best home physio near me"
  gibi anlamı içeren aramalar.
- `[home physio]` → **Exact (tam eşleme):** sadece bu arama ve çok yakın varyasyonları.
- Broad (geniş eşleme) kullanmıyoruz – ilk ay alakasız aramaları önlemek için.

**Yöntem A – Web arayüzünden (kolay):**
1. Kampanya kurulumunda "Ad group name"e `Home Physio - General` yaz.
2. `ad-copy/ad-copy.md` dosyasını aç → o grubun kelimelerini al → her birini hem `"tırnaklı"` hem
   `[köşeli parantezli]` olarak alt alta yapıştır.
3. Aynı sayfada reklamı oluştur (Bölüm 4.7). Sonra "+ New ad group" ile diğer 6 grubu ekle.

**Yöntem B – Google Ads Editor ile (hızlı, önerilen):**
1. https://ads.google.com/editor → indir, kur, hesabına giriş yap → hesabı indir (Get recent changes).
2. Önce boş kampanyayı web arayüzünde yukarıdaki ayarlarla oluştur (veya Editor'da) – adı
   **tam olarak** `Search - Home Physio - Manchester & Cheshire` olmalı.
3. Editor → **Account → Import → From file** → sırayla:
   `ads-rsa.csv`, `keywords.csv`, `negative-keywords.csv`, `sitelinks.csv`, `callouts.csv`,
   `structured-snippets.csv`.
4. Her importta Editor bir önizleme gösterir → **Process** → **Finish and review changes** → **Keep**.
5. Sağ üstte **Post** → değişiklikler hesaba yüklenir.
6. Sütun eşleştirmede hata çıkarsa (Editor sürümüne göre başlık adları değişebilir), Editor'un
   sorduğu eşleştirme ekranında sütunu elle seç.

### 4.7 Reklam metinleri (Responsive Search Ads)

Her reklam grubunda **1 duyarlı arama reklamı** var: **15 başlık (max 30 karakter)** +
**4 açıklama (max 90 karakter)**. Google bunları karıştırıp en iyi kombinasyonu bulur.
Tamamı `ad-copy/ad-copy.md`'de, karakter sayılarıyla birlikte.

Örnek (General grubu):
- Başlıklar: *Home Physiotherapy Manchester · Physio Visits in Your Home · Chartered
  Physiotherapist · HCPC Registered Physio · No GP Referral Needed · Reply Within 24 Hours ·
  Initial Assessment £100 ...*
- Açıklamalar: *Chartered, HCPC registered physiotherapist visiting you at home in Manchester &
  Cheshire. · No travel, no waiting room. One-to-one treatment and a plan built around your own home.*
- Görünen URL: `physiovisit.co.uk/home-physio/manchester`

Kurallar:
- **Başlık sabitleme (pin) yapma** – Ad strength düşer. İstisna: yasal bir zorunluluk olursa.
- "Ad strength" **Good** veya **Excellent** olmalı. Hepsi hazır metinlerle Good+ çıkması beklenir.
- 2. ayda her gruba **ikinci bir reklam** eklemek yerine düşük performanslı başlıkları değiştir
  (Ads → reklam → "View asset details" → "Performance: Low" olanlar).

### 4.8 Negatif anahtar kelimeler

`negative-keywords.txt` içindeki 56 kelime (job, course, nhs, free, dog, equine, paediatric...)
reklamın alakasız aramalarda çıkmasını engeller.
- Tools → **Shared library → Negative keyword lists → +** → adı "PhysioVisit negatives" →
  dosyadaki satırları yapıştır → Save → **Apply to campaigns** → kampanyayı seç.
- **NHS** negatif: NHS fizyoterapisi arayan çoğu kişi ücretsiz hizmet arıyor. Ama "nhs waiting
  list physio" gibi aramalar özel hastaya dönüşebilir; ilk ay arama terimleri raporuna bakıp
  karar ver.
- **paediatric / child / kids:** sitede çocuk fizyoterapisi yok. Eklersen bunları kaldır.
- **pelvic floor / pregnancy:** kadın sağlığı hizmeti yoksa negatif kalsın.

---

## 5. Reklam uzantıları / öğeler (assets)

Öğeler reklamını büyütür (daha fazla ekran alanı = daha fazla tıklama) ve ücretsizdir
(sadece tıklamaya ödeme yaparsın). Kampanya düzeyinde ekle: Campaign → **Assets → + Asset**.

### 5.1 Sitelinks (Site bağlantıları) – `sitelinks.csv`

| Text (≤25) | Açıklama 1 (≤35) | Açıklama 2 (≤35) | URL |
|---|---|---|---|
| Home Physio for Elderly | Frailty, mobility & discharge | Gentle, one-to-one home visits | /services/elderly-physiotherapy |
| Stroke & Neuro Rehab | Stroke, Parkinson's, MS & more | Practise skills in your own home | /services/neurological-physiotherapy |
| Falls & Balance | Balance & strength programmes | Advice on home trip hazards | /services/falls-prevention-physiotherapy |
| Rehab After Surgery | Hip, knee, spine & shoulder | Start soon after you get home | /services/post-operative-rehabilitation |
| Back, Neck & Joint Pain | Hands-on treatment at home | Exercise plan for your space | /services/musculoskeletal-physiotherapy |
| Breathing & COPD Rehab | COPD & breathlessness support | Breathing control at home | /services/respiratory-physiotherapy |

(URL'lerin başına `https://www.physiovisit.co.uk` eklenir – CSV'de tam hali var.)

### 5.2 Callouts (Açıklama metinleri) – `callouts.csv`

HCPC Registered · Chartered Physiotherapist · No GP Referral Needed · Fully Insured ·
Enhanced DBS Checked · Reply Within 24 Hours · One-to-One Home Visits · Same Physio Every Visit ·
Personal Exercise Plans · Member of the CSP

### 5.3 Structured snippets (Yapılandırılmış snippet'ler)

- Header **Services:** Stroke Rehab, Elderly Physio, Falls Prevention, Post-Op Rehab,
  Back & Joint Pain, Respiratory Physio
- Header **Neighbourhoods:** Stockport, Altrincham, Sale, Wilmslow, Macclesfield, Knutsford,
  Cheadle, Poynton, Northwich, Congleton

### 5.4 Call asset (Arama öğesi) – mobilde "Ara" butonu

+ Asset → **Call** → Country: United Kingdom → Phone: **07466 012234** →
- **Call reporting: On** (Google yönlendirme numarası kullanır ve aramaları sayar)
- Conversion action: **Calls from ads** (60 saniye)
- **Asset schedule:** sadece telefonu açabildiğin saatler (ör. her gün 08:00–20:00).
  Bu saatler dışında reklam yine görünür, sadece Ara butonu gizlenir.

### 5.5 Image assets (Arama reklamına görsel)

Arama reklamlarının yanında küçük görsel gösterilebilir (hesap 60+ gün aktif olduktan ve
politika geçmişi temiz olduktan sonra açılabilir):
+ Asset → **Image** → yükle:
- `output/responsive-display/square-1200x1200-sit-to-stand.jpg`
- `output/responsive-display/square-1200x1200-hallway.jpg`
- `output/responsive-display/landscape-1200x628-living-room.jpg`

### 5.6 Business name & logo

+ Asset → **Business name:** `PhysioVisit` · **Business logo:** `output/logos/logo-square-400x400.png`
(Google bunları doğrular; birkaç gün sürebilir.)

### 5.7 Location asset

Google Business Profile doğrulandıktan sonra: Tools → **Data manager → Google Business Profile →
Link**. Böylece reklamda yorum yıldızların ve hizmet bölgen görünebilir.

### 5.8 Price asset (opsiyonel)

En az **3 kalem** gerekir. Şu an 2 fiyatın var (Assessment £100, Session £90). Bir paket
oluşturursan (ör. "6-Session Package") ekleyebilirsin: Type: Services, Price qualifier: From,
Unit: Per session.

---

## 6. Görüntülü reklamlar – masaüstü ve mobil banner'lar

> **Ne zaman?** Arama kampanyası en az 1 ay çalışıp dönüşüm getirdikten sonra, ayrı bir bütçeyle
> (£5–10/gün). Banner reklamlar ucuz gösterim sağlar ama tıklayanların niyeti düşüktür.

### 6.1 Hazır görseller – hangisi nereye?

**A) Duyarlı görüntülü reklam / Performance Max / Demand Gen** – `output/responsive-display/`
Google bu fotoğrafları, logoyu ve metinleri birleştirip her sitede, her ekranda **otomatik** uygun
boyutta reklam üretir (masaüstü, mobil, uygulama, Gmail, YouTube). Görsellerde yazı YOK – Google
yazılı görselleri sevmez ve kendi metnini ekler.

| Dosya | Oran | Google'daki alanı |
|---|---|---|
| `landscape-1200x628-*.jpg` (3 adet) | 1.91:1 | Landscape image (zorunlu) |
| `square-1200x1200-*.jpg` (3 adet) | 1:1 | Square image (zorunlu) |
| `portrait-960x1200-*.jpg` (2 adet) | 4:5 | Portrait image (önerilen – mobil akışlarda büyük görünür) |
| `logos/logo-square-400x400.png` | 1:1 | Square logo (zorunlu) |
| `logos/logo-landscape-1200x300.png` | 4:1 | Landscape logo (opsiyonel) |

**B) Yüklenen görüntülü reklamlar (Uploaded image ads)** – `output/display-banners/`
Hazır tasarlanmış, üzerinde yazı + buton olan banner'lar. Tasarım tam kontrolündedir ama
her site/ekran için ayrı boyut gerekir. Hepsi **150 KB altında** ve açık arka planlı olduğu
için Google kuralı gereği **ince gri çerçeveli**.

| Klasör | Dosya | Boyut | Nerede görünür |
|---|---|---|---|
| desktop | `leaderboard-728x90.jpg` | 728×90 | Sayfa üstü yatay şerit |
| desktop | `large-leaderboard-970x90.jpg` | 970×90 | Geniş ekran üst şerit |
| desktop | `billboard-970x250.jpg` | 970×250 | Haber siteleri üst büyük alan |
| desktop | `banner-468x60.jpg` | 468×60 | Eski tip yatay banner |
| desktop | `half-page-300x600.jpg` | 300×600 | Yan sütun büyük – en yüksek tıklama oranlılardan |
| desktop | `wide-skyscraper-160x600.jpg` | 160×600 | Dar yan sütun |
| desktop | `large-rectangle-336x280.jpg` | 336×280 | Makale içi |
| desktop | `medium-rectangle-300x250.jpg` | 300×250 | **En çok kullanılan boyut** (masaüstü + mobil) |
| desktop | `square-250x250.jpg` | 250×250 | Küçük kare |
| mobile | `mobile-leaderboard-320x50.jpg` | 320×50 | Mobil sayfa alt/üst şerit – **en yaygın mobil boyut** |
| mobile | `large-mobile-banner-320x100.jpg` | 320×100 | Mobil büyük şerit |
| mobile | `medium-rectangle-300x250.jpg` | 300×250 | Mobil makale içi |
| mobile | `interstitial-320x480.jpg` | 320×480 | Mobil tam ekran / uygulama arası |

Masaüstü ve mobil banner'lar aynı kampanyaya yüklenir; Google her cihaz için uygun boyutu
otomatik seçer. 300×250 hem masaüstü hem mobil klasöründe (aynı dosya, kolaylık için).

### 6.2 Önemli uyarı – fotoğraflar hakkında

- `living-room.jpg`, `hallway.jpg`, `sit-to-stand.jpg` **yapay zekâ ile üretilmiş temsili
  görsellerdir.** İçlerindeki kişiler gerçek değildir ve **sen değilsin**.
  - Reklamda bunları "Ismail Aram" diye sunma; temsili görsel olarak kullanmak serbest.
  - **En iyi sonuç gerçek fotoğrafla gelir:** kendi profesyonel çekimini (ev ortamında, üniforma
    ile, izin veren bir hastayla ya da bir arkadaşla canlandırma) `photos/` klasörüne aynı dosya
    adlarıyla koy ve `render.ps1`'i çalıştır – tüm reklamlar yeni fotoğraflarla yeniden üretilir.
  - Gerçek hasta fotoğrafı kullanacaksan **yazılı izin** al (UK GDPR – sağlık verisi sayılır).
- **Logo:** elimizdeki logo dosyası 256 px olduğu için kare logo 400×400 üretildi (Google minimum
  128, önerilen 1200). Logonun tasarımcısından **vektör (SVG/AI/PDF)** halini iste; o zaman
  1200×1200 üretirim.

### 6.3 Kampanya kurulumu – Display (veya Demand Gen)

Campaigns → + New → Objective: **Leads** → Type: **Display** → URL: `https://www.physiovisit.co.uk`
- Name: `Display - Home Physio - Manchester & Cheshire`
- Locations: Arama kampanyasıyla **aynı** (Presence seçeneği!)
- Bütçe: £5–7/gün · Bidding: **Maximise conversions** (veya ilk hafta Maximise clicks, CPC limit £1)
- **Targeting:** Optimized targeting **Off** (başta). Sağlık kategorisinde ilgi alanı/yeniden
  pazarlama kısıtlı olduğu için **içerik hedeflemesi** kullan:
  - **Topics:** Health → Health Conditions, Ageing & Geriatrics; Family & Relationships → Caregiving.
  - **Content keywords:** stroke recovery, knee replacement, elderly care, falls prevention,
    caring for elderly parents.
- **Content exclusions (ÇOK ÖNEMLİ):** Campaign settings → Content exclusions →
  Sensitive content: Tragedy & conflict, Sensitive social issues, Sexually suggestive, Profanity.
  Inventory type: **Limited**. Content type: **Parked domains**, **Embedded videos** hariç.
- **Mobil uygulama israfını engelle:** Placements → Exclusions → "Apps" → `mobileappsandgames`
  (Google ayarlarında "Mobile app categories – All apps" hariç tutarak). Oyun uygulamalarındaki
  yanlışlıkla tıklamalar bütçenin yarısını yiyebilir.
- **Frequency cap** (varsa): kişi başı günde 3 gösterim.
- **Ads:**
  1. **Responsive display ad** → `responsive-display/` + `logos/` dosyalarını yükle →
     - Headlines (≤30): *Physiotherapy at Home* · *Home Physio Manchester* · *Chartered Home Physio* ·
       *No GP Referral Needed* · *Stockport & Cheshire Visits*
     - Long headline (≤90): *Chartered physiotherapist visiting you at home across Manchester, Stockport & Cheshire*
     - Descriptions (≤90): *HCPC registered, fully insured. Stroke, elderly, falls, post-op and pain rehab at home.* ·
       *No travel, no waiting room. Initial assessment £100. We reply within 24 hours.*
     - Business name: *PhysioVisit* · Call to action: **Book now** veya **Contact us**.
  2. **Upload display ads** → `display-banners/desktop/` + `mobile/` içindeki 13 dosyayı seç →
     Final URL: `https://www.physiovisit.co.uk`.
     (Yeni hesaplarda bu seçenek bir süre kapalı olabilir; o durumda sadece 1. seçenekle devam et.)

### 6.4 Performance Max (ileri seviye – 3. ay sonrası)

PMax, Search + Display + YouTube + Maps + Gmail'i tek kampanyada birleştirir. Yeterli dönüşüm
verisi (ayda 30+) olunca dene. Aynı `responsive-display/` + `logos/` dosyaları ve yukarıdaki
metinler kullanılır. Search kampanyasını **kapatma** – PMax yanında çalışsın, marka/ana kelimeler
Search'te kalsın.

---

## 7. Bütçe, teklif ve beklentiler

**Tahmini rakamlar** (Manchester/Cheshire, özel fizyoterapi; gerçek değerler değişir):

| Metrik | Tahmini aralık |
|---|---|
| Tıklama başı maliyet (CPC) | £1.50 – £4.00 |
| Tıklama oranı (CTR) – Search | %4 – %9 |
| Dönüşüm oranı (tıklama → temas) | %6 – %15 |
| £15/gün ile aylık tıklama | ~130 – 250 |
| Aylık temas (arama/WhatsApp/form) | ~10 – 30 |
| Temastan hastaya dönüşüm | %30 – %60 |

**Kârlılık hesabı:** Bir hasta ≈ £100 + 5 seans × £90 ≈ **£550**. Bir hasta için reklama £80–£120
harcamak bile oldukça kârlıdır. Yani **temas başı maliyet (CPA) hedefi: £25–£50.**

**İlk 30 gün beklentisi:** Öğrenme dönemi; maliyetler yüksek, dönüşüm az olabilir. Panik yapıp
her gün ayar değiştirme – en sık yapılan hata budur.

---

## 8. Yasal ve politika kuralları (UK sağlık reklamı)

1. **Google sağlık politikası:** Fizyoterapi kısıtlı kategori değildir; özel sertifika gerekmez.
   Ancak **kişiselleştirilmiş reklam politikası** gereği sağlık durumuna göre yeniden pazarlama
   (remarketing) listesi oluşturamazsın ("knee replacement sayfasını ziyaret edenler" gibi).
   Bu yüzden rehberde hiç remarketing listesi kullanmadık.
2. **ASA / CAP Code (UK reklam kuralları):**
   - "Cure", "guaranteed results", "pain-free in 3 sessions", "best physio in Manchester" gibi
     kanıtlanamayan iddialar YASAK. Hazır metinlerde hiçbiri yok – metinleri değiştirirken buna dikkat et.
   - Hasta yorumu kullanırsan gerçek ve izinli olmalı; tedavi sonucu vaadi içermemeli.
   - Fiyat yazıyorsan güncel olmalı (sitede £100/£90 – değişirse reklam metnini de değiştir).
3. **HCPC Standards of conduct:** Reklam doğru, yanıltıcı olmayan bilgi içermeli. HCPC numarası
   (PH134486) sitede doğrulanabilir linkle mevcut.
4. **CSP logosu:** CSP, kurumsal logosunun kullanımına kurallar koyar; üyelere özel bir "member"
   logosu sunar. Sitedeki logoyu CSP üye portalındaki (csp.org.uk → Membership → member logo)
   resmi üye logosuyla değiştirmeni öneririm. Reklam banner'larında CSP logosu **kullanılmadı**.
5. **ICO kaydı:** Sağlık verisi işleyen her serbest çalışan, ICO'ya "data protection fee" ödemekle
   yükümlü (https://ico.org.uk/for-organisations/data-protection-fee/ – mikro işletme için yıllık
   düşük bir ücret). Kayıt yoksa yap; gizlilik sayfasına kayıt numaranı eklerim.
6. **Çerezler (PECR):** Çerez bandı Ads ID girilince otomatik çıkar; kaldırma.
7. **Telefon numarası:** Reklamda gösterilen numara açık ve aranabilir olmalı; sürekli
   cevapsız kalırsa Google "unreachable" diye uzantıyı kapatabilir.

---

## 9. Optimizasyon rutini

### İlk 2 hafta – her gün 5 dakika
- Campaigns → **Insights and reports → Search terms**: Alakasız aramaları (ör. "physio jobs
  manchester", "physio course") seç → **Add as negative keyword** (kampanya düzeyi).
- Reklamlar "Approved" mı? "Disapproved/Limited" ise sebebi oku (genelde bir kelime değiştirmek yeter).
- Telefonuna gelen aramalar/WhatsApp'lar Google Ads'te dönüşüm olarak görünüyor mu?

### Haftalık (pazartesi, 20 dakika)
- Search terms raporu → negatif ekle; iyi dönüşen yeni aramaları **exact** kelime olarak ekle.
- Keywords → **Quality Score** sütununu aç (Columns → Quality Score). 5'in altındakiler için:
  reklam metninde o kelime geçiyor mu, doğru sayfaya mı gidiyor?
- Dönüşümsüz ve £30+ harcamış kelimeleri **duraklat** (Pause).
- Hangi kasabadan dönüşüm geliyor? (Locations raporu – "User location").
- Bütçe kısıtlı mı ("Limited by budget")? Dönüşüm maliyeti iyi ise bütçeyi %20 artır
  (bir seferde %20'den fazla artırma – öğrenme dönemi sıfırlanır).

### Aylık
- Teklif stratejisi aşaması (Bölüm 4.5) değişmeli mi?
- Ads → Assets → "Low" performanslı başlıkları yenileriyle değiştir (`build.mjs`'de düzenle).
- Devices / Ad schedule raporları → teklif ayarları.
- Gerçek hasta sayısını kendi kaydınla karşılaştır: Google'ın saydığı temasların kaçı hasta oldu?
- Search Console'da organik trafik, GBP'de arama/çağrı sayıları.
- Rakip analizi: Campaigns → Auction insights.

---

## 10. Sık yapılan hatalar

1. **Konum seçeneğini "Presence or interest" bırakmak** → Londra, Hindistan, ABD'den tıklama.
2. **Search partners / Display Network'ü Search kampanyasında açık bırakmak.**
3. **Dönüşüm takibi olmadan "Maximise conversions" kullanmak** → Google kör uçar.
4. **Auto-apply recommendations açık bırakmak** → Google bütçeyi/kelimeleri kendi değiştirir.
5. **Broad match ile başlamak** → "physio" aramalarının hepsi, alakasız binlerce tıklama.
6. **Her gün ayar değiştirmek** → öğrenme dönemi hiç bitmez.
7. **Herkesi ana sayfaya göndermek** → hizmet sayfaları bu yüzden var.
8. **Telefonu açamadığın saatlerde Call asset'i göstermek.**
9. **Google rep (temsilci) önerilerini sorgusuz uygulamak** – çoğu bütçeyi artırmaya yöneliktir.
10. **Görsel reklamı Search'ten önce açmak** – küçük bütçede Search her zaman önce gelir.

---

## 11. Görselleri ve metinleri yeniden üretmek

### Görseller (`render.ps1`)
Fotoğraf değiştirmek, banner yazısını değiştirmek veya yeni boyut eklemek için:

1. Yeni fotoğrafı `photos/` klasörüne **aynı adla** koy (ör. kendi fotoğrafını `living-room.jpg`
   olarak). Ya da `templates/banner.html` içindeki `HEAD`, `SUB`, `CTA` metinlerini değiştir.
2. Cursor'da terminal aç ve çalıştır:
   ```
   cd google-ads
   powershell -ExecutionPolicy Bypass -File .\render.ps1
   ```
3. ~40 saniyede `output/` klasöründeki 23 dosya + `public/og-image.jpg` yeniden üretilir.
   Banner'lar 150 KB'ı aşarsa betik kaliteyi otomatik düşürür.
4. Microsoft Edge ve internet bağlantısı gerekir (font Google Fonts'tan yükleniyor).

Fotoğrafın odak noktası kötü kırpılıyorsa `render.ps1` içindeki ilgili satırda `pos=` değerini
değiştir (ör. `pos=50% 30%` → yatayda ortala, dikeyde üstten %30).

### Metinler (`ad-copy/build.mjs`)
1. `build.mjs` içinde başlık/açıklama/kelimeleri düzenle.
2. Proje klasöründe çalıştır: `node google-ads/ad-copy/build.mjs`
3. Betik **tüm Google karakter sınırlarını kontrol eder** (başlık 30, açıklama 90, sitelink 25…).
   Aşan varsa hangi satır olduğunu söyler ve dosyaları üretmez. Geçerse tüm CSV'ler ve
   `ad-copy.md` güncellenir.

---

## 12. Yayına almadan önce son kontrol listesi

**SEO**
- [ ] Vercel'de `NEXT_PUBLIC_SITE_URL` silindi
- [ ] Search Console doğrulandı, sitemap gönderildi, 7 sayfa için indeksleme istendi
- [ ] Google Business Profile oluşturuldu ve doğrulandı (hizmet bölgeleri + 6 hizmet)
- [ ] Bing Places + Apple Business Connect + CSP Find a Physio kayıtları
- [ ] ICO kaydı var

**Google Ads hesabı**
- [ ] Expert mode, UK / London / GBP
- [ ] Faturalama eklendi, reklamveren doğrulaması tamamlandı
- [ ] Auto-apply recommendations kapalı

**Dönüşüm takibi**
- [ ] 5 dönüşüm işlemi oluşturuldu (form, WhatsApp, telefon = Primary; SMS, e-posta = Secondary)
- [ ] `NEXT_PUBLIC_GOOGLE_ADS_ID` + 5 etiket Vercel'e girildi, Redeploy yapıldı
- [ ] Sitede çerez bandı çıkıyor
- [ ] Tag Assistant ile test edildi
- [ ] Calls from ads süresi 60 sn

**Kampanya**
- [ ] Search partners ✘, Display Network ✘
- [ ] 21 kasaba, **Presence** seçeneği
- [ ] Bütçe £15/gün, Maximise clicks + £3 CPC limiti
- [ ] 7 reklam grubu, kelimeler phrase + exact, broad ✘
- [ ] Her grupta 15 başlık / 4 açıklama, Ad strength Good+
- [ ] Negatif kelime listesi kampanyaya uygulandı
- [ ] Sitelink (6), callout (10), snippet (2), call asset, business name + logo eklendi
- [ ] Reklam saatleri ayarlandı
- [ ] Telefon ve WhatsApp yayın saatlerinde açık 🙂

**Banner reklamlar (2. aşama, 1 ay sonra)**
- [ ] Display kampanyası ayrı bütçeyle, aynı konumlar
- [ ] İçerik hariç tutmaları + mobil uygulama hariç tutması
- [ ] Responsive display ad + uploaded banner'lar yüklendi
- [ ] Mümkünse AI fotoğraflar gerçek fotoğraflarla değiştirildi
