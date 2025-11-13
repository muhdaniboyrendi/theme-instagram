<script setup>
const props = defineProps(["audioIcon"]);
const emit = defineEmits(["toggleAudio"]);

const toggleAudio = () => {
  emit("toggleAudio");
};
</script>

<template>
  <div>
    <button
      @click="toggleAudio"
      type="button"
      class="w-8 h-8 font-medium text-sm rounded-xl hover:cursor-pointer hover:scale-110 active:scale-90 transition duration-300 group"
      aria-label="Toggle Audio"
    >
      <i class="bi text-white group-hover:text-tertiary" :class="props.audioIcon"></i>
    </button>
  </div>
</template>
