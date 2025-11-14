<script setup>
useSeoMeta({
  title: "EA Invitation - Platform Undangan Pernikahan Digital",
  description:
    "Wujudkan momen bahagia pernikahan Anda dengan undangan digital yang modern, elegan, dan interaktif.",
  ogTitle: "EA Invitation - Platform Undangan Pernikahan Digital",
  ogDescription:
    "Wujudkan momen bahagia pernikahan Anda dengan undangan digital yang modern, elegan, dan interaktif.",
  ogImage: "/og-image.png",
  ogUrl: "/",
  twitterCard: "summary_large_image",
  twitterTitle: "EA Invitation - Platform Undangan Pernikahan Digital",
  twitterDescription:
    "Wujudkan momen bahagia pernikahan Anda dengan undangan digital yang modern, elegan, dan interaktif.",
  twitterImage: "/og-image.png",
});

const isIvitationOpened = ref(false);
const showNavbar = ref(false);
const isFullscreen = ref(false);
const activePage = ref("home");
const isPlaying = ref(false);

let lastScrollPosition = 0;

const fullscreenIcon = computed(() =>
  isFullscreen.value ? "bi-fullscreen-exit" : "bi-fullscreen"
);

const audioIcon = computed(() =>
  isPlaying.value ? "bi-pause-fill" : "bi-music-note"
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

const playAudio = () => {
  isPlaying.value = false;
};

const pauseAudio = () => {
  isPlaying.value = true;
};

const toggleAudio = () => {
  isPlaying.value ? playAudio() : pauseAudio();
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
      <!-- Floating Button -->
      <div
        class="rounded-l-2xl p-2 pr-1 fixed right-0 bottom-1/2 z-20 border border-zinc-300/70 dark:border-zinc-700/70 bg-zinc-200/50 dark:bg-zinc-800/50 backdrop-blur-md flex flex-col gap-2"
      >
        <!-- Fullscreen Toggle Button -->
        <FullScreenButton
          @toggle-full-screen="toggleFullscreen"
          :fullscreen-icon="fullscreenIcon"
        />

        <!-- Audio Toggle Button -->
        <MusicButton @toggle-audio="toggleAudio" :audio-icon="audioIcon" />
      </div>

      <!-- Gunakan shouldShowNavbar computed property -->
      <Navbar
        @navigate="handleNavigate"
        :show="shouldShowNavbar"
        :active-page="activePage"
        :is-preview="true"
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
