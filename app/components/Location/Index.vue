<script setup>
const props = defineProps({
  invitationData: {
    type: Object,
  },
  isInvitation: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <section class="w-full">
    <LazySubHeader icon="bi-geo-alt-fill" title="lokasi_&_acara" />
    <!-- <div
      v-if="props.isInvitation"
      class="w-full bg-zinc-800/70 p-5 flex lg:justify-center gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth"
    >
      <LazyLocationEvent
        v-for="eventData in props.invitationData.events"
        :key="eventData.id"
        :title="eventData.name"
        :place="eventData.venue"
        :embed-url="eventData.maps_embed_url"
        :date="formatIndonesianDate(eventData.date)"
        :time="`${eventData.time_start} WIB`"
        :link="eventData.maps_url"
        :invitation-data="props.invitationData"
      />
    </div> -->
    <div
      class="w-full bg-zinc-800/70 p-5 flex lg:justify-center gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth"
    >
      <LazyLocationEvent
        title="Akad Nikah"
        place="Gedung Serbaguna"
        embed-url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.240349028301!2d111.059836173681!3d-7.6572867923590575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a20e9ea805ff9%3A0x29c624bcb77712a0!2sGedung%20SERBAGUNA%20Desa%20KORIPAN!5e0!3m2!1sid!2sid!4v1753687157153!5m2!1sid!2sid"
        date="Minggu, 28 Desember 2025"
        time="08.00 - 09.00 WIB"
        link="https://maps.app.goo.gl/myhfvssFkYKq755Y8"
      />
      <LazyLocationEvent
        title="Resepsi"
        place="Gedung Serbaguna"
        embed-url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.240349028301!2d111.059836173681!3d-7.6572867923590575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a20e9ea805ff9%3A0x29c624bcb77712a0!2sGedung%20SERBAGUNA%20Desa%20KORIPAN!5e0!3m2!1sid!2sid!4v1753687157153!5m2!1sid!2sid"
        date="Minggu, 28 Desember 2025"
        time="09.00 - 10.00 WIB"
        link="https://maps.app.goo.gl/myhfvssFkYKq755Y8"
      />
    </div>
  </section>
</template>
