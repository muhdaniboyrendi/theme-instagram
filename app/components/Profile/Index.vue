<script setup>
const props = defineProps({
  invitationData: {
    type: Object,
  },
  isInvitation: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section class="w-full">
    <ProfileCouple
      :invitation-data="props.invitationData || {}"
      :is-invitation="props.isInvitation"
    />
  </section>
</template>
