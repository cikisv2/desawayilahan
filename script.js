const DEFAULT_DATA = {
  desaName: 'Desa Way Ilahan',
  tagline: 'Desa yang amanah, maju, dan transparan',
  address: 'Kecamatan Pulau Panggung, Kabupaten Tanggamus, Lampung',
  profile: 'Desa Way Ilahan adalah desa yang senantiasa mengutamakan pelayanan, gotong royong, dan keterbukaan informasi bagi seluruh masyarakat. Website ini menjadi sarana publikasi data desa, keuangan, kegiatan, dan pengumuman resmi.',
  visi: 'Menjadi desa yang mandiri, sejahtera, dan berdaya saing dengan tata kelola pemerintah yang baik serta partisipasi masyarakat yang aktif.',
  misi: 'Meningkatkan kualitas pelayanan publik, memberdayakan ekonomi masyarakat, menjaga ketertiban, dan mengembangkan infrastruktur desa secara berkelanjutan.',
  kepalaDesa: 'Bapak H. Surya',
  totalPenduduk: '4.250 Jiwa',
  dusunCount: '4 Dusun',
  rwRt: '12 RW / 38 RT',
  anggaran: 'Rp 1.850.000.000',
  realisasi: 'Rp 1.620.000.000',
  pengumuman: 'Pengumuman: Semua informasi publik desa dapat diakses secara terbuka melalui website ini untuk mendukung transparansi dan akuntabilitas.',
  contact: 'Alamat: Jalan Desa Way Ilahan, Kecamatan Pulau Panggung, Tanggamus. Telepon: 0721-123456. Email: desa.wayilahan@gmail.com',
  penduduk: [
    'Laki-Laki: 2.120 Jiwa',
    'Perempuan: 2.130 Jiwa',
    'Kepala Keluarga: 1.180 KK',
    'Usia Produktif: 2.650 Jiwa'
  ],
  dusun: [
    'Dusun I: Way Ilahan',
    'Dusun II: Suka Maju',
    'Dusun III: Bumi Ayu',
    'Dusun IV: Margodadi'
  ],
  aparatur: [
    'Kepala Desa: Bapak H. Surya',
    'Sekretaris Desa: Ibu Dwi Lestari',
    'Kaur Keuangan: Bapak Rudi',
    'Kasi Pelayanan: Ibu Nila'
  ],
  programs: [
    'Peningkatan jalan lingkungan dan sanitasi',
    'Program bantuan ekonomi warga dan UMKM',
    'Pembangunan posyandu dan layanan kesehatan',
    'Pemberdayaan pemuda dan olahraga desa'
  ],
  keuangan: [
    'Pembangunan jalan: 45% terealisasi',
    'Program bantuan sosial: 100% terealisasi',
    'Pendidikan dan pelatihan: 88% terealisasi',
    'Kesehatan dan posyandu: 92% terealisasi'
  ],
  berita: [
    {
      title: 'Musyawarah Desa Tahunan',
      desc: 'Pemerintah desa menggelar musyawarah bersama masyarakat untuk membahas prioritas pembangunan 2026.'
    },
    {
      title: 'Program Bantuan Sembako',
      desc: 'Bantuan sosial telah dibagi kepada keluarga yang membutuhkan dengan mekanisme yang transparan.'
    }
  ],
  gallery: [
    { title: 'Gotong Royong', desc: 'Kegiatan kerja bakti bersama warga desa.' },
    { title: 'Pembangunan Jalan', desc: 'Perbaikan akses jalan lingkungan desa.' },
    { title: 'Kegiatan Posyandu', desc: 'Pelayanan kesehatan masyarakat secara rutin.' }
  ]
};

function loadData() {
  try {
    const saved = localStorage.getItem('desaWayIlahanData');
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  } catch {
    return DEFAULT_DATA;
  }
}

function saveData(data) {
  localStorage.setItem('desaWayIlahanData', JSON.stringify(data));
}

