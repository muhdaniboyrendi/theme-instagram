<!-- CommentCard -->
<script setup>
const props = defineProps({
  comment: {
    type: Object,
    required: false,
  },
});
</script>

<template>
  <div
    v-if="props.comment"
    class="min-w-80 w-fit rounded-3xl rounded-bl-lg bg-fourth p-4"
  >
    <p
      class="font-semibold text-lg mb-1 bg-linear-to-b/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent w-fit"
    >
      {{ props.comment.name }}
    </p>
    <p class="text-xs text-white/80 mb-3">
      {{ timeAgo(props.comment.created_at) }}
    </p>
    <p class="text-white">
      {{ props.comment.message }}
    </p>
  </div>
  <div v-else class="min-w-80 w-fit rounded-3xl rounded-bl-lg bg-fourth p-4">
    <p
      class="font-semibold md:text-lg mb-1 bg-linear-to-b/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent w-fit"
    >
      John Doe
    </p>
    <p class="text-xs text-white/80 mb-3">1 jam yang lalu</p>
    <p class="text-white text-sm md:text-base">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, qui ipsum?
      Porro officia eos laboriosam in id repudiandae dignissimos obcaecati.
    </p>
  </div>
</template>
