export interface StoreBranch {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  etaMinutes: string;
  deliveryFee: number;
  freeShippingThreshold: number;
}

export type RedesignCategoryId =
  | "bahan-pokok"
  | "makanan-minuman"
  | "susu-segar"
  | "kebutuhan-rumah"
  | "ibu-anak"
  | "camilan-bumbu";

export interface Product {
  id: string;
  name: string;
  shortName: string; // Authentic 2-line truncation observed on live klikindomaret.com
  categoryId: RedesignCategoryId;
  existingCategoryLabel: string;
  volume: string;
  brand: string;
  price: number;
  originalPrice?: number;
  promoLabel?: string;
  imageUrl: string; // Authentic Klik Indomaret product photo stored locally
  stockByBranch: Record<string, number>;
  keywords: string[];
}

export interface RedesignCategory {
  id: RedesignCategoryId;
  label: string;
  shortLabel: string;
  subItems: string[];
  thumbUrl: string;
}

export interface CognitiveAnnotation {
  id: string;
  number: number;
  target: string;
  theory: string;
  title: string;
  existingIssue: string;
  redesignFix: string;
  impactMetric: string;
}

export const REAL_BANNERS = {
  hero: [
    {
      id: "hero-1",
      src: "/images/real/hero_1.png",
      alt: "Promo Jagoan Sehat Klik Indomaret",
      filterMode: "promo" as const,
    },
    {
      id: "hero-2",
      src: "/images/real/hero_2.png",
      alt: "Promo Payday Belfoods Klik Indomaret",
      filterMode: "bahan-pokok" as const,
    },
    {
      id: "hero-3",
      src: "/images/real/promo_1.png",
      alt: "Super Brand Day Indofood Fair Klik Indomaret",
      filterMode: "makanan-minuman" as const,
    },
  ],
  existingHeroAll: [
    "/images/real/hero_2.png",
    "/images/real/hero_1.png",
    "/images/real/hero_3.png",
  ],
  existingPromoLainnya: [
    "/images/real/promo_1.png",
    "/images/real/promo_2.png",
    "/images/real/promo_3.png",
  ],
};

export const STORE_BRANCHES: StoreBranch[] = [
  {
    id: "dago",
    name: "Indomaret Ir. H. Juanda (Dago)",
    address: "Jl. Ir. H. Juanda No. 114, Coblong, Bandung",
    distanceKm: 0.6,
    etaMinutes: "35–45 menit",
    deliveryFee: 5000,
    freeShippingThreshold: 75000,
  },
  {
    id: "dipatiukur",
    name: "Indomaret Dipatiukur 68",
    address: "Jl. Dipati Ukur No. 68, Lebakgede, Bandung",
    distanceKm: 1.1,
    etaMinutes: "40–55 menit",
    deliveryFee: 5000,
    freeShippingThreshold: 75000,
  },
  {
    id: "sudirman",
    name: "Indomaret Point Sudirman",
    address: "Jl. Jend. Sudirman Kav. 25, Jakarta Selatan",
    distanceKm: 0.8,
    etaMinutes: "35–50 menit",
    deliveryFee: 5000,
    freeShippingThreshold: 75000,
  },
];

