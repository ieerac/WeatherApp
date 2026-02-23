/* ============================================================
   cuacaXD — Script Utama
   Aplikasi cuaca modern dengan deteksi lokasi otomatis,
   pencarian manual, prakiraan 5 hari, dan tema otomatis.
   ============================================================ */

// ==================== KONFIGURASI ====================
const API_KEY = '62606b6ac0e14e6c9c461454261902';
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

// ==================== ELEMEN DOM ====================
const body = document.body;
const loading = document.getElementById('loading');
const errorContainer = document.getElementById('error-container');
const errorMessage = document.getElementById('error-message');
const errorRetryBtn = document.getElementById('error-retry-btn');
const geoFallback = document.getElementById('geo-fallback');
const weatherContent = document.getElementById('weather-content');

// Header search
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');

// Fallback form
const fallbackForm = document.getElementById('fallback-form');
const fallbackInput = document.getElementById('fallback-input');

// Current weather elements
const locationName = document.getElementById('location-name');
const localTime = document.getElementById('local-time');
const currentIcon = document.getElementById('current-icon');
const currentTemp = document.getElementById('current-temp');
const currentCondition = document.getElementById('current-condition');
const currentHumidity = document.getElementById('current-humidity');
const currentWind = document.getElementById('current-wind');
const currentPressure = document.getElementById('current-pressure');
const currentVisibility = document.getElementById('current-visibility');
const currentUV = document.getElementById('current-uv');
const currentRain = document.getElementById('current-rain');

// Forecast grid
const forecastGrid = document.getElementById('forecast-grid');

// Variabel untuk menyimpan lokasi terakhir yang dicari (untuk retry)
let lastSearchedLocation = null;

// Interval ID untuk jam real-time lokasi
let locationClockInterval = null;

// ==================== NAMA HARI INDONESIA ====================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

// ============================================================
// 1. TEMA (AUTO / LIGHT / DARK) DENGAN TOGGLE MANUAL
//    Mode Auto menggunakan waktu lokal LOKASI CUACA yang dipilih.
// ============================================================

// Mode tema: 'auto' | 'light' | 'dark'
let themeMode = localStorage.getItem('cuacaxd-theme') || 'auto';

// Elemen toggle tema
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeLabel = document.getElementById('theme-label');

/**
 * Menyimpan data waktu lokasi cuaca yang sedang ditampilkan.
 * - localtimeStr: string "YYYY-MM-DD HH:mm" dari API
 * - fetchedAt: timestamp saat data di-fetch (untuk menghitung selisih waktu)
 * Jika belum ada data cuaca, akan fallback ke waktu komputer lokal.
 */
let locationTimeData = null;

/**
 * Mendapatkan perkiraan jam saat ini di LOKASI cuaca yang ditampilkan.
 * Menghitung berdasarkan waktu lokal lokasi saat data di-fetch,
 * ditambah selisih waktu sejak data terakhir di-fetch.
 * Jika belum ada data lokasi, gunakan jam komputer sebagai fallback.
 */
function getLocationHour() {
    if (locationTimeData) {
        // Hitung berapa milidetik berlalu sejak data di-fetch
        const elapsed = Date.now() - locationTimeData.fetchedAt;
        // Buat Date dari waktu lokasi, tambahkan elapsed
        const locTime = new Date(locationTimeData.localtimeStr.replace(' ', 'T'));
        locTime.setTime(locTime.getTime() + elapsed);
        return locTime.getHours();
    }
    // Fallback: gunakan waktu komputer lokal
    return new Date().getHours();
}

/**
 * Mendapatkan perkiraan waktu saat ini di LOKASI cuaca sebagai objek Date.
 */
function getLocationTime() {
    if (locationTimeData) {
        const elapsed = Date.now() - locationTimeData.fetchedAt;
        const locTime = new Date(locationTimeData.localtimeStr.replace(' ', 'T'));
        locTime.setTime(locTime.getTime() + elapsed);
        return locTime;
    }
    return new Date();
}

/**
 * Memperbarui tampilan jam real-time di elemen #local-time.
 */
function updateLocationClock() {
    const now = getLocationTime();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = `${HARI[now.getDay()]}, ${now.getDate()} ${BULAN[now.getMonth()]} ${now.getFullYear()}`;
    localTime.innerHTML = `<i class="fa-regular fa-clock"></i> <span>${dateStr} • ${timeStr}</span>`;
}

