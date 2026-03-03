# Film Arama Uygulamasi - Adim Adim Aciklama

Bu dokuman, projede yaptigimiz islemleri basit ve anlasilir sekilde anlatir.

## 1. Projeyi Kurduk

1. Vite ile React projesi kullanildi.
2. Gerekli paketler eklendi:
   - `react-router-dom` (sayfa gecisleri icin)
   - `axios` yerine `fetch` kullandik ama paket mevcut kalabilir.
3. `main.jsx` icinde `BrowserRouter` ile tum uygulama router ile sarildi.

## 2. Klasor Yapisi Olusturuldu

Odev kriterine uygun olacak sekilde:

- `src/components` altinda her bilesen icin ayri klasor:
  - `App`
  - `Navigation`
  - `MovieList`
  - `MovieCast`
  - `MovieReviews`
- `src/pages` altinda her sayfa icin ayri klasor:
  - `HomePage`
  - `MoviesPage`
  - `MovieDetailsPage`
  - `NotFoundPage`

Her klasorde:
- `BilesenAdi.jsx`
- `BilesenAdi.module.css`

## 3. Router (Sayfa Gecisleri) Kuruldu

`src/components/App/App.jsx` dosyasinda:

- `React.lazy` ve `Suspense` ile asenkron yukleme yapildi.
- Asagidaki rotalar tanimlandi:
  - `/` -> `HomePage`
  - `/movies` -> `MoviesPage`
  - `/movies/:movieId` -> `MovieDetailsPage`
  - `cast` -> `MovieCast` (nested route)
  - `reviews` -> `MovieReviews` (nested route)
  - `*` -> `NotFoundPage`

## 4. TMDB Servis Katmani Yazildi

`src/services/tmdbApi.js` dosyasinda tum API cagrilari toplandi:

- `fetchTrendingMovies()`
- `fetchMoviesByQuery(query)`
- `fetchMovieDetails(movieId)`
- `fetchMovieCredits(movieId)`
- `fetchMovieReviews(movieId)`
- `getImageUrl(path)` (poster URL tamamlama)

Bu yapi sayesinde sayfalarda API kodu dagilmadi, daha temiz oldu.

## 5. HomePage (Trend Filmler)

`HomePage.jsx` icinde:

- `useEffect` ile sayfa acildiginda trend filmler cekildi.
- `movies`, `isLoading`, `error` state'leri kullanildi.
- Sonuclar `MovieList` bileseni ile gosterildi.

## 6. MoviesPage (Arama Sayfasi)

`MoviesPage.jsx` icinde:

- Arama parametresi `useSearchParams` ile URL'den yonetildi.
- Form gonderilince `query` URL'e yazildi.
- `query` degisince `useEffect` ile API istegi atildi.
- Sonuclar yine `MovieList` ile listelendi.

Ornek:
- `/movies?query=batman`

## 7. MovieList Bileseni

`MovieList.jsx` icinde:

- Film listesi kart yapisinda gosterildi.
- Her karta tiklayinca detay sayfasina gider:
  - `/movies/:movieId`
- `useLocation` ile kullanicinin geldigi sayfa `state` olarak tasindi.
- Bu bilgi detay sayfasindaki `Go back` icin kullanildi.

## 8. MovieDetailsPage (Detay Sayfasi)

`MovieDetailsPage.jsx` icinde:

- `useParams` ile `movieId` alindi.
- `movieId` degisince detay istegi atildi.
- Film afisi, isim, puan, overview, genres gosterildi.
- Alt bolumde iki link var:
  - `cast`
  - `reviews`
- `Outlet` ile nested route icerigi ekrana basildi.
- `useRef(location.state?.from || '/movies')` ile geri donus linki korundu.

## 9. MovieCast ve MovieReviews

### MovieCast
- `movieId` ile oyuncu listesi cekildi.
- Oyuncu resmi, isim ve karakter bilgisi gosterildi.
- Veri yoksa bilgilendirme mesaji verildi.

### MovieReviews
- `movieId` ile yorumlar cekildi.
- Yazar ve yorum metni gosterildi.
- Veri yoksa bilgilendirme mesaji verildi.

## 10. NotFoundPage

Kullanici gecersiz bir adrese giderse:

- `NotFoundPage` gosterilir.
- Ana sayfaya donus linki vardir.
- Kisa sure sonra ana sayfaya yonlendirme yapilir.

## 11. Stil Tarafi (CSS Modules)

Tum stiller `*.module.css` ile yazildi.

Yaptigimiz tasarim:
- Acik ve sade arka plan
- Uyumlu farkli renk paleti (pembe kullanilmadi)
- Yeni marka adi: **CineWave**
- Kart tabanli film listesi
- Mobil uyumlu gorunum

## 12. Ortam Degiskenleri (API Anahtari)

Local ve Vercel tarafinda:

- `VITE_TMDB_API_KEY` kullanildi.
- `.env` dosyasi git'e gonderilmedi (`.gitignore` icinde).
- `.env.example` dosyasi eklendi.

> Not: Vercel'de env degistiginde yeniden deploy gerekir.

## 13. Kontroller

Proje teslim oncesi kontrol edildi:

- `npm run lint` -> basarili
- `npm run build` -> basarili
- GitHub'a push -> tamam
- Vercel deploy -> tamam

## 14. Teslimde Verilecek 2 Link

1. GitHub repo linki (kaynak kod)
2. Vercel linki (canli proje)

--
