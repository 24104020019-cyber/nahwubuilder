# Nahwu Builder

Website belajar nahwu berbahasa Indonesia dengan tampilan asli bernuansa sage.

## Fitur
- Materi jumlah ismiyah dan fi‘liyah: definisi, unsur, contoh berharakat, terjemahan, langkah identifikasi, dan tabel perbandingan.
- Bank 24 soal unik: 12 ismiyah dan 12 fi‘liyah. Tantangan campuran memuat semua 24 soal.
- Pilihan ganda dan susun kata dari kanan ke kiri.
- Penilaian di API server; kunci tidak dikirim oleh API soal sebelum pengiriman jawaban.
- Setelah selesai: skor 0–100, jumlah benar/salah, jawaban pengguna, kunci, dan pembahasan setiap soal.
- Riwayat 30 latihan terakhir di localStorage. Tidak memerlukan akun, database, atau variabel environment.

## Menjalankan di komputer
Gunakan Node.js 22 atau lebih baru dan npm.

```bash
npm ci
npm run dev
```

Buka http://localhost:3000.

## Pemeriksaan
```bash
npm test
npm run typecheck
npm run build
```

## GitHub dan Vercel
1. Ekstrak ZIP. Unggah seluruh isi folder `nahwu-builder` ke root repository GitHub, termasuk package.json dan package-lock.json. Jangan unggah node_modules atau .next.
2. Di Vercel pilih Add New > Project > import repository tersebut.
3. Framework: Next.js. Root Directory: `.` jika package.json di root, atau `nahwu-builder` jika repository berisi folder tersebut.
4. Build Command: `npm run build`. Output Directory: biarkan default. Tidak perlu environment variable atau konfigurasi Cloudflare.
5. Deploy. Push berikutnya ke branch produksi akan memperbarui website.

## Mengedit konten
Materi: app/page.tsx. Soal dan kunci: lib/questions.ts. Gaya: app/globals.css.

Riwayat hanya tersimpan pada browser/perangkat yang dipakai dan terhapus jika data situs dibersihkan. Penilaian tetap berjalan apabila localStorage diblokir, namun riwayat tidak tersimpan. Versi ini untuk latihan mandiri; kode kunci dalam repository bukan mekanisme ujian rahasia. Tidak ada sinkronisasi nilai ke server/database. Riwayat Cloudflare versi lama tidak dimigrasikan.