/**
 * Menentukan apakah seharusnya dark berdasarkan jam di lokasi cuaca.
 * Jam 06:00 - 17:59 => false (light / siang)
 * Jam 18:00 - 05:59 => true  (dark / malam)
 */
function isNightTime() {
    const hour = getLocationHour();
    return hour < 6 || hour >= 18;
}

/**
 * Menerapkan tema ke body berdasarkan themeMode saat ini.
 */
function applyTheme() {
    let isDark = false;

    if (themeMode === 'auto') {
        isDark = isNightTime();
    } else if (themeMode === 'dark') {
        isDark = true;
    } else {
        isDark = false;
    }

    // Terapkan class dark pada body
    if (isDark) {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }

    // Update tampilan toggle button
    updateToggleUI();
}

/**
 * Memperbarui tampilan tombol toggle (ikon, label, posisi thumb).
 */
function updateToggleUI() {
    const isDark = body.classList.contains('dark');

    // Update label teks
    if (themeMode === 'auto') {
        themeLabel.textContent = 'Auto';
    } else if (themeMode === 'light') {
        themeLabel.textContent = 'Light';
    } else {
        themeLabel.textContent = 'Dark';
    }

    // Update posisi thumb & active icon via class pada button
    themeToggleBtn.classList.toggle('is-dark', isDark);
}

/**
 * Siklus mode tema: auto → light → dark → auto
 */
function cycleThemeMode() {
    if (themeMode === 'auto') {
        themeMode = 'light';
    } else if (themeMode === 'light') {
        themeMode = 'dark';
    } else {
        themeMode = 'auto';
    }

    // Simpan ke localStorage
    localStorage.setItem('cuacaxd-theme', themeMode);

    // Terapkan tema
    applyTheme();
}

// Event listener tombol toggle
themeToggleBtn.addEventListener('click', cycleThemeMode);

// Terapkan tema saat halaman dimuat (fallback ke waktu komputer)
applyTheme();

// Perbarui tema setiap 1 menit (hanya berpengaruh jika mode = 'auto')
setInterval(() => {
    if (themeMode === 'auto') {
        applyTheme();
    }
}, 60000);

// ============================================================
// 2. UTILITAS TAMPILAN
// ============================================================

/**
 * Menampilkan satu section dan menyembunyikan yang lain.
 * @param {'loading'|'error'|'fallback'|'weather'} section
 */
function showSection(section) {
    loading.classList.add('hidden');
    errorContainer.classList.add('hidden');
    geoFallback.classList.add('hidden');
    weatherContent.classList.add('hidden');

    switch (section) {
        case 'loading':
            loading.classList.remove('hidden');
            break;
        case 'error':
            errorContainer.classList.remove('hidden');
            break;
        case 'fallback':
            geoFallback.classList.remove('hidden');
            break;
        case 'weather':
            weatherContent.classList.remove('hidden');
            break;
    }
}

// ============================================================
// 3. FETCH DATA CUACA DARI API
// ============================================================

/**
 * Mengambil data cuaca dari WeatherAPI.com
 * @param {string} location - nama kota atau "lat,lon"
 */
