<script setup>
const props = defineProps([
  "title",
  "image",
  "name",
  "child",
  "parent",
  "social",
  "socialLink",
  "posts",
  "followers",
  "following",
]);

const isProfilePhotoOpen = ref(false);

const openPhoto = () => {
  isProfilePhotoOpen.value = true;
};

const closePhoto = () => {
  isProfilePhotoOpen.value = false;
};
</script>

<template>
  <div class="w-full max-w-md">
    <div class="w-full px-4 py-4 flex justify-between items-center">
      <div v-gsap.once.slower-10.from="{ opacity: 0, x: -30 }">
        <h3 class="font-bold text-xl">{{ props.title }}</h3>
      </div>
      <div
        v-gsap.once.slower-10.from="{ opacity: 0, x: 30 }"
        class="flex items-center gap-x-5"
      >
        <i class="bi bi-plus-square text-xl"></i>
        <i class="bi bi-list text-3xl"></i>
      </div>
    </div>
    <div class="w-full px-4 flex gap-4 my-3">
      <div
        v-gsap.once.slower-10.delay-500.from="{ opacity: 0, scale: 0 }"
        class="w-fit px-2"
      >
        <NuxtImg
          @click="openPhoto"
          :src="props.image"
          widht="50"
          quality="50"
          loading="lazy"
          placeholder
          class="w-30 aspect-square object-cover rounded-full cursor-pointer hover:opacity-80 transition-opacity"
          alt="Profile Image"
        />
      </div>
      <div class="w-full">
        <div class="w-full flex justify-between items-center">
          <p class="mb-2 text-sm font-bold">Lorem Ipsum Dolor Sit Amet</p>
          <span class="text-zinc-600 dark:text-zinc-400 text-xs">he/him</span>
        </div>
        <div class="w-full grid grid-cols-3">
          <div
            v-gsap.once.slower-10.delay-1000.from="{ opacity: 0, y: 30 }"
            class=""
          >
            <span class="text-lg font-semibold">{{ props.posts }}</span>
            <p class="text-xs">postingan</p>
          </div>
          <div
            v-gsap.once.slower-10.delay-1000.from="{ opacity: 0, y: 30 }"
            class=""
          >
            <span class="text-lg font-semibold">{{ props.followers }}</span>
            <p class="text-xs">pengikut</p>
          </div>
          <div
            v-gsap.once.slower-10.delay-1000.from="{ opacity: 0, y: 30 }"
            class=""
          >
            <span class="text-lg font-semibold">{{ props.following }}</span>
            <p class="text-xs">mengikuti</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-gsap.once.slower-10.delay-1500.from="{ opacity: 0, x: -30 }"
      class="w-full px-3 mb-4"
    >
      <p class="text-sm font-bold">{{ props.name }}</p>
      <p class="text-sm">{{ props.child }}</p>
      <p class="text-sm">{{ props.parent }}</p>
    </div>
    <div class="flex justify-stretch items-center gap-x-2 px-3">
      <div
        v-gsap.once.slower-10.delay-2000.from="{ opacity: 0, scale: 0 }"
        class="w-full"
      >
        <a
          :href="props.socialLink"
          target="_blank"
          class="w-full py-2 block font-semibold text-center text-sm bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition duration"
          >Instagram</a
        >
      </div>
      <div
        v-gsap.once.slower-10.delay-2000.from="{ opacity: 0, scale: 0 }"
        class="w-full"
      >
        <a
          :href="props.socialLink"
          target="_blank"
          class="w-full py-2 block font-semibold text-center text-sm bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition duration"
          >{{ props.social }}</a
        >
      </div>
    </div>

    <!-- Modal Foto Profil -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isProfilePhotoOpen"
          @click="closePhoto"
          class="fixed inset-0 top-0 left-0 w-screen h-dvh z-50 bg-dark/5 backdrop-blur-lg flex justify-center items-center px-6"
        >
          <!-- Container Foto -->
          <div @click.stop class="relative">
            <NuxtImg
              :src="props.image"
              quality="90"
              loading="lazy"
              class="max-h-70 md:max-h-80 aspect-square rounded-full object-cover"
              alt="Profile Photo"
            />
          </div>

          <div
            class="absolute bottom-10 md:bottom-5 w-full p-6 flex justify-center items-center gap-6"
          >
            <div class="flex flex-col justify-center gap-3">
              <div
                class="w-13 h-13 aspect-square rounded-full bg-off-white dark:bg-dark border border-zinc-200 dark:border-zinc-800 flex justify-center items-center"
              >
                <i class="bi bi-send text-dark dark:text-white text-xl"></i>
              </div>
            </div>
            <div class="flex flex-col justify-center gap-3">
              <div
                class="w-13 h-13 aspect-square rounded-full bg-off-white dark:bg-dark border border-zinc-200 dark:border-zinc-800 flex justify-center items-center"
              >
                <i class="bi bi-people text-dark dark:text-white text-xl"></i>
              </div>
            </div>
            <div class="flex flex-col justify-center gap-3">
              <div
                class="w-13 h-13 aspect-square rounded-full bg-off-white dark:bg-dark border border-zinc-200 dark:border-zinc-800 flex justify-center items-center"
              >
                <i
                  class="bi bi-link-45deg text-dark dark:text-white text-xl"
                ></i>
              </div>
            </div>
            <div class="flex flex-col justify-center gap-3">
              <div
                class="w-13 h-13 aspect-square rounded-full bg-off-white dark:bg-dark border border-zinc-200 dark:border-zinc-800 flex justify-center items-center"
              >
                <i
                  class="bi bi-qr-code-scan text-dark dark:text-white text-xl"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
