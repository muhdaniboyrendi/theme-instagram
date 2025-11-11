<script setup>
const props = defineProps(["link", "icon", "label"]);
</script>

<template>
  <a
    :href="props.link"
    target="_blank"
    :title="props.label"
    :aria-label="props.label"
    class="w-10 h-10 bg-linear-to-br/oklch from-primary via-secondary to-tertiary rounded-[0.85rem] flex justify-center items-center hover:scale-105 active:scale-95 transition duration"
  >
    <span class="w-9 h-9 bg-dark rounded-xl flex justify-center items-center">
      <i
        class="bi bg-linear-to-br/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent"
        :class="props.icon"
      ></i>
    </span>
  </a>
</template>
