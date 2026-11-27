# Spesifikasi Desain: Surgical Cognitive Redesign Klik Indomaret

Tanggal: 27 November 2026  
Proyek: Tugas Kelompok Rekayasa Kognitif (3 Orang) — Teknik Industri ITB  
Objek: Antarmuka Klik Indomaret (`klikindomaret.com` & Aplikasi Mobile)

## 1. Tujuan & Masalah Inti
Merancang ulang antarmuka belanja kebutuhan pokok Klik Indomaret secara *surgical* dengan mempertahankan 100% *Graphic Design Visual* (GDV) asli merek (`Inter`, `#1178D4`, `#F29D0D`, `#EE2B2E`), sekaligus menghilangkan hambatan kognitif yang teridentifikasi dari:
- **Inspeksi Langsung `klikindomaret.com` (27 Nov 2026):** 1 modal QR blokir awal, 6 banner promo di *first viewport* (23 slide total), 11 kategori dropdown tidak sinkron dengan 9 kartu beranda (+8 sub-kategori duplikat di *"Produk Supermarket"*), pil *"Belanja Xpress v"* menyesatkan, judul produk terpotong 2 baris, dan *hard login wall* sebelum keranjang.
- **Scraping 350 Ulasan Terbaru (27 Nov 2026):** Google Play **3,53/5** (208.567 rating; 32,8% bintang 1; tertinggal dari Alfagift 4,19/5) dan Apple App Store **3,51/5** (25.435 rating; tertinggal dari Alfagift 4,29/5). Keluhan utama: stok kosong & pengiriman (41,8% / 36,9%), pembatalan/refund Saldo Klik/CS (26,1% / 24,1%), pembayaran & harga promo beda saat *checkout* (13,3% / 10,6%), login/alamat default Jakarta (6,7% / 7,8%), dan pop-up iklan/navigasi (6,7% / 5,0%).
- **Literatur Sekunder:** Skor *SUS* Klik Indomaret 42,04 → 77,58 (Latifah & Hasan, 2026), komparasi *SUS* 62,88 vs Alfagift 72,45 (UBSI, 2025), *NASA-TLX* pembayaran kategori *Agak Tinggi* dengan puncak *Mental Demand* & *Performance* (Arini dkk., 2025, n = 50), analisis *Gestalt* (Yuwono & Anggraeni, 2023), dan pola *Eliminating Redundancy* (Ayatulloh, 2026).

## 2. Keputusan Desain Terkunci (Hasil `/grill-me`)
1. **Medium:** Dual-View Responsive (**Desktop 1216px** & **Mobile 390px**) dalam 1 aplikasi Next.js + Tailwind siap deploy Vercel.
2. **Cakupan Perbaikan:** *Surgical Full-Flow + Store Painpoint Fix* (tetap menyisakan 1 slot promo utama untuk *trade-off* bisnis ritel, dilengkapi indikator stok cabang, opsi substitusi/refund metode asal, dan pembatalan mandiri).
3. **Fitur Demo Presentasi:** Toolbar tipis *collapsible* dengan toggle `Eksisting (Asli)` vs `Redesign (Perbaikan)`, switch `Desktop` vs `Mobile`, toggle `Anotasi Teori Kognitif`, serta drawer `Ringkasan Metrik`.

## 3. Design System Asli Klik Indomaret (`build-production.css`)
- **Font:** `Inter` (`400, 500, 600, 700`).
- **Warna:** Primary Blue `#1178D4` (`#0958AA` hover), Secondary Amber `#F29D0D`, Red Accent `#EE2B2E` (`#FFEDEE` tint), Surface `#FFFFFF`, Utility `#EFF3F6`, Border `#E5E7EB` / `#DCDEE3`, Teks `#151823` / `#434755` / `#70727D`, Success `#15803D`.
- **Aturan Anti-AI-Slop (`ui-design-fundamentals`):** *8-Point Grid*, kontras ≥ 4.5:1, *tap target* mobile ≥ 44px, `rounded-lg` (8px) untuk kartu & search bar, `rounded-md` (6px) untuk tombol, tanpa gradasi neon/glassmorphism/emoji UI.

## 4. Target Evaluasi Terukur
- **Hick-Hyman Law (Kategori):** 11 kategori (3,46 bit) → 6 kategori MECE (2,58 bit), turun **25,3%**.
- **KLM-GOMS (Cari `"minyak goreng"` hingga cek Keranjang):** 24,60 dtk (7 klik) → 11,55 dtk (3 klik), turun **53,0%** waktu dan **57,1%** klik.
- **Visual Clutter (*Viewport* 1):** 1 modal blokir + 6 banner → 0 modal + 1 banner utama (**-83%** gangguan).
- **Target *SUS* & *NASA-TLX*:** *SUS* > 70 (*Acceptable*), *NASA-TLX* turun ke *Sedang–Rendah*.