// Authentic 11 top-level categories observed live on klikindomaret.com (27 Nov 2026)
export const EXISTING_TOP_CATEGORIES: {
  name: string;
  subGroups: { heading: string; links: string[] }[];
}[] = [
  {
    name: "Produk Supermarket",
    subGroups: [
      { heading: "Kesehatan & Kebersihan", links: [] },
      { heading: "Makanan", links: ["Produk Susu", "Ice Cream", "Buah", "Sereal"] },
      { heading: "Ibu & Anak", links: [] },
      { heading: "Daging & Olahan", links: ["Daging Beku", "Sosis & Nugget"] },
      { heading: "Minuman", links: ["Air Mineral", "Susu UHT", "Kopi & Teh"] },
      { heading: "Perawatan Diri", links: ["Perawatan Wajah", "Kosmetik"] },
      { heading: "Dapur & Bahan Masakan", links: ["Minyak Goreng", "Beras", "Bumbu Masak"] },
      { heading: "Kebutuhan Rumah", links: ["Deterjen", "Pembersih Lantai"] },
    ],
  },
  {
    name: "Perawatan Diri",
    subGroups: [
      { heading: "Perawatan Wajah", links: ["Pembersih Wajah", "Pelembap", "Sunscreen"] },
      { heading: "Kosmetik", links: ["Lipstik", "Bedak"] },
    ],
  },
  {
    name: "Makanan",
    subGroups: [
      { heading: "Makanan Instan", links: ["Mie Instan", "Bubur Instan", "Pasta"] },
      { heading: "Dessert", links: ["Buah", "Pudding", "Es Krim"] },
    ],
  },
  {
    name: "Dapur & Bahan Masakan",
    subGroups: [
      { heading: "Minyak & Lemak", links: ["Minyak Goreng", "Margarin"] },
      { heading: "Bahan Pokok", links: ["Beras", "Gula", "Tepung"] },
    ],
  },
  {
    name: "Produk Segar",
    subGroups: [
      { heading: "Sayur", links: [] },
      { heading: "Buah", links: [] },
    ],
  },
  {
    name: "Minuman",
    subGroups: [{ heading: "Siap Minum", links: ["Air Mineral", "Teh Botol", "Susu UHT"] }],
  },
  {
    name: "Ibu & Anak",
    subGroups: [{ heading: "Kebutuhan Bayi", links: ["Popok Bayi", "Tisu Basah", "Susu Formula"] }],
  },
  {
    name: "Kesehatan & Kebersihan",
    subGroups: [{ heading: "Perawatan Tubuh", links: ["Sabun Mandi", "Pasta Gigi", "Sampo"] }],
  },
  {
    name: "Kebutuhan Rumah",
    subGroups: [
      { heading: "Dapur & Gas", links: ["Kompor & Aksesoris Gas", "Kompor & Aksesoris Gas"] },
      { heading: "Pembersih", links: ["Deterjen", "Sabun Cuci Piring", "Perlengkapan Peliharaan"] },
    ],
  },
  {
    name: "Makanan Hewan",
    subGroups: [{ heading: "Hewan Peliharaan", links: ["Makanan Kucing", "Makanan Anjing"] }],
  },
  {
    name: "Lainnya",
    subGroups: [
      {
        heading: "Beragam Kategori",
        links: ["Pembayaran Digital", "Fashion", "Alat Tulis", "Mainan", "Gadget", "Materai"],
      },
    ],
  },
];

export const EXISTING_HOMEPAGE_SHORTCUTS: { label: string; thumbUrl: string }[] = [
  { label: "Makanan", thumbUrl: "/images/real/prod_indomie_goreng.jpg" },
  { label: "Dapur & Bahan...", thumbUrl: "/images/real/prod_minyak_idm.jpg" },
  { label: "Minuman", thumbUrl: "/images/real/prod_susu_diamond.jpg" },
  { label: "Ibu & Anak", thumbUrl: "/images/real/prod_popok_genki.jpg" },
  { label: "Kesehatan & Kebersihan", thumbUrl: "/images/real/prod_det_bukrim.jpg" },
  { label: "Kebutuhan Rumah", thumbUrl: "/images/real/prod_det_idm.jpg" },
  { label: "Perawatan Diri", thumbUrl: "/images/real/prod_susu_ultra.jpg" },
  { label: "Makanan Hewan", thumbUrl: "/images/real/prod_qtela.jpg" },
  { label: "Lainnya", thumbUrl: "/images/real/prod_sambal_indofood.jpg" },
];

