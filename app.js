/**
 * MANDIRI CHAMPION POSTER GENERATOR - BOOKING KUR & KUM
 * Official Micro Banking Region V / Jakarta 3 Digital Studio
 * Format: 16:9 Landscape (1920 x 1080 Full HD)
 * Featuring Cinematic Photorealistic Backgrounds & User Racing Track
 */

// -------------------------------------------------------------
// 1. STATE MANAGEMENT & TEMPLATES CONFIGURATION
// -------------------------------------------------------------
const TEMPLATES = [
  {
    id: 'tpl-racing-speed',
    name: '1. Fast Track Velocity',
    desc: 'Sirkuit Malam Balap F1 (Background Upload Anda)',
    icon: '🏎️',
    bgImage: 'backgrounds/bg_racing_speed.jpg',
    theme: 'speed',
    badge: 'PILIHAN ANDA'
  },
  {
    id: 'tpl-champion-gold',
    name: '2. Golden Champion Gala',
    desc: 'Panggung Megah Gala & Lampu Sorot Emas',
    icon: '🏆',
    bgImage: 'backgrounds/bg_champion_gold.jpg',
    theme: 'gold-dark'
  },
  {
    id: 'tpl-danantara-dark',
    name: '3. Danantara Sapphire',
    desc: 'Atrium Megah & Lampu Neon Futuristik',
    icon: '🛡️',
    bgImage: 'backgrounds/bg_danantara.jpg',
    theme: 'danantara'
  },
  {
    id: 'tpl-corporate-clean',
    name: '4. Corporate Executive',
    desc: 'Gedung Kaca Modern & Lantai Marmer',
    icon: '🏛️',
    bgImage: 'backgrounds/bg_corporate.jpg',
    theme: 'clean-white'
  },
  {
    id: 'tpl-victory-ribbon',
    name: '5. Victory Celebration',
    desc: 'Stadion Pesta Kembang Api & Konfeti',
    icon: '🎉',
    bgImage: 'backgrounds/bg_victory.jpg',
    theme: 'festive'
  },
  {
    id: 'tpl-cyber-podium',
    name: '6. Cyber Leaderboard',
    desc: 'Arena Digital & Podium Neon Hexagon',
    icon: '⚡',
    bgImage: 'backgrounds/bg_cyber.jpg',
    theme: 'cyber'
  },
  {
    id: 'tpl-prestige-marble',
    name: '7. Prestige Platinum',
    desc: 'Batu Marmer Hitam & Urat Emas Asli',
    icon: '👑',
    bgImage: 'backgrounds/bg_marble.jpg',
    theme: 'marble'
  },
  {
    id: 'tpl-radial-sunburst',
    name: '8. Sunburst Grandeur',
    desc: 'Pancaran Sinar Kejayaan & Bintang Emas',
    icon: '☀️',
    bgImage: 'backgrounds/bg_champion_gold.jpg',
    theme: 'sunburst'
  },
  {
    id: 'tpl-big-stat-editorial',
    name: '9. Big Stat Financial',
    desc: 'Editorial Wall Street & Tipografi Jumbo',
    icon: '📊',
    bgImage: 'backgrounds/bg_marble.jpg',
    theme: 'editorial'
  },
  {
    id: 'tpl-frost-glass',
    name: '10. Modern Frost Glass',
    desc: 'Glassmorphism Transparan & Ambient Glow',
    icon: '💎',
    bgImage: 'backgrounds/bg_danantara.jpg',
    theme: 'glass'
  }
];

// App State
const state = {
  category: 'KUR', // 'KUR' or 'KUM'
  unitName: 'KCP Jakarta Blok M Plaza',
  bookingAmount: 'Rp 14,850,000,000',
  targetBooking: 'Rp 10,450,000,000',
  jumlahDebitur: '38',
  pencapaianPercent: '142%',
  subMetric1: '38 Debitur Baru',
  subMetric2: '142% Target Booking',
  period: 'Periode: September 2026',
  region: 'Region V / Jakarta 3',
  headline: 'SELAMAT & SUKSES ATAS PENCAPAIAN TERTINGGI',
  activeTemplateId: 'tpl-racing-speed', // Default to User's Racing Background!
  members: []
};

// Background Image Cache
const loadedBackgrounds = {};

function preloadBackgroundImages() {
  const urls = [...new Set(TEMPLATES.map(t => t.bgImage))];
  urls.forEach(url => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      loadedBackgrounds[url] = img;
      const currentTpl = TEMPLATES.find(t => t.id === state.activeTemplateId);
      if (currentTpl && currentTpl.bgImage === url) {
        drawPosterCanvas();
      }
    };
    img.src = url;
  });
}

// -------------------------------------------------------------
// 2. SAMPLE DATA
// -------------------------------------------------------------
function initSampleData() {
  state.members = [
    { id: 1, name: 'Bambang Sugianto', role: 'BM', photoDataUrl: null, photoImg: null },
    { id: 2, name: 'Dewi Rahmawati', role: 'MBM/Penyelia Unit', photoDataUrl: null, photoImg: null },
    { id: 3, name: 'Arifin Parinduri', role: 'SGP', photoDataUrl: null, photoImg: null },
    { id: 4, name: 'Adetya Yandri', role: 'SGP', photoDataUrl: null, photoImg: null },
    { id: 5, name: 'Adri Fauzan', role: 'SGP', photoDataUrl: null, photoImg: null },
    { id: 6, name: 'Anisah Puspita', role: 'SGP', photoDataUrl: null, photoImg: null }
  ];
}

// -------------------------------------------------------------
// 3. UI RENDERING: TEMPLATE SELECTOR (WITH RICH THUMBNAILS)
// -------------------------------------------------------------
function renderTemplateSelector() {
  const container = document.getElementById('templateSelectorGrid');
  if (!container) return;

  container.innerHTML = TEMPLATES.map(tpl => `
    <div class="template-card ${tpl.id === state.activeTemplateId ? 'active' : ''}" 
         data-template-id="${tpl.id}"
         onclick="selectTemplate('${tpl.id}')">
      <div class="template-swatch" style="background-image: url('${tpl.bgImage}');">
        <div class="swatch-overlay"></div>
        <span class="tpl-icon">${tpl.icon}</span>
      </div>
      <div class="template-info">
        <h4 class="template-name">${tpl.name}</h4>
        <p class="template-desc">${tpl.desc}</p>
      </div>
    </div>
  `).join('');
}

function selectTemplate(templateId) {
  state.activeTemplateId = templateId;
  renderTemplateSelector();
  const tpl = TEMPLATES.find(t => t.id === templateId);
  const lbl = document.getElementById('currentTemplateLabel');
  if (lbl && tpl) {
    lbl.textContent = tpl.name;
  }
  drawPosterCanvas();
}

// -------------------------------------------------------------
// 4. UI RENDERING: TEAM MEMBER INPUTS & DYNAMIC SLOTS
// -------------------------------------------------------------
function renderTeamMembersInput() {
  const container = document.getElementById('membersInputContainer');
  if (!container) return;

  updateMemberCountBadge();

  container.innerHTML = state.members.map((member, idx) => `
    <div class="member-edit-card" data-member-id="${member.id}">
      <div class="member-card-num">#${idx + 1}</div>
      
      <div class="member-avatar-upload" onclick="document.getElementById('file_input_${member.id}').click()">
        ${member.photoDataUrl 
          ? `<img src="${member.photoDataUrl}" alt="${member.name}" class="avatar-preview-img">`
          : `<div class="avatar-placeholder-init">${getInitials(member.name)}</div>`
        }
        <div class="avatar-upload-overlay">
          <span>Ganti Foto</span>
        </div>
        <input type="file" id="file_input_${member.id}" accept="image/*" style="display:none;" 
               onchange="handleMemberPhotoUpload(event, ${member.id})">
      </div>

      <div class="member-fields-col">
        <div class="field-row">
          <input type="text" class="input-text-clean member-name-input" 
                 placeholder="Nama Pegawai / SGP" 
                 value="${member.name}" 
                 oninput="updateMemberName(${member.id}, this.value)">
        </div>
        <div class="field-row">
          <select class="input-text-clean member-role-input" 
                  onchange="updateMemberRole(${member.id}, this.value)">
            ${STANDARD_JABATAN_OPTIONS.map(opt => `
              <option value="${escapeHtml(opt)}" ${normalizeJabatan(member.role) === opt ? 'selected' : ''}>${escapeHtml(opt)}</option>
            `).join('')}
          </select>
        </div>
      </div>

      <button type="button" class="btn-remove-single-member" title="Hapus foto ini" onclick="removeSingleMember(${member.id})">
        ✕
      </button>
    </div>
  `).join('');
}

function updateMemberCountBadge() {
  const badge = document.getElementById('memberCountBadge');
  if (badge) {
    badge.textContent = `${state.members.length} Foto Anggota`;
  }
}

function getInitials(name) {
  if (!name) return 'MB';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function addMember(defaultName = '', defaultRole = 'SGP') {
  if (state.members.length >= 12) {
    showToast('Maksimal 12 foto untuk tata letak optimal!');
    return;
  }
  const newId = Date.now() + Math.floor(Math.random() * 1000);
  state.members.push({
    id: newId,
    name: defaultName || `Anggota ${state.members.length + 1}`,
    role: defaultRole,
    photoDataUrl: null,
    photoImg: null
  });
  renderTeamMembersInput();
  drawPosterCanvas();
}

function removeLastMember() {
  if (state.members.length <= 1) {
    showToast('Minimal 1 foto anggota untuk poster juara!');
    return;
  }
  state.members.pop();
  renderTeamMembersInput();
  drawPosterCanvas();
}

function removeSingleMember(id) {
  if (state.members.length <= 1) {
    showToast('Minimal 1 foto anggota tim!');
    return;
  }
  state.members = state.members.filter(m => m.id !== id);
  renderTeamMembersInput();
  drawPosterCanvas();
}

function updateMemberName(id, val) {
  const m = state.members.find(item => item.id === id);
  if (m) {
    m.name = val;
    drawPosterCanvas();
  }
}

function updateMemberRole(id, val) {
  const m = state.members.find(item => item.id === id);
  if (m) {
    m.role = val;
    drawPosterCanvas();
  }
}

function handleMemberPhotoUpload(e, memberId) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    const m = state.members.find(item => item.id === memberId);
    if (m) {
      m.photoDataUrl = dataUrl;
      const img = new Image();
      img.onload = function() {
        m.photoImg = img;
        renderTeamMembersInput();
        drawPosterCanvas();
      };
      img.src = dataUrl;
    }
  };
  reader.readAsDataURL(file);
}

function setPresetMemberCount(count) {
  const roles = ['BM', 'MBM', 'SGP Senior', 'SGP Micro', 'SGP Micro', 'SGP Micro', 'SGP Micro', 'SGP Micro', 'SGP Micro', 'SGP Micro', 'SGP Micro', 'SGP Micro'];
  const names = ['Bambang S.', 'Dewi R.', 'Arifin P.', 'Adetya Y.', 'Adri F.', 'Anisah P.', 'Rizky M.', 'Fajar H.', 'Siti A.', 'Hendra K.', 'Putri W.', 'Budi S.'];

  state.members = [];
  for (let i = 0; i < count; i++) {
    state.members.push({
      id: Date.now() + i,
      name: names[i] || `Tim ${i + 1}`,
      role: roles[i] || 'SGP',
      photoDataUrl: null,
      photoImg: null
    });
  }

  // Update preset pill active state
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.count) === count);
  });

  renderTeamMembersInput();
  drawPosterCanvas();
  showToast(`Jumlah foto diatur ke ${count} orang`);
}

