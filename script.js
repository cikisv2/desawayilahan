const DEFAULT_DATA = {
  desaName: 'Desa Way Ilahan',
  tagline: 'Desa yang amanah, maju, dan transparan',
  address: 'Kecamatan Pulau Panggung, Kabupaten Tanggamus, Lampung',
  profile: 'Desa Way Ilahan adalah desa yang senantiasa mengutamakan pelayanan, gotong royong, dan keterbukaan informasi bagi seluruh masyarakat. Website ini menjadi sarana publikasi data desa, keuangan, kegiatan, dan pengumuman resmi.',
  visi: 'Menjadi desa yang mandiri, sejahtera, dan berdaya saing dengan tata kelola pemerintah yang baik serta partisipasi masyarakat yang aktif.',
  misi: 'Meningkatkan kualitas pelayanan publik, memberdayakan ekonomi masyarakat, menjaga ketertiban, dan mengembangkan infrastruktur desa secara berkelanjutan.',
  kepalaDesa: 'Bapak duwi sugianto',
  totalPenduduk: '4.250 Jiwa',
  dusunCount: '4 Dusun',
  rwRt: '12 RW / 38 RT',
  anggaran: 'Rp 1.850.000.000',
  realisasi: 'Rp 1.620.000.000',
  pengumuman: 'Pengumuman: Semua informasi publik desa dapat diakses secara terbuka melalui website ini untuk mendukung transparansi dan akuntabilitas.',
  contact: 'Alamat: Jalan Desa Way Ilahan, Kecamatan Pulau Panggung, Tanggamus. Telepon: 0721-123456. Email: desa.wayilahan@gmail.com',
  heroImage: '',
  updatedAt: new Date().toISOString(),
  penduduk: [
    'Laki-Laki: 2.120 Jiwa',
    'Perempuan: 2.130 Jiwa',
    'Kepala Keluarga: 1.180 KK',
    'Usia Produktif: 2.650 Jiwa'
  ],
  pendudukRecords: [
    { id: 'penduduk-1', nama: 'Ahmad Saputra', dusun: 'Dusun I', rtRw: '001/001', status: 'Aktif' },
    { id: 'penduduk-2', nama: 'Siti Aisyah', dusun: 'Dusun II', rtRw: '002/001', status: 'Aktif' },
    { id: 'penduduk-3', nama: 'Bambang Setiawan', dusun: 'Dusun III', rtRw: '003/002', status: 'Aktif' }
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
  masyarakat: [
    'Ahmad Saputra | 1801010101010001',
    'Siti Aisyah | 1801010101010002'
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
      id: 'berita-1',
      title: 'Musyawarah Desa Tahunan',
      desc: 'Pemerintah desa menggelar musyawarah bersama masyarakat untuk membahas prioritas pembangunan 2026.',
      status: 'Terbit'
    },
    {
      id: 'berita-2',
      title: 'Program Bantuan Sembako',
      desc: 'Bantuan sosial telah dibagi kepada keluarga yang membutuhkan dengan mekanisme yang transparan.',
      status: 'Terbit'
    },
    {
      id: 'berita-3',
      title: 'Pelatihan UMKM Desa',
      desc: 'Kegiatan pelatihan masih dalam proses persiapan dan belum dipublikasikan.',
      status: 'Draft'
    }
  ],
  gallery: [
    { id: 'gallery-1', title: 'Gotong Royong', desc: 'Kegiatan kerja bakti bersama warga desa.', image: '' },
    { id: 'gallery-2', title: 'Pembangunan Jalan', desc: 'Perbaikan akses jalan lingkungan desa.', image: '' },
    { id: 'gallery-3', title: 'Kegiatan Posyandu', desc: 'Pelayanan kesehatan masyarakat secara rutin.', image: '' }
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
  const payload = { ...data, updatedAt: new Date().toISOString() };
  localStorage.setItem('desaWayIlahanData', JSON.stringify(payload));
}

function safeReadJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeGalleryItems(data) {
  const rawItems = Array.isArray(data.gallery) ? data.gallery : [];
  return rawItems.map((item, index) => {
    if (typeof item === 'string') {
      return { id: `gallery-${index + 1}`, title: item, desc: '', image: '' };
    }
    return {
      id: item.id || `gallery-${index + 1}`,
      title: item.title || '',
      desc: item.desc || '',
      image: item.image || '',
      link: item.link || ''
    };
  });
}

function normalizePendudukRecords(data) {
  const rawItems = Array.isArray(data.pendudukRecords) ? data.pendudukRecords : [];
  return rawItems.map((item, index) => {
    if (typeof item === 'string') {
      return { id: `penduduk-${index + 1}`, nama: item, dusun: '-', rtRw: '-', status: 'Aktif' };
    }
    return {
      id: item.id || `penduduk-${index + 1}`,
      nama: item.nama || '-',
      dusun: item.dusun || '-',
      rtRw: item.rtRw || '-',
      status: item.status || 'Aktif'
    };
  });
}

function normalizeBeritaItems(data) {
  const rawItems = Array.isArray(data.berita) ? data.berita : [];
  return rawItems.map((item, index) => {
    if (typeof item === 'string') {
      return { id: `berita-${index + 1}`, title: item, desc: '', status: 'Terbit' };
    }
    return {
      id: item.id || `berita-${index + 1}`,
      title: item.title || '',
      desc: item.desc || '',
      status: item.status || 'Terbit',
      link: item.link || ''
    };
  });
}

function renderBeritaPage() {
  const container = document.getElementById('berita-page-list');
  if (!container) return;

  const data = loadData();
  const publishedNews = normalizeBeritaItems(data).filter(item => item.status === 'Terbit');

  if (!publishedNews.length) {
    container.innerHTML = '<div class="card"><p class="hint">Belum ada berita yang dipublikasikan.</p></div>';
    return;
  }

  container.innerHTML = publishedNews.map(item => `
    <article class="card news-card">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.desc)}</p>
      ${item.link ? `<a class="btn btn-outline btn-sm" href="${escapeHtml(item.link)}" target="_blank" rel="noopener">Buka tautan</a>` : '<a class="btn btn-secondary btn-sm" href="berita-detail.html">Lihat detail</a>'}
    </article>
  `).join('');
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
  const pendudukRecords = normalizePendudukRecords(data);
  document.getElementById('penduduk-list').innerHTML = pendudukRecords.map(item => `<li><strong>${escapeHtml(item.nama)}</strong> — ${escapeHtml(item.dusun)}, ${escapeHtml(item.rtRw)}, ${escapeHtml(item.status)}</li>`).join('');
  document.getElementById('dusun-list').innerHTML = data.dusun.map(item => `<li>${item}</li>`).join('');
  document.getElementById('aparatur-list').innerHTML = data.aparatur.map(item => `<li>${item}</li>`).join('');
  document.getElementById('program-list').innerHTML = data.programs.map(item => `<li>${item}</li>`).join('');
  document.getElementById('anggaran-value').textContent = data.anggaran;
  document.getElementById('realisasi-value').textContent = data.realisasi;
  document.getElementById('sisa-value').textContent = `Rp ${formatRupiah(parseRupiah(data.anggaran) - parseRupiah(data.realisasi))}`;
  document.getElementById('keuangan-list').innerHTML = data.keuangan.map(item => `<li>${item}</li>`).join('');
  const publishedNews = normalizeBeritaItems(data).filter(item => item.status === 'Terbit');
  document.getElementById('berita-list').innerHTML = publishedNews.map(item => `
    <article class="card news-card">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.desc)}</p>
      ${item.link ? `<a class="btn btn-outline btn-sm" href="${escapeHtml(item.link)}" target="_blank" rel="noopener">Buka tautan</a>` : ''}
    </article>
  `).join('');
  const galleryItems = normalizeGalleryItems(data);
  document.getElementById('gallery-list').innerHTML = galleryItems.map((item, index) => `
    <article class="gallery-item">
      <div class="thumb">${item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />` : ''}</div>
      <div class="content">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.desc)}</p>
        ${index === 0 ? `
          <div class="quick-links">
            <a href="#profil">Profil</a>
            <a href="#data">Data</a>
            <a href="#keuangan">Keuangan</a>
            <a href="statistik.html">Statistik</a>
            <a href="berita.html">Berita</a>
            <a href="#kontak">Kontak</a>
          </div>
        ` : ''}
        ${item.link ? `<a class="gallery-link" href="${escapeHtml(item.link)}" target="_blank" rel="noopener">Buka tautan</a>` : ''}
      </div>
    </article>
  `).join('');
  const bannerImage = document.getElementById('public-banner-image');
  if (bannerImage) {
    bannerImage.src = data.heroImage || 'assets/banner-desa.svg';
    bannerImage.alt = `Foto ${data.desaName}`;
  }
  document.getElementById('contact-text').textContent = data.contact;
  document.getElementById('footer-year').textContent = new Date().getFullYear();
}

function parseRupiah(value) {
  return Number(String(value).replace(/[^0-9]/g, '')) || 0;
}

function formatRupiah(value) {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

function parseListInput(value) {
  return String(value || '')
    .split(/\n/)
    .map(item => item.trim())
    .filter(Boolean);
}

function isAdminLoggedIn() {
  return localStorage.getItem('desaWayIlahanAdmin') === 'true';
}

function setAdminSession(state) {
  localStorage.setItem('desaWayIlahanAdmin', state ? 'true' : 'false');
}

function getMasyarakatSession() {
  return safeReadJson('desaWayIlahanUser', null);
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function setupPengaduanPage() {
  const form = document.getElementById('pengaduan-form');
  const resetBtn = document.getElementById('pengaduan-reset-btn');

  const namaInput = document.getElementById('pengaduan-nama');
  const identitasInput = document.getElementById('pengaduan-identitas');
  const kategoriInput = document.getElementById('pengaduan-kategori');
  const subjekInput = document.getElementById('pengaduan-subjek');
  const isiInput = document.getElementById('pengaduan-isi');
  const persetujuanInput = document.getElementById('pengaduan-persetujuan');

  const submitResult = document.getElementById('pengaduan-submit-result');

  const listContainer = document.getElementById('pengaduan-public-list');
  const emptyState = document.getElementById('pengaduan-public-empty');
  const totalEl = document.getElementById('pengaduan-total');
  const pendingEl = document.getElementById('pengaduan-pending');
  const processingEl = document.getElementById('pengaduan-processing');
  const doneEl = document.getElementById('pengaduan-done');

  function loadPengaduan() {
    return safeReadJson('desaWayIlahanPengaduan', []);
  }

  function savePengaduan(items) {
    localStorage.setItem('desaWayIlahanPengaduan', JSON.stringify(items));
  }

  function getStatusClass(status) {
    if (status === 'Menunggu') return 'status-waiting';
    if (status === 'Diproses') return 'status-processing';
    if (status === 'Selesai') return 'status-done';
    return '';
  }

  function getStatusLabel(status) {
    if (status === 'Menunggu') return 'Menunggu';
    if (status === 'Diproses') return 'Diproses';
    if (status === 'Selesai') return 'Selesai';
    return 'Menunggu';
  }

  function renderPublicList() {
    if (!listContainer) return;

    const items = Array.isArray(loadPengaduan()) ? loadPengaduan() : [];
    const sorted = [...items].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

    const counts = {
      total: sorted.length,
      pending: sorted.filter(i => i.status === 'Menunggu').length,
      processing: sorted.filter(i => i.status === 'Diproses').length,
      done: sorted.filter(i => i.status === 'Selesai').length
    };

    if (totalEl) totalEl.textContent = String(counts.total);
    if (pendingEl) pendingEl.textContent = String(counts.pending);
    if (processingEl) processingEl.textContent = String(counts.processing);
    if (doneEl) doneEl.textContent = String(counts.done);

    if (!sorted.length) {
      if (emptyState) emptyState.classList.remove('hidden');
      listContainer.innerHTML = '';
      return;
    }
    if (emptyState) emptyState.classList.add('hidden');

    listContainer.innerHTML = sorted
      .slice(0, 6)
      .map(item => {
        const nama = escapeHtml(item.nama || '-');
        const subjek = escapeHtml(item.subjek || '-');
        const tiket = escapeHtml(item.tiket || '-');
        const status = getStatusLabel(item.status);
        const statusClass = getStatusClass(item.status);
        const createdAt = item.createdAt ? new Date(item.createdAt).toLocaleString('id-ID') : '-';

        return `
          <div class="pengaduan-row">
            <div style="display:flex; justify-content:space-between; gap: 1rem; align-items: baseline;">
              <strong>${nama}</strong>
              <span class="status-pill ${statusClass}">${escapeHtml(status)}</span>
            </div>
            <div style="color: var(--muted); font-weight: 600; margin-top: 0.1rem;">
              Tiket: ${tiket} • ${escapeHtml(createdAt)}
            </div>
            <div style="margin-top: 0.2rem; font-weight: 700;">
              ${subjek}
            </div>
          </div>
        `;
      })
      .join('');
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const nama = (namaInput && namaInput.value || '').trim();
      const identitas = (identitasInput && identitasInput.value || '').trim();
      const kategori = (kategoriInput && kategoriInput.value || '').trim();
      const subjek = (subjekInput && subjekInput.value || '').trim();
      const isi = (isiInput && isiInput.value || '').trim();
      const persetujuan = persetujuanInput && persetujuanInput.checked;

      if (!nama || !identitas || !kategori || !subjek || !isi) {
        alert('Lengkapi semua data pengaduan.');
        return;
      }
      if (!persetujuan) {
        alert('Silakan centang persetujuan sebelum mengirim.');
        return;
      }

      const items = Array.isArray(loadPengaduan()) ? loadPengaduan() : [];
      const tiket = `TIK-${String(Date.now()).slice(-8)}-${Math.floor(Math.random() * 1000)}`;

      const payload = {
        id: `pengaduan-${Date.now()}`,
        tiket,
        nama,
        // identitas disimpan agar bisa dipakai admin jika dibutuhkan, tetapi tidak ditampilkan di publik
        identitas,
        kategori,
        subjek,
        isi,
        status: 'Menunggu',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      items.push(payload);
      savePengaduan(items);

      if (submitResult) {
        submitResult.classList.remove('hidden');
        submitResult.textContent = `Pengaduan terkirim. Nomor tiket Anda: ${tiket}. Status: Menunggu tindak lanjut.`;
      }

      if (form && typeof form.reset === 'function') form.reset();
      if (submitResult) submitResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      renderPublicList();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (form && typeof form.reset === 'function') form.reset();
      if (submitResult) submitResult.classList.add('hidden');
    });
  }

  renderPublicList();
}

function setupAdminPage() {
  const loginCard = document.getElementById('login-card');
  const dashboardCard = document.getElementById('dashboard-card');
  const loginForm = document.getElementById('login-form');
  const adminForm = document.getElementById('admin-form');
  const logoutBtn = document.getElementById('logout-btn');
  const aparatInput = document.getElementById('aparatInput');
  const masyarakatInput = document.getElementById('masyarakatInput');
  const heroImageInput = document.getElementById('heroImageInput');
  const heroImagePreview = document.getElementById('hero-image-preview');
  const galleryImageInput = document.getElementById('galleryImageInput');
  const galleryLinkInput = document.getElementById('galleryLinkInput');
  const galleryPreviewList = document.getElementById('gallery-preview-list');
  const aparatPreview = document.getElementById('aparat-preview');
  const masyarakatPreview = document.getElementById('masyarakat-preview');

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

  if (heroImageInput) {
    heroImageInput.addEventListener('change', async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const imageData = await readFileAsDataURL(file);
      const data = loadData();
      data.heroImage = imageData;
      saveData(data);
      if (heroImagePreview) {
        heroImagePreview.src = imageData;
      }
      renderPublicPage();
      renderMasyarakatDashboard();
    });
  }

  if (galleryImageInput) {
    galleryImageInput.addEventListener('change', async (event) => {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;
      const data = loadData();
      const gallery = normalizeGalleryItems(data);
      const imageDataList = await Promise.all(files.map(file => readFileAsDataURL(file)));
      const newItems = imageDataList.map((imageData, index) => ({
        id: `gallery-${Date.now()}-${index}`,
        title: `Foto ${gallery.length + index + 1}`,
        desc: 'Foto unggahan admin',
        image: imageData,
        link: galleryLinkInput ? galleryLinkInput.value.trim() : ''
      }));
      data.gallery = [...gallery, ...newItems];
      saveData(data);
      if (galleryLinkInput) {
        galleryLinkInput.value = '';
      }
      renderGalleryAdminPreview(data);
      renderPublicPage();
      renderMasyarakatDashboard();
    });
  }

  if (galleryPreviewList) {
    galleryPreviewList.addEventListener('click', (event) => {
      const deleteBtn = event.target.closest('[data-remove-gallery-id]');
      if (!deleteBtn) return;
      const data = loadData();
      const gallery = normalizeGalleryItems(data).filter(item => item.id !== deleteBtn.getAttribute('data-remove-gallery-id'));
      data.gallery = gallery;
      saveData(data);
      renderGalleryAdminPreview(data);
      renderPublicPage();
      renderMasyarakatDashboard();
    });
  }

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
    data.aparatur = parseListInput(aparatInput.value);
    data.masyarakat = parseListInput(masyarakatInput.value);
    saveData(data);
    alert('Perubahan berhasil disimpan.');
    renderPublicPage();
    renderMasyarakatDashboard();
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
  document.getElementById('aparatInput').value = (data.aparatur || []).join('\n');
  document.getElementById('masyarakatInput').value = (data.masyarakat || []).join('\n');
  const heroImagePreview = document.getElementById('hero-image-preview');
  if (heroImagePreview) {
    heroImagePreview.src = data.heroImage || 'assets/banner-desa.svg';
  }
  renderGalleryAdminPreview(data);
  updateListPreviews(data);
}

function updateListPreviews(data) {
  const aparatPreview = document.getElementById('aparat-preview');
  const masyarakatPreview = document.getElementById('masyarakat-preview');
  if (aparatPreview) {
    aparatPreview.innerHTML = (data.aparatur || []).map(item => `<li>${item}</li>`).join('');
  }
  if (masyarakatPreview) {
    masyarakatPreview.innerHTML = (data.masyarakat || []).map(item => `<li>${item}</li>`).join('');
  }
}

function renderGalleryAdminPreview(data) {
  const galleryPreviewList = document.getElementById('gallery-preview-list');
  if (!galleryPreviewList) return;
  const galleryItems = normalizeGalleryItems(data);
  if (!galleryItems.length) {
    galleryPreviewList.innerHTML = '<p class="hint">Belum ada foto galeri.</p>';
    return;
  }
  galleryPreviewList.innerHTML = galleryItems.map(item => `
    <div class="gallery-admin-item">
      <img src="${item.image || 'assets/banner-desa.svg'}" alt="${escapeHtml(item.title)}" />
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.desc)}</p>
      </div>
      <button class="btn btn-outline btn-sm" type="button" data-remove-gallery-id="${item.id}">Hapus</button>
    </div>
  `).join('');
}

function setupPendudukPage() {
  const form = document.getElementById('penduduk-form');
  const namaInput = document.getElementById('penduduk-nama');
  const dusunInput = document.getElementById('penduduk-dusun');
  const rtRwInput = document.getElementById('penduduk-rt-rw');
  const statusInput = document.getElementById('penduduk-status');
  const idInput = document.getElementById('penduduk-id');
  const tableBody = document.getElementById('penduduk-table-body');
  const resetBtn = document.getElementById('reset-penduduk-form');
  let editingId = null;

  function renderPendudukTable() {
    const data = loadData();
    const records = normalizePendudukRecords(data);
    data.pendudukRecords = records;
    saveData(data);

    if (!tableBody) return;
    if (!records.length) {
      tableBody.innerHTML = '<tr><td colspan="5">Belum ada data penduduk.</td></tr>';
      return;
    }

    tableBody.innerHTML = records.map(item => `
      <tr>
        <td>${escapeHtml(item.nama)}</td>
        <td>${escapeHtml(item.dusun)}</td>
        <td>${escapeHtml(item.rtRw)}</td>
        <td>${escapeHtml(item.status)}</td>
        <td>
          <button class="btn btn-outline btn-sm" type="button" data-edit-id="${item.id}">Edit</button>
          <button class="btn btn-outline btn-sm" type="button" data-delete-id="${item.id}">Hapus</button>
        </td>
      </tr>
    `).join('');
  }

  function resetForm() {
    form.reset();
    editingId = null;
    idInput.value = '';
    statusInput.value = 'Aktif';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = loadData();
    const records = normalizePendudukRecords(data);
    const payload = {
      id: editingId || `penduduk-${Date.now()}`,
      nama: namaInput.value.trim(),
      dusun: dusunInput.value.trim(),
      rtRw: rtRwInput.value.trim(),
      status: statusInput.value.trim()
    };

    if (!payload.nama || !payload.dusun || !payload.rtRw) {
      alert('Lengkapi nama, dusun, dan RT/RW terlebih dahulu.');
      return;
    }

    if (editingId) {
      const index = records.findIndex(item => item.id === editingId);
      if (index >= 0) records[index] = payload;
    } else {
      records.push(payload);
    }

    data.pendudukRecords = records;
    saveData(data);
    renderPendudukTable();
    resetForm();
  });

  tableBody.addEventListener('click', (event) => {
    const editBtn = event.target.closest('[data-edit-id]');
    const deleteBtn = event.target.closest('[data-delete-id]');

    if (editBtn) {
      const data = loadData();
      const records = normalizePendudukRecords(data);
      const record = records.find(item => item.id === editBtn.getAttribute('data-edit-id'));
      if (record) {
        editingId = record.id;
        idInput.value = record.id;
        namaInput.value = record.nama;
        dusunInput.value = record.dusun;
        rtRwInput.value = record.rtRw;
        statusInput.value = record.status;
      }
    }

    if (deleteBtn) {
      const data = loadData();
      const records = normalizePendudukRecords(data).filter(item => item.id !== deleteBtn.getAttribute('data-delete-id'));
      data.pendudukRecords = records;
      saveData(data);
      renderPendudukTable();
      if (editingId === deleteBtn.getAttribute('data-delete-id')) resetForm();
    }
  });

  resetBtn.addEventListener('click', resetForm);
  renderPendudukTable();
}

function setupBeritaPage() {
  const form = document.getElementById('berita-form');
  const titleInput = document.getElementById('berita-title');
  const descInput = document.getElementById('berita-desc');
  const linkInput = document.getElementById('berita-link');
  const statusInput = document.getElementById('berita-status');
  const idInput = document.getElementById('berita-id');
  const tableBody = document.getElementById('berita-table-body');
  const resetBtn = document.getElementById('reset-berita-form');
  let editingId = null;

  function renderBeritaTable() {
    const data = loadData();
    const items = normalizeBeritaItems(data);
    data.berita = items;
    saveData(data);

    if (!tableBody) return;
    if (!items.length) {
      tableBody.innerHTML = '<tr><td colspan="4">Belum ada berita.</td></tr>';
      return;
    }

    tableBody.innerHTML = items.map(item => `
      <tr>
        <td>${escapeHtml(item.title)}</td>
        <td>${escapeHtml(item.desc)}${item.link ? `<br><small>${escapeHtml(item.link)}</small>` : ''}</td>
        <td><span class="status-pill ${item.status === 'Terbit' ? 'status-published' : 'status-draft'}">${escapeHtml(item.status)}</span></td>
        <td>
          <button class="btn btn-outline btn-sm" type="button" data-toggle-id="${item.id}">${item.status === 'Terbit' ? 'Jadikan Draft' : 'Terbitkan'}</button>
          <button class="btn btn-outline btn-sm" type="button" data-edit-berita-id="${item.id}">Edit</button>
        </td>
      </tr>
    `).join('');
  }

  function resetForm() {
    form.reset();
    editingId = null;
    idInput.value = '';
    statusInput.value = 'Terbit';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = loadData();
    const items = normalizeBeritaItems(data);
    const payload = {
      id: editingId || `berita-${Date.now()}`,
      title: titleInput.value.trim(),
      desc: descInput.value.trim(),
      status: statusInput.value.trim(),
      link: linkInput ? linkInput.value.trim() : ''
    };

    if (!payload.title) {
      alert('Judul berita wajib diisi.');
      return;
    }

    if (editingId) {
      const index = items.findIndex(item => item.id === editingId);
      if (index >= 0) items[index] = payload;
    } else {
      items.push(payload);
    }

    data.berita = items;
    saveData(data);
    renderBeritaTable();
    resetForm();
  });

  tableBody.addEventListener('click', (event) => {
    const toggleBtn = event.target.closest('[data-toggle-id]');
    const editBtn = event.target.closest('[data-edit-berita-id]');

    if (toggleBtn) {
      const data = loadData();
      const items = normalizeBeritaItems(data);
      const item = items.find(entry => entry.id === toggleBtn.getAttribute('data-toggle-id'));
      if (item) {
        item.status = item.status === 'Terbit' ? 'Draft' : 'Terbit';
        data.berita = items;
        saveData(data);
        renderBeritaTable();
      }
    }

    if (editBtn) {
      const data = loadData();
      const items = normalizeBeritaItems(data);
      const item = items.find(entry => entry.id === editBtn.getAttribute('data-edit-berita-id'));
      if (item) {
        editingId = item.id;
        idInput.value = item.id;
        titleInput.value = item.title;
        descInput.value = item.desc;
        linkInput.value = item.link || '';
        statusInput.value = item.status;
      }
    }
  });

  resetBtn.addEventListener('click', resetForm);
  renderBeritaTable();
}

function renderMasyarakatDashboard() {
  const dashboard = document.getElementById('masyarakat-dashboard');
  if (!dashboard) return;
  const currentUser = getMasyarakatSession();
  if (!currentUser) return;

  const data = loadData();
  document.getElementById('masyarakat-welcome').textContent = `Selamat datang, ${currentUser.nama}`;
  document.getElementById('masyarakat-info').textContent = `NIK: ${currentUser.nik} • Data berikut diperbarui langsung dari admin desa`;

  const statsContainer = document.getElementById('masyarakat-stats');
  if (statsContainer) {
    statsContainer.innerHTML = `
      <article class="stat-card small-card">
        <h3>${escapeHtml(data.totalPenduduk)}</h3>
        <p>Penduduk</p>
      </article>
      <article class="stat-card small-card">
        <h3>${escapeHtml(data.dusunCount)}</h3>
        <p>Dusun</p>
      </article>
      <article class="stat-card small-card">
        <h3>${escapeHtml(data.anggaran)}</h3>
        <p>Anggaran</p>
      </article>
      <article class="stat-card small-card">
        <h3>${escapeHtml(data.realisasi)}</h3>
        <p>Realisasi</p>
      </article>
    `;
  }

  const liveData = document.getElementById('masyarakat-live-data');
  if (liveData) {
    const publishedNews = normalizeBeritaItems(data).filter(item => item.status === 'Terbit').slice(0, 3);
    liveData.innerHTML = [
      `<li><strong>Berita Terbit:</strong> ${publishedNews.length}</li>`,
      `<li><strong>Data Penduduk:</strong> ${normalizePendudukRecords(data).length} record</li>`,
      `<li><strong>Pengumuman:</strong> ${escapeHtml(data.pengumuman)}</li>`
    ].map(item => `<li>${item}</li>`).join('');
    if (publishedNews.length) {
      liveData.innerHTML += publishedNews.map(item => `
        <li><a class="gallery-link" href="${escapeHtml(item.link || 'berita.html')}" target="_blank" rel="noopener">${escapeHtml(item.title)}</a></li>
      `).join('');
    }
  }

  const statusBadge = document.getElementById('masyarakat-status-badge');
  if (statusBadge) {
    const updatedTime = data.updatedAt ? new Date(data.updatedAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : 'baru saja';
    statusBadge.innerHTML = `<span class="status-pill status-published">Data terbaru • ${escapeHtml(updatedTime)}</span>`;
  }

  const image = document.getElementById('masyarakat-hero-image');
  if (image) {
    image.src = data.heroImage || 'assets/banner-desa.svg';
    image.alt = `Foto ${data.desaName}`;
  }

  const imageCaption = document.getElementById('masyarakat-image-caption');
  if (imageCaption) {
    imageCaption.textContent = data.pengumuman || 'Foto desa yang diunggah melalui admin';
  }
}

function setupMasyarakatPage() {
  const loginForm = document.getElementById('masyarakat-login-form');
  const loginCard = document.getElementById('masyarakat-login-card');
  const dashboard = document.getElementById('masyarakat-dashboard');
  const logoutBtn = document.getElementById('masyarakat-logout');

  if (localStorage.getItem('desaWayIlahanMasyarakat') === 'true') {
    loginCard.classList.add('hidden');
    dashboard.classList.remove('hidden');
    renderMasyarakatDashboard();
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nama = document.getElementById('masyarakat-nama').value.trim();
    const nik = document.getElementById('masyarakat-nik').value.trim();
    const data = loadData();
    const found = (data.masyarakat || []).some(item => {
      const [savedNama, savedNik] = item.split('|').map(part => part.trim());
      return savedNama.toLowerCase() === nama.toLowerCase() && savedNik === nik;
    });

    if (found) {
      localStorage.setItem('desaWayIlahanMasyarakat', 'true');
      localStorage.setItem('desaWayIlahanUser', JSON.stringify({ nama, nik }));
      loginCard.classList.add('hidden');
      dashboard.classList.remove('hidden');
      renderMasyarakatDashboard();
    } else {
      alert('Nama atau NIK tidak terdaftar.');
    }
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.setItem('desaWayIlahanMasyarakat', 'false');
    localStorage.removeItem('desaWayIlahanUser');
    loginCard.classList.remove('hidden');
    dashboard.classList.add('hidden');
    loginForm.reset();
  });
}

window.addEventListener('storage', (event) => {
  if (event.key === 'desaWayIlahanData') {
    renderPublicPage();
    renderMasyarakatDashboard();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'public') {
    renderPublicPage();
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
      });
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
      });
    }
  }
  if (document.body.dataset.page === 'berita') {
    renderBeritaPage();
  }
  if (document.body.dataset.page === 'admin') {
    setupAdminPage();
  }
  if (document.body.dataset.page === 'kelola-penduduk') {
    setupPendudukPage();
  }
  if (document.body.dataset.page === 'kelola-berita') {
    setupBeritaPage();
  }
  if (document.body.dataset.page === 'masyarakat') {
    setupMasyarakatPage();
  }
});
