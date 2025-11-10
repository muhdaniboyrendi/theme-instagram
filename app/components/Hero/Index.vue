<template>
  <div class="min-h-dvh bg-[url(/placeholder.jpg)] bg-cover bg-center">
    <div class="h-dvh bg-linear-to-b from-dark/30 via-dark/40 to-dark/50">
      <div
        class="w-full h-full mx-auto flex flex-wrap content-between"
      >
        <div class="w-full"></div>
        <div
          v-gsap.delay-500.slower-10.from="{
            opacity: 0,
            x: -30,
          }"
          class="w-full flex flex-col px-4 text-white"
        >
          <div class="flex items-center gap-x-3 mb-3">
            <i
              class="bi bi-info-circle text-xl bg-linear-to-br/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent"
            ></i>
            <p class="md:text-lg text-shadow-dark/50 font-medium">
              The Wedding of
            </p>
          </div>
          <div class="flex items-center gap-x-3 mb-3">
            <i
              class="bi bi-bookmarks text-xl bg-linear-to-br/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent"
            ></i>
            <p
              class="text-5xl md:text-6xl font-tertiary bg-linear-to-r/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent"
            >
              Adam & Hawa
            </p>
          </div>
          <div class="flex items-center gap-x-3 mb-3">
            <i
              class="bi bi-calendar4 text-xl bg-linear-to-br/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent"
            ></i>
            <p class="md:text-lg text-shadow-dark/50 font-semibold">
              Minggu, 28 Desember 2025
            </p>
          </div>
        </div>
        <div
          v-gsap.delay-1000.slower-20.from="{
            opacity: 0,
            y: 20,
          }"
          class="w-full flex justify-between items-center p-4"
        >
          <NuxtImg
            src="/placeholder.jpg"
            width="50"
            loading="lazy"
            quality="30"
            alt="Couple"
            class="w-10 h-10 object-cover rounded-xl border-2 border-white"
          />
          <div
            class="flex justify-center gap-x-4 uppercase font-semibold w-50 sm:w-60 lg:w-70 xl:w-80 overflow-x-hidden text-white"
          >
            <span>story</span>
            <span>romance</span>
            <span>merried</span>
            <span>couple</span>
          </div>
          <i class="bi bi-repeat text-2xl text-white"></i>
        </div>
      </div>
    </div>
  </div>
</template>