// -------------------------------------------------------------
// 5. EVENT LISTENERS SETUP
// -------------------------------------------------------------
function setupEventListeners() {
  // Category Selector (Buttons)
  document.querySelectorAll('.btn-category').forEach(btn => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.category || 'KUR';
      document.querySelectorAll('.btn-category').forEach(b => b.classList.toggle('active', b === btn));
      if (state.category === 'KUR') {
        state.bookingAmount = 'Rp 14,850,000,000';
        state.targetBooking = 'Rp 10,450,000,000';
        state.jumlahDebitur = '38';
      } else {
        state.bookingAmount = 'Rp 9,620,000,000';
        state.targetBooking = 'Rp 7,500,000,000';
        state.jumlahDebitur = '26';
      }
      calculateTargetAchievement();
      syncInputsFromState();
      drawPosterCanvas();
    });
  });

  // Inputs
  const bindInput = (id, stateKey) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', (e) => {
      state[stateKey] = e.target.value;
      drawPosterCanvas();
    });
  };

  bindInput('inputUnitName', 'unitName');
  // Formatting Rupiah dengan koma pemisah kelipatan (ribuan, ratusan ribu, jutaan, dst)
  function formatRupiahWithCommas(raw) {
    const digits = String(raw || '').replace(/\D/g, '');
    if (!digits) return '';
    return 'Rp ' + digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const elBooking = document.getElementById('inputBookingAmount');
  if (elBooking) {
    elBooking.addEventListener('input', (e) => {
      const el = e.target;
      const originalVal = el.value;
      const cursorPos = el.selectionStart || 0;

      // Hitung berapa banyak digit angka sebelum posisi cursor saat ini
      const digitsBeforeCursor = originalVal.slice(0, cursorPos).replace(/\D/g, '').length;

      const rawDigits = originalVal.replace(/\D/g, '');
      if (!rawDigits) {
        el.value = '';
        state.bookingAmount = '';
        calculateTargetAchievement();
        drawPosterCanvas();
        return;
      }

      const formatted = formatRupiahWithCommas(rawDigits);
      el.value = formatted;
      state.bookingAmount = formatted;
      calculateTargetAchievement();
      drawPosterCanvas();

      // Pulihkan posisi kursor dengan presisi agar tidak melompat ke ujung
      let newCursorPos = formatted.length;
      let digitsCount = 0;
      for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted[i])) {
          digitsCount++;
        }
        if (digitsCount === digitsBeforeCursor) {
          newCursorPos = i + 1;
          break;
        }
      }
      if (digitsBeforeCursor === 0) {
        newCursorPos = formatted.indexOf(rawDigits[0]) || 3;
      }
      if (newCursorPos > formatted.length) newCursorPos = formatted.length;
      try {
        el.setSelectionRange(newCursorPos, newCursorPos);
      } catch (err) {}
    });

    // Cegah pengetikan karakter selain angka 0-9
    elBooking.addEventListener('keydown', (e) => {
      const allowedKeys = [
        'Backspace', 'Tab', 'Enter', 'Delete', 'Escape',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End'
      ];
      if (allowedKeys.includes(e.key)) return;
      if (e.ctrlKey || e.metaKey) return;
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });

    // Tangani paste: hanya ekstrak angka dan format ulang dengan koma
    elBooking.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData('text');
      const cleanDigits = pasteData.replace(/\D/g, '');
      if (!cleanDigits) return;

      const start = elBooking.selectionStart || 0;
      const end = elBooking.selectionEnd || 0;
      const currVal = elBooking.value;
      const beforeDigits = currVal.slice(0, start).replace(/\D/g, '');
      const afterDigits = currVal.slice(end).replace(/\D/g, '');
      const combined = beforeDigits + cleanDigits + afterDigits;

      const formatted = formatRupiahWithCommas(combined);
      elBooking.value = formatted;
      state.bookingAmount = formatted;
      drawPosterCanvas();
    });
  }
  bindInput('inputSubMetric1', 'subMetric1');
  bindInput('inputSubMetric2', 'subMetric2');
  bindInput('inputPeriod', 'period');
  bindInput('inputRegion', 'region');
  bindInput('inputHeadline', 'headline');

  // Target Booking Input Handling (Formatted with Comma & Digits Only)
  const elTarget = document.getElementById('inputTargetBooking');
  if (elTarget) {
    elTarget.addEventListener('input', (e) => {
      const el = e.target;
      const originalVal = el.value;
      const cursorPos = el.selectionStart || 0;
      const digitsBeforeCursor = originalVal.slice(0, cursorPos).replace(/\D/g, '').length;

      const rawDigits = originalVal.replace(/\D/g, '');
      if (!rawDigits) {
        el.value = '';
        state.targetBooking = '';
        calculateTargetAchievement();
        drawPosterCanvas();
        return;
      }

      const formatted = formatRupiahWithCommas(rawDigits);
      el.value = formatted;
      state.targetBooking = formatted;
      calculateTargetAchievement();
      drawPosterCanvas();

      let newCursorPos = formatted.length;
      let digitsCount = 0;
      for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted[i])) digitsCount++;
        if (digitsCount === digitsBeforeCursor) {
          newCursorPos = i + 1;
          break;
        }
      }
      if (digitsBeforeCursor === 0) newCursorPos = formatted.indexOf(rawDigits[0]) || 3;
      if (newCursorPos > formatted.length) newCursorPos = formatted.length;
      try { el.setSelectionRange(newCursorPos, newCursorPos); } catch (err) {}
    });

    elTarget.addEventListener('keydown', (e) => {
      const allowedKeys = ['Backspace', 'Tab', 'Enter', 'Delete', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;
      if (!/^[0-9]$/.test(e.key)) e.preventDefault();
    });

    elTarget.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData('text');
      const cleanDigits = pasteData.replace(/\D/g, '');
      if (!cleanDigits) return;
      const start = elTarget.selectionStart || 0;
      const end = elTarget.selectionEnd || 0;
      const currVal = elTarget.value;
      const beforeDigits = currVal.slice(0, start).replace(/\D/g, '');
      const afterDigits = currVal.slice(end).replace(/\D/g, '');
      const combined = beforeDigits + cleanDigits + afterDigits;
      const formatted = formatRupiahWithCommas(combined);
      elTarget.value = formatted;
      state.targetBooking = formatted;
      calculateTargetAchievement();
      drawPosterCanvas();
    });
  }

  // Jumlah Debitur Input Handling (HANYA BISA DIISI ANGKA)
  const elDebitur = document.getElementById('inputJumlahDebitur');
  if (elDebitur) {
    elDebitur.addEventListener('input', (e) => {
      // Hapus karakter non-angka secara instan
      const cleanDigits = e.target.value.replace(/\D/g, '');
      e.target.value = cleanDigits;
      state.jumlahDebitur = cleanDigits;
      const debLabel = state.category === 'KUM' ? 'Debitur KUM' : 'Debitur Baru';
      state.subMetric1 = cleanDigits ? `${cleanDigits} ${debLabel}` : '0 Debitur';
      drawPosterCanvas();
    });

    // Cegah pengetikan huruf atau simbol (hanya 0-9 dan tombol navigasi/edit)
    elDebitur.addEventListener('keydown', (e) => {
      const allowedKeys = [
        'Backspace', 'Tab', 'Enter', 'Delete', 'Escape',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End'
      ];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });

    // Cegah paste huruf
    elDebitur.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData('text');
      const cleanDigits = pasteData.replace(/\D/g, '');
      elDebitur.value = cleanDigits;
      state.jumlahDebitur = cleanDigits;
      const debLabel = state.category === 'KUM' ? 'Debitur KUM' : 'Debitur Baru';
      state.subMetric1 = cleanDigits ? `${cleanDigits} ${debLabel}` : '0 Debitur';
      drawPosterCanvas();
    });
  }


  // Unified inputSubMetric listener
  const elSub = document.getElementById('inputSubMetric');
  if (elSub) {
    elSub.addEventListener('input', (e) => {
      const val = e.target.value;
      if (val.includes('•')) {
        const parts = val.split('•');
        state.subMetric1 = parts[0].trim();
        state.subMetric2 = parts[1].trim();
      } else if (val.includes('|')) {
        const parts = val.split('|');
        state.subMetric1 = parts[0].trim();
        state.subMetric2 = parts[1].trim();
      } else {
        state.subMetric1 = val;
      }
      drawPosterCanvas();
    });
  }

  // Preset Member Count Buttons (.btn-preset & .preset-btn)
  document.querySelectorAll('.btn-preset, .preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const count = parseInt(btn.dataset.count);
      setPresetMemberCount(count);
    });
  });

  // Add / Remove Member Buttons
  const btnAdd = document.getElementById('btnAddMember');
  if (btnAdd) btnAdd.addEventListener('click', () => addMember());

  const btnRemove = document.getElementById('btnRemoveMember');
  if (btnRemove) btnRemove.addEventListener('click', () => removeLastMember());

  // Sample Data Button
  const btnSample = document.getElementById('btnLoadSample');
  if (btnSample) {
    btnSample.addEventListener('click', () => {
      initSampleData();
      state.unitName = 'KCP Jakarta Blok M Plaza';
      state.bookingAmount = 'Rp 14,850,000,000';
      state.targetBooking = 'Rp 10,450,000,000';
      state.jumlahDebitur = '38';
      calculateTargetAchievement();
      state.period = 'Periode: September 2026';
      state.region = 'Region V / Jakarta 3';
      syncInputsFromState();
      renderTeamMembersInput();
      drawPosterCanvas();
      showToast('Data contoh berhasil dimuat!');
    });
  }

  // Download PNG & JPG
  const btnPng = document.getElementById('btnDownloadPNG');
  if (btnPng) btnPng.addEventListener('click', () => downloadPoster('png'));

  const btnJpg = document.getElementById('btnDownloadJPG');
  if (btnJpg) btnJpg.addEventListener('click', () => downloadPoster('jpeg'));

  // WhatsApp Message
  const btnWa = document.getElementById('btnCopyWhatsApp');
  if (btnWa) btnWa.addEventListener('click', copyWhatsAppMessage);
}


function calculateTargetAchievement() {
  const totalNum = parseFloat((state.bookingAmount || '').replace(/\D/g, '')) || 0;
  const targetNum = parseFloat((state.targetBooking || '').replace(/\D/g, '')) || 0;

  let pct = 0;
  if (targetNum > 0 && totalNum > 0) {
    pct = (totalNum / targetNum) * 100;
  }

  let formattedPct = '0%';
  if (pct > 0) {
    formattedPct = (pct % 1 === 0 ? pct.toFixed(0) : pct.toFixed(1)) + '%';
  }

  state.pencapaianPercent = formattedPct;
  state.subMetric2 = `${formattedPct} Target Booking`;

  const debDigits = String(state.jumlahDebitur || '').replace(/\D/g, '');
  const debLabel = state.category === 'KUM' ? 'Debitur KUM' : 'Debitur Baru';
  state.subMetric1 = debDigits ? `${debDigits} ${debLabel}` : '0 Debitur';

  const elPct = document.getElementById('inputPencapaianPercent');
  const elInd = document.getElementById('calcStatusIndicator');

  if (elPct) {
    if (targetNum > 0 && totalNum > 0) {
      if (pct >= 100) {
        elPct.value = `${formattedPct} (Target Tercapai 🎉)`;
        elPct.className = 'form-input calc-result-input calc-success';
        if (elInd) {
          elInd.textContent = formattedPct;
          elInd.className = 'calc-status-indicator ind-success';
        }
      } else {
        elPct.value = `${formattedPct} (Belum Tercapai)`;
        elPct.className = 'form-input calc-result-input calc-warning';
        if (elInd) {
          elInd.textContent = formattedPct;
          elInd.className = 'calc-status-indicator ind-warning';
        }
      }
    } else {
      elPct.value = '0%';
      elPct.className = 'form-input calc-result-input';
      if (elInd) {
        elInd.textContent = '0%';
        elInd.className = 'calc-status-indicator';
      }
    }
  }
}

function syncInputsFromState() {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };
  setVal('inputUnitName', state.unitName);
  setVal('inputBookingAmount', state.bookingAmount);
  setVal('inputTargetBooking', state.targetBooking || 'Rp 10,450,000,000');
  setVal('inputJumlahDebitur', String(state.jumlahDebitur || '38').replace(/\D/g, ''));
  calculateTargetAchievement();
  setVal('inputPeriod', state.period);
  setVal('inputRegion', state.region);
  setVal('inputHeadline', state.headline);

  document.querySelectorAll('.btn-category').forEach(b => {
    b.classList.toggle('active', b.dataset.category === state.category);
  });
}

// -------------------------------------------------------------
// 6. CANVAS ENGINE: 1920 x 1080 LANDSCAPE RENDERING
// -------------------------------------------------------------
function drawPosterCanvas() {
  const canvas = document.getElementById('posterCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Exact 16:9 Full HD Landscape
  const W = 1920;
  const H = 1080;
  canvas.width = W;
  canvas.height = H;

  ctx.clearRect(0, 0, W, H);

  // Dispatch to selected Landscape template renderer
  switch (state.activeTemplateId) {
    case 'tpl-racing-speed':
      renderTemplateRacingSpeed(ctx, W, H);
      break;
    case 'tpl-danantara-dark':
      renderTemplateDanantaraDark(ctx, W, H);
      break;
    case 'tpl-corporate-clean':
      renderTemplateCorporateClean(ctx, W, H);
      break;
    case 'tpl-victory-ribbon':
      renderTemplateVictoryRibbon(ctx, W, H);
      break;
    case 'tpl-cyber-podium':
      renderTemplateCyberPodium(ctx, W, H);
      break;
    case 'tpl-prestige-marble':
      renderTemplatePrestigeMarble(ctx, W, H);
      break;
    case 'tpl-radial-sunburst':
      renderTemplateRadialSunburst(ctx, W, H);
      break;
    case 'tpl-big-stat-editorial':
      renderTemplateBigStatEditorial(ctx, W, H);
      break;
    case 'tpl-frost-glass':
      renderTemplateFrostGlass(ctx, W, H);
      break;
    case 'tpl-champion-gold':
    default:
      renderTemplateGoldenChampion(ctx, W, H);
      break;
  }
}

// Draw Background with Smart Fallback
function drawBackgroundImage(ctx, bgUrl, W, H, fallbackGradFn) {
  const img = loadedBackgrounds[bgUrl];
  if (img && img.complete && img.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, W, H);
  } else if (fallbackGradFn) {
    fallbackGradFn(ctx, W, H);
  }
}

// =============================================================
// =============================================================
// TEMPLATE 1: FAST TRACK VELOCITY (HIGH-OCTANE F1 CHAMPIONSHIP)
// Redesigned to match the stunning 'Menyala' reference:
// - F1 Night Circuit with Bank Mandiri race car & golden confetti
// - Dual Beveled Sci-Fi/Racing Glass Chassis with Gold & Cyan Neon Glow
// - Juara 1 Header with Racing Checkered Flag Wings
// - Golden Trophy with Crossed Racing Flags & Laurel Wreath
// - 3D Metallic Gold Embossed Booking Amount
// - Side-by-side Dual Stat Pills (Debitur & Target)
// - Inspirational Quote & Mandiri Region V Tag
// - The Winning Team & Squad Hero with Hazard Stripes & Golden Laurel Avatars
// =============================================================

function drawLaurelLeafPair(ctx, x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.fillStyle = '#FFD700';

  // Left leaf
  ctx.beginPath();
  ctx.ellipse(6, -3, 6, 2.5, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  // Right leaf
  ctx.beginPath();
  ctx.ellipse(-6, -3, 6, 2.5, -Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawBeveledChassis(ctx, x, y, w, h, bevel = 26, isRight = false) {
  ctx.save();
  function createBevelPath(bx, by, bw, bh, b) {
    ctx.beginPath();
    ctx.moveTo(bx + b, by);
    ctx.lineTo(bx + bw - b, by);
    ctx.lineTo(bx + bw, by + b);
    ctx.lineTo(bx + bw, by + bh - b);
    ctx.lineTo(bx + bw - b, by + bh);
    ctx.lineTo(bx + b, by + bh);
    ctx.lineTo(bx, by + bh - b);
    ctx.lineTo(bx, by + b);
    ctx.closePath();
  }

  // Outer ambient shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 163, 255, 0.45)';
  ctx.shadowBlur = 32;
  createBevelPath(x, y, w, h, bevel);
  ctx.fillStyle = 'rgba(0, 14, 38, 0.94)';
  ctx.fill();
  ctx.restore();

  // Glass gradient fill
  createBevelPath(x, y, w, h, bevel);
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, 'rgba(0, 26, 68, 0.92)');
  grad.addColorStop(0.35, 'rgba(1, 16, 42, 0.88)');
  grad.addColorStop(0.7, 'rgba(0, 20, 52, 0.89)');
  grad.addColorStop(1, 'rgba(0, 32, 82, 0.94)');
  ctx.fillStyle = grad;
  ctx.fill();

  // Outer Gold Metallic Border
  ctx.save();
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.55)';
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.restore();

  // Inner Cyan Neon Accent Line (inset by 6px)
  ctx.save();
  createBevelPath(x + 6, y + 6, w - 12, h - 12, Math.max(bevel - 4, 8));
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
  ctx.lineWidth = 1.5;
  ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.restore();

  // Decorative Corner Screws / Tech Bolts
  const corners = [
    [x + bevel + 8, y + 14],
    [x + w - bevel - 8, y + 14],
    [x + w - 14, y + bevel + 8],
    [x + w - 14, y + h - bevel - 8],
    [x + w - bevel - 8, y + h - 14],
    [x + bevel + 8, y + h - 14],
    [x + 14, y + h - bevel - 8],
    [x + 14, y + bevel + 8]
  ];
  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#00F0FF';
    ctx.fill();
  });

  ctx.restore();
}

function drawRacingCheckeredHeader(ctx, x, y, w, h, category) {
  ctx.save();
  const b = 14;
  ctx.beginPath();
  ctx.moveTo(x + b, y);
  ctx.lineTo(x + w - b, y);
  ctx.lineTo(x + w, y + b);
  ctx.lineTo(x + w, y + h - b);
  ctx.lineTo(x + w - b, y + h);
  ctx.lineTo(x + b, y + h);
  ctx.lineTo(x, y + h - b);
  ctx.lineTo(x, y + b);
  ctx.closePath();

  const grad = ctx.createLinearGradient(x, y, x + w, y);
  grad.addColorStop(0, '#002B7A');
  grad.addColorStop(0.5, '#001A44');
  grad.addColorStop(1, '#002B7A');
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
  ctx.shadowBlur = 8;
  ctx.stroke();

  // Checkered pattern on left & right wings
  drawCheckeredWing(ctx, x + 8, y + 6, 95, h - 12);
  drawCheckeredWing(ctx, x + w - 103, y + 6, 95, h - 12);

  // Center Text with Trophy Icon
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 6;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 18.5px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1.5px';
  ctx.fillStyle = '#FFD700';
  ctx.fillText(`🏆 JUARA 1 BOOKING ${category} TERTINGGI`, x + w / 2, y + h / 2);

  ctx.restore();
}

