<script setup>
const props = defineProps({
  invitationData: {
    type: Array,
  },
  isInvitation: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section class="w-full">
    <div class="w-full p-3">
      <div
        class="w-full py-2 px-4 rounded-xl bg-zinc-800 flex items-center gap-4 mb-2"
      >
        <i class="bi bi-search"></i>
        <span class="text-zinc-400">Cari</span>
      </div>
    </div>

    <div v-if="props.isInvitation" class="w-full grid grid-cols-3 gap-0.5">
      <LazyGalleryImage
        v-for="image in props.invitationData"
        :key="image.id"
        :src="image.image_url"
      />
    </div>
    <div v-else class="w-full grid grid-cols-3 gap-0.5">
      <LazyGalleryImage
        v-for="(n, index) in 6"
        :key="index"
        src="/placeholder.jpg"
      />
    </div>

    <div
      v-gsap.once.slower.from="{ opacity: 0, scale: 0 }"
      class="w-full aspect-video flex justify-center items-center bg-zinc-800 mt-1"
    >
      <i class="bi bi-play-circle text-5xl text-zinc-400"></i>
    </div>
  </section>
</template>
