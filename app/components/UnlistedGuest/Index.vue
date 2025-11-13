<script setup>
const props = defineProps(["invitationData"]);
</script>

<template>
  <div
    class="min-h-dvh bg-cover bg-center"
    :style="`background-image: url(${
      props.invitationData?.main_info?.main_photo_url || '/placeholder.jpg'
    })`"
  >
    <div
      class="min-h-dvh py-10 flex flex-wrap justify-center content-around gap-10 bg-dark/85 backdrop-blur-md"
    >
      <!-- Header and Title -->
      <div class="w-full">
        <h1 class="text-center flex flex-col gap-6">
          <span v-gsap.animateText class="text-slate-300">The Wedding of</span>
          <span
            v-gsap.animateText.delay-700.slow
            class="text-6xl w-fit mx-auto font-medium font-tertiary bg-linear-to-r/oklch from-tertiary via-secondary to-primary bg-clip-text text-transparent"
          >
            {{ props.invitationData?.groom_name }} &
            {{ props.invitationData?.bride_name }}
          </span>
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

      <!-- Guest Not Found and Locked Button -->
      <div class="w-full flex flex-col justify-center items-center gap-6 px-8">
        <!-- Guest Status -->
        <div class="text-center">
          <span v-gsap.animateText.delay-2000 class="text-slate-300 text-xs"
            >guest</span
          >
          <div
            class="flex items-center justify-center gap-2 text-red-600"
          >
            <p
              v-gsap.animateText.delay-2500.slow
              class="text-lg w-fit font-bold"
            >
              Tidak Terdaftar
            </p>
          </div>
        </div>

        <!-- Info Message -->
        <div
          v-gsap.delay-2800.from="{ opacity: 0, y: 10 }"
          class="w-full max-w-sm"
        >
          <div
            class="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-4"
          >
            <div class="flex items-start gap-3">
              <i class="bi bi-info-circle text-slate-400 text-xl mt-0.5"></i>
              <div class="flex-1">
                <p class="text-slate-300 text-sm leading-relaxed">
                  Maaf, nama Anda tidak ditemukan dalam daftar undangan.
                </p>
                <p class="text-slate-400 text-xs mt-2">
                  Silakan hubungi penyelenggara untuk informasi lebih lanjut.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Locked Button -->
        <div
          v-gsap.delay-3000.slower.from="{
            opacity: 0,
            y: 20,
          }"
          class="relative"
        >
          <button
            type="button"
            disabled
            class="py-3 px-6 rounded-xl bg-zinc-800/50 text-zinc-500 text-sm cursor-not-allowed opacity-60 flex items-center gap-3 border border-zinc-700/30"
          >
            <i class="bi bi-lock-fill text-lg"></i>
            <span>Buka Undangan</span>
          </button>

          <!-- Locked indicator -->
          <div class="absolute -top-2 -right-2 animate-pulse">
            <div
              class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            >
              <i class="bi bi-lock text-white text-xs"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure disabled button doesn't have hover effects */
button:disabled {
  pointer-events: none;
}
</style>
