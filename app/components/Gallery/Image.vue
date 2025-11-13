<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const showModal = ref(false);
const imageUrl = computed(() => props.src);
</script>

<template>
  <div>
    <div v-gsap.once.slower.from="{ opacity: 0, scale: 0 }">
      <NuxtImg
        @click="showModal = true"
        :src="imageUrl"
        alt="Image Gallery"
        class="w-full aspect-square object-cover object-center cursor-pointer"
      />
    </div>

    <GalleryModal v-model="showModal" :image-url="imageUrl" />
  </div>
</template>
