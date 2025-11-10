<script setup>
const props = defineProps([
  "title",
  "place",
  "embedUrl",
  "date",
  "time",
  "link",
  "invitationData",
]);

// Get event title with couple names
const getEventTitle = () => {
  const groomName = props.invitationData?.groom_name || "Pengantin Pria";
  const brideName = props.invitationData?.bride_name || "Pengantin Wanita";
  return `${props.title} - ${groomName} & ${brideName}`;
};

// Get full event description
const getEventDescription = () => {
  const groomName = props.invitationData?.groom_name || "Pengantin Pria";
  const brideName = props.invitationData?.bride_name || "Pengantin Wanita";
  const groomFull = props.invitationData?.groom?.full_name || groomName;
  const brideFull = props.invitationData?.bride?.full_name || brideName;

  let description = `${props.title}\n\n`;
  description += `Pernikahan:\n${groomFull} & ${brideFull}\n\n`;
  description += `Lokasi: ${props.place}\n`;
  description += `Tanggal: ${props.date}\n`;
  description += `Waktu: ${props.time}`;

  return description;
};

// Format date and time for calendar
const formatCalendarDate = (dateStr, timeStr) => {
  try {
    let dateObj;

    // Parse date in ISO format (2025-11-16T00:00:00.000000Z) or Indonesian format
    if (dateStr.includes("T")) {
      // ISO format from API
      dateObj = new Date(dateStr);
    } else if (dateStr.includes("-") && dateStr.length === 10) {
      // YYYY-MM-DD format
      dateObj = new Date(dateStr);
    } else {
      // Indonesian format (e.g., "16 November 2025")
      const monthMap = {
        Januari: 0,
        Februari: 1,
        Maret: 2,
        April: 3,
        Mei: 4,
        Juni: 5,
        Juli: 6,
        Agustus: 7,
        September: 8,
        Oktober: 9,
        November: 10,
        Desember: 11,
      };

      const parts = dateStr.trim().split(" ");
      const day = parseInt(parts[0]);
      const monthIndex = monthMap[parts[1]];
      const year = parseInt(parts[2]);

      if (monthIndex === undefined) {
        throw new Error("Invalid month name");
      }

      dateObj = new Date(year, monthIndex, day);
    }

    // Validate date
    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date");
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    // Parse time (e.g., "08:00" or "10:00 WIB")
    const timeParts = timeStr.split(" ")[0].split(":");
    const hours = timeParts[0].padStart(2, "0");
    const minutes = timeParts[1].padStart(2, "0");

    // Calculate end time (2 hours after start)
    const endHours = String((parseInt(hours) + 2) % 24).padStart(2, "0");

    console.log("Formatted date:", { year, month, day, hours, minutes });

    return {
      startDate: `${year}${month}${day}`,
      startTime: `${hours}${minutes}00`,
      endTime: `${endHours}${minutes}00`,
      year,
      month,
      day,
      hours,
      minutes,
    };
  } catch (error) {
    console.error("Error formatting date:", error, "Input:", dateStr);
    return null;
  }
};

// Generate Google Calendar URL
const addToGoogleCalendar = () => {
  // Use raw date from invitationData instead of formatted display date
  const rawDate = props.invitationData?.events?.[0]?.date || props.date;
  const rawTime = props.invitationData?.events?.[0]?.time_start || props.time;

  console.log("Using raw date:", rawDate);
  console.log("Using raw time:", rawTime);

  const formatted = formatCalendarDate(rawDate, rawTime);
  if (!formatted) {
    alert("Format tanggal tidak valid");
    return;
  }

  const { startDate, startTime, endTime } = formatted;
  const startDateTime = `${startDate}T${startTime}`;
  const endDateTime = `${startDate}T${endTime}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: getEventTitle(),
    dates: `${startDateTime}/${endDateTime}`,
    details: getEventDescription(),
    location: props.place,
    sf: "true",
    output: "xml",
  });

  window.open(
    `https://calendar.google.com/calendar/render?${params.toString()}`,
    "_blank"
  );
};
</script>

<template>
  <div
    v-gsap.whenVisible.once.slower-20.from="{ opacity: 0, scale: 0 }"
    class="min-w-90 w-full max-w-md snap-center snap-always bg-dark rounded-xl border border-white/30 p-4"
  >
    <div class="w-full flex justify-between items-center mb-3">
      <div class="flex items-center gap-x-3">
        <div
          class="w-10 h-10 bg-white rounded-full flex justify-center items-center"
        >
          <i class="bi bi-pin-map text-dark text-lg"></i>
        </div>
        <h4 class="text-sm font-semibold">{{ props.title }}</h4>
      </div>
      <button
        type="button"
        @click="addToGoogleCalendar"
        class="cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors group"
        aria-label="Simpan ke Google Calendar"
        title="Simpan ke Google Calendar"
      >
        <i
          class="bi bi-calendar-plus text-base group-hover:scale-110 transition-transform"
        ></i>
      </button>
    </div>

    <p class="text-white/70 text-sm md:text-base">{{ props.place }}</p>

    <!-- Map Embed -->
    <iframe
      v-if="props.embedUrl"
      :src="props.embedUrl"
      style="border: 0"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="w-full h-60 rounded-md my-2"
    ></iframe>
    <div
      v-else
      class="w-full h-60 bg-zinc-800 rounded-md my-2 flex flex-col justify-center items-center gap-4"
    >
      <i class="bi bi-geo-alt text-6xl text-zinc-600"></i>
      <span class="text-zinc-400">Lokasi Acara</span>
    </div>

    <!-- Event Details -->
    <div class="w-full flex items-center text-white/70 gap-x-5">
      <div class="flex items-center gap-x-1">
        <i class="bi bi-calendar4-event"></i>
        <p class="text-xs md:text-sm">{{ props.date }}</p>
      </div>
      <div class="flex items-center gap-x-1">
        <i class="bi bi-clock"></i>
        <p class="text-xs md:text-sm">{{ props.time }}</p>
      </div>
      <a
        v-if="props.link"
        :href="props.link"
        target="_blank"
        class="hover:text-white transition-colors"
        aria-label="Buka Lokasi di Maps"
      >
        <i class="bi bi-send"></i>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* Smooth icon animation */
.group:hover i {
  transform: scale(1.1);
}
</style>