async function fetchWeather(location) {
    // Simpan lokasi terakhir untuk fitur retry
    lastSearchedLocation = location;

    // Tampilkan loading
    showSection('loading');

    try {
        // Bangun URL dengan parameter yang diminta
        const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(location)}&days=5&aqi=no&alerts=no`;

        const response = await fetch(url);
        const data = await response.json();

        // Cek apakah API mengembalikan error
        if (data.error) {
            // Error dari API (misal: kota tidak ditemukan - kode 1006)
            const msg = data.error.code === 1006
                ? `Lokasi "${location}" tidak ditemukan. Pastikan nama kota sudah benar.`
                : `Error API: ${data.error.message} (kode: ${data.error.code})`;
            displayError(msg);
            return;
        }

        // Data berhasil — tampilkan cuaca
        displayWeather(data);

    } catch (err) {
        // Error jaringan atau lainnya
        console.error('Fetch error:', err);
        displayError('Gagal mengambil data cuaca. Periksa koneksi internet Anda dan coba lagi.');
    }
}

// ============================================================
// 4. TAMPILKAN DATA CUACA KE HTML
// ============================================================

/**
 * Menampilkan data cuaca saat ini dan prakiraan 5 hari.
 * @param {Object} data - response JSON dari WeatherAPI
 */
function displayWeather(data) {
    const { location: loc, current, forecast } = data;

    // === SIMPAN WAKTU LOKASI UNTUK TEMA AUTO ===
    // Simpan localtime dari API dan timestamp saat ini untuk menghitung elapsed time
    locationTimeData = {
        localtimeStr: loc.localtime,  // format: "YYYY-MM-DD HH:mm"
        fetchedAt: Date.now()
    };

    // Terapkan ulang tema (agar auto mengikuti waktu lokasi baru)
    applyTheme();

    // === CUACA SAAT INI ===

    // Lokasi
    locationName.innerHTML = `<i class="fa-solid fa-location-dot"></i> <span>${loc.name}, ${loc.country}</span>`;

    // Jam real-time lokasi — hentikan interval sebelumnya jika ada
    if (locationClockInterval) {
        clearInterval(locationClockInterval);
    }
    // Perbarui segera, lalu mulai interval setiap detik
    updateLocationClock();
    locationClockInterval = setInterval(updateLocationClock, 1000);

    // Ikon & suhu
    currentIcon.src = `https:${current.condition.icon}`;
    currentIcon.alt = current.condition.text;
    currentTemp.textContent = `${Math.round(current.temp_c)}°C`;
    currentCondition.textContent = current.condition.text;

    // Detail
    currentHumidity.textContent = `${current.humidity}%`;
    currentWind.textContent = `${current.wind_kph} km/jam`;
    currentPressure.textContent = `${current.pressure_mb} mb`;
    currentVisibility.textContent = `${current.vis_km} km`;
    currentUV.textContent = current.uv;

    // Peluang hujan (hari ini dari forecast)
    const todayForecast = forecast.forecastday[0];
    const rainChance = todayForecast?.day?.daily_chance_of_rain ?? '—';
    currentRain.textContent = rainChance !== '—' ? `${rainChance}%` : '—';

    // === PRAKIRAAN 5 HARI ===
    forecastGrid.innerHTML = '';

    forecast.forecastday.forEach((dayData) => {
        const d = new Date(dayData.date + 'T00:00:00');
        const dayName = HARI[d.getDay()];
        const dayDate = `${d.getDate()} ${BULAN[d.getMonth()]}`;
        const icon = `https:${dayData.day.condition.icon}`;
        const maxTemp = Math.round(dayData.day.maxtemp_c);
        const minTemp = Math.round(dayData.day.mintemp_c);
        const condText = dayData.day.condition.text;
        const rain = dayData.day.daily_chance_of_rain;

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
      <div class="forecast-day">${dayName}</div>
      <div class="forecast-date">${dayDate}</div>
      <img class="forecast-icon" src="${icon}" alt="${condText}" loading="lazy">
      <div class="forecast-temp">
        <span class="max">${maxTemp}°</span>
        <span class="min"> / ${minTemp}°</span>
      </div>
      <div class="forecast-condition" title="${condText}">${condText}</div>
      ${rain != null ? `<div class="forecast-rain"><i class="fa-solid fa-droplet"></i> ${rain}%</div>` : ''}
    `;
        forecastGrid.appendChild(card);
    });

    // Tampilkan section cuaca
    showSection('weather');
}

// ============================================================
// 5. TAMPILKAN PESAN ERROR
// ============================================================

/**
 * Menampilkan pesan error ke pengguna.
 * @param {string} message
 */
function displayError(message) {
    errorMessage.textContent = message;
    showSection('error');
}

// ============================================================
// 6. EVENT LISTENERS
// ============================================================

// --- Tombol Retry pada error ---
errorRetryBtn.addEventListener('click', () => {
    if (lastSearchedLocation) {
        fetchWeather(lastSearchedLocation);
    } else {
        initGeolocation();
    }
});

// --- Form pencarian di header ---
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        cityInput.blur(); // tutup keyboard di mobile
    }
});

// --- Form fallback (jika geolocation gagal) ---
fallbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = fallbackInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

// ============================================================
// 7. LOCATION PICKER MODAL (Benua → Negara → Kota → Daerah)
// ============================================================