// Surgical Redesign: 6 MECE Categories with Authentic Klik Indomaret Product Thumbnails
export const REDESIGN_CATEGORIES: RedesignCategory[] = [
  {
    id: "bahan-pokok",
    label: "Bahan Pokok & Dapur",
    shortLabel: "Bahan Pokok",
    subItems: ["Minyak Goreng", "Beras 5 Kg", "Gula & Tepung"],
    thumbUrl: "/images/real/prod_minyak_idm.jpg",
  },
  {
    id: "makanan-minuman",
    label: "Mie & Makanan Instan",
    shortLabel: "Makanan Instan",
    subItems: ["Indomie Paket 5", "Soto & Kari", "Makanan Cepat"],
    thumbUrl: "/images/real/prod_indomie_goreng.jpg",
  },
  {
    id: "susu-segar",
    label: "Susu & Minuman",
    shortLabel: "Susu & Minuman",
    subItems: ["Susu UHT 1 L", "Susu 200 mL", "Minuman Siap Saji"],
    thumbUrl: "/images/real/prod_susu_diamond.jpg",
  },
  {
    id: "kebutuhan-rumah",
    label: "Kebutuhan Rumah",
    shortLabel: "Rumah Tangga",
    subItems: ["Deterjen Cair", "Pembersih Pakaian", "Kebersihan Rumah"],
    thumbUrl: "/images/real/prod_det_idm.jpg",
  },
  {
    id: "ibu-anak",
    label: "Ibu & Anak",
    shortLabel: "Ibu & Anak",
    subItems: ["Popok Bayi", "Perawatan Anak", "Susu Anak"],
    thumbUrl: "/images/real/prod_popok_genki.jpg",
  },
  {
    id: "camilan-bumbu",
    label: "Bumbu & Camilan",
    shortLabel: "Bumbu & Snack",
    subItems: ["Sambal & Saus", "Keripik", "Camilan Harian"],
    thumbUrl: "/images/real/prod_sambal_indofood.jpg",
  },
];

