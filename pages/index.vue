<template>
  <div class="min-h-screen">
    <div
      class="min-h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4"
    >
      <div class="flex flex-col items-center justify-center">
        <BaseLogo class="w-96 -mb-50" />

        <div
          class="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full px-10 py-12 flex flex-col"
        >
          <BaseInput
            class="mt-12"
            label="E-mail"
            placeholder="Votre adresse e-mail"
          />
          <BaseInput
            class="mt-12"
            label="Mot de passe"
            placeholder="Le mot de passe vous a été communiqué par mail"
          />
          <BaseButton is-not-gradient color="green" class="mt-4">
            Se connecter
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "~/store/users";

export default {
  name: "LoginPage",
  setup() {
    const store = useUserStore();

    return { store };
  },
  mounted() {
    //this.$router.push("/sanity");
  },
  methods: {
    /*async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          throw "Probleme de connexion à GAuth";
        }
        var profile = googleUser.getBasicProfile();
        this.store.gAuthUser = {
          id: profile.getId(),
          fullName: profile.getName(),
          firstName: profile.getGivenName(),
          lastName: profile.getFamilyName(),
          avatar: profile.getImageUrl(),
          email: profile.getEmail(),
        };
        this.$router.push("/sanity");
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },*/
  },
};
</script>