// --- Elemen DOM Modal ---
const locationModal = document.getElementById('location-modal');
const openPickerBtn = document.getElementById('open-picker-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const pickerCancelBtn = document.getElementById('picker-cancel-btn');
const pickerSubmitBtn = document.getElementById('picker-submit-btn');
const pickerPreview = document.getElementById('picker-preview');
const pickerPreviewText = document.getElementById('picker-preview-text');

const selectContinent = document.getElementById('select-continent');
const selectCountry = document.getElementById('select-country');
const selectCity = document.getElementById('select-city');
const selectArea = document.getElementById('select-area');

// Variabel state untuk picker
let pickerSelectedCity = '';
let pickerSelectedArea = '';

/**
 * Membuka modal location picker
 */
function openModal() {
    resetPicker();
    populateContinents();
    locationModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // prevent scroll
}

/**
 * Menutup modal location picker
 */
function closeModal() {
    locationModal.classList.add('hidden');
    document.body.style.overflow = '';
}

/**
 * Reset semua dropdown ke kondisi awal
 */
function resetPicker() {
    // Reset continent
    selectContinent.value = '';

    // Reset & disable country
    selectCountry.innerHTML = '<option value="">— Pilih Negara —</option>';
    selectCountry.disabled = true;

    // Reset & disable city
    selectCity.innerHTML = '<option value="">— Pilih Kota —</option>';
    selectCity.disabled = true;

    // Reset & disable area
    selectArea.innerHTML = '<option value="">— Pilih Daerah (opsional) —</option>';
    selectArea.disabled = true;

    // Reset state
    pickerSelectedCity = '';
    pickerSelectedArea = '';

    // Hide preview & disable submit
    pickerPreview.classList.add('hidden');
    pickerSubmitBtn.disabled = true;
}

/**
 * Mengisi dropdown benua dari WORLD_LOCATIONS
 */
function populateContinents() {
    selectContinent.innerHTML = '<option value="">— Pilih Benua —</option>';
    const continents = Object.keys(WORLD_LOCATIONS);
    continents.forEach(continent => {
        const opt = document.createElement('option');
        opt.value = continent;
        opt.textContent = continent;
        selectContinent.appendChild(opt);
    });
}

/**
 * Mengisi dropdown negara berdasarkan benua yang dipilih
 */
function populateCountries(continent) {
    selectCountry.innerHTML = '<option value="">— Pilih Negara —</option>';
    selectCity.innerHTML = '<option value="">— Pilih Kota —</option>';
    selectCity.disabled = true;
    selectArea.innerHTML = '<option value="">— Pilih Daerah (opsional) —</option>';
    selectArea.disabled = true;

    if (!continent || !WORLD_LOCATIONS[continent]) {
        selectCountry.disabled = true;
        return;
    }

    const countries = Object.keys(WORLD_LOCATIONS[continent]).sort();
    countries.forEach(country => {
        const opt = document.createElement('option');
        opt.value = country;
        opt.textContent = country;
        selectCountry.appendChild(opt);
    });
    selectCountry.disabled = false;
}

/**
 * Mengisi dropdown kota berdasarkan negara yang dipilih
 */
function populateCities(continent, country) {
    selectCity.innerHTML = '<option value="">— Pilih Kota —</option>';
    selectArea.innerHTML = '<option value="">— Pilih Daerah (opsional) —</option>';
    selectArea.disabled = true;

    if (!continent || !country || !WORLD_LOCATIONS[continent]?.[country]) {
        selectCity.disabled = true;
        return;
    }

    const cities = Object.keys(WORLD_LOCATIONS[continent][country]).sort();
    cities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        selectCity.appendChild(opt);
    });
    selectCity.disabled = false;
}

/**
 * Mengisi dropdown daerah berdasarkan kota yang dipilih
 */
function populateAreas(continent, country, city) {
    selectArea.innerHTML = '<option value="">— Pilih Daerah (opsional) —</option>';

    if (!continent || !country || !city || !WORLD_LOCATIONS[continent]?.[country]?.[city]) {
        selectArea.disabled = true;
        return;
    }

    const areas = WORLD_LOCATIONS[continent][country][city];
    if (areas && areas.length > 0) {
        areas.forEach(area => {
            const opt = document.createElement('option');
            opt.value = area;
            opt.textContent = area;
            selectArea.appendChild(opt);
        });
        selectArea.disabled = false;
    } else {
        selectArea.disabled = true;
    }
}

