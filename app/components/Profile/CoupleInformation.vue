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
          :src="props.image"
          widht="50"
          quality="50"
          loading="lazy"
          placeholder
          class="w-30 aspect-square object-cover rounded-full"
          alt="Profile Image"
        />
      </div>
      <div class="w-full">
        <div class="w-full flex justify-between items-center">
          <p class="mb-2 text-sm font-semibold">Lorem Ipsum Dolor Sit Amet</p>
          <span class="text-zinc-400 text-xs">he/him</span>
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
      <p class="font-semibold">{{ props.name }}</p>
      <p class="text-sm">{{ props.child }}</p>
      <p class="text-sm">{{ props.parent }}</p>
    </div>
    <div class="flex justify-stretch items-center gap-x-2 px-3">
      <div
        v-gsap.once.slower-10.delay-2000.from="{ opacity: 0, scale: 0 }"
        class="w-full text-center text-sm border-2 border-white rounded-lg hover:border-fourth hover:text-fourth"
      >
        <a :href="props.socialLink" target="_blank" class="w-full py-1 block"
          >Instagram</a
        >
      </div>
      <div
        v-gsap.once.slower-10.delay-2000.from="{ opacity: 0, scale: 0 }"
        class="w-full text-center text-sm border-2 border-white rounded-lg hover:border-fourth hover:text-fourth"
      >
        <a :href="props.socialLink" target="_blank" class="w-full py-1 block">{{
          props.social
        }}</a>
      </div>
    </div>
  </div>
</template>
