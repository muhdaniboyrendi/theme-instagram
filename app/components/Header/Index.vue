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
  <div class="w-full flex flex-wrap justify-center pt-5 pb-2">
    <div class="w-full px-4 flex justify-between items-center mb-5">
      <div
        v-gsap.whenVisible.slower-10.once.from="{
          opacity: 0,
          x: -30,
        }"
      >
        <h1 v-if="props.isPreview" class="text-4xl font-tertiary">
          Adam & Hawa
        </h1>
        <h1 v-else class="text-4xl font-tertiary">
          {{ props.invitationData.groom_name }} &
          {{ props.invitationData.bride_name }}
        </h1>
      </div>

      <div
        v-gsap.whenVisible.slower-10.once.from="{
          opacity: 0,
          x: 30,
        }"
        class="flex items-center gap-6"
      >
        <i
          class="bi text-2xl cursor-pointer hover:scale-110 active:scale-90 transition duration"
          :class="like"
          @click="likeClicked"
        ></i>
        <i class="bi bi-chat-dots text-2xl"></i>
      </div>
    </div>
    <LazyHeaderCountdown v-if="props.isPreview" />
    <HeaderCountdown
      v-else
      :end-date-string="`${
        props.invitationData.main_info.wedding_date.split('T')[0]
      } ${props.invitationData.main_info.wedding_time}:00`"
    />
  </div>
</template>
