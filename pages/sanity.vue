<template>
  <main
    class="h-screen bg-gray-100 rounded-2xl overflow-hidden relative dark:bg-gray-800"
  >
    <div class="flex items-start justify-between">
      <SideMenu />

      <div class="flex flex-col w-full pl-0 md:space-y-4 md:p-4">
        <HeaderSearchBar />

        <div class="h-screen w-full pt-2 pr-2 pb-24 pl-2 overflow-auto">
          <div class="flex mb-6 justify-between">
            <SanityEnv :env="env" @change="env = $event" />
            <div>
              <button
                type="button"
                class="mr-4 rounded bg-gray-300 text-white inline-block px-3 py-2 font-medium text-xs leading-tight uppercase hover:bg-green-500 hover:text-white focus:bg-green-500 focus:outline-none focus:ring-0 disabled:bg-slate-50 disabled:text-gray-400 disabled:pointer-events-none transition duration-150 ease-in-out"
                :disabled="isResetting"
                @click="resetTests()"
              >
                <i class="w-3 h-3 inline-block i-carbon-reset-alt" />
                Reset
              </button>
              <button
                type="button"
                class="rounded bg-green text-white inline-block px-3 py-2 font-medium text-xs leading-tight uppercase hover:bg-green-500 hover:text-white focus:bg-green-500 focus:outline-none focus:ring-0 disabled:bg-slate-50 disabled:text-gray-400 disabled:pointer-events-none transition duration-150 ease-in-out"
                :disabled="isRunning"
                @click="launchAllTests()"
              >
                <i class="w-3 h-3 inline-block i-carbon-play-filled-alt" />
                Lancer les tests
              </button>
              
            </div>
          </div>
          {{ error }}

          <SanityList
            v-for="(tests, tag) in testGroups"
            :tests="tests"
            :title="tag"
            :is-running="isRunning"
            :env="env"
            :key="'testList-' + tag"
            @launchtests="launch($event)"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useUserStore } from "~/store/users";
import { groupBy, forEach } from "lodash-es";

export default {
  name: "Sanity",
  inject: ["$notifications"],
  //middleware: "auth",
  setup() {
    const store = useUserStore();

    return { store };
  },
  data() {
    return {
      tests: [],
      env: "rc",
      error: null,
      isResetting: false,
    };
  },
  computed: {
    user() {
      return this.store.gAuthUser;
    },
    testGroups() {
      return groupBy(this.tests, "tag");
    },
    isRunning() {
      let runningTests = 0;
      forEach(this.tests, (test) => {
        if (
          test.statusChrome === "in_progress" ||
          test.statusSafari === "in_progress"
        ) {
          runningTests++;
        }
      });
      return runningTests > 0;
    },
  },
  async mounted() {
    await this.$io.connect((err) => {
      if (err) {
        console.log("Connecting to server websocket fail", err);
      }
    });

    try {
      //this.$io.emit("sanity:connexion", this.store.gAuthUser);
      this.tests = await $fetch(`/api/tests/list`);
    } catch (error) {
      console.error(error);
    }

    this.$io.on("sanity:status", (tests) => {
      this.tests = tests;
    });

    this.$io.on("sanity:error", (error) => {
      this.$notifications.push({
        type: "danger",
        title: "Erreur !",
        body: error,
        timeout: 5000,
      });
    });

    this.$io.on("connect_error", (error) => {
      console.log("connection to websocket error :" + error);
    });
  },
  methods: {
    async resetTests() {
      this.isResetting = true;
      await $fetch(`/api/tests/reset`);
      this.isResetting = false;
    },
    async launch(tests) {
      this.tests = tests;
      this.$io.emit("sanity:launch", { tests: this.tests, env: this.env });
    },
    async launchAllTests() {
      await $fetch(`/api/tests/reset`);

      this.tests = await $fetch(`/api/tests/list`);
      forEach(this.tests, (test) => {
        test.toDo = 1;
      });

      this.$io.emit("sanity:launch", { tests: this.tests, env: this.env });
    },
  },
};
</script>

<style lang="scss">
.bg-green {
  background-color: rgba(74, 222, 128, 1);
}
</style>
