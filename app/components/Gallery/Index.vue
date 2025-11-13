<script setup>
const props = defineProps({
  invitationData: {
    type: Object,
  },
  isPreview: {
    type: Boolean,
  },
});

const selectedVideo = ref(null);

const openVideo = (videoUrl) => {
  selectedVideo.value = videoUrl;
};

const closeVideo = () => {
  selectedVideo.value = null;
};
</script>

<template>
  <section class="w-full pb-20">
    <div class="w-full p-3">
      <div
        class="w-full py-2 px-4 rounded-xl bg-zinc-800 flex items-center gap-4 mb-2"
      >
        <i class="bi bi-search"></i>
        <span class="text-zinc-400">Cari</span>
      </div>
    </div>

    <!-- Photos -->
    <div v-if="props.isPreview" class="w-full grid grid-cols-3 gap-0.5">
      <GalleryImage
        v-for="(n, index) in 6"
        :key="index"
        src="/placeholder.webp"
      />
    </div>
    <div v-else class="w-full grid grid-cols-3 gap-0.5">
      <GalleryImage
        v-for="image in props.invitationData.galleries"
        :key="image.id"
        :src="image.image_url"
      />
    </div>

    <!-- Videos -->
    <div v-if="props.isPreview" class="w-full grid grid-cols-1 gap-1 mt-1">
      <div
        v-gsap.once.slower.from="{ opacity: 0, scale: 0 }"
        class="w-full aspect-video flex justify-center items-center bg-zinc-800 cursor-pointer hover:bg-zinc-700 transition-colors"
      >
        <i class="bi bi-play-circle text-5xl text-zinc-400"></i>
      </div>
    </div>
    <div
      v-else-if="props.invitationData?.videos?.length > 0"
      class="w-full grid grid-cols-1 gap-1 mt-1"
    >
      <div
        v-for="video in props.invitationData.videos"
        :key="video.id"
        v-gsap.once.slower.from="{ opacity: 0, scale: 0 }"
        @click="openVideo(video.video_url)"
        class="w-full aspect-video flex justify-center items-center bg-zinc-800 cursor-pointer hover:bg-zinc-700 transition-colors relative overflow-hidden group"
      >
        <!-- Video sebagai thumbnail -->
        <video
          :src="video.video_url"
          class="w-full h-full object-cover absolute inset-0"
          preload="metadata"
          muted
        ></video>

        <!-- Play button overlay -->
        <div
          class="relative z-10 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/50 w-full h-full transition-colors"
        >
          <i
            class="bi bi-play-circle-fill text-6xl text-white drop-shadow-lg"
          ></i>
        </div>
      </div>
    </div>

    <!-- Video Modal/Player -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="selectedVideo"
          @click="closeVideo"
          class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <div
            @click.stop
            class="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
          >
            <button
              @click="closeVideo"
              class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <i class="bi bi-x-lg text-xl"></i>
            </button>
            <video :src="selectedVideo" controls autoplay class="w-full h-full">
              Browser Anda tidak mendukung tag video.
            </video>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
