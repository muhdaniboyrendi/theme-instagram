<script setup>
const { fetchInvitationData } = useInvitationStore();
const route = useRoute();

const invitationSlug = route.params.invitationSlug;
const guestSlug = route.query.guest || null;

const pending = ref(true);
const invitationData = ref(null);
const isPreview = ref(false);
const isWithGuest = ref(false);
const isGuestListed = ref(false);

const isIvitationOpened = ref(false);
const showNavbar = ref(false);
const isFullscreen = ref(false);
const activePage = ref("home");

const audio = ref(null);
const isPlaying = ref(false);

let lastScrollPosition = 0;

const audioFile = computed(() => {
  const mainInfo = invitationData.value?.main_info;
  if (!mainInfo) return null;

  return mainInfo.custom_backsound_url || mainInfo.music?.audio_url || null;
});

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
  audio.value?.play();
  isPlaying.value = false;
};

const pauseAudio = () => {
  audio.value?.pause();
  isPlaying.value = true;
};

const toggleAudio = () => {
  isPlaying.value ? playAudio() : pauseAudio();
};

const handleInvitationOpen = () => {
  requestFullscreen();
  playAudio();

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
  activePage.value = path;

  if (process.client) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const loadInvitationData = async () => {
  try {
    const response = await fetchInvitationData(invitationSlug);

    invitationData.value = response;
  } catch (error) {
    console.error("Error loading invitation data:", error);
  }
};

const checkGuest = async () => {
  if (!guestSlug) {
    isWithGuest.value = false;
    isGuestListed.value = true;
    return;
  }

  const guestExists = invitationData.value.guests?.some(
    (guest) => guest.slug === guestSlug
  );

  isGuestListed.value = guestExists;
  isWithGuest.value = true;
};

const initializeData = async () => {
  pending.value = true;

  try {
    await loadInvitationData();
    await checkGuest();
  } catch (error) {
    console.error("Error initializing data:", error);
  } finally {
    pending.value = false;
  }
};

onMounted(() => {
  if (invitationSlug == "instagram") {
    isPreview.value = true;
    pending.value = false;
    isGuestListed.value = true;
  } else {
    isPreview.value = false;
    initializeData();
  }

  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <LoadingPage v-if="pending" />

  <UnlistedGuest v-else-if="!isGuestListed" :invitation-data="invitationData" />

  <div v-else class="overflow-hidden">
    <Welcome
      v-if="!isIvitationOpened"
      @open="handleInvitationOpen"
      :is-preview="isPreview"
      :is-with-guest="isWithGuest"
      :guest-slug="guestSlug"
      :invitation-data="invitationData"
    />

    <!-- Audio Player -->
    <audio ref="audio" loop>
      <source v-if="audioFile" :src="audioFile" type="audio/mpeg" />
    </audio>

    <div
      v-if="isIvitationOpened"
      class="min-h-dvh bg-off-white dark:bg-dark text-black dark:text-white"
    >
      <!-- Floating Button -->
      <div
        class="rounded-l-2xl p-2 pr-1 fixed right-0 bottom-1/2 translate-y-1/2 z-20 border border-zinc-700/70 bg-zinc-800/50 backdrop-blur-md flex flex-col gap-2"
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
        :is-preview="isPreview"
        :invitation-data="invitationData"
      />

      <div v-if="activePage === 'home'">
        <Hero :is-preview="isPreview" :invitation-data="invitationData" />
        <Header :is-preview="isPreview" :invitation-data="invitationData" />
        <Quote :is-preview="isPreview" :invitation-data="invitationData" />
        <Greetings :is-preview="isPreview" :invitation-data="invitationData" />
        <Location :is-preview="isPreview" :invitation-data="invitationData" />
        <Gift :is-preview="isPreview" :invitation-data="invitationData" />
        <Rsvp
          v-if="isPreview || (!isPreview && isWithGuest)"
          :is-preview="isPreview"
          :is-with-guest="isWithGuest"
          :guest-slug="guestSlug"
          :invitation-data="invitationData"
        />
        <Closing :is-preview="isPreview" :invitation-data="invitationData" />
        <Footer :is-preview="isPreview" :invitation-data="invitationData" />
      </div>

      <div v-if="activePage === 'gallery'">
        <Gallery :is-preview="isPreview" :invitation-data="invitationData" />
      </div>

      <div v-if="activePage === 'comment'">
        <Comment
          :is-preview="isPreview"
          :is-with-guest="isWithGuest"
          :guest-slug="guestSlug"
          :invitation-data="invitationData"
        />
      </div>

      <div v-if="activePage === 'story'">
        <Story :is-preview="isPreview" :invitation-data="invitationData" />
      </div>

      <div v-if="activePage === 'profile'">
        <Profile :is-preview="isPreview" :invitation-data="invitationData" />
      </div>
    </div>
  </div>
</template>