function drawCheckeredWing(ctx, wx, wy, ww, wh) {
  ctx.save();
  const cols = 8;
  const rows = 3;
  const cw = ww / cols;
  const ch = wh / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isAlt = (r + c) % 2 === 0;
      ctx.fillStyle = isAlt ? 'rgba(0, 163, 255, 0.85)' : 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(wx + c * cw, wy + r * ch, cw, ch);
    }
  }
  ctx.restore();
}

function drawGrandTrophyWithFlags(ctx, cx, cy, size = 46) {
  ctx.save();
  // Crossed racing flags
  drawSingleRacingFlag(ctx, cx - 42, cy - 8, 44, 30, -0.28);
  drawSingleRacingFlag(ctx, cx + 42, cy - 8, 44, 30, 0.28, true);
  // Laurel wreath around trophy
  drawGoldenLaurelWreathMember(ctx, cx, cy, size * 1.05);
  // Center trophy cup
  drawGoldenTrophy(ctx, cx, cy + 4, size * 0.9);
  ctx.restore();
}

function drawSingleRacingFlag(ctx, x, y, w, h, angle, flip = false) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  if (flip) ctx.scale(-1, 1);

  ctx.fillStyle = '#CBD5E1';
  ctx.fillRect(-2, -h / 2, 3, h + 20);

  const cols = 4;
  const rows = 3;
  const cw = w / cols;
  const ch = h / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#0F172A' : '#FFFFFF';
      ctx.fillRect(c * cw, -h / 2 + r * ch, cw, ch);
    }
  }
  ctx.restore();
}

function drawF1BookingBox(ctx, x, y, w, h) {
  ctx.save();
  const b = 16;
  ctx.beginPath();
  ctx.moveTo(x + b, y);
  ctx.lineTo(x + w - b, y);
  ctx.lineTo(x + w, y + b);
  ctx.lineTo(x + w, y + h - b);
  ctx.lineTo(x + w - b, y + h);
  ctx.lineTo(x + b, y + h);
  ctx.lineTo(x, y + h - b);
  ctx.lineTo(x, y + b);
  ctx.closePath();

  const bgGrad = ctx.createLinearGradient(x, y, x, y + h);
  bgGrad.addColorStop(0, 'rgba(0, 16, 42, 0.95)');
  bgGrad.addColorStop(1, 'rgba(0, 24, 60, 0.97)');
  ctx.fillStyle = bgGrad;
  ctx.fill();

  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 3;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.45)';
  ctx.shadowBlur = 10;
  ctx.stroke();

  // Top Trapezoid Gold Ribbon Tag
  const tabW = 340;
  const tabH = 30;
  const tabX = x + (w - tabW) / 2;
  const tabY = y - tabH / 2;
  const tabB = 10;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(tabX + tabB, tabY);
  ctx.lineTo(tabX + tabW - tabB, tabY);
  ctx.lineTo(tabX + tabW, tabY + tabH);
  ctx.lineTo(tabX, tabY + tabH);
  ctx.closePath();

  const tabGrad = ctx.createLinearGradient(tabX, tabY, tabX + tabW, tabY + tabH);
  tabGrad.addColorStop(0, '#FFE082');
  tabGrad.addColorStop(0.5, '#FFD700');
  tabGrad.addColorStop(1, '#FF9100');
  ctx.fillStyle = tabGrad;
  ctx.fill();
  ctx.strokeStyle = '#FFF8E1';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 13px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillStyle = '#001B44';
  ctx.fillText(`TOTAL CAPAIAN BOOKING ${state.category}`, tabX + tabW / 2, tabY + tabH / 2);
  ctx.restore();

  // Grand Amount Text (3D Metallic Gold)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 60px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 6;

  const textGrad = ctx.createLinearGradient(x + 50, y + 30, x + 50, y + h - 10);
  textGrad.addColorStop(0, '#FFFFFF');
  textGrad.addColorStop(0.18, '#FFF4B8');
  textGrad.addColorStop(0.5, '#FFD700');
  textGrad.addColorStop(0.85, '#FF9E00');
  textGrad.addColorStop(1, '#FFB700');

  ctx.fillStyle = textGrad;
  ctx.fillText(state.bookingAmount || 'Rp 14,850,000,000', x + w / 2, y + h / 2 + 8);
  ctx.restore();
  ctx.restore();
}

function drawStatPill(ctx, x, y, w, h, iconType, label, value) {
  ctx.save();
  const b = 12;
  ctx.beginPath();
  ctx.moveTo(x + b, y);
  ctx.lineTo(x + w - b, y);
  ctx.lineTo(x + w, y + b);
  ctx.lineTo(x + w, y + h - b);
  ctx.lineTo(x + w - b, y + h);
  ctx.lineTo(x + b, y + h);
  ctx.lineTo(x, y + h - b);
  ctx.lineTo(x, y + b);
  ctx.closePath();

  ctx.fillStyle = 'rgba(0, 22, 54, 0.94)';
  ctx.fill();

  ctx.strokeStyle = '#00F0FF';
  ctx.lineWidth = 1.8;
  ctx.shadowColor = 'rgba(0, 240, 255, 0.5)';
  ctx.shadowBlur = 8;
  ctx.stroke();

  // Icon Circle Badge
  const iconR = 20;
  const iconX = x + 34;
  const iconY = y + h / 2;

  ctx.beginPath();
  ctx.arc(iconX, iconY, iconR, 0, Math.PI * 2);
  ctx.fillStyle = '#003D79';
  ctx.fill();
  ctx.strokeStyle = '#00F0FF';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '19px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(iconType === 'bank' ? '🏛️' : '🎯', iconX, iconY + 1);

  ctx.textAlign = 'left';
  ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(label.toUpperCase(), iconX + 28, y + 24);

  ctx.font = '900 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(value, iconX + 28, y + 46);

  ctx.restore();
}

function drawF1QuoteBox(ctx, x, y, w, h) {
  ctx.save();
  const b = 10;
  ctx.beginPath();
  ctx.moveTo(x + b, y);
  ctx.lineTo(x + w - b, y);
  ctx.lineTo(x + w, y + b);
  ctx.lineTo(x + w, y + h - b);
  ctx.lineTo(x + w - b, y + h);
  ctx.lineTo(x + b, y + h);
  ctx.lineTo(x, y + h - b);
  ctx.lineTo(x, y + b);
  ctx.closePath();

  ctx.fillStyle = 'rgba(0, 16, 40, 0.90)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Quote Icon
  ctx.textAlign = 'left';
  ctx.font = '800 32px serif';
  ctx.fillStyle = '#FFD700';
  ctx.fillText('“', x + 16, y + 36);

  // Quote Text
  ctx.font = 'italic 500 12.5px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#E2E8F0';
  const qLine1 = 'Pencapaian luar biasa ini merupakan wujud nyata kerja keras, dedikasi, dan sinergi seluruh pejuang di wilayah.';
  const qLine2 = 'Mari terus menjaga semangat, memperkuat kolaborasi, dan melangkah lebih jauh bersama untuk hasil yang lebih baik.';
  ctx.fillText(qLine1, x + 44, y + 26);
  ctx.fillText(qLine2, x + 44, y + 46);

  // Footer Tag
  ctx.font = '800 11.5px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#FFD700';
  ctx.fillText('MICRO BANKING REGION V / JAKARTA 3', x + 44, y + 74);

  ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('PT Bank Mandiri (Persero) Tbk. — Satu Mandiri, Satu Mimpi', x + 44, y + 90);

  ctx.restore();
}

function drawHazardStripes(ctx, x, y, w, h) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  ctx.fillStyle = '#FFD700';
  ctx.fillRect(x, y, w, h);

  const stripeW = 12;
  ctx.fillStyle = '#00142E';
  for (let sx = x - h; sx < x + w + h; sx += stripeW * 2) {
    ctx.beginPath();
    ctx.moveTo(sx, y);
    ctx.lineTo(sx + stripeW, y);
    ctx.lineTo(sx + stripeW - h, y + h);
    ctx.lineTo(sx - h, y + h);
    ctx.closePath();
    ctx.fill();
  }

  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x, y, w, h);
  ctx.restore();
}

