<script setup>
const props = defineProps({
  invitationData: {
    type: Object,
  },
  isPreview: {
    type: Boolean,
  },
  isWithGuest: {
    type: Boolean,
  },
  guestSlug: {
    type: String,
  },
});

const containerRef = ref(null);
const commentsContainerRef = ref(null);
const viewportHeight = ref(0);
const isKeyboardOpen = ref(false);

// Reverse comments order
const reversedComments = computed(() => {
  if (!props.invitationData?.comments) return [];
  return [...props.invitationData.comments].reverse();
});

const updateViewportHeight = () => {
  if (window.visualViewport) {
    viewportHeight.value = window.visualViewport.height;

    const heightDiff = window.innerHeight - window.visualViewport.height;
    isKeyboardOpen.value = heightDiff > 150;
  } else {
    viewportHeight.value = window.innerHeight;
    isKeyboardOpen.value = false;
  }
};

onMounted(() => {
  updateViewportHeight();

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateViewportHeight);
    window.visualViewport.addEventListener("scroll", updateViewportHeight);
  }

  window.addEventListener("resize", updateViewportHeight);
});

onUnmounted(() => {
  if (window.visualViewport) {
    window.visualViewport.removeEventListener("resize", updateViewportHeight);
    window.visualViewport.removeEventListener("scroll", updateViewportHeight);
  }
  window.removeEventListener("resize", updateViewportHeight);
});

const containerHeight = computed(() => {
  const navbarHeight = 64;

  if (isKeyboardOpen.value) {
    return `${viewportHeight.value}px`;
  } else {
    return `${viewportHeight.value - navbarHeight}px`;
  }
});

const contentMaxHeight = computed(() => {
  const headerHeight = 56;
  const footerHeight = 72;
  const extraPadding = 16;
  return `${
    viewportHeight.value - headerHeight - footerHeight - extraPadding
  }px`;
});
</script>

<template>
  <section class="w-full">
    <div
      ref="containerRef"
      class="w-full relative transition-all duration-200 ease-out"
      :style="{ height: containerHeight }"
    >
      <!-- Header -->
      <div
        class="w-full absolute z-10 py-2 px-3 flex justify-between items-center bg-dark border-b border-white/20"
      >
        <div
          v-gsap.whenVisible.once.slower-20.from="{ opacity: 0, x: -30 }"
          class="flex items-center gap-3"
        >
          <NuxtImg
            v-if="props.isPreview"
            src="/placeholder.webp"
            width="50"
            quality="50"
            loading="lazy"
            class="w-10 h-10 rounded-full border border-zinc-800"
          />
          <NuxtImg
            v-else
            :src="props.invitationData.main_info.main_photo_url"
            width="50"
            quality="50"
            loading="lazy"
            class="w-10 h-10 rounded-full border border-zinc-800"
          />
          <div>
            <p
              v-if="props.isPreview"
              class="font-semibold text-sm md:text-base"
            >
              Adam & Hawa
            </p>
            <p v-else class="font-semibold text-sm md:text-base">
              {{ props.invitationData.groom_name }} &
              {{ props.invitationData.bride_name }}
            </p>
            <p class="text-xs md:text-sm text-white/70">Ucapan & Doa</p>
          </div>
        </div>
        <div
          v-gsap.whenVisible.once.slower-20.from="{ opacity: 0, x: 30 }"
          class="flex items-center gap-5 text-2xl pr-2"
        >
          <i class="bi bi-telephone"></i>
          <i class="bi bi-camera-video"></i>
        </div>
      </div>

      <!-- Content Area - Demo Mode -->
      <div
        v-if="props.isPreview"
        class="w-full h-full relative pt-14 pb-16 flex items-end"
      >
        <!-- Demo Comments -->
        <div
          ref="commentsContainerRef"
          class="w-full flex flex-col-reverse gap-4 overflow-y-auto p-4 md:p-6 pb-4 pt-14"
          :style="{ maxHeight: contentMaxHeight }"
        >
          <CommentCard v-for="(n, index) in 5" :key="index" />
        </div>

        <!-- Footer Input -->
        <CommentFooter :is-invitation="props.isInvitation" />
      </div>

      <!-- Content Area -->
      <div v-else class="w-full h-full relative pt-14 pb-16 flex items-end">
        <!-- Empty State -->
        <div
          v-if="props.invitationData.comments.length === 0"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center px-4"
        >
          <p class="text-white/70 text-xl mb-3">Belum ada Ucapan</p>
          <p class="text-white/50">Jadilah yang pertama memberikan Ucapan</p>
        </div>

        <!-- Comments List -->
        <div
          v-else
          ref="commentsContainerRef"
          class="w-full flex flex-col-reverse gap-4 overflow-y-auto p-4 md:p-6 pb-4 pt-14"
          :style="{ maxHeight: contentMaxHeight }"
        >
          <CommentCard
            v-for="comment in reversedComments"
            :key="comment.id"
            :comment="comment"
          />
        </div>

        <!-- Footer Input -->
        <LazyCommentFooter
          :is-preview="props.isPreview"
          :is-with-guest="props.isWithGuest"
          :guest-slug="props.guestSlug"
          :invitation-data="props.invitationData"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth scrolling */
div[class*="overflow-y-auto"] {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

div[class*="overflow-y-auto"]::-webkit-scrollbar-track {
  background: transparent;
}

div[class*="overflow-y-auto"]::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

div[class*="overflow-y-auto"]::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