function renderPublicPage() {
  const data = loadData();
  document.getElementById('site-name').textContent = data.desaName;
  document.getElementById('site-tagline').textContent = data.tagline;
  document.getElementById('hero-title').textContent = `Selamat Datang di ${data.desaName}`;
  document.getElementById('hero-description').textContent = data.profile;
  document.getElementById('desa-address').textContent = data.address;
  document.getElementById('kepala-desa').textContent = data.kepalaDesa;
  document.getElementById('penduduk-hero').textContent = data.totalPenduduk;
  document.getElementById('dusun-hero').textContent = data.dusunCount + ' • ' + data.rwRt;
  document.getElementById('pengumuman-text').textContent = `Pengumuman: ${data.pengumuman}`;
  document.getElementById('profil-text').textContent = data.profile;
  document.getElementById('visi-text').textContent = data.visi;
  document.getElementById('misi-text').textContent = data.misi;
  document.getElementById('stat-penduduk').textContent = data.totalPenduduk;
  document.getElementById('stat-dusun').textContent = data.dusunCount;
  document.getElementById('stat-rw').textContent = data.rwRt.split(' / ')[0];
  document.getElementById('stat-rt').textContent = data.rwRt.split(' / ')[1];
  document.getElementById('penduduk-list').innerHTML = data.penduduk.map(item => `<li>${item}</li>`).join('');
  document.getElementById('dusun-list').innerHTML = data.dusun.map(item => `<li>${item}</li>`).join('');
  document.getElementById('aparatur-list').innerHTML = data.aparatur.map(item => `<li>${item}</li>`).join('');
  document.getElementById('program-list').innerHTML = data.programs.map(item => `<li>${item}</li>`).join('');
  document.getElementById('anggaran-value').textContent = data.anggaran;
  document.getElementById('realisasi-value').textContent = data.realisasi;
  document.getElementById('sisa-value').textContent = `Rp ${formatRupiah(parseRupiah(data.anggaran) - parseRupiah(data.realisasi))}`;
  document.getElementById('keuangan-list').innerHTML = data.keuangan.map(item => `<li>${item}</li>`).join('');
  document.getElementById('berita-list').innerHTML = data.berita.map(item => `
    <article class="card">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </article>
  `).join('');
  document.getElementById('gallery-list').innerHTML = data.gallery.map(item => `
    <article class="gallery-item">
      <div class="thumb"></div>
      <div class="content">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    </article>
  `).join('');
  document.getElementById('contact-text').textContent = data.contact;
  document.getElementById('footer-year').textContent = new Date().getFullYear();
}

function parseRupiah(value) {
  return Number(String(value).replace(/[^0-9]/g, '')) || 0;
}

function formatRupiah(value) {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

function isAdminLoggedIn() {
  return localStorage.getItem('desaWayIlahanAdmin') === 'true';
}

function setAdminSession(state) {
  localStorage.setItem('desaWayIlahanAdmin', state ? 'true' : 'false');
}

function setupAdminPage() {
  const loginCard = document.getElementById('login-card');
  const dashboardCard = document.getElementById('dashboard-card');
  const loginForm = document.getElementById('login-form');
  const adminForm = document.getElementById('admin-form');
  const logoutBtn = document.getElementById('logout-btn');

  if (isAdminLoggedIn()) {
    loginCard.classList.add('hidden');
    dashboardCard.classList.remove('hidden');
  } else {
    loginCard.classList.remove('hidden');
    dashboardCard.classList.add('hidden');
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (username === 'desa' && password === 'wayilahan') {
      setAdminSession(true);
      loginCard.classList.add('hidden');
      dashboardCard.classList.remove('hidden');
      populateAdminForm();
    } else {
      alert('Username atau password salah.');
    }
  });

  logoutBtn.addEventListener('click', () => {
    setAdminSession(false);
    loginCard.classList.remove('hidden');
    dashboardCard.classList.add('hidden');
    loginForm.reset();
  });

  adminForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = loadData();
    data.desaName = document.getElementById('desaName').value || data.desaName;
    data.tagline = document.getElementById('tagline').value || data.tagline;
    data.profile = document.getElementById('profile').value || data.profile;
    data.visi = document.getElementById('visi').value || data.visi;
    data.misi = document.getElementById('misi').value || data.misi;
    data.totalPenduduk = document.getElementById('totalPenduduk').value || data.totalPenduduk;
    data.kepalaDesa = document.getElementById('kepalaDesa').value || data.kepalaDesa;
    data.dusunCount = document.getElementById('dusunCount').value || data.dusunCount;
    data.rwRt = document.getElementById('rwRt').value || data.rwRt;
    data.anggaran = document.getElementById('anggaran').value || data.anggaran;
    data.realisasi = document.getElementById('realisasi').value || data.realisasi;
    data.pengumuman = document.getElementById('pengumuman').value || data.pengumuman;
    data.contact = document.getElementById('contact').value || data.contact;
    saveData(data);
    alert('Perubahan berhasil disimpan.');
    renderPublicPage();
  });

  if (isAdminLoggedIn()) {
    populateAdminForm();
  }
}

function populateAdminForm() {
  const data = loadData();
  document.getElementById('desaName').value = data.desaName;
  document.getElementById('tagline').value = data.tagline;
  document.getElementById('profile').value = data.profile;
  document.getElementById('visi').value = data.visi;
  document.getElementById('misi').value = data.misi;
  document.getElementById('totalPenduduk').value = data.totalPenduduk;
  document.getElementById('kepalaDesa').value = data.kepalaDesa;
  document.getElementById('dusunCount').value = data.dusunCount;
  document.getElementById('rwRt').value = data.rwRt;
  document.getElementById('anggaran').value = data.anggaran;
  document.getElementById('realisasi').value = data.realisasi;
  document.getElementById('pengumuman').value = data.pengumuman;
  document.getElementById('contact').value = data.contact;
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'public') {
    renderPublicPage();
  }
  if (document.body.dataset.page === 'admin') {
    setupAdminPage();
  }
});