function drawHeroMemberBadgeF1(ctx, member, cx, cy, r = 48) {
  ctx.save();

  // 1. Golden Laurel Wreath
  drawGoldenLaurelWreathMember(ctx, cx, cy, r + 12);

  // 2. Avatar Base
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 6;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = '#002B49';
  ctx.fill();
  ctx.restore();

  // 3. Photo or Monogram
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  if (member.photoImg && member.photoImg.complete && member.photoImg.naturalWidth > 0) {
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(member.photoImg, cx - r, cy - r, r * 2, r * 2);
  } else {
    const grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    grad.addColorStop(0, '#003D79');
    grad.addColorStop(0.5, '#002B49');
    grad.addColorStop(1, '#001B36');
    ctx.fillStyle = grad;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `900 ${Math.round(r * 0.72)}px "Outfit", "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 6;
    ctx.fillText(getInitials(member.name || 'P'), cx, cy + 2);
  }
  ctx.restore();

  // 4. Rings: Outer Gold, Inner Cyan
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
  ctx.shadowBlur = 8;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, r - 3.5, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // 5. Golden Ribbon Banner below Avatar
  const bannerW = 205;
  const bannerH = 46;
  const bx = cx - bannerW / 2;
  const by = cy + r + 14;
  const b = 10;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(bx + b, by);
  ctx.lineTo(bx + bannerW - b, by);
  ctx.lineTo(bx + bannerW, by + b);
  ctx.lineTo(bx + bannerW, by + bannerH - b);
  ctx.lineTo(bx + bannerW - b, by + bannerH);
  ctx.lineTo(bx + b, by + bannerH);
  ctx.lineTo(bx, by + bannerH - b);
  ctx.lineTo(bx, by + b);
  ctx.closePath();

  const bGrad = ctx.createLinearGradient(bx, by, bx + bannerW, by + bannerH);
  bGrad.addColorStop(0, '#FFE082');
  bGrad.addColorStop(0.5, '#FFD700');
  bGrad.addColorStop(1, '#FF9100');
  ctx.fillStyle = bGrad;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 4;
  ctx.fill();

  ctx.strokeStyle = '#FFF9C4';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 13.5px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#001B44';
  ctx.shadowColor = 'transparent';
  ctx.fillText(member.name || 'Nama Pegawai', cx, by + 16);

  ctx.font = '700 10.5px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#002B49';
  ctx.fillText(member.role || 'Role', cx, by + 32);

  ctx.restore();
  ctx.restore();
}

function drawGoldenLaurelWreathMember(ctx, cx, cy, radius) {
  ctx.save();
  ctx.fillStyle = '#FFD700';
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.arc(cx, cy, radius, Math.PI * 0.58, Math.PI * 1.42);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, radius, Math.PI * 1.58, Math.PI * 2.42);
  ctx.stroke();

  const leafCount = 6;
  for (let i = 0; i <= leafCount; i++) {
    const angleLeft = Math.PI * 0.62 + (i / leafCount) * Math.PI * 0.74;
    const lx = cx + Math.cos(angleLeft) * radius;
    const ly = cy + Math.sin(angleLeft) * radius;
    drawLaurelLeafPair(ctx, lx, ly, angleLeft + Math.PI / 2);

    const angleRight = Math.PI * 1.62 + (i / leafCount) * Math.PI * 0.74;
    const rx = cx + Math.cos(angleRight) * radius;
    const ry = cy + Math.sin(angleRight) * radius;
    drawLaurelLeafPair(ctx, rx, ry, angleRight + Math.PI / 2);
  }
  ctx.restore();
}

function drawDynamicF1TeamGrid(ctx, members, panelX, panelY, panelW, panelH) {
  const n = members.length;
  if (n === 0) return;

  const startY = panelY + 130;
  const cxCenter = panelX + panelW / 2;

  if (n <= 3) {
    const spacingX = panelW / (n + 1);
    const rowY = startY + 200;
    members.forEach((m, i) => {
      drawHeroMemberBadgeF1(ctx, m, panelX + spacingX * (i + 1), rowY, 52);
    });
  } else if (n <= 6) {
    // 2 rows of 3 columns (matching the reference image exactly!)
    const cols = 3;
    const colSpacing = (panelW - 100) / cols;
    const colXs = [
      panelX + 50 + colSpacing * 0.5,
      panelX + 50 + colSpacing * 1.5,
      panelX + 50 + colSpacing * 2.5
    ];
    const row1Y = startY + 95;
    const row2Y = startY + 315;

    members.forEach((m, i) => {
      let x, y;
      if (i < 3) {
        x = colXs[i];
        y = row1Y;
      } else {
        const row2Count = n - 3;
        if (row2Count === 1) {
          x = cxCenter;
        } else if (row2Count === 2) {
          x = i === 3 ? cxCenter - colSpacing * 0.6 : cxCenter + colSpacing * 0.6;
        } else {
          x = colXs[i - 3];
        }
        y = row2Y;
      }
      drawHeroMemberBadgeF1(ctx, m, x, y, 48);
    });
  } else if (n <= 8) {
    const cols = 4;
    const colSpacing = (panelW - 60) / cols;
    const row1Y = startY + 95;
    const row2Y = startY + 315;
    members.forEach((m, i) => {
      const row = i < 4 ? 0 : 1;
      const col = i % 4;
      const x = panelX + 30 + colSpacing * (col + 0.5);
      const y = row === 0 ? row1Y : row2Y;
      drawHeroMemberBadgeF1(ctx, m, x, y, 42);
    });
  } else {
    const cols = 5;
    const colSpacing = (panelW - 40) / cols;
    const row1Y = startY + 95;
    const row2Y = startY + 315;
    members.forEach((m, i) => {
      const row = i < 5 ? 0 : 1;
      const col = i % 5;
      const x = panelX + 20 + colSpacing * (col + 0.5);
      const y = row === 0 ? row1Y : row2Y;
      drawHeroMemberBadgeF1(ctx, m, x, y, 38);
    });
  }
}

function renderTemplateRacingSpeed(ctx, W, H) {
  try {
    // 1. Draw High-Octane Formula 1 Night Circuit Background
    drawBackgroundImage(ctx, 'backgrounds/bg_racing_speed.jpg', W, H, (c, w, h) => {
      const grad = c.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#001026');
      grad.addColorStop(1, '#002B49');
      c.fillStyle = grad;
      c.fillRect(0, 0, w, h);
    });

    // 2. Official Bank Mandiri Logo (Top Left)
    drawMandiriLogo(ctx, 60, 32, false);

    // 3. LEFT CHASSIS: Unit & Achievement Showcase (x: 55, y: 95, w: 840, h: 685)
    const leftX = 55;
    const leftY = 95;
    const leftW = 840;
    const leftH = 685;
    const leftCX = leftX + leftW / 2;

    drawBeveledChassis(ctx, leftX, leftY, leftW, leftH, 24);

    // A. Header Badge with Checkered Flag Wings
    drawRacingCheckeredHeader(ctx, leftX + 40, leftY + 18, leftW - 80, 48, state.category || 'KUR');

    // B. Golden Championship Trophy with Crossed Checkered Flags & Laurel
    drawGrandTrophyWithFlags(ctx, leftCX, leftY + 115, 46);

    // C. Greeting / Subhead
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 16px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '1.5px';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 6;
    ctx.fillText('SELAMAT & SUKSES ATAS PENCAPAIAN TERTINGGI', leftCX, leftY + 168);

    // D. Unit Name (Grand Title)
    ctx.font = '900 44px "Outfit", "Plus Jakarta Sans", sans-serif';
    const nameGrad = ctx.createLinearGradient(leftCX - 200, 0, leftCX + 200, 0);
    nameGrad.addColorStop(0, '#FFFFFF');
    nameGrad.addColorStop(0.5, '#E0F7FA');
    nameGrad.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = nameGrad;
    ctx.shadowColor = 'rgba(0, 240, 255, 0.7)';
    ctx.shadowBlur = 16;
    const uName = (state.unitName || 'KCP Jakarta Blok M Plaza').toUpperCase();
    ctx.fillText(uName, leftCX, leftY + 215);

    // E. Period & Region Subtitle
    ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.shadowColor = 'transparent';
    ctx.fillText(`${state.period || 'Periode: September 2026'} - ${state.region || 'Region V / Jakarta 3'}`, leftCX, leftY + 248);
    ctx.restore();

    // F. Total Capaian Booking Box (3D Metallic Gold)
    drawF1BookingBox(ctx, leftX + 30, leftY + 275, leftW - 60, 130);

    // G. Two Stat Pills (Debitur & Target)
    const pillW = (leftW - 75) / 2;
    const pillY = leftY + 422;
    drawStatPill(ctx, leftX + 30, pillY, pillW, 64, 'bank', 'DEBITUR TEREALISASI', state.subMetric1 || '38 Debitur Baru');
    drawStatPill(ctx, leftX + 30 + pillW + 15, pillY, pillW, 64, 'target', 'TARGET ACHIEVEMENT', state.subMetric2 || '142% Target Booking');

    // H. Bottom Inspirational Quote Box
    drawF1QuoteBox(ctx, leftX + 30, leftY + 502, leftW - 60, 108);

    // 4. RIGHT CHASSIS: THE WINNING TEAM & SQUAD HERO (x: 935, y: 95, w: 930, h: 715)
    const rightX = 935;
    const rightY = 95;
    const rightW = 930;
    const rightH = 715;
    const rightCX = rightX + rightW / 2;

    drawBeveledChassis(ctx, rightX, rightY, rightW, rightH, 24, true);

    // A. Panel Header Title
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFD700';
    ctx.font = '900 24px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '1.5px';
    ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillText('★  THE WINNING TEAM & SQUAD HERO  ★', rightCX, rightY + 42);

    // B. Racing Hazard Stripe Bar
    drawHazardStripes(ctx, rightCX - 260, rightY + 58, 520, 14);

    // C. Subtitle
    ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#E2E8F0';
    ctx.shadowColor = 'transparent';
    const mCount = state.members ? state.members.length : 6;
    ctx.fillText(`${state.unitName || 'KCP Jakarta Blok M Plaza'} - ${mCount} Personal Berprestasi!`, rightCX, rightY + 98);
    ctx.restore();

    // D. Dynamic Squad Hero Grid
    drawDynamicF1TeamGrid(ctx, state.members || [], rightX, rightY, rightW, rightH);

    // 5. Official Regulatory Footer (Bottom Center)
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 6;
    ctx.fillText('PT Bank Mandiri (Persero) Tbk. Berizin & Diawasi oleh OJK dan Bank Indonesia, Serta Merupakan Peserta Penjaminan LPS.', W / 2, H - 28);
    ctx.restore();
  } catch (err) {
    console.error('CRITICAL ERROR in renderTemplateRacingSpeed:', err);
  }
}

// =============================================================
// TEMPLATE 2: GOLDEN CHAMPION GALA (STAGE SPOTLIGHTS)
// =============================================================
function renderTemplateGoldenChampion(ctx, W, H) {
  drawBackgroundImage(ctx, 'backgrounds/bg_champion_gold.jpg', W, H, (c, w, h) => {
    c.fillStyle = '#001A38';
    c.fillRect(0, 0, w, h);
  });

  // Vignette overlay
  const overlay = ctx.createLinearGradient(0, 0, 0, H);
  overlay.addColorStop(0, 'rgba(0, 15, 35, 0.65)');
  overlay.addColorStop(0.5, 'rgba(0, 20, 45, 0.45)');
  overlay.addColorStop(1, 'rgba(0, 10, 25, 0.85)');
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, W, H);

  drawHeaderBarLandscape(ctx, W, false);

  const leftCX = 495;
  drawCategoryHeaderBadgeLandscape(ctx, 70, 125, 850, 52, state.category, false, '#FFB700');

  drawGoldenTrophy(ctx, leftCX, 245, 55);
  drawGoldenLaurel(ctx, leftCX, 245, 82);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFB700';
  ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.headline, leftCX, 335);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 48px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.unitName.toUpperCase(), leftCX, 395);

  ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText(`${state.period} • ${state.region}`, leftCX, 435);
  ctx.restore();

  drawBookingMetricBoxLandscape(ctx, 70, 470, 850, 260, 'rgba(0, 24, 52, 0.85)', '#FFB700', false);
  drawAspirationQuoteBoxLandscape(ctx, 70, 755, 850, 245, 'rgba(0, 24, 52, 0.85)', '#FFB700', false);

  drawGlassCard(ctx, 960, 125, 890, 875, 20, 'rgba(0, 24, 52, 0.82)', '#FFB700');
  drawTeamPanelHeaderLandscape(ctx, 1405, 175, state.unitName, state.members.length, '#FFB700', false);
  drawDynamicTeamGridLandscape(ctx, state.members, 1405, 580, 840, 720, '#FFB700', '#FFFFFF', false);

  drawOfficialFooterLandscape(ctx, W, H, '#CBD5E1', '#FFB700', false);
}

// =============================================================
// TEMPLATE 3: DANANTARA SAPPHIRE (FUTURISTIC ATRIUM)
// =============================================================
function renderTemplateDanantaraDark(ctx, W, H) {
  drawBackgroundImage(ctx, 'backgrounds/bg_danantara.jpg', W, H, (c, w, h) => {
    c.fillStyle = '#050D1A';
    c.fillRect(0, 0, w, h);
  });

  // Dark sapphire glass tint
  const overlay = ctx.createLinearGradient(0, 0, W, 0);
  overlay.addColorStop(0, 'rgba(4, 15, 32, 0.88)');
  overlay.addColorStop(0.5, 'rgba(4, 18, 40, 0.55)');
  overlay.addColorStop(1, 'rgba(4, 15, 32, 0.85)');
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, W, H);

  drawHeaderBarLandscape(ctx, W, false, true);

  const leftCX = 495;
  drawCategoryHeaderBadgeLandscape(ctx, 70, 125, 850, 52, state.category, false, '#00A3E0');

  drawDanantaraShieldCenter(ctx, leftCX, 240, 52);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#00A3E0';
  ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.headline, leftCX, 335);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 48px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.unitName.toUpperCase(), leftCX, 395);

  ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(`${state.period} • ${state.region}`, leftCX, 435);
  ctx.restore();

  drawBookingMetricBoxLandscape(ctx, 70, 470, 850, 260, 'rgba(6, 21, 46, 0.88)', '#00A3E0', false);
  drawAspirationQuoteBoxLandscape(ctx, 70, 755, 850, 245, 'rgba(6, 21, 46, 0.88)', '#00A3E0', false);

  drawGlassCard(ctx, 960, 125, 890, 875, 20, 'rgba(6, 21, 46, 0.85)', 'rgba(0, 163, 224, 0.4)');
  drawTeamPanelHeaderLandscape(ctx, 1405, 175, state.unitName, state.members.length, '#00A3E0', false);
  drawDynamicTeamGridLandscape(ctx, state.members, 1405, 580, 840, 720, '#00A3E0', '#FFFFFF', false);

  drawOfficialFooterLandscape(ctx, W, H, '#94A3B8', '#00A3E0', false);
}

// =============================================================
// TEMPLATE 4: CORPORATE EXECUTIVE (GLASS ATRIUM & WHITE MARBLE)
// =============================================================
function renderTemplateCorporateClean(ctx, W, H) {
  drawBackgroundImage(ctx, 'backgrounds/bg_corporate.jpg', W, H, (c, w, h) => {
    c.fillStyle = '#F4F7FB';
    c.fillRect(0, 0, w, h);
  });

  // Frosted White Glass Tint
  const overlay = ctx.createLinearGradient(0, 0, W, 0);
  overlay.addColorStop(0, 'rgba(255, 255, 255, 0.88)');
  overlay.addColorStop(0.5, 'rgba(245, 249, 255, 0.7)');
  overlay.addColorStop(1, 'rgba(255, 255, 255, 0.88)');
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, W, H);

  drawHeaderBarLandscape(ctx, W, true);

  const leftCX = 495;
  drawCategoryHeaderBadgeLandscape(ctx, 70, 125, 850, 52, state.category, true);

  drawGoldenTrophy(ctx, leftCX, 245, 50);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#003D79';
  ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.headline, leftCX, 335);

  ctx.fillStyle = '#0F172A';
  ctx.font = '800 48px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.unitName.toUpperCase(), leftCX, 395);

  ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText(`${state.period} • ${state.region}`, leftCX, 435);
  ctx.restore();

  drawBookingMetricBoxLandscape(ctx, 70, 470, 850, 260, 'rgba(0, 43, 73, 0.95)', '#FFB700', false);
  drawAspirationQuoteBoxLandscape(ctx, 70, 755, 850, 245, 'rgba(255, 255, 255, 0.92)', '#003D79', true);

  drawGlassCard(ctx, 960, 125, 890, 875, 20, 'rgba(255, 255, 255, 0.92)', '#CBD5E1');
  drawTeamPanelHeaderLandscape(ctx, 1405, 175, state.unitName, state.members.length, '#003D79', true);
  drawDynamicTeamGridLandscape(ctx, state.members, 1405, 580, 840, 720, '#003D79', '#0F172A', true);

  drawOfficialFooterLandscape(ctx, W, H, '#475569', '#003D79', true);
}

// =============================================================
// TEMPLATE 5: VICTORY CELEBRATION (STADIUM FIREWORKS)
// =============================================================
function renderTemplateVictoryRibbon(ctx, W, H) {
  drawBackgroundImage(ctx, 'backgrounds/bg_victory.jpg', W, H, (c, w, h) => {
    c.fillStyle = '#001A38';
    c.fillRect(0, 0, w, h);
  });

  // Vignette overlay
  const overlay = ctx.createLinearGradient(0, 0, 0, H);
  overlay.addColorStop(0, 'rgba(0, 15, 35, 0.7)');
  overlay.addColorStop(0.5, 'rgba(0, 20, 45, 0.45)');
  overlay.addColorStop(1, 'rgba(20, 5, 15, 0.85)');
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, W, H);

  drawHeaderBarLandscape(ctx, W, false);

  const leftCX = 495;
  drawCategoryHeaderBadgeLandscape(ctx, 70, 125, 850, 52, state.category, false, '#FF4D4D');

  drawGoldenTrophy(ctx, leftCX, 245, 55);
  drawGoldenLaurel(ctx, leftCX, 245, 80);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFD700';
  ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('🎉 ' + state.headline + ' 🎉', leftCX, 335);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 48px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.unitName.toUpperCase(), leftCX, 395);

  ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText(`${state.period} • ${state.region}`, leftCX, 435);
  ctx.restore();

  drawBookingMetricBoxLandscape(ctx, 70, 470, 850, 260, 'rgba(0, 24, 52, 0.85)', '#FFB700', false);
  drawAspirationQuoteBoxLandscape(ctx, 70, 755, 850, 245, 'rgba(40, 10, 25, 0.85)', '#FF4D4D', false);

  drawGlassCard(ctx, 960, 125, 890, 875, 20, 'rgba(0, 24, 52, 0.85)', '#FFB700');
  drawTeamPanelHeaderLandscape(ctx, 1405, 175, state.unitName, state.members.length, '#FFB700', false);
  drawDynamicTeamGridLandscape(ctx, state.members, 1405, 580, 840, 720, '#FFB700', '#FFFFFF', false);

  drawOfficialFooterLandscape(ctx, W, H, '#CBD5E1', '#FFB700', false);
}

// =============================================================
// TEMPLATE 6: CYBER LEADERBOARD (NEON DIGITAL ARENA)
// =============================================================
function renderTemplateCyberPodium(ctx, W, H) {
  drawBackgroundImage(ctx, 'backgrounds/bg_cyber.jpg', W, H, (c, w, h) => {
    c.fillStyle = '#060A10';
    c.fillRect(0, 0, w, h);
  });

  const overlay = ctx.createLinearGradient(0, 0, W, 0);
  overlay.addColorStop(0, 'rgba(4, 10, 20, 0.88)');
  overlay.addColorStop(0.5, 'rgba(4, 12, 24, 0.5)');
  overlay.addColorStop(1, 'rgba(4, 10, 20, 0.85)');
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, W, H);

  drawHeaderBarLandscape(ctx, W, false);

  const leftCX = 495;
  drawCategoryHeaderBadgeLandscape(ctx, 70, 125, 850, 52, state.category, false, '#00F0FF');

  drawNeonTrophy(ctx, leftCX, 245, 52, '#00F0FF');

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#00F0FF';
  ctx.font = '700 21px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('LEADERBOARD #1 RANK ACHIEVER', leftCX, 335);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 48px "Space Grotesk", sans-serif';
  ctx.fillText(state.unitName.toUpperCase(), leftCX, 395);

  ctx.font = '600 16px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText(`${state.period} // ${state.region}`, leftCX, 435);
  ctx.restore();

  drawBookingMetricBoxLandscape(ctx, 70, 470, 850, 260, 'rgba(6, 16, 32, 0.88)', '#00F0FF', false);
  drawAspirationQuoteBoxLandscape(ctx, 70, 755, 850, 245, 'rgba(6, 16, 32, 0.88)', '#00F0FF', false);

  drawGlassCard(ctx, 960, 125, 890, 875, 20, 'rgba(6, 16, 32, 0.85)', '#00F0FF');
  drawTeamPanelHeaderLandscape(ctx, 1405, 175, state.unitName, state.members.length, '#00F0FF', false);
  drawDynamicTeamGridLandscape(ctx, state.members, 1405, 580, 840, 720, '#00F0FF', '#FFFFFF', false);

  drawOfficialFooterLandscape(ctx, W, H, '#94A3B8', '#00F0FF', false);
}

// =============================================================
// TEMPLATE 7: PRESTIGE PLATINUM (BLACK & GOLD MARBLE)
// =============================================================
function renderTemplatePrestigeMarble(ctx, W, H) {
  drawBackgroundImage(ctx, 'backgrounds/bg_marble.jpg', W, H, (c, w, h) => {
    c.fillStyle = '#101622';
    c.fillRect(0, 0, w, h);
  });

  const overlay = ctx.createLinearGradient(0, 0, W, 0);
  overlay.addColorStop(0, 'rgba(12, 16, 25, 0.85)');
  overlay.addColorStop(0.5, 'rgba(12, 18, 30, 0.5)');
  overlay.addColorStop(1, 'rgba(12, 16, 25, 0.85)');
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, W, H);

  drawHeaderBarLandscape(ctx, W, false);

  const leftCX = 495;
  drawCategoryHeaderBadgeLandscape(ctx, 70, 125, 850, 52, state.category, false, '#D4AF37');

  drawGoldenTrophy(ctx, leftCX, 245, 52);
  drawGoldenLaurel(ctx, leftCX, 245, 78);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D4AF37';
  ctx.font = '700 22px "Playfair Display", Georgia, serif';
  ctx.fontStyle = 'italic';
  ctx.fillText(state.headline, leftCX, 335);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 46px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.unitName.toUpperCase(), leftCX, 395);

  ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(`${state.period} • ${state.region}`, leftCX, 435);
  ctx.restore();

  drawBookingMetricBoxLandscape(ctx, 70, 470, 850, 260, 'rgba(14, 20, 32, 0.88)', '#D4AF37', false);
  drawAspirationQuoteBoxLandscape(ctx, 70, 755, 850, 245, 'rgba(14, 20, 32, 0.88)', '#D4AF37', false);

  drawGlassCard(ctx, 960, 125, 890, 875, 20, 'rgba(14, 20, 32, 0.85)', '#D4AF37');
  drawTeamPanelHeaderLandscape(ctx, 1405, 175, state.unitName, state.members.length, '#D4AF37', false);
  drawDynamicTeamGridLandscape(ctx, state.members, 1405, 580, 840, 720, '#D4AF37', '#FFFFFF', false);

  drawOfficialFooterLandscape(ctx, W, H, '#94A3B8', '#D4AF37', false);
}

