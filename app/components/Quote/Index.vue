<script setup>
const props = defineProps({
  invitationData: {
    type: Object,
  },
  isPreview: {
    type: Boolean,
  },
});

const like = ref("bi-heart");

const likeClicked = () => {
  like.value =
    like.value == "bi-heart" ? "bi-heart-fill text-red-500" : "bi-heart";
};
</script>

<template>
  <div>
    <SubHeader icon="bi-quote" title="quote" />
    <div
      v-gsap.whenVisible.slower-20.once.from="{
        opacity: 0,
      }"
      class="w-full"
    >
      <NuxtImg
        v-if="props.isPreview"
        src="/placeholder.webp"
        alt="Couple photo"
        width="800"
        quality="80"
        loading="lazy"
        class="w-full"
      />
      <NuxtImg
        v-else
        :src="props.invitationData.main_info?.main_photo_url || '/placeholder.webp'"
        alt="Couple photo"
        width="800"
        quality="80"
        loading="lazy"
        class="w-full"
      />
    </div>
    <div class="w-full px-4 py-3 flex justify-between items-center">
      <div
        v-gsap.whenVisible.slower-10.once.from="{
          opacity: 0,
          x: -30,
        }"
        class="flex items-center gap-6"
      >
        <i
          class="bi text-2xl cursor-pointer hover:scale-110 active:scale-90 transition duration"
          :class="like"
          @click="likeClicked"
        ></i>
        <i class="bi bi-chat text-2xl"></i>
        <i class="bi bi-send text-2xl"></i>
      </div>
      <div
        v-gsap.whenVisible.slower-10.once.from="{
          opacity: 0,
          x: 30,
        }"
      >
        <i class="bi bi-bookmark text-2xl"></i>
      </div>
    </div>
    <div
      v-gsap.whenVisible.once.slower-10.form="{ opacity: 0, y: 30 }"
      class="w-full px-4"
    >
      <p class="mb-2 text-sm md:text-base">
        "Dan diantara tanda-tanda (kebesaran) -Nya ialah Dia menciptakan
        pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan
        merasa tentram kepadanya, dan Dia menjadikan diantaramu rasa kasih dan
        sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda
        (kebesaran Allah) bagi kaum yang berpikir."
      </p>
      <p class="text-white/60 text-xs md:text-sm">Q.S : Ar-Rum (30) : 21</p>
    </div>
  </div>
</template>