// 100% Real Klik Indomaret Products & Authentic CDN Photos (extracted 27 Nov 2026)
export const PRODUCTS: Product[] = [
  {
    id: "idm-minyak-2l",
    name: "Indomaret Minyak Goreng 2L",
    shortName: "Indomaret Minyak Goren...",
    categoryId: "bahan-pokok",
    existingCategoryLabel: "Dapur & Bahan Masakan",
    volume: "2 L",
    brand: "Indomaret",
    price: 38900,
    originalPrice: 41900,
    promoLabel: "Hemat 7%",
    imageUrl: "/images/real/prod_minyak_idm.jpg",
    stockByBranch: { dago: 14, dipatiukur: 5, sudirman: 18 },
    keywords: ["minyak", "goreng", "minyak goreng", "indomaret", "2l", "dapur"],
  },
  {
    id: "barco-minyak-2l",
    name: "Barco Minyak Goreng Refill 2L",
    shortName: "Barco Minyak Goreng Ref...",
    categoryId: "bahan-pokok",
    existingCategoryLabel: "Dapur & Bahan Masakan",
    volume: "2 L",
    brand: "Barco",
    price: 115900,
    originalPrice: 119900,
    promoLabel: "Hemat Rp 4.000",
    imageUrl: "/images/real/prod_minyak_barco.jpg",
    stockByBranch: { dago: 6, dipatiukur: 2, sudirman: 9 },
    keywords: ["minyak", "goreng", "minyak goreng", "barco", "2l", "kelapa"],
  },
  {
    id: "kara-minyak-1l",
    name: "Kara Minyak Goreng Kelapa 1L",
    shortName: "Kara Minyak Goreng Kel...",
    categoryId: "bahan-pokok",
    existingCategoryLabel: "Dapur & Bahan Masakan",
    volume: "1 L",
    brand: "Kara",
    price: 54900,
    imageUrl: "/images/real/prod_minyak_kara.jpg",
    stockByBranch: { dago: 0, dipatiukur: 4, sudirman: 7 },
    keywords: ["minyak", "goreng", "minyak goreng", "kelapa", "kara", "1l"],
  },
  {
    id: "idm-beras-ramos-5kg",
    name: "Indomaret Beras Ramos Super 5Kg",
    shortName: "Indomaret Beras Ramos ...",
    categoryId: "bahan-pokok",
    existingCategoryLabel: "Dapur & Bahan Masakan",
    volume: "5 Kg",
    brand: "Indomaret",
    price: 72500,
    originalPrice: 74500,
    promoLabel: "Hemat Rp 2.000",
    imageUrl: "/images/real/prod_beras_ramos.jpg",
    stockByBranch: { dago: 11, dipatiukur: 4, sudirman: 15 },
    keywords: ["beras", "ramos", "indomaret", "5kg", "sembako", "pokok"],
  },
  {
    id: "idm-beras-pulen-5kg",
    name: "Indomaret Beras Pulen Wangi Premium 5Kg",
    shortName: "Indomaret Beras Pulen W...",
    categoryId: "bahan-pokok",
    existingCategoryLabel: "Dapur & Bahan Masakan",
    volume: "5 Kg",
    brand: "Indomaret",
    price: 74500,
    imageUrl: "/images/real/prod_beras_pulen.jpg",
    stockByBranch: { dago: 8, dipatiukur: 0, sudirman: 10 },
    keywords: ["beras", "pulen", "wangi", "indomaret", "5kg", "sembako"],
  },
  {
    id: "idm-beras-kepala-5kg",
    name: "Indomaret Beras Kepala Super Premium 5Kg",
    shortName: "Indomaret Beras Kepala ...",
    categoryId: "bahan-pokok",
    existingCategoryLabel: "Dapur & Bahan Masakan",
    volume: "5 Kg",
    brand: "Indomaret",
    price: 74500,
    imageUrl: "/images/real/prod_beras_kepala.jpg",
    stockByBranch: { dago: 3, dipatiukur: 6, sudirman: 12 },
    keywords: ["beras", "kepala", "indomaret", "5kg"],
  },
  {
    id: "indomie-goreng-5",
    name: "Indomie Mie Goreng Special 5x80g",
    shortName: "Indomie Mie Goreng (Ne...",
    categoryId: "makanan-minuman",
    existingCategoryLabel: "Makanan",
    volume: "5 × 80g",
    brand: "Indomie",
    price: 15200,
    originalPrice: 16000,
    promoLabel: "Hemat 5%",
    imageUrl: "/images/real/prod_indomie_goreng.jpg",
    stockByBranch: { dago: 28, dipatiukur: 16, sudirman: 34 },
    keywords: ["indomie", "mie", "mi instan", "goreng", "makanan"],
  },
  {
    id: "indomie-soto-5",
    name: "Indomie Mie Instant Soto Mie 5x70g",
    shortName: "Indomie Mie Instant Sot...",
    categoryId: "makanan-minuman",
    existingCategoryLabel: "Makanan",
    volume: "5 × 70g",
    brand: "Indomie",
    price: 15500,
    imageUrl: "/images/real/prod_indomie_soto.jpg",
    stockByBranch: { dago: 19, dipatiukur: 11, sudirman: 24 },
    keywords: ["indomie", "mie", "soto", "mi instan", "makanan"],
  },
  {
    id: "indomie-kari-5",
    name: "Indomie Mie Instant Kari Ayam 5x72g",
    shortName: "Indomie Mie Instant Kar...",
    categoryId: "makanan-minuman",
    existingCategoryLabel: "Makanan",
    volume: "5 × 72g",
    brand: "Indomie",
    price: 16000,
    imageUrl: "/images/real/prod_indomie_kari.jpg",
    stockByBranch: { dago: 15, dipatiukur: 9, sudirman: 21 },
    keywords: ["indomie", "mie", "kari", "ayam", "mi instan"],
  },
  {
    id: "diamond-susu-1l",
    name: "Diamond Susu UHT Full Cream 1000mL",
    shortName: "Diamond Susu Uht Full C...",
    categoryId: "susu-segar",
    existingCategoryLabel: "Minuman",
    volume: "1 L",
    brand: "Diamond",
    price: 21900,
    originalPrice: 23900,
    promoLabel: "Hemat Rp 2.000",
    imageUrl: "/images/real/prod_susu_diamond.jpg",
    stockByBranch: { dago: 16, dipatiukur: 7, sudirman: 20 },
    keywords: ["susu", "uht", "diamond", "full cream", "minuman", "1l"],
  },
  {
    id: "ultra-susu-200ml",
    name: "Ultra Susu UHT Steril Slim Blueberry 200mL",
    shortName: "Ultra Susu Uht Steril S...",
    categoryId: "susu-segar",
    existingCategoryLabel: "Minuman",
    volume: "200 mL",
    brand: "Ultra",
    price: 6500,
    imageUrl: "/images/real/prod_susu_ultra.jpg",
    stockByBranch: { dago: 24, dipatiukur: 14, sudirman: 30 },
    keywords: ["susu", "uht", "ultra", "minuman"],
  },
  {
    id: "idm-det-cair-700ml",
    name: "Indomaret Detergent Cair 700mL",
    shortName: "Indomaret Detergent Cai...",
    categoryId: "kebutuhan-rumah",
    existingCategoryLabel: "Kebutuhan Rumah",
    volume: "700 mL",
    brand: "Indomaret",
    price: 15900,
    originalPrice: 16900,
    promoLabel: "Hemat Rp 1.000",
    imageUrl: "/images/real/prod_det_idm.jpg",
    stockByBranch: { dago: 13, dipatiukur: 8, sudirman: 19 },
    keywords: ["deterjen", "detergent", "sabun cuci", "indomaret", "rumah"],
  },
  {
    id: "bukrim-det-700ml",
    name: "Bu Krim Detergent Cair Oxy Klin 700mL",
    shortName: "Bu Krim Detergent Cair ...",
    categoryId: "kebutuhan-rumah",
    existingCategoryLabel: "Kebutuhan Rumah",
    volume: "700 mL",
    brand: "Bu Krim",
    price: 17900,
    originalPrice: 19200,
    promoLabel: "Hemat Rp 1.300",
    imageUrl: "/images/real/prod_det_bukrim.jpg",
    stockByBranch: { dago: 9, dipatiukur: 5, sudirman: 14 },
    keywords: ["deterjen", "detergent", "bu krim", "oxy", "rumah"],
  },
  {
    id: "genki-popok-l28",
    name: "Genki Moko Moko Pants L 28's",
    shortName: "Genki Moko Moko Pants L...",
    categoryId: "ibu-anak",
    existingCategoryLabel: "Ibu & Anak",
    volume: "L 28's",
    brand: "Genki Moko Moko",
    price: 52900,
    originalPrice: 57900,
    promoLabel: "Hemat Rp 5.000",
    imageUrl: "/images/real/prod_popok_genki.jpg",
    stockByBranch: { dago: 7, dipatiukur: 3, sudirman: 11 },
    keywords: ["popok", "bayi", "genki", "moko", "ibu", "anak"],
  },
  {
    id: "indofood-sambal-275ml",
    name: "Indofood Sambal Extra Pedas 275mL",
    shortName: "Indofood Sambal Extra P...",
    categoryId: "camilan-bumbu",
    existingCategoryLabel: "Dapur & Bahan Masakan",
    volume: "275 mL",
    brand: "Indofood",
    price: 13900,
    imageUrl: "/images/real/prod_sambal_indofood.jpg",
    stockByBranch: { dago: 21, dipatiukur: 12, sudirman: 26 },
    keywords: ["sambal", "saus", "indofood", "pedas", "bumbu"],
  },
  {
    id: "qtela-balado-60g",
    name: "Qtela Keripik Singkong Balado 60g",
    shortName: "Qtela Keripik Singkong ...",
    categoryId: "camilan-bumbu",
    existingCategoryLabel: "Makanan",
    volume: "60 g",
    brand: "Qtela",
    price: 7500,
    imageUrl: "/images/real/prod_qtela.jpg",
    stockByBranch: { dago: 17, dipatiukur: 10, sudirman: 22 },
    keywords: ["qtela", "keripik", "singkong", "snack", "camilan"],
  },
];

