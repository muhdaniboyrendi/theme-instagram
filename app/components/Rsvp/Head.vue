<script setup>
const props = defineProps({
  status: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div
    class="w-full max-w-md mx-auto py-5 flex flex-col justify-center items-center gap-5"
  >
    <div
      class="w-full flex justify-center items-center gap-5 text-white dark:text-dark text-4xl"
    >
      <div
        v-gsap.whenVisible.once.slower-10.from="{ opacity: 0, x: -30 }"
        class="w-20 h-20 rounded-full flex justify-center items-center"
        :class="
          props.status === 'attending'
            ? 'bg-green-500'
            : 'bg-dark dark:bg-white'
        "
      >
        <i class="bi bi-person-check"></i>
      </div>
      <div
        v-gsap.whenVisible.once.slower-10.from="{ opacity: 0, x: 30 }"
        class="w-20 h-20 rounded-full flex justify-center items-center"
        :class="
          props.status === 'not_attending'
            ? 'bg-red-500'
            : 'bg-dark dark:bg-white'
        "
      >
        <i class="bi bi-person-x"></i>
      </div>
    </div>
    <div v-gsap.whenVisible.once.slower-10.from="{ opacity: 0, y: 30 }">
      <h4 class="font-semibold text-fourth">Konfirmasi kehadiran anda</h4>
    </div>
  </div>
</template>
