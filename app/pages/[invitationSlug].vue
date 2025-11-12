<script setup>
// const { checkGuest } = useGuestStore();
const { fetchInvitationData } = useInvitationStore();
const route = useRoute();

const invitationSlug = route.params.invitationSlug;
const guest = route.query.quest || null;

const pending = ref(true);
const invitationData = ref(null);
const ispreview = ref(false);
const isWithGuest = ref(false);

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

const loadInvitationData = async () => {
  try {
    const response = await fetchInvitationData(invitationSlug);

    console.log(response);
    invitationData.value = response;
  } catch (error) {
    console.error("Error loading invitation data:", error);
  }
};

const checkGuest = async () => {
  if (!guest) {
    guestListed.value = true;
    return;
  } else {
    if (invitationData.value.guests.filter((gst) => gst.slug == guest)) {
      //
    }
  }
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
  if (invitationSlug.value == "instagram") {
    ispreview.value = true;
  } else {
    ispreview.value = false;
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

  <div v-else class="overflow-hidden">
    <Welcome
      v-if="!isIvitationOpened"
      @open="handleInvitationOpen"
      :is-preview="ispreview"
      :invitation-data="invitationData"
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
        <Hero :is-preview="ispreview" :invitation-data="invitationData" />
        <Header :is-preview="ispreview" :invitation-data="invitationData" />
        <Quote :is-preview="ispreview" :invitation-data="invitationData" />
        <Greetings :is-preview="ispreview" :invitation-data="invitationData" />
        <Location :is-preview="ispreview" :invitation-data="invitationData" />
        <Gift :is-preview="ispreview" :invitation-data="invitationData" />
        <Rsvp :is-preview="ispreview" :invitation-data="invitationData" />
        <Closing :is-preview="ispreview" :invitation-data="invitationData" />
        <Footer :is-preview="ispreview" :invitation-data="invitationData" />
      </div>

      <div v-if="activePage === 'gallery'">
        <Gallery :is-preview="ispreview" :invitation-data="invitationData" />
      </div>

      <div v-if="activePage === 'comment'">
        <Comment :is-preview="ispreview" :invitation-data="invitationData" />
      </div>

      <div v-if="activePage === 'story'">
        <Story :is-preview="ispreview" :invitation-data="invitationData" />
      </div>

      <div v-if="activePage === 'profile'">
        <Profile :is-preview="ispreview" :invitation-data="invitationData" />
      </div>
    </div>
  </div>
</template>
