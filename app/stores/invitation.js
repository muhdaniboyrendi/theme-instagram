export const useInvitationStore = defineStore("invitation", () => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const fetchInvitationData = async (invitationSlug) => {
    try {
      const response = await $fetch(
        `${apiBaseUrl}/invitations/${invitationSlug}/all`,
        {
          method: "GET",
        }
      );

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
    fetchInvitationData,
  };
});
