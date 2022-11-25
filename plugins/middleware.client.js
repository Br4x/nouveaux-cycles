import { useUserStore } from "../store/users";

export default defineNuxtPlugin(() => {
  /*addRouteMiddleware(
    "global-test",
    (route) => {
      const store = useUserStore();

      if (route.path != "/" && !store.gAuthUser.email) {
        return navigateTo("/");
      }
    },
    { global: true }
  );*/
});
