<template>
  <div
    class="flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow mb-4"
  >
    <div
      class="px-4 py-5 sm:px-6 border-b w-full border-gray-300 flex justify-between"
    >
      <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <button
        type="button"
        class="rounded bg-green text-white inline-block px-3 py-2 font-medium text-xs leading-tight uppercase hover:bg-green-500 hover:text-white focus:bg-green-500 focus:outline-none focus:ring-0 disabled:bg-slate-50 disabled:text-gray-400 disabled:pointer-events-none transition duration-150 ease-in-out"
        :disabled="isRunning"
        @click="launchTests()"
      >
        <i class="w-3 h-3 inline-block i-carbon-play-filled-alt" />
        Lancer les tests du {{ title }}
      </button>
    </div>
    <ul class="w-full flex flex-col divide divide-y">
      <SanityTest
        v-for="test in tests"
        :test="test"
        :key="test.name"
        :is-running="isRunning"
        @launchtests="$emit('launchtests', $event)"
      />
    </ul>
  </div>
</template>

<script>
import { forEach } from "lodash-es";

export default {
  name: "SanityList",
  props: {
    tests: {
      type: Array,
      default: () => [],
    },
    title: String,
    env: String,
    isRunning: Boolean,
  },
  methods: {
    async launchTests() {
      await $fetch(`/api/tests/reset?tag=${this.title}`);
      const tests = await $fetch(`/api/tests/list`);
      forEach(tests, (test) => {
        if (test.tag === this.title) {
          test.toDo = 1;
        }
      });
      this.$emit("launchtests", tests);
    },
  },
};
</script>

<style lang="scss" scoped></style>
