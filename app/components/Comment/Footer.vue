<!-- CommentFooter -->
<script setup>
const { sendMessage } = useCommentStore();

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

const textareaRef = ref(null);
const isLoading = ref(false);
const isSuccess = ref(false);

const guestNameCompute = computed(() => {
  if (!props.guestSlug) {
    return "Tamu Undangan";
  }

  const guest = props.invitationData?.guests?.find(
    (g) => g.slug === props.guestSlug
  );

  return guest?.name || "Tamu Undangan";
});

const formData = reactive({
  invitation_id: props.isPreview ? "" : props.invitationData?.id,
  name: props.isPreview ? "" : guestNameCompute.value,
  message: "",
});

function adjustHeight() {
  if (!textareaRef.value) return;
  textareaRef.value.style.height = "auto";

  if (formData.message.length === 0) {
    textareaRef.value.style.height = "";
  } else {
    textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";
  }
}

const handleFocus = () => {
  // Scroll textarea into view when focused
  setTimeout(() => {
    if (textareaRef.value) {
      textareaRef.value.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, 100);
};

watch(
  () => formData.message,
  () => {
    nextTick(() => {
      adjustHeight();
    });
  }
);

onMounted(() => {
  adjustHeight();
});

const submitMessage = async () => {
  if (!formData.message.trim()) {
    alert("Silakan tuliskan ucapan Anda terlebih dahulu");
    return;
  }

  if (formData.message.trim().length < 3) {
    alert("Ucapan minimal 3 karakter");
    return;
  }

  try {
    isLoading.value = true;

    console.log(formData);

    const response = await sendMessage(formData);

    formData.message = "";
    adjustHeight();

    isSuccess.value = true;
    setTimeout(() => {
      isSuccess.value = false;
    }, 3000);

    // Blur textarea to close keyboard
    if (textareaRef.value) {
      textareaRef.value.blur();
    }
  } catch (error) {
    console.error("Error submitting message:", error);
    console.error("Error submitting message:", error.validationErrors);

    if (error.statusCode === 400) {
      alert("Data yang dikirim tidak valid. Silakan periksa kembali.");
    } else if (error.statusCode === 429) {
      alert(
        "Terlalu banyak pesan. Silakan tunggu sebentar sebelum mengirim lagi."
      );
    } else {
      alert("Terjadi kesalahan saat mengirim ucapan. Silakan coba lagi.");
    }
  } finally {
    isLoading.value = false;
  }
};

const handleKeydown = (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    submitMessage();
  }
};

const maxLength = 500;
const remainingChars = computed(() => {
  return maxLength - formData.message.length;
});

const isNearLimit = computed(() => remainingChars.value <= 50);
const isOverLimit = computed(() => remainingChars.value < 0);
</script>

<template>
  <div
    class="absolute left-0 bottom-3 w-full min-h-14 p-2 rounded-[1.7rem] bg-zinc-200 dark:bg-zinc-800 flex justify-center items-center z-15"
  >
    <!-- Success notification -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-4"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-4"
    >
      <div
        v-if="isSuccess"
        class="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
      >
        ✅ Ucapan berhasil dikirim!
      </div>
    </Transition>

    <!-- Character count warning -->
    <div
      v-if="formData.message.length > 0"
      class="absolute -top-8 right-4 text-xs"
      :class="[
        isOverLimit
          ? 'text-red-400'
          : isNearLimit
          ? 'text-yellow-400'
          : 'text-white/60',
      ]"
    >
      {{ remainingChars }}/{{ maxLength }}
    </div>

    <div
      class="relative w-full min-h-10 flex flex-row justify-center items-center"
    >
      <!-- Chat icon -->
      <div
        class="absolute left-0 bottom-0 w-10 h-10 rounded-full bg-white flex justify-center items-center text-dark"
      >
        <i class="bi bi-chat text-xl"></i>
      </div>

      <!-- Textarea -->
      <textarea
        ref="textareaRef"
        v-model="formData.message"
        :disabled="isLoading"
        :maxlength="maxLength"
        class="w-full px-14 resize-none overflow-hidden border-none outline-none ring-0 focus:ring-0 focus:outline-none shadow-none bg-transparent disabled:opacity-50"
        :class="{ 'text-red-400': isOverLimit }"
        rows="1"
        @input="adjustHeight"
        @keydown="handleKeydown"
        @focus="handleFocus"
        placeholder="Tuliskan ucapan kamu..."
      ></textarea>

      <!-- Send button -->
      <button
        v-if="props.isWithGuest"
        @click="submitMessage"
        :disabled="isLoading || !formData.message.trim() || isOverLimit"
        class="absolute right-0 bottom-0 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-all duration-200"
        :class="[
          isLoading || !formData.message.trim() || isOverLimit
            ? 'bg-gray-400 cursor-not-allowed opacity-50'
            : 'bg-fourth hover:bg-white hover:text-fourth',
        ]"
      >
        <i
          v-if="isLoading"
          class="bi bi-arrow-clockwise text-xl animate-spin"
        ></i>
        <i v-else class="bi bi-send-fill text-xl"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar untuk textarea */
textarea::-webkit-scrollbar {
  width: 4px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