/**
 * Memperbarui preview lokasi terpilih dan status tombol submit
 */
function updatePickerPreview() {
    const continent = selectContinent.value;
    const country = selectCountry.value;
    const city = selectCity.value;
    const area = selectArea.value;

    if (city) {
        // Bangun teks preview
        let previewParts = [];
        if (area) previewParts.push(area);
        previewParts.push(city);
        if (country) previewParts.push(country);

        pickerPreviewText.textContent = previewParts.join(', ');
        pickerPreview.classList.remove('hidden');

        // Simpan untuk fetch — gunakan area jika ada, jika tidak gunakan city
        pickerSelectedCity = city;
        pickerSelectedArea = area;

        // Aktifkan tombol submit
        pickerSubmitBtn.disabled = false;
    } else {
        pickerPreview.classList.add('hidden');
        pickerSubmitBtn.disabled = true;
        pickerSelectedCity = '';
        pickerSelectedArea = '';
    }
}

// --- Event Listeners untuk Cascading Dropdowns ---

selectContinent.addEventListener('change', () => {
    const continent = selectContinent.value;
    populateCountries(continent);
    pickerSelectedCity = '';
    pickerSelectedArea = '';
    updatePickerPreview();
});

selectCountry.addEventListener('change', () => {
    const continent = selectContinent.value;
    const country = selectCountry.value;
    populateCities(continent, country);
    pickerSelectedCity = '';
    pickerSelectedArea = '';
    updatePickerPreview();
});

selectCity.addEventListener('change', () => {
    const continent = selectContinent.value;
    const country = selectCountry.value;
    const city = selectCity.value;
    populateAreas(continent, country, city);
    pickerSelectedArea = '';
    updatePickerPreview();
});

selectArea.addEventListener('change', () => {
    updatePickerPreview();
});

// --- Event Listeners untuk Modal Open/Close ---

openPickerBtn.addEventListener('click', () => {
    openModal();
});

closeModalBtn.addEventListener('click', () => {
    closeModal();
});

pickerCancelBtn.addEventListener('click', () => {
    closeModal();
});

// Tutup modal saat klik overlay (luar modal)
locationModal.addEventListener('click', (e) => {
    if (e.target === locationModal) {
        closeModal();
    }
});

// Tutup modal dengan Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !locationModal.classList.contains('hidden')) {
        closeModal();
    }
});

// --- Submit lokasi terpilih ---
pickerSubmitBtn.addEventListener('click', () => {
    // Bangun query untuk API — gunakan area + city atau hanya city
    let query = '';
    if (pickerSelectedArea) {
        query = `${pickerSelectedArea}, ${pickerSelectedCity}`;
    } else if (pickerSelectedCity) {
        query = pickerSelectedCity;
    }

    if (query) {
        closeModal();
        fetchWeather(query);
    }
});

// ============================================================
// 8. DETEKSI LOKASI OTOMATIS (GEOLOCATION)
// ============================================================

/**
 * Mencoba mendapatkan lokasi pengguna melalui geolocation browser.
 * Jika berhasil => fetch cuaca untuk koordinat tersebut.
 * Jika gagal  => tampilkan form input manual (fallback).
 */
function initGeolocation() {
    showSection('loading');

    if (!navigator.geolocation) {
        // Browser tidak mendukung geolocation
        console.warn('Geolocation tidak didukung oleh browser ini.');
        showSection('fallback');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
            const { latitude, longitude } = position.coords;
            const locationStr = `${latitude},${longitude}`;
            console.log(`Lokasi terdeteksi: ${locationStr}`);
            fetchWeather(locationStr);
        },
        // Error callback
        (error) => {
            console.warn('Geolocation error:', error.message);
            showSection('fallback');
        },
        // Options
        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000 // cache 5 menit
        }
    );
}

// ============================================================
// 9. INISIALISASI APLIKASI
// ============================================================

/**
 * Fungsi utama yang dijalankan saat halaman dimuat.
 * 1. Set tema (sudah dilakukan di atas)
 * 2. Mulai interval tema (sudah dilakukan di atas)
 * 3. Cek geolocation
 */
function init() {
    initGeolocation();
}

// Jalankan inisialisasi
init();
