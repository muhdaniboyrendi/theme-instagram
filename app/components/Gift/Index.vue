<script setup>
const props = defineProps({
  giftData: {
    type: Array,
  },
  isInvitation: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="w-full mt-2">
    <LazySubHeader icon="bi-gift" title="kirim_hadiah" />
    <!-- <div
      v-if="props.isInvitation"
      class="w-full bg-zinc-800/70 p-5 flex lg:justify-center gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth"
    >
      <GiftCard
        v-for="gift in props.giftData"
        :key="gift.id"
        :bank="`${gift.bank_name}`"
        :name="gift.account_holder"
        :number="gift.account_number"
      />
    </div> -->
    <div
      class="w-full bg-zinc-800/70 p-5 flex lg:justify-center gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth"
    >
      <LazyGiftCard
        v-for="(n, index) in 2"
        :key="index"
        bank="Bank BCA"
        name="John Doe"
        number="1234567890"
      />
    </div>
  </div>
</template>