// =============================================================
// TEMPLATE 8: SUNBURST GRANDEUR (PROJECTED RAYS)
// =============================================================
function renderTemplateRadialSunburst(ctx, W, H) {
  drawBackgroundImage(ctx, 'backgrounds/bg_champion_gold.jpg', W, H, (c, w, h) => {
    c.fillStyle = '#001A38';
    c.fillRect(0, 0, w, h);
  });

  // Radial rays
  ctx.save();
  const rayCX = 495;
  const rayCY = 245;
  ctx.translate(rayCX, rayCY);
  const rays = 24;
  for (let i = 0; i < rays; i++) {
    ctx.rotate((Math.PI * 2) / rays);
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 183, 0, 0.08)' : 'rgba(0, 61, 121, 0.04)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-90, 1500);
    ctx.lineTo(90, 1500);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  drawHeaderBarLandscape(ctx, W, false);

  const leftCX = 495;
  drawCategoryHeaderBadgeLandscape(ctx, 70, 125, 850, 52, state.category, false, '#FFB700');

  drawGoldenTrophy(ctx, leftCX, 245, 55);
  drawGoldenLaurel(ctx, leftCX, 245, 82);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFB700';
  ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.headline, leftCX, 335);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 48px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.unitName.toUpperCase(), leftCX, 395);

  ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText(`${state.period} • ${state.region}`, leftCX, 435);
  ctx.restore();

  drawBookingMetricBoxLandscape(ctx, 70, 470, 850, 260, 'rgba(0, 28, 60, 0.88)', '#FFB700', false);
  drawAspirationQuoteBoxLandscape(ctx, 70, 755, 850, 245, 'rgba(0, 28, 60, 0.88)', '#FFB700', false);

  drawGlassCard(ctx, 960, 125, 890, 875, 20, 'rgba(0, 28, 60, 0.85)', '#FFB700');
  drawTeamPanelHeaderLandscape(ctx, 1405, 175, state.unitName, state.members.length, '#FFB700', false);
  drawDynamicTeamGridLandscape(ctx, state.members, 1405, 580, 840, 720, '#FFB700', '#FFFFFF', false);

  drawOfficialFooterLandscape(ctx, W, H, '#CBD5E1', '#FFB700', false);
}

// =============================================================
// TEMPLATE 9: BIG STAT FINANCIAL EDITORIAL
// =============================================================
function renderTemplateBigStatEditorial(ctx, W, H) {
  drawBackgroundImage(ctx, 'backgrounds/bg_marble.jpg', W, H, (c, w, h) => {
    c.fillStyle = '#0B111E';
    c.fillRect(0, 0, w, h);
  });

  const overlay = ctx.createLinearGradient(0, 0, 0, H);
  overlay.addColorStop(0, 'rgba(8, 14, 24, 0.88)');
  overlay.addColorStop(1, 'rgba(12, 20, 36, 0.92)');
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, W, H);

  drawHeaderBarLandscape(ctx, W, false);

  drawCategoryHeaderBadgeLandscape(ctx, 70, 125, 850, 52, state.category, false, '#FFB700');

  ctx.save();
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFB700';
  ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('FINANCIAL PERFORMANCE RECOGNITION', 70, 225);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 46px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.unitName.toUpperCase(), 70, 280);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`${state.period} • Region: ${state.region}`, 70, 320);
  ctx.restore();

  drawBookingMetricBoxLandscape(ctx, 70, 360, 850, 340, 'rgba(10, 18, 32, 0.92)', '#FFB700', false, true);
  drawAspirationQuoteBoxLandscape(ctx, 70, 730, 850, 270, 'rgba(10, 18, 32, 0.92)', '#67B2E8', false);

  drawGlassCard(ctx, 960, 125, 890, 875, 20, 'rgba(10, 18, 32, 0.9)', '#334155');
  drawTeamPanelHeaderLandscape(ctx, 1405, 175, state.unitName, state.members.length, '#FFB700', false);
  drawDynamicTeamGridLandscape(ctx, state.members, 1405, 580, 840, 720, '#FFB700', '#FFFFFF', false);

  drawOfficialFooterLandscape(ctx, W, H, '#94A3B8', '#FFB700', false);
}

// =============================================================
// TEMPLATE 10: MODERN FROST GLASS (GLASSMORPHISM)
// =============================================================
function renderTemplateFrostGlass(ctx, W, H) {
  drawBackgroundImage(ctx, 'backgrounds/bg_danantara.jpg', W, H, (c, w, h) => {
    c.fillStyle = '#07152B';
    c.fillRect(0, 0, w, h);
  });

  // Soft ambient blur spheres
  drawAmbientSphere(ctx, 350, 350, 320, '#005BBB', 0.35);
  drawAmbientSphere(ctx, 700, 700, 380, '#FFB700', 0.2);
  drawAmbientSphere(ctx, 1450, 450, 400, '#00A3E0', 0.25);

  drawHeaderBarLandscape(ctx, W, false);

  const leftCX = 495;
  drawCategoryHeaderBadgeLandscape(ctx, 70, 125, 850, 52, state.category, false, '#67B2E8');

  drawGoldenTrophy(ctx, leftCX, 245, 50);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#67B2E8';
  ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.headline, leftCX, 335);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 48px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.unitName.toUpperCase(), leftCX, 395);

  ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText(`${state.period} • ${state.region}`, leftCX, 435);
  ctx.restore();

  drawBookingMetricBoxLandscape(ctx, 70, 470, 850, 260, 'rgba(255, 255, 255, 0.12)', '#67B2E8', false);
  drawAspirationQuoteBoxLandscape(ctx, 70, 755, 850, 245, 'rgba(255, 255, 255, 0.09)', '#67B2E8', false);

  drawGlassCard(ctx, 960, 125, 890, 875, 24, 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.35)');
  drawTeamPanelHeaderLandscape(ctx, 1405, 175, state.unitName, state.members.length, '#67B2E8', false);
  drawDynamicTeamGridLandscape(ctx, state.members, 1405, 580, 840, 720, '#67B2E8', '#FFFFFF', false);

  drawOfficialFooterLandscape(ctx, W, H, '#CBD5E1', '#67B2E8', false);
}

// -------------------------------------------------------------
// 7. COMMON VECTOR DRAWING HELPERS FOR LANDSCAPE
// -------------------------------------------------------------
function drawHeaderBarLandscape(ctx, W, isLight = false, isDanantara = false, customTag = null) {
  // Top left Mandiri Logo
  drawMandiriLogo(ctx, 70, 36, isLight);

  // Top sub-brand / region
  if (isDanantara) {
    drawDanantaraLogo(ctx, 310, 38);
  } else {
    ctx.save();
    ctx.fillStyle = isLight ? '#003D79' : '#FFB700';
    ctx.font = '800 13px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '1.5px';
    ctx.fillText(customTag || 'MICRO BANKING DIGITAL POSTER', 310, 52);
    ctx.fillStyle = isLight ? '#64748B' : 'rgba(255, 255, 255, 0.75)';
    ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('PERFORMANCE & RECOGNITION STUDIO', 310, 68);
    ctx.restore();
  }

  // Top right Region & Recognition Badge
  drawRegionBadge(ctx, W - 70, 38, state.region, true, isLight);

  // Subtle divider rule
  ctx.save();
  ctx.strokeStyle = isLight ? 'rgba(0, 61, 121, 0.15)' : 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(70, 96);
  ctx.lineTo(W - 70, 96);
  ctx.stroke();
  ctx.restore();
}

function drawMandiriLogo(ctx, x, y, isLight = false) {
  ctx.save();
  ctx.textAlign = 'left';
  ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = isLight ? '#003D79' : '#FFFFFF';
  ctx.fillText("mandırı", x, y + 30);

  // Iconic Gold Wave arc
  ctx.strokeStyle = '#FFB700';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(x + 116, y + 20, 24, Math.PI * 1.1, Math.PI * 1.85);
  ctx.stroke();
  ctx.restore();
}

function drawDanantaraLogo(ctx, x, y) {
  ctx.save();
  ctx.fillStyle = '#D32F2F';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 20, y);
  ctx.lineTo(x + 20, y + 24);
  ctx.quadraticCurveTo(x + 10, y + 32, x, y + 28);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x + 10, y, 10, 24);

  ctx.fillStyle = '#00A3E0';
  ctx.fillRect(x + 22, y + 3, 3, 26);

  ctx.textAlign = 'left';
  ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText("Danantara", x + 34, y + 20);

  ctx.font = '800 9px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#00A3E0';
  ctx.letterSpacing = '1.5px';
  ctx.fillText("INDONESIA", x + 35, y + 32);
  ctx.restore();
}

function drawRegionBadge(ctx, x, y, text, alignRight = true, isLight = false) {
  ctx.save();
  ctx.textAlign = alignRight ? 'right' : 'left';
  ctx.fillStyle = isLight ? '#002B49' : 'rgba(255, 255, 255, 0.95)';
  ctx.font = '800 15px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText(text.toUpperCase(), x, y + 20);

  ctx.fillStyle = isLight ? '#003D79' : '#FFB700';
  ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("OFFICIAL EXCELLENCE RECOGNITION", x, y + 38);
  ctx.restore();
}

function drawCategoryHeaderBadgeLandscape(ctx, x, y, w, h, category, isLight = false, customAccent = null) {
  ctx.save();
  const isKUR = category === 'KUR';
  const label = isKUR ? '🌾 JUARA 1 BOOKING KUR TERTINGGI 🌾' : '💼 JUARA 1 BOOKING KUM TERTINGGI 💼';
  const badgeColor = customAccent || (isKUR ? '#FFB700' : '#00A3E0');

  ctx.fillStyle = isLight ? '#002B49' : 'rgba(0, 24, 52, 0.88)';
  ctx.strokeStyle = badgeColor;
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.roundRect(x, y, w, h, h / 2);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = isLight ? '#FFB700' : '#FFFFFF';
  ctx.font = '800 21px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText(label, x + w / 2, y + h / 2 + 7);
  ctx.restore();
}

function drawGoldenTrophy(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);

  // Soft Gold Glow
  const glow = ctx.createRadialGradient(0, 0, 10, 0, 0, size * 1.6);
  glow.addColorStop(0, 'rgba(255, 183, 0, 0.45)');
  glow.addColorStop(1, 'rgba(255, 183, 0, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, size * 1.6, 0, Math.PI * 2);
  ctx.fill();

  // Cup body
  ctx.fillStyle = '#FFB700';
  ctx.beginPath();
  ctx.moveTo(-size * 0.5, -size * 0.4);
  ctx.lineTo(size * 0.5, -size * 0.4);
  ctx.quadraticCurveTo(size * 0.45, size * 0.25, 0, size * 0.35);
  ctx.quadraticCurveTo(-size * 0.45, size * 0.25, -size * 0.5, -size * 0.4);
  ctx.fill();

  // Stem & Base
  ctx.fillRect(-size * 0.1, size * 0.3, size * 0.2, size * 0.3);
  ctx.fillRect(-size * 0.4, size * 0.55, size * 0.8, size * 0.15);

  // Handles
  ctx.strokeStyle = '#FFB700';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(-size * 0.55, -size * 0.1, size * 0.25, Math.PI * 0.6, Math.PI * 1.7);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(size * 0.55, -size * 0.1, size * 0.25, Math.PI * 1.3, Math.PI * 0.4);
  ctx.stroke();

  // Star inside cup
  ctx.fillStyle = '#002B49';
  ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("★", 0, -size * 0.05);

  ctx.restore();
}

function drawDanantaraShieldCenter(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);

  // Glow
  const glow = ctx.createRadialGradient(0, 0, 10, 0, 0, size * 1.5);
  glow.addColorStop(0, 'rgba(0, 163, 224, 0.45)');
  glow.addColorStop(1, 'rgba(0, 163, 224, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Shield
  ctx.fillStyle = '#D32F2F';
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.8, -size * 0.5);
  ctx.lineTo(size * 0.8, size * 0.2);
  ctx.quadraticCurveTo(0, size * 1.1, 0, size * 1.1);
  ctx.quadraticCurveTo(-size * 0.8, size * 0.2, -size * 0.8, size * 0.2);
  ctx.lineTo(-size * 0.8, -size * 0.5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.8, -size * 0.5);
  ctx.lineTo(size * 0.8, size * 0.2);
  ctx.quadraticCurveTo(0, size * 1.1, 0, size * 1.1);
  ctx.closePath();
  ctx.fill();

  // Gold Star Center
  ctx.fillStyle = '#FFB700';
  ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("★", 0, 8);

  ctx.restore();
}

function drawNeonTrophy(ctx, x, y, size, neonColor = '#00F0FF') {
  ctx.save();
  ctx.translate(x, y);

  ctx.shadowColor = neonColor;
  ctx.shadowBlur = 25;
  ctx.strokeStyle = neonColor;
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.moveTo(-size * 0.5, -size * 0.4);
  ctx.lineTo(size * 0.5, -size * 0.4);
  ctx.quadraticCurveTo(size * 0.45, size * 0.25, 0, size * 0.35);
  ctx.quadraticCurveTo(-size * 0.45, size * 0.25, -size * 0.5, -size * 0.4);
  ctx.stroke();

  ctx.strokeRect(-size * 0.1, size * 0.3, size * 0.2, size * 0.3);
  ctx.strokeRect(-size * 0.4, size * 0.55, size * 0.8, size * 0.15);

  ctx.fillStyle = neonColor;
  ctx.font = '800 24px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("#1", 0, -size * 0.05);

  ctx.restore();
}

