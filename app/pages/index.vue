<script setup>
const isIvitationOpened = ref(false);

const handleInvitationOpen = () => {
  isIvitationOpened.value = true;
};
</script>

<template>
  <div class="overflow-hidden">
    <Welcome v-if="!isIvitationOpened" @open="handleInvitationOpen" />

    <div v-else class="bg-off-white dark:bg-dark text-black dark:text-white">
      <Hero />
      <Header />
      <Quote />
      <Greetings />
      <Location />
      <Gift />
    </div>
  </div>
</template>