export const COGNITIVE_ANNOTATIONS: CognitiveAnnotation[] = [
  {
    id: "header-location",
    number: 1,
    target: "Header & Pemilih Cabang",
    theory: "Norman's Signifiers & Mental Model",
    title: "Pemisahan Cabang Terdekat & Mode Kirim",
    existingIssue:
      "Default statis 'Area Jakarta' (dikeluhkan pengguna luar Jakarta di Play Store) dan pil 'Belanja Xpress v' justru membuka modal alamat.",
    redesignFix:
      "Auto-deteksi cabang terdekat dengan jarak & stok live, terpisah tegas dari pilihan mode pengiriman (Xpress vs Ambil di Toko).",
    impactMetric: "Menghilangkan salah ekspektasi kontrol & klik ulang pemilihan cabang.",
  },
  {
    id: "hero-clutter",
    number: 2,
    target: "Beranda & Slot Promo",
    theory: "Gestalt (Figure-Ground) & Selective Attention",
    title: "Kontrol Visual Clutter (Trade-off Bisnis)",
    existingIssue:
      "1 modal QR blokir layar penuh + 6 banner promo serentak di viewport pertama (bagian dari 23 slide promo total) mengaburkan menu utama.",
    redesignFix:
      "Menghapus modal blokir awal dan menata 1 banner promo asli Klik Indomaret di atas dengan navigasi tenang.",
    impactMetric: "Gangguan visual viewport pertama turun 83% tanpa menghapus slot promo bisnis.",
  },
  {
    id: "mece-categories",
    number: 3,
    target: "Taksonomi 6 Kategori MECE",
    theory: "Hick-Hyman Law & Eliminating Redundancy",
    title: "Penyatuan 11 Kategori Duplikat → 6 Inti",
    existingIssue:
      "11 kategori dropdown tidak sinkron dengan 9 kartu beranda; 'Produk Supermarket' mengulang 8 kategori lain dengan 2 sub-daftar kosong.",
    redesignFix:
      "6 kategori inti saling lepas (MECE) dengan foto produk asli yang 100% sinkron antara beranda dan dropdown.",
    impactMetric: "Beban informasi seleksi turun 25,3% (3,46 bit → 2,58 bit).",
  },
  {
    id: "product-card",
    number: 4,
    target: "Kartu Produk & Filter Stok",
    theory: "Information Scent & Recognition over Recall",
    title: "Kartu Utuh, Stok Cabang & Harga Bersih",
    existingIssue:
      "Judul terpotong 2 baris tanpa info stok dan promo; 41,8% keluhan Play Store memprotes barang kosong tetap tampil hingga bikin kerja 2x.",
    redesignFix:
      "Judul utuh, indikator stok cabang real-time + filter sembunyikan barang habis, tombol sekunder bersih agar fokus visual tetap pada CTA utama.",
    impactMetric: "Memangkas keharusan membuka halaman detail produk (-3,05 dtk/item).",
  },
  {
    id: "guest-cart",
    number: 5,
    target: "Guest Cart & Auto-Voucher",
    theory: "KLM-GOMS & User Control (Nielsen)",
    title: "Penghapusan Hard Login Wall Awal",
    existingIssue:
      "Klik '+' atau ikon Keranjang langsung memblokir dengan modal 'Masuk Akun' sebelum pengguna sempat cek total belanja atau ongkir.",
    redesignFix:
      "Guest Cart aktif lewat floating bar dengan auto-voucher otomatis dan rincian ongkir transparan sebelum login akhir.",
    impactMetric: "Estimasi waktu KLM-GOMS turun 53,0% (24,60 → 11,55 dtk; 7 → 3 klik).",
  },
  {
    id: "single-checkout",
    number: 6,
    target: "Single-Screen Checkout & Kontrol Batal",
    theory: "NASA-TLX (Mental Demand) & Norman's Forcing Function",
    title: "QRIS Teratas, Aturan Barang Habis & Batal Mandiri",
    existingIssue:
      "NASA-TLX pembayaran masuk kategori Agak Tinggi (Arini dkk., 2025); 26,1% ulasan mengeluhkan tidak ada batal mandiri, refund Saldo Klik, dan QRIS sulit.",
    redesignFix:
      "Checkout 1 layar dengan progress stepper, QRIS teratas, opsi otomatis bila barang habis (ganti / refund asal), geser-untuk-bayar, dan tombol Batal 5 menit.",
    impactMetric: "Target SUS naik dari 42,04–62,88 ke >70 & Mental Demand turun ke Sedang–Rendah.",
  },
];

