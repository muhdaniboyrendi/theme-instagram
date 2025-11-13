<script setup>
const isIvitationOpened = ref(false);
const showNavbar = ref(false);
const isFullscreen = ref(false);
const activePage = ref("home");

let lastScrollPosition = 0;

const fullscreenIcon = computed(() =>
  isFullscreen.value ? "bi-fullscreen-exit" : "bi-fullscreen"
);

const shouldShowNavbar = computed(() => {
  if (activePage.value !== "home") {
    return true;
  }
  return showNavbar.value;
});

const requestFullscreen = () => {
  if (!process.client) return;

  const elem = document.documentElement;
  const methods = [
    "requestFullscreen",
    "webkitRequestFullscreen",
    "msRequestFullscreen",
    "mozRequestFullScreen",
  ];

  for (const method of methods) {
    if (elem[method]) {
      elem[method]().catch((err) => {
        console.log(`Error enabling fullscreen: ${err.message}`);
      });
      break;
    }
  }

  isFullscreen.value = true;
};

const exitFullscreen = () => {
  if (!process.client) return;

  const methods = [
    "exitFullscreen",
    "webkitExitFullscreen",
    "msExitFullscreen",
    "mozCancelFullScreen",
  ];

  for (const method of methods) {
    if (document[method]) {
      document[method]();
      break;
    }
  }

  isFullscreen.value = false;
};

const toggleFullscreen = () => {
  isFullscreen.value ? exitFullscreen() : requestFullscreen();
};

const handleInvitationOpen = () => {
  requestFullscreen();

  isIvitationOpened.value = true;
};

const handleScroll = () => {
  if (activePage.value === "home") {
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollPosition > 100) {
      showNavbar.value = true;
    } else {
      showNavbar.value = false;
    }

    lastScrollPosition = currentScrollPosition;
  }
};

const handleNavigate = (path) => {
  console.log("index", path);

  activePage.value = path;

  if (process.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="overflow-hidden">
    <Welcome
      v-if="!isIvitationOpened"
      @open="handleInvitationOpen"
      :is-preview="true"
    />

    <div
      v-if="isIvitationOpened"
      class="min-h-dvh bg-off-white dark:bg-dark text-black dark:text-white"
    >
      <!-- Fullscreen Toggle Button -->
      <div
        class="fixed bottom-33 right-3 md:right-5 z-20 w-8 h-8 bg-linear-to-br/oklch from-primary via-secondary to-tertiary rounded-[0.6rem] flex justify-center items-center hover:scale-110 transition"
      >
        <button
          @click="toggleFullscreen"
          type="button"
          class="w-7 h-7 font-medium text-sm bg-dark rounded-lg hover:cursor-pointer"
          aria-label="Toggle Fullscreen"
        >
          <i
            class="bi bg-linear-to-br/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent"
            :class="fullscreenIcon"
          ></i>
        </button>
      </div>

      <!-- Gunakan shouldShowNavbar computed property -->
      <Navbar
        @navigate="handleNavigate"
        :show="shouldShowNavbar"
        :active-page="activePage"
      />

      <div v-if="activePage === 'home'">
        <Hero :is-preview="true" />
        <Header :is-preview="true" />
        <Quote :is-preview="true" />
        <Greetings :is-preview="true" />
        <Location :is-preview="true" />
        <Gift :is-preview="true" />
        <Rsvp :is-preview="true" />
        <Closing :is-preview="true" />
        <Footer :is-preview="true" />
      </div>

      <div v-if="activePage === 'gallery'">
        <Gallery :is-preview="true" />
      </div>

      <div v-if="activePage === 'comment'">
        <Comment :is-preview="true" />
      </div>

      <div v-if="activePage === 'story'">
        <Story :is-preview="true" />
      </div>

      <div v-if="activePage === 'profile'">
        <Profile :is-preview="true" />
      </div>
    </div>
  </div>
</template>
