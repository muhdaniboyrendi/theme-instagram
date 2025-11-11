<script setup>
const emit = defineEmits(["open"]);

const openInvitation = () => {
  emit("open");
};
</script>

<template>
  <div class="min-h-dvh bg-[url(/placeholder.jpg)] bg-cover bg-center">
    <div
      class="min-h-dvh py-10 flex flex-wrap justify-center content-around bg-dark/85 backdrop-blur-md"
    >
      <!-- Header and Title -->
      <div class="w-full">
        <h1 class="text-center flex flex-col gap-6">
          <span v-gsap.animateText class="text-slate-300">The Wedding of</span>
          <span
            v-gsap.animateText.delay-700.slow
            class="text-6xl w-fit mx-auto font-medium font-tertiary bg-linear-to-r/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent"
            >Adam & Hawa</span
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
            class="h-45 w-45 aspect-square rounded-[2.5rem] bg-dark flex justify-center items-center"
          >
            <div class="h-40 w-40 aspect-square rounded-4xl overflow-hidden">
              <NuxtImg
                src="/placeholder.jpg"
                width="200"
                quality="50"
                loading="lazy"
                class="object-cover object-center"
              />
            </div>
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
            class="flex items-center bg-linear-to-r/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent"
          >
            <p
              v-gsap.animateText.delay-2500.slow
              class="text-lg w-fit mx-auto font-bold"
            >
              Nama Tamu
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
