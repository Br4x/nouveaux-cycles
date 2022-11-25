<template>
  <div class="select-none flex flex-1 items-center p-4">
    <div
      :class="[
        'w-6 h-6 justify-center items-center mr-4',
        {
          'i-carbon-hourglass bg-gray-200': test.statusChrome === 'waiting',
          'i-carbon-hourglass in_progress spin':
            test.statusChrome === 'in_progress',
          'i-carbon-error error': test.statusChrome === 'error',
          'i-carbon-checkmark success': test.statusChrome === 'success',
        },
      ]"
    />

    <BaseOverlay v-if="test.lastVideoPathChrome">
      <template #trigger>
        <div class="flex flex-col w-10 h-10 justify-center items-center mr-4">
          <i class="i-logos-chrome" />
          <video class="max-h-4" :src="test.lastVideoPathChrome" />
        </div>
      </template>
      <template #content>
        <video :src="test.lastVideoPathChrome" controls autoplay />
      </template>
    </BaseOverlay>

    <BaseOverlay v-if="test.lastVideoPathSafari">
      <template #trigger>
        <div class="flex flex-col w-10 h-10 justify-center items-center mr-4">
          <i class="i-logos-safari" />
          <video class="max-h-4" :src="test.lastVideoPathSafari" />
        </div>
      </template>
      <template #content>
        <video :src="test.lastVideoPathSafari" controls autoplay />
      </template>
    </BaseOverlay>

    <div class="flex-1 pl-1 mr-16">
      <div class="font-medium" :class="test.statusChrome">
        {{ test.name }}
      </div>
      <div class="text-gray-400 text-sm flex flex-row items-center">
        <i class="i-logos-chrome w-3 h-3 block mr-2" />
        {{ statuses[test.statusChrome].label }} /
        <i class="i-logos-safari w-3 h-3 block mx-2" />
        {{ statuses[test.statusSafari].label }}
      </div>
    </div>

    <button
      type="button"
      class="rounded bg-green text-white inline-block px-3 py-2 font-medium text-xs leading-tight uppercase hover:bg-green-500 hover:text-white focus:bg-green-500 focus:outline-none focus:ring-0 disabled:bg-slate-50 disabled:text-gray-400 disabled:pointer-events-none transition duration-150 ease-in-out"
      :disabled="isRunning"
      @click="launchTests()"
    >
      <i class="w-3 h-3 inline-block i-carbon-play-filled-alt" />
    </button>

    <div class="pl-12 text-center">
      <p class="text-sm font-medium leading-none text-gray-800">
        {{ completed }} / {{ count }}
      </p>
      <div class="w-24 h-3 bg-gray-100 rounded-full mt-2">
        <div
          class="w-20 h-3 bg-green rounded-full"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>

    <button
      :class="[
        'w-10 text-right flex justify-end h-6 ml-12 hover:cursor-pointer',
        {
          'i-carbon-chevron-down': isExpanded,
          'i-carbon-chevron-right': !isExpanded,
        },
      ]"
      @click="$emit('expanded', !isExpanded)"
    />
  </div>
</template>

<script>
import { sumBy, get, findIndex } from "lodash-es";

export default {
  name: "TestLine",
  props: {
    test: {
      type: Object,
      default: () => {},
    },
    isExpanded: Boolean,
    isRunning: Boolean,
  },
  data() {
    return {
      statuses: {
        waiting: {
          color: null,
          icon: "time",
          label: "En attente",
        },
        in_progress: {
          color: "green",
          icon: "spin loading",
          label: "En cours",
        },
        success: {
          color: "green",
          icon: "check",
          label: "Test réussi",
        },
        error: {
          color: "red",
          icon: "alert",
          label: "Test en erreur",
        },
        skipped: {
          color: null,
          icon: "alert",
          label: "Ne sera pas exécuté",
        },
      },
    };
  },
  computed: {
    count() {
      return get(this.test, "steps", []).length;
    },
    progress() {
      return this.count > 0
        ? ((this.completed / this.count) * 100).toFixed(0)
        : 0;
    },
    completed() {
      return sumBy(
        get(this.test, "steps"),
        (step) => step.statusChrome === "success"
      );
    },
  },
  methods: {
    async launchTests() {
      await $fetch(`/api/tests/reset?test=${this.test.apiPath}`);
      const tests = await $fetch(`/api/tests/list`);
      const index = findIndex(tests, { apiPath: this.test.apiPath });
      tests[index].toDo = 1;
      this.$emit("launchtests", tests);
    },
  },
};
</script>

<style lang="scss" scoped></style>
