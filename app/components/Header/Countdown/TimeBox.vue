<script setup>
const props = defineProps(["time", "text"]);
</script>

<template>
  <div
    v-gsap.whenVisible.slower-10.once.from="{
      opacity: 0,
      scale: 0,
    }"
    class="text-center"
  >
    <div
      class="w-18 h-18 md:w-19 md:h-19 rounded-full bg-linear-to-br/oklch from-primary via-secondary to-tertiary flex justify-center items-center"
    >
      <div
        class="flex flex-col justify-center items-center bg-off-white dark:bg-dark rounded-full w-16.5 h-16.5 md:w-17.5 md:h-17.5"
      >
        <span class="text-2xl md:text-3xl font-bold text-text-secondary">{{
          props.time
        }}</span>
      </div>
    </div>
    <span class="text-xs text-text-primary">{{ props.text }}</span>
  </div>
</template>
