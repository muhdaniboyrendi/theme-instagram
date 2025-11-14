<script setup>
const like = ref("bi-heart");

const likeClicked = () => {
  like.value =
    like.value == "bi-heart" ? "bi-heart-fill text-red-500" : "bi-heart";
};
</script>

<template>
  <div class="w-full">
    <div
      class="w-full p-5 my-5 bg-zinc-200 dark:bg-zinc-800/70 flex justify-center"
    >
      <div
        v-gsap.whenVisible.once.slower-20.from="{ opacity: 0, scale: 0 }"
        class="w-full max-w-sm p-4 bg-off-white dark:bg-dark rounded-xl border border-black/30 dark:border-white/30"
      >
        <div class="w-full flex justify-between items-center mb-3">
          <div class="flex items-center gap-x-3">
            <div
              class="w-10 h-10 bg-dark dark:bg-white rounded-full flex justify-center items-center"
            >
              <i class="bi bi-activity text-white dark:text-dark text-lg"></i>
            </div>
            <h4>Terima Kasih</h4>
          </div>
          <i class="bi bi-three-dots-vertical text-sm"></i>
        </div>
        <p class="text-zinc-700 dark:text-zinc-300 text-sm md:text-base">
          Atas perhatian dan pengertiannya, kami mengucapkan banyak terima
          kasih.
        </p>
        <p class="text-zinc-700 dark:text-zinc-300 text-sm md:text-base mt-3">
          السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
        </p>
        <div
          class="w-full flex items-center gap-x-5 mt-3 text-zinc-700 dark:text-zinc-300"
        >
          <i
            class="bi cursor-pointer hover:scale-110 active:scale-90 transition duration"
            :class="like"
            @click="likeClicked"
          ></i>
          <i class="bi bi-chat"></i>
          <i class="bi bi-repeat"></i>
          <i class="bi bi-send"></i>
        </div>
      </div>
    </div>
  </div>
</template>