function drawGoldenLaurel(ctx, x, y, r) {
  ctx.save();
  ctx.strokeStyle = '#FFB700';
  ctx.lineWidth = 3.5;

  ctx.beginPath();
  ctx.arc(x, y, r, Math.PI * 0.55, Math.PI * 1.45);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, r, Math.PI * 1.55, Math.PI * 2.45);
  ctx.stroke();
  ctx.restore();
}

function drawBookingMetricBoxLandscape(ctx, x, y, w, h, bgColor, borderColor, isLight = false, isExtraLarge = false) {
  ctx.save();

  // Glass Card Background
  ctx.fillStyle = bgColor;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 18);
  ctx.fill();
  ctx.stroke();

  // Header Title
  ctx.textAlign = 'center';
  ctx.fillStyle = isLight ? '#003D79' : borderColor;
  ctx.font = '800 16px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1.5px';
  ctx.fillText(`TOTAL CAPAIAN BOOKING ${state.category}`, x + w / 2, y + 42);

  // Massive Number
  ctx.fillStyle = isLight ? '#002B49' : '#FFFFFF';
  ctx.font = isExtraLarge ? '900 58px "Plus Jakarta Sans", sans-serif' : '900 52px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.bookingAmount, x + w / 2, y + 115);

  // Divider
  ctx.strokeStyle = isLight ? 'rgba(0, 61, 121, 0.15)' : 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + 40, y + 145);
  ctx.lineTo(x + w - 40, y + 145);
  ctx.stroke();

  // Sub Metrics Pills (2 Columns)
  const pillW = (w - 120) / 2;
  const pillH = 65;
  const pillY = y + 165;

  // Sub Metric 1
  const pill1X = x + 40;
  ctx.fillStyle = isLight ? '#EDF4FB' : 'rgba(255, 255, 255, 0.1)';
  ctx.strokeStyle = isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.25)';
  ctx.beginPath();
  ctx.roundRect(pill1X, pillY, pillW, pillH, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = isLight ? '#64748B' : '#CBD5E1';
  ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('DEBITUR TEREALISASI', pill1X + pillW / 2, pillY + 24);

  ctx.fillStyle = isLight ? '#003D79' : borderColor;
  ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.subMetric1, pill1X + pillW / 2, pillY + 50);

  // Sub Metric 2
  const pill2X = x + 40 + pillW + 40;
  ctx.fillStyle = isLight ? '#EDF4FB' : 'rgba(255, 255, 255, 0.1)';
  ctx.strokeStyle = isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.25)';
  ctx.beginPath();
  ctx.roundRect(pill2X, pillY, pillW, pillH, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = isLight ? '#64748B' : '#CBD5E1';
  ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('TARGET ACHIEVEMENT', pill2X + pillW / 2, pillY + 24);

  ctx.fillStyle = isLight ? '#003D79' : '#00F0FF';
  ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.subMetric2, pill2X + pillW / 2, pillY + 50);

  ctx.restore();
}

function drawAspirationQuoteBoxLandscape(ctx, x, y, w, h, bgColor, accentColor, isLight = false) {
  ctx.save();
  ctx.fillStyle = bgColor;
  ctx.strokeStyle = isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 18);
  ctx.fill();
  ctx.stroke();

  // Left accent bar
  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.roundRect(x + 16, y + 25, 5, h - 50, 3);
  ctx.fill();

  // Quote text
  ctx.textAlign = 'left';
  ctx.fillStyle = isLight ? '#334155' : 'rgba(255, 255, 255, 0.95)';
  ctx.font = 'italic 500 16px "Plus Jakarta Sans", sans-serif';
  
  const quoteLine1 = '"Pencapaian luar biasa ini merupakan wujud nyata kerja keras, dedikasi, dan sinergi';
  const quoteLine2 = 'seluruh pejuang tangguh Micro Banking dalam menggerakkan ekonomi kerakyatan."';
  
  ctx.fillText(quoteLine1, x + 38, y + 55);
  ctx.fillText(quoteLine2, x + 38, y + 85);

  // Author signature line
  ctx.fillStyle = isLight ? '#003D79' : accentColor;
  ctx.font = '800 14px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('MICRO BANKING REGION V / JAKARTA 3', x + 38, y + 130);

  ctx.fillStyle = isLight ? '#64748B' : '#94A3B8';
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('PT Bank Mandiri (Persero) Tbk. • Satu Hati, Satu Mandiri', x + 38, y + 152);

  ctx.restore();
}

function drawTeamPanelHeaderLandscape(ctx, cx, y, unitName, memberCount, accentColor, isLight = false) {
  ctx.save();
  ctx.textAlign = 'center';

  ctx.fillStyle = isLight ? '#003D79' : accentColor;
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1.5px';
  ctx.fillText('⭐ THE WINNING TEAM & SQUAD HERO ⭐', cx, y);

  ctx.fillStyle = isLight ? '#64748B' : '#CBD5E1';
  ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`${unitName} • ${memberCount} Personel Berprestasi`, cx, y + 28);

  ctx.restore();
}

function drawGlassCard(ctx, x, y, w, h, radius, bgColor = 'rgba(0, 24, 52, 0.85)', borderColor = 'rgba(255, 183, 0, 0.4)') {
  ctx.save();
  ctx.fillStyle = bgColor;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawOfficialFooterLandscape(ctx, W, H, textColor = '#94A3B8', accentColor = '#FFB700', isLight = false) {
  ctx.save();

  // Glass footer bar
  ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 16, 36, 0.85)';
  ctx.beginPath();
  ctx.roundRect(W / 2 - 580, H - 46, 1160, 36, 18);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.font = '600 13.5px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = isLight ? '#475569' : '#CBD5E1';
  ctx.fillText("PT Bank Mandiri (Persero) Tbk. Berizin & Diawasi oleh OJK dan Bank Indonesia, Serta Merupakan Peserta Penjaminan LPS.", W / 2, H - 23);

  // Gold accent bar
  ctx.fillStyle = accentColor;
  ctx.fillRect(W / 2 - 140, H - 12, 280, 2);
  ctx.restore();
}

// -------------------------------------------------------------
// 8. DYNAMIC TEAM PHOTO GRID ALGORITHM FOR LANDSCAPE
// -------------------------------------------------------------
function drawDynamicTeamGridLandscape(ctx, members, cx, cy, maxW, maxH, accentColor, textColor, isLight = false) {
  const count = members.length;
  if (count === 0) return;

  // Layout configuration based on count (Landscape container: 840W x 720H)
  let rows = 1;
  let cols = count;
  let radius = 65;

  if (count === 1) {
    rows = 1; cols = 1; radius = 120;
  } else if (count === 2) {
    rows = 1; cols = 2; radius = 90;
  } else if (count === 3) {
    rows = 1; cols = 3; radius = 78;
  } else if (count === 4) {
    rows = 2; cols = 2; radius = 72;
  } else if (count === 5) {
    rows = 2; radius = 64; // row 1: 3, row 2: 2
  } else if (count === 6) {
    rows = 2; cols = 3; radius = 62;
  } else if (count === 7) {
    rows = 2; radius = 54; // row 1: 4, row 2: 3
  } else if (count === 8) {
    rows = 2; cols = 4; radius = 52;
  } else if (count === 9) {
    rows = 3; cols = 3; radius = 48;
  } else if (count === 10) {
    rows = 2; cols = 5; radius = 45;
  } else {
    // 11 to 12
    rows = 3; cols = 4; radius = 42;
  }

  const startY = cy - maxH / 2 + 50;
  const availableH = maxH - 60;
  const rowHeight = availableH / rows;

  let memberIdx = 0;

  for (let r = 0; r < rows; r++) {
    let itemsInThisRow = cols;
    if (count === 5) itemsInThisRow = (r === 0) ? 3 : 2;
    else if (count === 7) itemsInThisRow = (r === 0) ? 4 : 3;
    else if (count === 10) itemsInThisRow = 5;
    else if (count === 11) itemsInThisRow = (r === 2) ? 3 : 4;

    const rowY = startY + r * rowHeight + rowHeight * 0.42;
    const spacingX = maxW / (itemsInThisRow + 1);

    for (let c = 0; c < itemsInThisRow && memberIdx < count; c++) {
      const mem = members[memberIdx];
      const itemX = (cx - maxW / 2) + spacingX * (c + 1);

      drawSingleMemberBadgeLandscape(ctx, mem, itemX, rowY, radius, accentColor, textColor, isLight);
      memberIdx++;
    }
  }
}

