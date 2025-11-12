export const useCommentStore = defineStore("comment", () => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const sendMessage = async (data) => {
    try {
      const response = await $fetch(`${apiBaseUrl}/comments`, {
        method: "POST",
        body: data,
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
    sendMessage,
  };
});
