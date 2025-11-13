/**
 * Mengkonversi timestamp menjadi format "waktu yang lalu"
 * @param {string|Date} timestamp - Timestamp dalam format ISO atau Date object
 * @returns {string} - Format "5 menit yang lalu", "2 jam yang lalu", dll
 */
export function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInMs = now - past;

  // Konversi ke detik
  const diffInSeconds = Math.floor(diffInMs / 1000);

  // Jika negatif (waktu masa depan), return "baru saja"
  if (diffInSeconds < 0) {
    return "baru saja";
  }

  // Detik
  if (diffInSeconds < 60) {
    return diffInSeconds <= 10
      ? "baru saja"
      : `${diffInSeconds} detik yang lalu`;
  }

  // Menit
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  }

  // Jam
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  }

  // Hari
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} hari yang lalu`;
  }

  // Minggu
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} minggu yang lalu`;
  }

  // Bulan
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} bulan yang lalu`;
  }

  // Tahun
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} tahun yang lalu`;
}

/**
 * Mengkonversi timestamp dengan format yang lebih detail
 * @param {string|Date} timestamp
 * @returns {string}
 */
export function timeAgoDetailed(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInMs = now - past;

  const diffInSeconds = Math.floor(diffInMs / 1000);

  if (diffInSeconds < 0) return "baru saja";
  if (diffInSeconds < 10) return "baru saja";
  if (diffInSeconds < 60) return `${diffInSeconds} detik yang lalu`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    const remainingMinutes = diffInMinutes % 60;
    if (remainingMinutes > 0) {
      return `${diffInHours} jam ${remainingMinutes} menit yang lalu`;
    }
    return `${diffInHours} jam yang lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} hari yang lalu`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} minggu yang lalu`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} bulan yang lalu`;

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} tahun yang lalu`;
}

/**
 * Format tanggal dengan fallback
 * Jika kurang dari 7 hari: "5 menit yang lalu"
 * Jika lebih dari 7 hari: "28 Juli 2025"
 */
export function smartTimeFormat(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInMs = now - past;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Jika kurang dari 7 hari, gunakan relative time
  if (diffInDays < 7) {
    return timeAgo(timestamp);
  }

  // Jika lebih dari 7 hari, gunakan format tanggal
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return past.toLocaleDateString("id-ID", options);
}

/**
 * Composable untuk reactive time ago
 * Auto update setiap menit
 */
export function useTimeAgo(timestamp) {
  const timeAgoText = ref(timeAgo(timestamp));

  // Update setiap menit
  const interval = setInterval(() => {
    timeAgoText.value = timeAgo(timestamp);
  }, 60000); // 60 detik

  onUnmounted(() => {
    clearInterval(interval);
  });

  return timeAgoText;
}
