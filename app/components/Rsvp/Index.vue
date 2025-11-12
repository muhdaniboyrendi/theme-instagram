<script setup>
const { attendanceConfirmation } = useGuestStore();

const props = defineProps({
  guestData: {
    type: Object,
  },
  isInvitation: {
    type: Boolean,
    default: false,
  },
});

const guestName = ref(props.isInvitation ? props.guestData.name : "");
const isLoading = ref(false);
const attendingSuccess = ref(false);

const formData = reactive({
  id: props.isInvitation ? props.guestData.id : "id",
  attendance_status: props.isInvitation
    ? props.guestData.attendance_status
    : "pending",
});

const handleAttendanceConfirmation = async () => {
  if (!formData.attendance_status) {
    alert("Silakan pilih status kehadiran Anda");
    return;
  }

  try {
    isLoading.value = true;

    await attendanceConfirmation(formData);

    attendingSuccess.value = true;
  } catch (error) {
    console.error("Error confirming attendance:", error);
    console.error("Error confirming attendance:", error.validationErrors);
  } finally {
    isLoading.value = false;
  }
};

const updateAttendanceStatus = (value) => {
  formData.attendance_status = value;
};
</script>

<template>
  <section class="w-full max-w-4xl mx-auto py-10">
    <RsvpHead
      :status="
        props.isInvitation ? props.guestData.attendance_status : 'pending'
      "
    />
    <form
      v-gsap.whenVisible.once.slower-20.from="{ opacity: 0, scale: 0 }"
      @submit.prevent="handleAttendanceConfirmation"
      class="w-full max-w-md mx-auto px-4 flex flex-col justify-center items-center"
    >
      <div class="w-full">
        <div class="relative w-full mb-5">
          <input
            v-model="guestName"
            type="text"
            id="floating_outlined"
            class="block px-3 pb-2.5 pt-4 w-full text-white font-semibold bg-transparent rounded-lg border-2 border-white/20 appearance-none focus:outline-none focus:ring-0 peer"
            placeholder=" "
          />
          <label
            for="floating_outlined"
            class="absolute text-white/70 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-dark px-2 peer-focus:px-2peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >Nama</label
          >
        </div>
        <div class="w-full grid grid-cols-2 gap-3">
          <RsvpRadio
            label="Hadir"
            value="attending"
            id="hadir"
            :modelValue="formData.attendance_status"
            @update:modelValue="updateAttendanceStatus"
          />
          <RsvpRadio
            label="Tidak Hadir"
            value="not_attending"
            id="tidak"
            :modelValue="formData.attendance_status"
            @update:modelValue="updateAttendanceStatus"
          />
        </div>
        <div class="w-full mx-auto">
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full p-0.5 text-white font-semibold bg-linear-to-r/oklch from-primary via-secondary to-tertiary rounded-[0.6rem] mt-5 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="py-2 w-full bg-dark rounded-lg block">
              <span
                class="bg-linear-to-r/oklch from-primary via-secondary to-tertiary bg-clip-text text-transparent"
              >
                <i v-if="attendingSuccess" class="bi bi-check2-all"></i>
                {{
                  attendingSuccess
                    ? "Kehadiran Dikonfirmasi"
                    : isLoading
                    ? "Menyimpan..."
                    : "Konfirmasi Kehadiran"
                }}
              </span>
            </span>
          </button>
        </div>
      </div>
    </form>
  </section>
</template>
