<script setup>
const props = defineProps({
  invitationData: {
    type: Object,
  },
  isPreview: {
    type: Boolean,
  },
});
</script>

<template>
  <div class="w-full mt-2">
    <LazySubHeader icon="bi-gift" title="kirim_hadiah" />
    <div
      v-if="props.isPreview"
      class="w-full bg-zinc-200 dark:bg-zinc-800/70 p-5 flex lg:justify-center gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth"
    >
      <LazyGiftCard
        v-for="(n, index) in 2"
        :key="index"
        bank="Bank BCA"
        name="John Doe"
        number="1234567890"
      />
    </div>
    <div
      v-else
      class="w-full bg-zinc-200 dark:bg-zinc-800/70 p-5 flex lg:justify-center gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth"
    >
      <GiftCard
        v-for="gift in props.invitationData.gifts"
        :key="gift.id"
        :bank="`${gift.bank_name}`"
        :name="gift.account_holder"
        :number="gift.account_number"
      />
    </div>
  </div>
</template>
