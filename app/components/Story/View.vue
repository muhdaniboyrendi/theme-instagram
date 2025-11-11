<script setup>
const props = defineProps(["image", "title", "date", "description"]);

const like = ref("bi-heart");

const likeClicked = () => {
  like.value =
    like.value == "bi-heart" ? "bi-heart-fill text-red-500" : "bi-heart";
};
</script>

<template>
  <div
    class="w-full h-[calc(100dvh-4.5rem)] bg-cover bg-center flex flex-wrap content-between"
    :style="{ backgroundImage: `url(${props.image})` }"
  >
    <div
      class="w-full flex justify-between items-center p-5 bg-linear-to-b/oklch from-dark to-transparent"
    >
      <div
        v-gsap.once.slower-20.from="{ opacity: 0, x: -30 }"
        class="flex items-center gap-x-2"
      >
        <h4 class="text-xl text-shadow-lg font-bold" v-text="props.title"></h4>
        <i class="bi bi-chevron-down text-xl"></i>
      </div>
      <div v-gsap.once.slower-20.from="{ opacity: 0, x: 30 }">
        <i class="bi bi-camera text-2xl text-shadow-lg"></i>
      </div>
    </div>
    <div
      class="w-full flex justify-between items-end p-5 bg-linear-to-t/oklch from-dark to-transparent"
    >
      <div class="w-full pr-5">
        <div
          v-gsap.once.slower-20.from="{ opacity: 0, x: -30 }"
          class="flex items-center gap-x-2 mb-3"
        >
          <div
            class="w-10 h-10 bg-white rounded-full flex justify-center items-center"
          >
            <i class="bi bi-calendar4-week text-dark"></i>
          </div>
          <p class="text-sm md:text-base font-semibold" v-text="props.date"></p>
        </div>
        <div v-gsap.once.slower-20.from="{ opacity: 0, x: 30 }">
          <p
            class="text-white/80 text-sm md:text-base"
            v-text="props.description"
          ></p>
        </div>
      </div>
      <div
        v-gsap.once.slower-20.from="{ opacity: 0, x: 30 }"
        class="flex flex-col gap-5"
      >
        <i
          class="bi text-2xl cursor-pointer text-shadow-lg hover:scale-110 active:scale-90 transition duration"
          :class="like"
          @click="likeClicked"
        ></i>
        <i class="bi bi-chat text-2xl text-shadow-lg"></i>
        <i class="bi bi-send text-2xl text-shadow-lg"></i>
        <i class="bi bi-three-dots-vertical text-2xl text-shadow-lg"></i>
      </div>
    </div>
  </div>
</template>
