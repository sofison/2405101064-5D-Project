# 2405101064-5D-Project
## Identitas Mahasiswa

- Nama: Sofi Muchlison
- NIM: 2405101064
- Kelas: 5D
- Program Studi: Teknik Informatika
- Mata Kuliah: Pemrograman Web Dasar
- Tahun Akademik: [2026/2027]

## Deskripsi

Repository ini berisi source code, dokumentasi hasil pengerjaan Ujian Tengah Semester (UTS)
mata kuliah Pemrograman Web Dasar.

## Deskripsi Pengerjaan UTS

Aplikasi yang dibuat bernama **UNIPMA CARE**, yaitu website layanan pengaduan kerusakan
barang, alat, properti, dan fasilitas di lingkungan kampus Universitas PGRI Madiun (UNIPMA).
Mahasiswa, dosen, atau staf dapat melaporkan kerusakan melalui formulir, mendapatkan kode
tiket, lalu memantau status penanganannya. Petugas Sarpras dapat masuk sebagai admin untuk
memperbarui status laporan.

Aplikasi dibuat dengan HTML, CSS, dan JavaScript.

Tampilan memakai warna dasar putih dengan variasi biru muda dan logo UNIPMA.

## Fitur yang Diimplementasikan

1. **Beranda**: ringkasan layanan, tombol menuju pengaduan dan status, foto gedung kampus,
   serta alur pelayanan 3 langkah.
2. **Buat Pengaduan**: formulir dengan validasi (nama, kategori Alat/Properti/Fasilitas,
   tingkat kerusakan, nama barang, lokasi, keterangan, kontak) dan kode tiket otomatis.
3. **Status Pengaduan**: pencarian laporan berdasarkan kode tiket dan daftar laporan
   pada perangkat yang digunakan.
4. **Kartu Laporan Terbaru**: kartu di beranda yang otomatis menampilkan laporan terakhir
   beserta status dan bilah progres.
5. **Penghitung 24 Jam Terakhir**: jumlah laporan yang masuk dalam 24 jam terakhir, tampil
   otomatis ketika ada laporan baru.
6. **Daftar dan Login Admin**: pendaftaran akun admin (dengan kode petugas), login, dan
   logout. Kata sandi disimpan dalam bentuk hash (SHA-256).
7. **Panel Admin**: admin dapat mengubah status laporan (Diterima, Diproses, Selesai).
8. **Navigasi antarhalaman** tanpa memuat ulang halaman dan tampilan responsif untuk HP.

## Struktur Folder

- `uts/`: Source code dan file pendukung UTS.
  - `index.html`: struktur halaman.
  - `style.css`: seluruh tampilan.
  - `script.js`: logika formulir, status, login admin, dan pembaruan otomatis.
  - `uts/images/`: logo UNIPMA dan foto gedung.
- `uts/screenshot/`: Bukti visual hasil implementasi.

## Cara Menjalankan Aplikasi

### 1. Membuka aplikasi

1. Unduh atau clone repository ini, lalu buka folder `uts/`.
2. Buka file `index.html` dengan browser (Chrome, Edge, atau Firefox). Tidak perlu
   instalasi atau server. Koneksi internet hanya diperlukan untuk memuat font Google Fonts.

### 2. Cara menggunakan aplikasi sebagai pelapor (mahasiswa, dosen, atau staf)

1. Di **Beranda**, klik tombol **Buat Pengaduan** atau pilih menu **Buat Pengaduan**.
2. Isi formulir: nama pelapor, kategori (Alat, Properti, atau Fasilitas), tingkat kerusakan,
   nama barang, lokasi, keterangan kerusakan, dan kontak. Kolom bertanda `*` wajib diisi.
   Foto kondisi boleh dilampirkan.
3. Klik **Kirim laporan**. Aplikasi menampilkan **kode tiket** (contoh: `UP-1A2B3C`).
   Simpan kode ini.
4. Untuk memantau laporan, buka menu **Status Pengaduan**, masukkan kode tiket, lalu klik
   **Cari**. Status yang muncul: Diterima, Diproses, atau Selesai. Seluruh laporan pada
   perangkat yang dipakai juga tampil di bagian **Laporan di perangkat ini**.
5. Laporan yang baru dikirim otomatis muncul di kartu **Laporan Terbaru** pada Beranda,
   lengkap dengan status dan bilah progres.

### 3. Cara menggunakan aplikasi sebagai admin (petugas Sarpras)

1. Buka menu **Login Admin**. Jika belum punya akun, pilih tab **Daftar**.
2. Isi nama lengkap, username, kata sandi (minimal 6 karakter), dan **kode petugas**
   `00001`, lalu klik **Buat akun admin**. Kode petugas ditetapkan di `uts/script.js`
   baris 60 dan dapat diubah di sana.
3. Setelah akun dibuat, masuk lewat tab **Masuk** dengan username dan kata sandi tadi.
4. Di panel admin, semua laporan ditampilkan. Ubah status tiap laporan lewat menu pilihan
   (Diterima, Diproses, Selesai). Perubahan langsung terlihat di kartu Laporan Terbaru dan
   di halaman Status Pengaduan.
5. Klik **Keluar** setelah selesai.

Catatan: data laporan dan akun admin tersimpan di browser yang digunakan (`localStorage`),
jadi tidak terbagi antarperangkat. Untuk melihat contoh dari awal, gunakan satu browser yang
sama untuk membuat laporan dan masuk sebagai admin.
