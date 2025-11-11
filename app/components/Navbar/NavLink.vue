<script setup>
const props = defineProps({
  path: String,
  icon: String,
  text: String,
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
      class="bi text-2xl group-hover:bg-linear-to-br/oklch group-hover:from-primary group-hover:via-secondary group-hover:to-tertiary group-hover:bg-clip-text group-hover:text-transparent transition text-white"
      :class="props.icon"
    ></i>
    <!-- <i
      class="bi text-xl group-hover:bg-linear-to-br/oklch group-hover:from-primary group-hover:via-secondary group-hover:to-tertiary group-hover:bg-clip-text group-hover:text-transparent transition"
      :class="[
        props.icon,
        activeSection === props.href
          ? 'bg-linear-to-br/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent'
          : 'text-white',
      ]"
    ></i> -->
  </button>
</template>
