<script setup>
const props = defineProps({
  path: String,
  icon: String,
  text: String,
  activePage: String,
});

const emit = defineEmits(["navigate"]);
</script>

<template>
  <button
    @click="emit('navigate', props.path)"
    type="button"
    :title="props.text"
    :aria-label="props.text"
    class="w-full max-w-20 mx-auto cursor-pointer group"
  >
    <i
      class="bi text-2xl group-hover:bg-linear-to-br/oklch group-hover:from-primary group-hover:via-secondary group-hover:to-tertiary group-hover:bg-clip-text group-hover:text-transparent transition"
      :class="[
        props.icon,
        props.activePage === props.path
          ? 'bg-linear-to-br/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent'
          : 'text-white',
      ]"
    ></i>
  </button>
</template>
