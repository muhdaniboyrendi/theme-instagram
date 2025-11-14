<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    default: "/placeholder.jpg",
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const like = ref("bi-heart");

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const close = () => {
  isOpen.value = false;
};

const likeClicked = () => {
  like.value =
    like.value == "bi-heart" ? "bi-heart-fill text-red-500" : "bi-heart";
};

onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === "Escape" && isOpen.value) {
      close();
    }
  };

  document.addEventListener("keydown", handleEscape);

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleEscape);
  });
});
</script>

<template>
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
        v-if="isOpen"
        @click="closeOnBackdrop && close()"
        class="fixed inset-0 bg-black/20 backdrop-blur-lg flex items-center justify-center z-50 p-3"
      >
        <div
          v-gsap.once.slower-20.from="{ opacity: 0, scale: 0 }"
          @click.stop
          class="bg-off-white dark:bg-dark rounded-xl w-fit mx-auto overflow-hidden"
        >
          <div class="p-3 flex justify-between items-center border-b">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-dark dark:bg-white flex justify-center items-center text-white dark:text-dark"
              >
                <i class="bi bi-image"></i>
              </div>
              <p
                class="text-dark dark:text-white text-sm md:text-base font-semibold"
              >
                foto
              </p>
            </div>
            <button
              @click="close()"
              class="text-white/70 cursor-pointer mr-3 text-lg hover:text-white focus:outline-none"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <!-- Body -->
          <div>
            <slot name="body">
              <div class="flex justify-center">
                <img
                  :src="imageUrl"
                  alt="Modal image"
                  class="max-h-100 object-contain"
                />
              </div>
            </slot>
          </div>

          <div
            class="py-3 px-10 bg-off-white dark:bg-dark text-dark dark:text-white text-2xl flex justify-between space-x-2"
          >
            <i
              class="bi cursor-pointer hover:scale-110 active:scale-90 transition duration"
              :class="like"
              @click="likeClicked"
            ></i>
            <i class="bi bi-person-circle"></i>
            <i class="bi bi-send"></i>
            <i class="bi bi-three-dots-vertical"></i>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
