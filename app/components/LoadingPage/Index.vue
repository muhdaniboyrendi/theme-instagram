<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["loaded"]);

const progress = ref(0);
const dots = ref("");

// Simulate loading progress
onMounted(() => {
  // Progress animation
  const progressInterval = setInterval(() => {
    if (progress.value < 100) {
      // Faster at start, slower near end (more realistic)
      const increment = progress.value < 60 ? 3 : progress.value < 90 ? 2 : 1;
      progress.value = Math.min(100, progress.value + increment);
    } else {
      clearInterval(progressInterval);
      // Emit loaded event after a brief delay
      setTimeout(() => {
        emit("loaded");
      }, 300);
    }
  }, 50);

  // Dots animation
  const dotsInterval = setInterval(() => {
    dots.value = dots.value.length >= 3 ? "" : dots.value + ".";
  }, 400);

  // Cleanup
  return () => {
    clearInterval(progressInterval);
    clearInterval(dotsInterval);
  };
});
</script>

<template>
  <div class="min-h-dvh bg-dark">
    <div class="min-h-dvh py-10 flex flex-wrap justify-center content-around">
      <!-- Decorative top ornament -->
      <div class="w-full px-8">
        <div
          class="w-full flex justify-center animate-fade-in"
          style="animation-delay: 0ms"
        >
          <div class="flex items-center gap-3">
            <div
              class="h-px w-12 bg-linear-to-r from-transparent via-primary to-secondary"
            ></div>
            <i class="bi bi-heart-fill text-primary text-xl animate-pulse"></i>
            <div
              class="h-px w-12 bg-linear-to-r from-secondary via-tertiary to-transparent"
            ></div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="w-full flex flex-col items-center gap-8">
        <!-- Animated Rings -->
        <div class="relative animate-scale-in" style="animation-delay: 300ms">
          <!-- Outer rotating ring -->
          <div class="w-48 h-48 relative">
            <div
              class="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"
            ></div>
            <div
              class="absolute inset-4 rounded-full border-2 border-dotted border-secondary/30 animate-spin-reverse"
            ></div>

            <!-- Center circle with icon -->
            <div class="absolute inset-0 flex justify-center items-center">
              <div
                class="w-32 h-32 rounded-full bg-linear-to-br from-primary via-secondary to-tertiary p-0.5 animate-pulse-slow"
              >
                <div
                  class="w-full h-full rounded-full bg-dark flex justify-center items-center"
                >
                  <i
                    class="bi bi-envelope-heart text-5xl bg-linear-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Title -->
        <div class="text-center animate-fade-in" style="animation-delay: 600ms">
          <h1
            class="text-3xl font-semibold bg-linear-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent mb-2"
          >
            Undangan Dimuat
          </h1>
          <p class="text-slate-400 text-sm">
            Sedang menyiapkan undangan untuk Anda{{ dots }}
          </p>
        </div>
      </div>

      <!-- Loading Progress -->
      <div class="w-full flex flex-col justify-center items-center gap-6 px-8">
        <!-- Progress Bar -->
        <div
          class="w-full max-w-xs animate-fade-in"
          style="animation-delay: 900ms"
        >
          <div
            class="h-2 w-full bg-zinc-800/50 rounded-full overflow-hidden backdrop-blur-sm"
          >
            <div
              class="h-full bg-linear-to-r from-primary via-secondary to-tertiary transition-all duration-300 ease-out rounded-full relative overflow-hidden"
              :style="{ width: `${progress}%` }"
            >
              <!-- Shimmer effect -->
              <div
                class="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer"
              ></div>
            </div>
          </div>

          <!-- Progress percentage -->
          <div class="mt-3 text-center">
            <span
              class="text-xl font-bold bg-linear-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent"
            >
              {{ progress }}%
            </span>
          </div>
        </div>

        <!-- Loading Steps Indicator -->
        <div
          class="flex items-center gap-2 animate-fade-in"
          style="animation-delay: 1100ms"
        >
          <div
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="progress > 0 ? 'bg-primary scale-110' : 'bg-zinc-700'"
          ></div>
          <div
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="progress > 33 ? 'bg-secondary scale-110' : 'bg-zinc-700'"
          ></div>
          <div
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="progress > 66 ? 'bg-tertiary scale-110' : 'bg-zinc-700'"
          ></div>
          <div
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="progress === 100 ? 'bg-primary scale-110' : 'bg-zinc-700'"
          ></div>
        </div>

        <!-- Bottom message -->
        <div
          class="text-center animate-fade-in"
          style="animation-delay: 1300ms"
        >
          <p class="text-slate-500 text-xs italic">
            "Cinta adalah hadiah terindah dari Tuhan"
          </p>
        </div>
      </div>

      <!-- Decorative bottom ornament -->
      <div class="w-full px-8">
        <div
          class="w-full flex justify-center animate-fade-in"
          style="animation-delay: 1500ms"
        >
          <div class="flex items-center gap-3">
            <div
              class="h-px w-12 bg-linear-to-r from-transparent via-tertiary to-secondary"
            ></div>
            <i class="bi bi-infinity text-secondary text-lg animate-pulse"></i>
            <div
              class="h-px w-12 bg-linear-to-r from-secondary via-primary to-transparent"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
  opacity: 0;
}

.animate-scale-in {
  animation: scale-in 1s ease-out forwards;
  opacity: 0;
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 6s linear infinite;
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
