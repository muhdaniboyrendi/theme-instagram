<script setup>
const props = defineProps(["fullscreenIcon"]);
const emit = defineEmits(["toggleFullScreen"]);

const toggleFullscreen = () => {
  emit("toggleFullScreen");
};
</script>

<template>
  <div>
    <button
      @click="toggleFullscreen"
      type="button"
      class="w-8 h-8 font-medium text-sm rounded-xl hover:cursor-pointer hover:scale-110 active:scale-90 transition duration-300 group"
      aria-label="Toggle Fullscreen"
    >
      <i
        class="bi text-white group-hover:text-tertiary"
        :class="props.fullscreenIcon"
      ></i>
    </button>
  </div>
</template>
