# Sistem Data Desa Way Ilahan

Website resmi desa yang menampilkan informasi publik, transparansi data dan keuangan desa, serta halaman admin untuk mengelola konten.

## Fitur Utama
- Halaman publik untuk masyarakat
- Profil desa, visi misi, data penduduk, data dusun, aparatur desa
- Informasi APBDes, realisasi anggaran, program, berita, pengumuman, galeri, kontak
- Halaman admin dengan login sederhana
- Data publik dapat diubah hanya oleh admin melalui panel admin

## Login Admin
- Username: desa
- Password: wayilahan

## Cara Menjalankan Secara Lokal
1. Buka folder project
2. Jalankan server lokal:
   - python3 -m http.server 8000
3. Buka browser ke:
   - http://127.0.0.1:8000/

## Cara Publikasikan ke GitHub Pages
1. Buka repository GitHub Anda
2. Masuk ke Settings > Pages
3. Pilih Branch: main
4. Folder: /root
5. Simpan dan tunggu proses deployment

## Struktur File
- index.html: halaman publik utama
- admin.html: halaman login dan dashboard admin
- styles.css: tampilan website
- script.js: data, login admin, dan render konten

Website ini dibuat agar dapat digunakan langsung dan terlihat seperti website resmi desa yang transparan.