export const BENCHMARK_METRICS = {
  storeRatings: {
    googlePlay: { klik: 3.53, ratingsCount: 208567, oneStarPct: 32.8, alfagift: 4.19, scrapedNegPct: 82.5 },
    appStore: { klik: 3.51, ratingsCount: 25435, alfagift: 4.29, scrapedNegPct: 94.0 },
    totalScraped: 350,
    date: "27 Nov 2026",
  },
  modelComparison: [
    {
      metric: "KLM-GOMS (Cari → Cek Keranjang)",
      existing: "24,60 dtk (7 klik)",
      redesign: "11,55 dtk (3 klik)",
      delta: "-53,0%",
    },
    {
      metric: "Hick-Hyman Law (Menu Kategori)",
      existing: "3,46 bit (11 opsi)",
      redesign: "2,58 bit (6 opsi)",
      delta: "-25,3%",
    },
    {
      metric: "Visual Clutter (Viewport 1)",
      existing: "1 modal + 6 banner",
      redesign: "0 modal + 1 banner",
      delta: "-83%",
    },
    {
      metric: "Skor SUS & NASA-TLX",
      existing: "42,04–62,88 | Agak Tinggi",
      redesign: "Target >70 | Sedang–Rendah",
      delta: "Acceptable",
    },
  ],
};

export function formatRupiah(value: number): string {
  return "Rp " + value.toLocaleString("id-ID");
}
