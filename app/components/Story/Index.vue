<script setup>
const props = defineProps({
  invitationData: {
    type: Object,
  },
  isPreview: {
    type: Boolean,
  },
});

const currentIndex = ref(0);
const containerRef = ref(null);

// Track scroll untuk update indicator
const handleScroll = () => {
  if (!containerRef.value) return;

  const scrollTop = containerRef.value.scrollTop;
  const windowHeight = window.innerHeight;
  const newIndex = Math.round(scrollTop / windowHeight);

  currentIndex.value = newIndex;
};

// Fungsi untuk scroll ke story tertentu
const scrollToStory = (index) => {
  if (!containerRef.value) return;

  const windowHeight = window.innerHeight;
  containerRef.value.scrollTo({
    top: index * windowHeight,
    behavior: "smooth",
  });
};

const storiesCount = computed(() => {
  return props.isPreview ? 2 : props.invitationData?.love_stories?.length || 0;
});
</script>

<template>
  <!-- Container dengan snap scroll -->
  <section
    ref="containerRef"
    @scroll="handleScroll"
    class="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch"
  >
    <!-- Dengan data invitation -->
    <div v-if="props.isPreview">
      <div class="w-full h-screen snap-start snap-always flex shrink-0">
        <StoryView
          image="/placeholder.jpg"
          title="Cinta Sejati"
          date="Minggu, 28 Desember 2025"
          description="Sebuah kisah cinta yang abadi."
        />
      </div>
      <div class="w-full h-screen snap-start snap-always flex shrink-0">
        <StoryView
          image="/placeholder.jpg"
          title="Cinta Sejati 2"
          date="Minggu, 28 Desember 2025"
          description="Sebuah kisah cinta yang abadi."
        />
      </div>
    </div>

    <!-- Tanpa data invitation (static) -->
    <div v-else>
      <div
        v-for="(story, index) in props.invitationData.love_stories"
        :key="index"
        class="w-full h-screen snap-start snap-always flex shrink-0"
      >
        <StoryView
          :image="story.thumbnail_url"
          :title="story.title"
          :date="formatIndonesianDate(story.date)"
          :description="story.description"
        />
      </div>
    </div>
  </section>

  <!-- Story Progress Indicator (opsional, seperti Instagram) -->
  <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-1 px-4">
    <div
      v-for="n in storiesCount"
      :key="n"
      @click="scrollToStory(n - 1)"
      class="h-1 flex-1 rounded-full transition-all duration-300 cursor-pointer"
      :class="[currentIndex >= n - 1 ? 'bg-white' : 'bg-white/30']"
      style="min-width: 40px; max-width: 80px"
    />
  </div>
</template>

<style scoped>
/* Hide scrollbar untuk tampilan lebih bersih */
section::-webkit-scrollbar {
  display: none;
}

section {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Pastikan snap bekerja dengan baik */
section > div {
  scroll-snap-stop: always;
}
</style>
