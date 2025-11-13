<script setup>
const props = defineProps([
  "isPreview",
  "isWithGuest",
  "guestSlug",
  "invitationData",
]);
const emit = defineEmits(["open"]);

const openInvitation = () => {
  emit("open");
};

const backgroundStyle = computed(() => ({
  backgroundImage: props.isPreview
    ? "url(/placeholder.jpg)"
    : `url(${
        props.invitationData?.main_info?.main_photo_url || "/placeholder.jpg"
      })`,
}));

const guestName = computed(() => {
  if (!props.guestSlug) {
    return "Tamu Undangan";
  }

  const guest = props.invitationData?.guests?.find(
    (g) => g.slug === props.guestSlug
  );

  return guest?.name || "Tamu Undangan";
});
</script>

<template>
  <div class="min-h-dvh bg-cover bg-center" :style="backgroundStyle">
    <div
      class="min-h-dvh py-10 flex flex-wrap justify-center content-around bg-dark/85 backdrop-blur-md"
    >
      <!-- Header and Title -->
      <div class="w-full">
        <h1 class="text-center flex flex-col gap-6">
          <span v-gsap.animateText class="text-slate-300">The Wedding of</span>
          <span
            v-if="props.isPreview"
            v-gsap.animateText.delay-700.slow
            class="text-6xl w-fit mx-auto font-medium font-tertiary bg-linear-to-r/oklch from-tertiary via-secondary to-primary bg-clip-text text-transparent"
            >Adam & Hawa</span
          >
          <span
            v-else
            v-gsap.animateText.delay-700.slow
            class="text-6xl w-fit mx-auto font-medium font-tertiary bg-linear-to-r/oklch from-tertiary via-secondary to-primary bg-clip-text text-transparent"
            >{{ props.invitationData.groom_name }} &
            {{ props.invitationData.bride_name }}</span
          >
        </h1>
      </div>

      <!-- Photo -->
      <div class="w-full">
        <div
          v-gsap.delay-1500.slower.from="{
            opacity: 0,
            scale: 0,
          }"
          class="h-50 w-50 aspect-square mx-auto rounded-[3rem] bg-linear-to-br/oklch from-primary via-secondary to-tertiary flex justify-center items-center"
        >
          <div
            class="h-47 w-47 aspect-square rounded-[2.8rem] bg-dark flex justify-center items-center"
          >
            <NuxtImg
              v-if="props.isPreview"
              src="/placeholder.jpg"
              width="100"
              quality="50"
              loading="lazy"
              class="h-45 w-45 aspect-square rounded-[2.5rem] object-cover object-center"
            />
            <NuxtImg
              v-else
              :src="props.invitationData.main_info.main_photo_url"
              width="100"
              quality="50"
              loading="lazy"
              class="h-45 w-45 aspect-square rounded-[2.5rem] object-cover object-center"
            />
          </div>
        </div>
      </div>

      <!-- Guest and Button -->
      <div class="w-full flex flex-col justify-center items-center gap-6">
        <div class="text-center">
          <span v-gsap.animateText.delay-2000 class="text-slate-300 text-xs"
            >guest</span
          >
          <div
            class="flex items-center bg-linear-to-r/oklch from-tertiary via-secondary to-primary bg-clip-text text-transparent"
          >
            <p
              v-gsap.animateText.delay-2500.slow
              class="text-lg w-fit mx-auto font-bold"
            >
              {{ guestName }}
            </p>
          </div>
        </div>
        <div
          v-gsap.delay-3000.slower.from="{
            opacity: 0,
            y: 20,
          }"
        >
          <button
            @click="openInvitation"
            type="button"
            class="py-3 px-6 rounded-xl bg-zinc-800 text-white text-sm hover:bg-zinc-700 active:scale-90 transition duration-300 cursor-pointer"
          >
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
