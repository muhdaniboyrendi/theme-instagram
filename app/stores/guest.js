export const useGuestStore = defineStore("guest", () => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const checkGuest = async (guest, invitationSlug) => {
    try {
      const response = await $fetch(`${apiBaseUrl}/guest/${invitationSlug}`, {
        method: "GET",
        query: {
          guest: guest,
        },
      });

      return response.data;
    } catch (error) {
      const err = new Error(
        error.data?.message || "Terjadi kesalahan pada server"
      );
      err.status = error.data?.statusCode;
      err.validationErrors = error.data?.errors || error.data?.error || {};

      throw err;
    }
  };

  const attendanceConfirmation = async (data) => {
    try {
      const response = await $fetch(`${apiBaseUrl}/guests/${data.id}/rsvp`, {
        method: "PUT",
        body: {
          attendance_status: data.attendance_status,
        },
      });

      return response.data;
    } catch (error) {
      const err = new Error(
        error.data?.message || "Terjadi kesalahan pada server"
      );
      err.status = error.data?.statusCode;
      err.validationErrors = error.data?.errors || error.data?.error || {};

      throw err;
    }
  };

  return {
    checkGuest,
    attendanceConfirmation,
  };
});