function drawSingleMemberBadgeLandscape(ctx, member, x, y, r, strokeColor, textColor, isLight = false) {
  ctx.save();

  // Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 6;

  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = '#002B49';
  ctx.fill();
  ctx.restore();

  // Photo Drawing or Fallback Initials
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.clip();

  if (member.photoImg && member.photoImg.complete && member.photoImg.naturalWidth > 0) {
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(member.photoImg, x - r, y - r, r * 2, r * 2);
  } else {
    // Liquid Gold Gradient Background for Monogram
    const grad = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
    grad.addColorStop(0, '#002B49');
    grad.addColorStop(0.5, '#003D79');
    grad.addColorStop(1, '#001E3D');
    ctx.fillStyle = grad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);

    ctx.fillStyle = '#FFB700';
    ctx.font = `800 ${Math.round(r * 0.65)}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(getInitials(member.name), x, y + 2);
  }
  ctx.restore();

  // Double Ring Stroke
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 3.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, r + 3, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // Name Label & Role
  const nameY = y + r + 22;
  const nameFontSize = r > 70 ? 21 : (r > 50 ? 17 : 14);
  const roleFontSize = r > 70 ? 15 : (r > 50 ? 13 : 11);

  // Name pill background
  const nameText = member.name || 'Nama';
  ctx.font = `800 ${nameFontSize}px "Plus Jakarta Sans", sans-serif`;
  const nameWidth = ctx.measureText(nameText).width;

  ctx.save();
  ctx.fillStyle = isLight ? '#FFFFFF' : 'rgba(0, 18, 40, 0.9)';
  ctx.strokeStyle = isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - (nameWidth / 2 + 12), nameY - 15, nameWidth + 24, nameFontSize + 12, 6);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
  ctx.fillText(nameText, x, nameY + 2);

  // Role Pill
  const roleText = member.role || 'SGP';
  ctx.font = `700 ${roleFontSize}px "Plus Jakarta Sans", sans-serif`;
  const roleWidth = ctx.measureText(roleText).width;

  ctx.fillStyle = strokeColor;
  ctx.beginPath();
  ctx.roundRect(x - (roleWidth / 2 + 9), nameY + 20, roleWidth + 18, roleFontSize + 8, 4);
  ctx.fill();

  ctx.fillStyle = '#002B49';
  ctx.fillText(roleText, x, nameY + 33);
  ctx.restore();

  ctx.restore();
}

function drawAmbientSphere(ctx, x, y, radius, color, alpha) {
  ctx.save();
  const grad = ctx.createRadialGradient(x, y, 10, x, y, radius);
  grad.addColorStop(0, color);
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.globalAlpha = alpha;
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// -------------------------------------------------------------
// 9. EXPORT & DOWNLOAD CAPABILITIES
// -------------------------------------------------------------
function downloadPoster(format = 'png') {
  const canvas = document.getElementById('posterCanvas');
  if (!canvas) return;

  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const ext = format === 'jpeg' ? 'jpg' : 'png';
  const cleanUnit = (state.unitName || 'Unit').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Poster_Juara_Landscape_${state.category}_${cleanUnit}.${ext}`;

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL(mime, 0.95);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Poster Landscape HD (${format.toUpperCase()}) berhasil diunduh!`);
}

function copyWhatsAppMessage() {
  const message = 
`🏆 *SELAMAT & SUKSES! JUARA 1 BOOKING ${state.category} TERTINGGI* 🏆
Region V / Jakarta 3 • Micro Banking

Kepada: *${state.unitName.toUpperCase()}*
🌟 *Pencapaian Total Booking ${state.category}:* ${state.bookingAmount}
📊 *Debitur:* ${state.subMetric1}
🎯 *Pencapaian Target:* ${state.subMetric2}
📅 *${state.period}*

*Tim Pejuang & Hero Unit:*
${state.members.map((m, i) => `${i + 1}. ${m.name} (${m.role})`).join('\n')}

Apresiasi setinggi-tingginya atas kerja keras, dedikasi, dan sinergi luar biasa! Mari terus pertahankan semangat juara dan dorong kemajuan ekonomi kerakyatan! 🚀💪

_PT Bank Mandiri (Persero) Tbk._`;

  navigator.clipboard.writeText(message).then(() => {
    showToast('Teks ucapan WhatsApp berhasil disalin ke clipboard!');
  }).catch(() => {
    showToast('Gagal menyalin teks. Silakan salin manual.');
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3200);
}

// -------------------------------------------------------------
// 10. INITIALIZATION
// -------------------------------------------------------------

// =============================================================
// UNIT & EMPLOYEE DIRECTORY ENGINE (TAB 2 ACCORDION WITH CLEAN WEB ICONS)
// =============================================================
let unitDatabase = {};
let allUnitsList = [];
let openUnitsSet = new Set();
let isBulkDeleteMode = false;
let isBulkEditMode = false;
let selectedUnitsForBulk = new Set();
let selectedEmployeesForBulk = new Set(); // store "unitName:::empIdx"
let activePhotoTarget = null; // { unitName, empIdx }

const LOCAL_STORAGE_DB_KEY = 'mandiri_poster_unit_database_v2';

const STANDARD_JABATAN_OPTIONS = [
  'MBH',
  'BM',
  'MBCM',
  'MBM/Penyelia Unit',
  'SGP'
];

function normalizeJabatan(jabatan) {
  if (!jabatan) return 'SGP';
  const val = String(jabatan).trim();
  const lower = val.toLowerCase();

  if (lower === 'mbh') return 'MBH';
  if (lower === 'bm' || lower === 'branch manager' || lower === 'business manager') return 'BM';
  if (lower === 'mbcm' || lower.includes('cluster manager')) return 'MBCM';
  if (
    lower.includes('mbm') || 
    lower.includes('penyelia') || 
    lower === 'mm' || 
    lower === 'km' ||
    lower.includes('micro banking mgr')
  ) {
    return 'MBM/Penyelia Unit';
  }
  return 'SGP';
}

// Clean Vector SVG Icons
const SVG_ICONS = {
  edit: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>',
  trash: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>',
  chevron: '<svg class="icon-svg chevron-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  plus: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  upload: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>',
  check: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  eye: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  remove: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
};

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function saveUnitDatabase() {
  try {
    localStorage.setItem(LOCAL_STORAGE_DB_KEY, JSON.stringify(unitDatabase));
  } catch (e) {
    console.warn('Gagal menyimpan ke LocalStorage:', e);
  }
  allUnitsList = Object.keys(unitDatabase).sort((a, b) => a.localeCompare(b));
  
  const badge = document.getElementById('tabUnitCountBadge');
  if (badge) badge.textContent = `${allUnitsList.length} Unit`;
  
  populateQuickUnitPicker();
}

async function loadUnitEmployeeDatabase() {
  // 1. Cek LocalStorage
  const cached = localStorage.getItem(LOCAL_STORAGE_DB_KEY);
  if (cached) {
    try {
      unitDatabase = JSON.parse(cached);
      // Normalisasi jabatan yang ada di cache ke 5 pilihan resmi
      Object.keys(unitDatabase).forEach(u => {
        if (Array.isArray(unitDatabase[u])) {
          unitDatabase[u].forEach(emp => {
            emp.jabatan = normalizeJabatan(emp.jabatan);
          });
        }
      });
      allUnitsList = Object.keys(unitDatabase).sort((a, b) => a.localeCompare(b));
      if (allUnitsList.length > 0) {
        openUnitsSet.add(allUnitsList[0]);
        finishDbInit();
        return;
      }
    } catch (err) {
      console.warn('Cache local invalid:', err);
    }
  }

  // 2. Fetch file employees.json
  try {
    const res = await fetch('data/employees.json');
    if (!res.ok) throw new Error('Fetch failed');
    const rawList = await res.json();
    unitDatabase = {};
    rawList.forEach(emp => {
      const u = (emp.unit || '').trim();
      if (!u || u === '-') return;
      if (!unitDatabase[u]) unitDatabase[u] = [];
      emp.jabatan = normalizeJabatan(emp.jabatan);
      unitDatabase[u].push(emp);
    });
  } catch (err) {
    console.warn('Gagal fetch employees.json, gunakan sample:', err);
    unitDatabase = {
      'Bogor Kemang 1': [
        { nama: 'Bella Puspita Sari', jabatan: 'MBM/Penyelia Unit', nip: 'BM-101', foto: null },
        { nama: 'Bella Puspita Sari', jabatan: 'SGP', nip: 'BM-102', foto: 'saved_sample' },
        { nama: 'Bella Puspita Sari', jabatan: 'SGP', nip: 'BM-103', foto: null }
      ]
    };
  }

  allUnitsList = Object.keys(unitDatabase).sort((a, b) => a.localeCompare(b));
  if (allUnitsList.length > 0) {
    openUnitsSet.add(allUnitsList[0]);
  }
  saveUnitDatabase();
  finishDbInit();
}

function finishDbInit() {
  const badge = document.getElementById('tabUnitCountBadge');
  if (badge) badge.textContent = `${allUnitsList.length} Unit`;
  populateQuickUnitPicker();
  renderUnitsAccordion();
  setupUnitManagerEventListeners();
}

function populateQuickUnitPicker() {
  const sel = document.getElementById('selectUnitQuick');
  if (!sel) return;
  const currentVal = sel.value || state.unitName;
  sel.innerHTML = '<option value="">-- Pilih Unit Juara --</option>';
  allUnitsList.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u;
    const emps = unitDatabase[u] || [];
    opt.textContent = `${u} (${emps.length} Pegawai)`;
    if (u === currentVal || u === state.unitName) opt.selected = true;
    sel.appendChild(opt);
  });
}

function applyUnitToState(unitName) {
  state.unitName = unitName;
  const inputUnit = document.getElementById('inputUnitName');
  if (inputUnit) inputUnit.value = unitName;

  const emps = unitDatabase[unitName] || [];
  if (emps.length > 0) {
    state.members = emps.slice(0, 10).map((emp, idx) => ({
      id: idx + 1,
      name: emp.nama || emp.name || 'Pegawai',
      role: emp.jabatan || emp.role || 'Pegawai',
      photoDataUrl: (emp.foto && emp.foto !== 'saved_sample') ? emp.foto : null,
      photoImg: null
    }));

    state.members.forEach(m => {
      if (m.photoDataUrl) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          m.photoImg = img;
          drawPosterCanvas();
        };
        img.src = m.photoDataUrl;
      }
    });
  }

  renderTeamMembersInput();
  drawPosterCanvas();
}

function renderUnitsAccordion(searchQuery = '') {
  const container = document.getElementById('unitsAccordionList');
  if (!container) return;
  container.innerHTML = '';

  const q = (searchQuery || '').trim().toLowerCase();
  let unitsToDisplay = allUnitsList;

  if (q) {
    unitsToDisplay = allUnitsList.filter(u => {
      if (u.toLowerCase().includes(q)) return true;
      const emps = unitDatabase[u] || [];
      return emps.some(e => 
        (e.nama || '').toLowerCase().includes(q) || 
        (e.jabatan || '').toLowerCase().includes(q) ||
        (e.nip || '').toLowerCase().includes(q)
      );
    });
  }

  if (unitsToDisplay.length === 0) {
    container.innerHTML = `
      <div class="units-empty-state">
        <h3>Tidak ada unit yang cocok dengan pencarian</h3>
        <p>Coba gunakan kata kunci lain atau klik tombol <strong>Tambah Unit</strong> di atas.</p>
      </div>
    `;
    return;
  }

  unitsToDisplay.forEach((unitName) => {
    const emps = unitDatabase[unitName] || [];
    const isOpen = q ? true : openUnitsSet.has(unitName);
    const isChecked = selectedUnitsForBulk.has(unitName);

    const card = document.createElement('div');
    card.className = `unit-accordion-card ${isOpen ? 'open' : ''}`;
    card.dataset.unit = unitName;

    // Header Bar: "Terapkan" dihapus sesuai permintaan, ikon menggunakan clean web SVG
    const showCheckbox = isBulkDeleteMode;

    const header = document.createElement('div');
    header.className = 'unit-header-bar';
    header.innerHTML = `
      <div class="unit-header-left">
        ${showCheckbox ? `<input type="checkbox" class="unit-bulk-checkbox" ${isChecked ? 'checked' : ''} data-unit="${escapeHtml(unitName)}">` : ''}
        <span class="unit-name-title">${escapeHtml(unitName)}</span>
      </div>
      <div class="unit-header-actions">
        <button type="button" class="btn-unit-icon btn-unit-edit" title="Edit Nama Unit" data-unit="${escapeHtml(unitName)}">
          ${SVG_ICONS.edit}
        </button>
        <button type="button" class="btn-unit-icon btn-unit-delete" title="Hapus Unit" data-unit="${escapeHtml(unitName)}">
          ${SVG_ICONS.trash}
        </button>
        <button type="button" class="btn-unit-icon btn-unit-toggle" title="Buka/Tutup Pegawai" data-unit="${escapeHtml(unitName)}">
          ${SVG_ICONS.chevron}
        </button>
      </div>
    `;

    // Body Content (Employee Rows)
    const body = document.createElement('div');
    body.className = 'unit-body-content';

    const rowsWrap = document.createElement('div');
    rowsWrap.className = 'employees-rows-container';

    emps.forEach((emp, empIdx) => {
      const row = document.createElement('div');
      row.className = 'employee-row';
      row.dataset.empIdx = empIdx;

      const hasPhoto = Boolean(emp.foto);

      let roleOptionsHtml = '';
      const currentRole = normalizeJabatan(emp.jabatan);
      STANDARD_JABATAN_OPTIONS.forEach(opt => {
        const sel = (opt === currentRole) ? 'selected' : '';
        roleOptionsHtml += `<option value="${escapeHtml(opt)}" ${sel}>${escapeHtml(opt)}</option>`;
      });

      const isEmpChecked = isChecked || selectedEmployeesForBulk.has(`${unitName}:::${empIdx}`);

      row.innerHTML = `
        <div class="emp-name-col">
          ${showCheckbox ? `<input type="checkbox" class="emp-bulk-checkbox" ${isEmpChecked ? 'checked' : ''} data-unit="${escapeHtml(unitName)}" data-idx="${empIdx}">` : ''}
          <input type="text" class="emp-name-input" value="${escapeHtml(emp.nama || '')}" placeholder="Ketik nama pegawai..." data-unit="${escapeHtml(unitName)}" data-idx="${empIdx}">
        </div>
        
        <select class="emp-jabatan-select" data-unit="${escapeHtml(unitName)}" data-idx="${empIdx}">
          ${roleOptionsHtml}
        </select>

        <div class="emp-photo-action">
          <button type="button" class="btn-photo-pill ${hasPhoto ? 'btn-photo-saved' : 'btn-photo-upload'}" data-unit="${escapeHtml(unitName)}" data-idx="${empIdx}">
            ${hasPhoto ? `${SVG_ICONS.check} Foto Tersimpan` : `${SVG_ICONS.upload} Upload Foto`}
          </button>
          ${hasPhoto ? `
            <button type="button" class="btn-photo-preview" title="Lihat Foto Pegawai" data-unit="${escapeHtml(unitName)}" data-idx="${empIdx}">${SVG_ICONS.eye}</button>
            <button type="button" class="btn-photo-remove" title="Hapus Foto" data-unit="${escapeHtml(unitName)}" data-idx="${empIdx}">${SVG_ICONS.remove}</button>
          ` : ''}
        </div>

        <button type="button" class="btn-emp-delete-row" title="Hapus Pegawai" data-unit="${escapeHtml(unitName)}" data-idx="${empIdx}">
          ${SVG_ICONS.trash}
        </button>
      `;
      rowsWrap.appendChild(row);
    });

    const footerWrap = document.createElement('div');
    footerWrap.className = 'unit-body-footer';
    footerWrap.innerHTML = `
      <button type="button" class="btn-add-employee-row" data-unit="${escapeHtml(unitName)}">
        ${SVG_ICONS.plus}
        <span>Tambah Pegawai</span>
      </button>
      <span class="unit-emp-count-text">${emps.length} Pegawai</span>
    `;

    body.appendChild(rowsWrap);
    body.appendChild(footerWrap);

    card.appendChild(header);
    card.appendChild(body);
    container.appendChild(card);
  });
}

// Event Delegation & Handler Registrations for Unit Manager
let isListenersRegistered = false;
function setupUnitManagerEventListeners() {
  if (isListenersRegistered) return;
  isListenersRegistered = true;

  const container = document.getElementById('unitsAccordionList');
  if (container) {
    // Click Delegations inside Accordion List
    container.addEventListener('click', (e) => {
      // 1. Edit Nama Unit
      const btnEdit = e.target.closest('.btn-unit-edit');
      if (btnEdit) {
        e.stopPropagation();
        const oldUnit = btnEdit.dataset.unit;
        const newUnit = prompt(`Masukkan nama baru untuk unit "${oldUnit}":`, oldUnit);
        if (newUnit && newUnit.trim() && newUnit.trim() !== oldUnit) {
          const cleanNewUnit = newUnit.trim();
          if (unitDatabase[cleanNewUnit]) {
            alert(`Unit "${cleanNewUnit}" sudah ada!`);
            return;
          }
          unitDatabase[cleanNewUnit] = (unitDatabase[oldUnit] || []).map(emp => ({
            ...emp,
            unit: cleanNewUnit
          }));
          delete unitDatabase[oldUnit];
          if (openUnitsSet.has(oldUnit)) {
            openUnitsSet.delete(oldUnit);
            openUnitsSet.add(cleanNewUnit);
          }
          if (state.unitName === oldUnit) {
            state.unitName = cleanNewUnit;
            const inputUnit = document.getElementById('inputUnitName');
            if (inputUnit) inputUnit.value = cleanNewUnit;
            drawPosterCanvas();
          }
          saveUnitDatabase();
          renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
          showToast(`Nama unit berhasil diubah menjadi "${cleanNewUnit}"`);
        }
        return;
      }

      // 2. Hapus Unit
      const btnDelete = e.target.closest('.btn-unit-delete');
      if (btnDelete) {
        e.stopPropagation();
        const u = btnDelete.dataset.unit;
        const empsCount = (unitDatabase[u] || []).length;
        if (confirm(`Yakin ingin menghapus unit "${u}" beserta ${empsCount} pegawai di dalamnya?`)) {
          delete unitDatabase[u];
          openUnitsSet.delete(u);
          selectedUnitsForBulk.delete(u);
          saveUnitDatabase();
          renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
          showToast(`Unit "${u}" berhasil dihapus.`);
        }
        return;
      }

      // 3. Tambah Pegawai di Unit Ini
      const btnAddEmp = e.target.closest('.btn-add-employee-row');
      if (btnAddEmp) {
        e.stopPropagation();
        const u = btnAddEmp.dataset.unit;
        if (!unitDatabase[u]) unitDatabase[u] = [];
        unitDatabase[u].push({
          id: 'EMP-' + Date.now(),
          nama: 'Pegawai Baru',
          jabatan: 'SGP',
          nip: '-',
          unit: u,
          foto: null
        });
        openUnitsSet.add(u);
        saveUnitDatabase();
        renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
        showToast(`Pegawai baru ditambahkan ke ${u}`);
        
        setTimeout(() => {
          const card = document.querySelector(`.unit-accordion-card[data-unit="${CSS.escape(u)}"]`);
          if (card) {
            const inputs = card.querySelectorAll('.emp-name-input');
            if (inputs.length > 0) {
              const last = inputs[inputs.length - 1];
              last.focus();
              last.select();
            }
          }
        }, 100);
        return;
      }

      // 4. Upload Foto Pegawai
      const btnPhoto = e.target.closest('.btn-photo-pill');
      if (btnPhoto) {
        e.stopPropagation();
        const u = btnPhoto.dataset.unit;
        const idx = parseInt(btnPhoto.dataset.idx);
        activePhotoTarget = { unitName: u, empIdx: idx };
        const fileInput = document.getElementById('globalEmpPhotoInput');
        if (fileInput) {
          fileInput.value = '';
          fileInput.click();
        }
        return;
      }

            // 4b. Preview Foto Pegawai (Ikon Mata)
      const btnPreviewPhoto = e.target.closest(".btn-photo-preview");
      if (btnPreviewPhoto) {
        e.stopPropagation();
        const u = btnPreviewPhoto.dataset.unit;
        const idx = parseInt(btnPreviewPhoto.dataset.idx);
        openPhotoPreviewModal(u, idx);
        return;
      }

      // 5. Hapus Foto Pegawai
      const btnRemovePhoto = e.target.closest('.btn-photo-remove');
      if (btnRemovePhoto) {
        e.stopPropagation();
        const u = btnRemovePhoto.dataset.unit;
        const idx = parseInt(btnRemovePhoto.dataset.idx);
        if (unitDatabase[u] && unitDatabase[u][idx]) {
          unitDatabase[u][idx].foto = null;
          saveUnitDatabase();
          renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
          if (state.unitName === u) {
            applyUnitToState(u);
          }
          showToast('Foto pegawai dihapus.');
        }
        return;
      }

      // 6. Hapus Pegawai (Baris)
      const btnDelRow = e.target.closest('.btn-emp-delete-row');
      if (btnDelRow) {
        e.stopPropagation();
        const u = btnDelRow.dataset.unit;
        const idx = parseInt(btnDelRow.dataset.idx);
        if (unitDatabase[u] && unitDatabase[u][idx]) {
          const empName = unitDatabase[u][idx].nama || 'Pegawai';
          unitDatabase[u].splice(idx, 1);
          saveUnitDatabase();
          renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
          if (state.unitName === u) {
            applyUnitToState(u);
          }
          showToast(`Pegawai ${empName} berhasil dihapus.`);
        }
        return;
      }

      // 7. Toggle Accordion via Header
      const headerBar = e.target.closest('.unit-header-bar');
      if (headerBar) {
        if (e.target.classList.contains('unit-bulk-checkbox')) return;
        
        const card = headerBar.closest('.unit-accordion-card');
        if (!card) return;
        const u = card.dataset.unit;
        if (openUnitsSet.has(u)) {
          openUnitsSet.delete(u);
          card.classList.remove('open');
        } else {
          openUnitsSet.add(u);
          card.classList.add('open');
        }
      }
    });

    // Checkbox Change (Bulk Selection)
    container.addEventListener('change', (e) => {
      if (e.target.classList.contains('unit-bulk-checkbox')) {
        const u = e.target.dataset.unit;
        if (e.target.checked) {
          selectedUnitsForBulk.add(u);
        } else {
          selectedUnitsForBulk.delete(u);
        }
        updateBulkCountBadge();
      }

      // Jabatan Select Change
      if (e.target.classList.contains('emp-jabatan-select')) {
        const u = e.target.dataset.unit;
        const idx = parseInt(e.target.dataset.idx);
        if (unitDatabase[u] && unitDatabase[u][idx]) {
          unitDatabase[u][idx].jabatan = e.target.value;
          saveUnitDatabase();
          if (state.unitName === u) {
            applyUnitToState(u);
          }
        }
      }
    });

    // Employee Name Input
    container.addEventListener('input', (e) => {
      if (e.target.classList.contains('emp-name-input')) {
        const u = e.target.dataset.unit;
        const idx = parseInt(e.target.dataset.idx);
        if (unitDatabase[u] && unitDatabase[u][idx]) {
          unitDatabase[u][idx].nama = e.target.value;
          clearTimeout(window._saveEmpTimeout);
          window._saveEmpTimeout = setTimeout(() => {
            saveUnitDatabase();
            if (state.unitName === u) {
              if (state.members[idx]) {
                state.members[idx].name = e.target.value;
                renderTeamMembersInput();
                drawPosterCanvas();
              }
            }
          }, 300);
        }
      }
    });
  }

  // File Upload Handling with Auto-Resize
  const fileInput = document.getElementById('globalEmpPhotoInput');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file || !activePhotoTarget) return;

      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 360;
          let w = img.width;
          let h = img.height;
          if (w > h && w > maxDim) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else if (h > maxDim) {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

          const { unitName, empIdx } = activePhotoTarget;
          if (unitDatabase[unitName] && unitDatabase[unitName][empIdx]) {
            unitDatabase[unitName][empIdx].foto = compressedDataUrl;
            saveUnitDatabase();
            renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
            if (state.unitName === unitName) {
              applyUnitToState(unitName);
            }
            showToast(`Foto pegawai ${unitDatabase[unitName][empIdx].nama} berhasil disimpan!`);
          }
        };
        img.src = loadEvt.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // Top Toolbar Buttons
  // 1. Tambah Unit Baru
  const btnAddUnit = document.getElementById('btnAddNewUnit');
  if (btnAddUnit) {
    btnAddUnit.addEventListener('click', () => {
      const unitName = prompt('Masukkan Nama Unit Baru (contoh: KCP Jakarta Kemang):');
      if (unitName && unitName.trim()) {
        const cleanName = unitName.trim();
        if (unitDatabase[cleanName]) {
          alert(`Unit "${cleanName}" sudah terdaftar!`);
          openUnitsSet.add(cleanName);
          renderUnitsAccordion();
          return;
        }
        unitDatabase[cleanName] = [
          {
            id: 'EMP-' + Date.now(),
            nama: 'Pegawai Baru',
            jabatan: 'SGP',
            nip: '-',
            unit: cleanName,
            foto: null
          }
        ];
        openUnitsSet.add(cleanName);
        saveUnitDatabase();
        renderUnitsAccordion();
        showToast(`Unit "${cleanName}" berhasil dibuat!`);

        setTimeout(() => {
          const card = document.querySelector(`.unit-accordion-card[data-unit="${CSS.escape(cleanName)}"]`);
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const input = card.querySelector('.emp-name-input');
            if (input) {
              input.focus();
              input.select();
            }
          }
        }, 150);
      }
    });
  }

  // 2. Download Data (di samping kiri search bar)
  const btnDownload = document.getElementById('btnDownloadData');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      const flatList = [];
      Object.keys(unitDatabase).forEach(u => {
        flatList.push(...unitDatabase[u]);
      });
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(flatList, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "data_pegawai_unit.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Data pegawai unit berhasil didownload!');
    });
  }


function getTotalSelectedItemsCount() {
  let count = selectedUnitsForBulk.size;
  selectedEmployeesForBulk.forEach(key => {
    const [u] = key.split(':::');
    if (!selectedUnitsForBulk.has(u)) {
      count++;
    }
  });
  return count;
}

// 2b. Sinkronisasi UI Tombol X dan Tombol Hapus Item
  function updateBulkUI() {
    const btnCancel = document.getElementById('btnCancelBulkSelection');
    const bulkDeleteText = document.getElementById('bulkDeleteBtnText');
    const btnDelete = document.getElementById('btnToggleBulkDelete');

    const totalSelected = getTotalSelectedItemsCount();

    // Tombol 'X' HANYA muncul jika ada unit atau pegawai yang dicentang
    if (btnCancel) {
      if (totalSelected > 0) {
        btnCancel.classList.remove('hidden');
      } else {
        btnCancel.classList.add('hidden');
      }
    }

    // Update status tombol Hapus Item
    if (bulkDeleteText && btnDelete) {
      if (isBulkDeleteMode) {
        btnDelete.classList.add('active-deleting');
        if (totalSelected === 0) {
          bulkDeleteText.textContent = 'Hapus Item';
        } else {
          bulkDeleteText.textContent = `Hapus ${totalSelected} Item Dipilih`;
        }
      } else {
        btnDelete.classList.remove('active-deleting');
        bulkDeleteText.textContent = 'Hapus Item';
      }
    }
  }

  // Tombol Hapus Item
  const btnToggleBulkDelete = document.getElementById('btnToggleBulkDelete');
  if (btnToggleBulkDelete) {
    btnToggleBulkDelete.addEventListener('click', () => {
      const totalSelected = getTotalSelectedItemsCount();

      if (!isBulkDeleteMode) {
        // Masuk mode Hapus Item -> munculkan kotak centang di unit & pegawai
        isBulkDeleteMode = true;
        selectedUnitsForBulk.clear();
        selectedEmployeesForBulk.clear();
        updateBulkUI();
        renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
        showToast('Mode hapus aktif: Centang unit atau pegawai yang ingin dihapus.');
      } else {
        // Jika sudah dalam mode hapus:
        if (totalSelected === 0) {
          // Klik saat belum ada yang dicentang -> matikan mode centang
          isBulkDeleteMode = false;
          updateBulkUI();
          renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
          showToast('Mode hapus item dinonaktifkan.');
          return;
        }

        // Hitung rincian untuk konfirmasi dialog
        const unitCount = selectedUnitsForBulk.size;
        let empOnlyCount = 0;
        selectedEmployeesForBulk.forEach(key => {
          const [u] = key.split(':::');
          if (!selectedUnitsForBulk.has(u)) empOnlyCount++;
        });

        let parts = [];
        if (unitCount > 0) parts.push(`${unitCount} unit`);
        if (empOnlyCount > 0) parts.push(`${empOnlyCount} pegawai`);
        const itemsDesc = parts.join(' dan ');

        if (confirm(`Yakin ingin menghapus ${itemsDesc} terpilih?`)) {
          // 1. Hapus Unit secara penuh
          selectedUnitsForBulk.forEach(u => {
            delete unitDatabase[u];
            openUnitsSet.delete(u);
          });

          // 2. Hapus Pegawai individu untuk unit yang tidak dihapus penuh
          const empsByUnit = {};
          selectedEmployeesForBulk.forEach(key => {
            const [u, idxStr] = key.split(':::');
            if (!selectedUnitsForBulk.has(u) && unitDatabase[u]) {
              if (!empsByUnit[u]) empsByUnit[u] = [];
              empsByUnit[u].push(parseInt(idxStr, 10));
            }
          });

          Object.entries(empsByUnit).forEach(([u, indices]) => {
            // Urutkan descending agar index tidak bergeser saat splice
            indices.sort((a, b) => b - a);
            indices.forEach(idx => {
              if (unitDatabase[u] && unitDatabase[u][idx]) {
                unitDatabase[u].splice(idx, 1);
              }
            });
            if (state.unitName === u) {
              applyUnitToState(u);
            }
          });

          const totalDeleted = totalSelected;
          selectedUnitsForBulk.clear();
          selectedEmployeesForBulk.clear();
          isBulkDeleteMode = false;
          updateBulkUI();
          saveUnitDatabase();
          renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
          showToast(`${totalDeleted} item berhasil dihapus!`);
        }
      }
    });
  }

  // Tombol X (Pengganti Batal) -> Membatalkan pilihan & menyembunyikan kotak centang
  const btnCancelX = document.getElementById('btnCancelBulkSelection');
  if (btnCancelX) {
    btnCancelX.addEventListener('click', () => {
      isBulkDeleteMode = false;
      selectedUnitsForBulk.clear();
      selectedEmployeesForBulk.clear();
      updateBulkUI();
      renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
      showToast('Pilihan dibatalkan.');
    });
  }

  // Event Listener Checkbox Unit Change
  if (container) {
    container.addEventListener('change', (e) => {
      // Checkbox Unit
      if (e.target.classList.contains('unit-bulk-checkbox')) {
        const u = e.target.dataset.unit;
        const emps = unitDatabase[u] || [];
        if (e.target.checked) {
          selectedUnitsForBulk.add(u);
          emps.forEach((_, idx) => selectedEmployeesForBulk.add(`${u}:::${idx}`));
        } else {
          selectedUnitsForBulk.delete(u);
          emps.forEach((_, idx) => selectedEmployeesForBulk.delete(`${u}:::${idx}`));
        }
        updateBulkUI();
        renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
        return;
      }

      // Checkbox Pegawai
      if (e.target.classList.contains('emp-bulk-checkbox')) {
        const u = e.target.dataset.unit;
        const idx = parseInt(e.target.dataset.idx, 10);
        const key = `${u}:::${idx}`;
        const emps = unitDatabase[u] || [];

        if (e.target.checked) {
          selectedEmployeesForBulk.add(key);
          const allChecked = emps.length > 0 && emps.every((_, i) => selectedEmployeesForBulk.has(`${u}:::${i}`));
          if (allChecked) {
            selectedUnitsForBulk.add(u);
          }
        } else {
          selectedEmployeesForBulk.delete(key);
          selectedUnitsForBulk.delete(u);
        }
        updateBulkUI();
        renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
        return;
      }
    });
  }

    // 4. Search Bar
  const searchInput = document.getElementById('inputSearchUnitAndEmp');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderUnitsAccordion(e.target.value);
    });
  }
}

function updateBulkCountBadge() {
  const el = document.getElementById('bulkSelectedCount');
  if (el) el.textContent = selectedUnitsForBulk.size;
}

function setupTabNavigation() {
  const btnStudio = document.getElementById('tabBtnStudio');
  const btnEmployees = document.getElementById('tabBtnEmployees');
  const paneStudio = document.getElementById('tabContentStudio');
  const paneEmployees = document.getElementById('tabContentEmployees');

  function switchTab(target) {
    if (target === 'studio') {
      if (btnStudio) btnStudio.classList.add('active');
      if (btnEmployees) btnEmployees.classList.remove('active');
      if (paneStudio) paneStudio.classList.remove('hidden');
      if (paneEmployees) paneEmployees.classList.add('hidden');
      drawPosterCanvas();
    } else {
      if (btnEmployees) btnEmployees.classList.add('active');
      if (btnStudio) btnStudio.classList.remove('active');
      if (paneEmployees) paneEmployees.classList.remove('hidden');
      if (paneStudio) paneStudio.classList.add('hidden');
      renderUnitsAccordion(document.getElementById('inputSearchUnitAndEmp')?.value || '');
    }
  }

  if (btnStudio) btnStudio.addEventListener('click', () => switchTab('studio'));
  if (btnEmployees) btnEmployees.addEventListener('click', () => switchTab('employees'));

  // Quick picker in Tab 1
  const selQuick = document.getElementById('selectUnitQuick');
  if (selQuick) {
    selQuick.addEventListener('change', (e) => {
      const selectedUnit = e.target.value;
      if (!selectedUnit) return;
      applyUnitToState(selectedUnit);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  preloadBackgroundImages();
  initSampleData();
  renderTemplateSelector();
  renderTeamMembersInput();
  setupEventListeners();
  syncInputsFromState();
  setupTabNavigation();
  loadUnitEmployeeDatabase();

  // Initial Draw
  setTimeout(() => {
    drawPosterCanvas();
  }, 150);
});

// =============================================================
// MODAL PREVIEW FOTO PEGAWAI (IKON MATA)
// =============================================================
let currentPreviewTarget = null;

function openPhotoPreviewModal(unitName, empIdx) {
  const modal = document.getElementById('photoPreviewModal');
  if (!modal || !unitDatabase[unitName] || !unitDatabase[unitName][empIdx]) return;

  const emp = unitDatabase[unitName][empIdx];
  currentPreviewTarget = { unitName, empIdx };

  const nameEl = document.getElementById('previewModalEmpName');
  const roleUnitEl = document.getElementById('previewModalEmpRoleUnit');
  const imgEl = document.getElementById('previewModalImg');

  if (nameEl) nameEl.textContent = emp.nama || 'Tanpa Nama';
  if (roleUnitEl) roleUnitEl.textContent = `${emp.jabatan || 'Pegawai'} • ${unitName}`;

  if (imgEl) {
    imgEl.src = (emp.foto && emp.foto !== 'saved_sample') ? emp.foto : '';
  }

  modal.classList.remove('hidden');
}

function closePhotoPreviewModal() {
  const modal = document.getElementById('photoPreviewModal');
  if (modal) modal.classList.add('hidden');
  currentPreviewTarget = null;
}

// Setup listeners for Photo Preview Modal
(function setupPhotoPreviewModalListeners() {
  const modal = document.getElementById('photoPreviewModal');
  const btnClose = document.getElementById('btnClosePhotoPreview');
  const btnCloseBottom = document.getElementById('btnPreviewCloseBottom');
  const btnChangePhoto = document.getElementById('btnPreviewChangePhoto');

  if (btnClose) btnClose.addEventListener('click', closePhotoPreviewModal);
  if (btnCloseBottom) btnCloseBottom.addEventListener('click', closePhotoPreviewModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePhotoPreviewModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePhotoPreviewModal();
  });

  if (btnChangePhoto) {
    btnChangePhoto.addEventListener('click', () => {
      if (currentPreviewTarget) {
        activePhotoTarget = { ...currentPreviewTarget };
        closePhotoPreviewModal();
        const fileInput = document.getElementById('globalEmpPhotoInput');
        if (fileInput) {
          fileInput.value = '';
          fileInput.click();
        }
      }
    });
  }
})();
