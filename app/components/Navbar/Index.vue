<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  activePage: {
    typr: String,
  },
});

const emit = defineEmits(["navigate"]);

const handleNavigate = (path) => {
  console.log(path);

  emit("navigate", path);
};
</script>

<template>
  <div class="relative w-full flex justify-center">
    <Transition name="slide-up">
      <nav
        v-show="show"
        class="w-full bg-dark/80 backdrop-blur-xl text-white text-center fixed bottom-0 z-20 border-t border-zinc-800"
      >
        <div class="max-w-4xl mx-auto">
          <div
            class="w-full mx-auto py-3 px-2 grid grid-cols-5 justify-center items-center mb-4"
          >
            <NavbarNavLink
              @navigate="handleNavigate"
              path="home"
              icon="bi-house-door"
              text="Home"
              :active-page="activePage"
            />
            <NavbarNavLink
              @navigate="handleNavigate"
              path="gallery"
              icon="bi-search"
              text="Gallery"
              :active-page="activePage"
            />
            <NavbarNavLink
              @navigate="handleNavigate"
              path="comment"
              icon="bi-plus-square"
              text="Comment"
              :active-page="activePage"
            />
            <NavbarNavLink
              @navigate="handleNavigate"
              path="story"
              icon="bi-film"
              text="Story"
              :active-page="activePage"
            />
            <div
              class="h-8 w-8 mx-auto aspect-square rounded-full border border-slate-700 overflow-hidden"
            >
              <button
                @click="handleNavigate('profile')"
                type="button"
                title="Profile"
                aria-label="Profile"
                class="cursor-pointer"
              >
                <NuxtImg src="/placeholder.jpg" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </Transition>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}
</style>
