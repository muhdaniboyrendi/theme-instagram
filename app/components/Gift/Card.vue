<script setup>
const props = defineProps(["bank", "name", "number"]);

const isCopied = ref(false);

const formatAccountNumber = (number) => {
  if (!number) return "";
  const cleaned = number.toString().replace(/\D/g, "");
  return cleaned.replace(/(.{4})/g, "$1 ").trim();
};

const copyToClipboard = async () => {
  try {
    const cleanNumber = props.number.toString().replace(/\D/g, "");
    await navigator.clipboard.writeText(cleanNumber);

    isCopied.value = true;

    setTimeout(() => {
      isCopied.value = false;
    }, 5000);
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    fallbackCopyToClipboard(props.number.toString().replace(/\D/g, ""));
  }
};

const fallbackCopyToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 5000);
  } catch (error) {
    console.error("Fallback copy failed:", error);
  }

  document.body.removeChild(textArea);
};

const formattedNumber = computed(() => formatAccountNumber(props.number));
</script>

<template>
  <div
    v-gsap.whenVisible.once.slower-20.from="{ opacity: 0, scale: 0 }"
    class="min-w-90 w-full max-w-md snap-center bg-dark rounded-xl border border-white/30 p-4"
  >
    <div class="w-full flex justify-between items-center mb-3">
      <div class="flex items-center gap-x-3">
        <div
          class="w-10 h-10 bg-white rounded-full flex justify-center items-center"
        >
          <i class="bi bi-credit-card text-dark text-lg"></i>
        </div>
        <h4 class="text-sm font-semibold">{{ props.bank }}</h4>
      </div>
      <i class="bi bi-three-dots-vertical text-sm"></i>
    </div>

    <p
      class="text-white/90 text-lg md:text-xl font-secondary font-medium tracking-wider"
    >
      {{ formattedNumber }}
    </p>

    <p class="text-white/80 text-sm md:text-base mb-2">{{ props.name }}</p>

    <div class="flex items-center gap-2">
      <button
        @click="copyToClipboard"
        :class="[
          'flex items-center gap-2 px-3 py-1 rounded-md transition-all duration-200',
          isCopied
            ? 'text-green-400 bg-green-400/10'
            : 'text-white/70 hover:text-white hover:bg-white/10',
        ]"
        class="text-sm"
      >
        <i :class="isCopied ? 'bi bi-check2' : 'bi bi-copy'"></i>
        <span>{{ isCopied ? "Tersalin!" : "Salin" }}</span>
      </button>
    </div>
  </div>
</template>
