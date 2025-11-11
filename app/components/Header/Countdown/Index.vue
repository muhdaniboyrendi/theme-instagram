<script setup>
const props = defineProps({
  endDateString: {
    type: String,
    default: "2025-12-31 23:59:59",
  },
});

const endDate = ref(new Date(props.endDateString));

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const isExpired = ref(false);

let interval = null;

const updateCountdown = () => {
  const now = new Date();
  const difference = endDate.value - now;

  if (difference <= 0) {
    clearInterval(interval);
    isExpired.value = true;
    days.value = 0;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    return;
  }

  days.value = Math.floor(difference / (1000 * 60 * 60 * 24));
  hours.value = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  minutes.value = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((difference % (1000 * 60)) / 1000);
};

const formatDigit = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

onMounted(() => {
  if (endDate.value <= new Date()) {
    isExpired.value = true;
    return;
  }

  updateCountdown();
  interval = setInterval(updateCountdown, 1000);
});

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <div class="flex gap-x-3">
    <LazyHeaderCountdownTimeBox :time="formatDigit(days)" text="Hari" />
    <LazyHeaderCountdownTimeBox :time="formatDigit(hours)" text="Jam" />
    <LazyHeaderCountdownTimeBox :time="formatDigit(minutes)" text="Menit" />
    <LazyHeaderCountdownTimeBox :time="formatDigit(seconds)" text="Detik" />
  </div>
</template>
