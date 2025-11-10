<script setup>
const props = defineProps(["icon", "title"]);
</script>

<template>
  <div class="w-full py-3 px-4 flex justify-between items-center">
    <div
      v-gsap.whenVisible.slower-10.once.from="{
        opacity: 0,
        x: -30,
      }"
      class="flex items-center gap-2"
    >
      <div
        class="w-10 h-10 rounded-full bg-linear-to-br/oklch from-primary via-secondary to-tertiary flex justify-center items-center"
      >
        <div
          class="w-9 h-9 bg-dark rounded-full flex justify-center items-center"
        >
          <i class="bi text-lg" :class="props.icon"></i>
        </div>
      </div>
      <h4 class="font-medium text-sm md:text-base">{{ props.title }}</h4>
    </div>

    <div
      v-gsap.whenVisible.slower-10.once.from="{
        opacity: 0,
        x: 30,
      }"
    >
      <i class="bi bi-three-dots-vertical text-xl"></i>
    </div>
  </div>
</template>
