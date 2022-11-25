<template>
  <div class="w-1/2">
    <i class="i-logos-safari w-10 h-10 block m-auto" />
    <ol class="mt-5 relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-10 ml-6" v-for="step in test.steps" :key="step.name">
        <span
          class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-white rounded-full ring-8 ring-white"
        >
          <div
            :class="[
              'w-full',
              {
                'i-carbon-hourglass bg-gray-300':
                  step.statusSafari === 'waiting',
                'i-carbon-hourglass in_progress spin':
                  step.statusSafari === 'in_progress',
                'i-carbon-error error': step.statusSafari === 'error',
                'i-carbon-checkmark success': step.statusSafari === 'success',
              },
            ]"
          />
        </span>
        <h3 :class="step.statusSafari" class="font-medium">
          {{ step.name }}
        </h3>
        <span
          class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
        >
          {{ statuses[step.statusSafari].label }}
        </span>
        <BaseOverlay v-if="step.screenshotSafari">
          <template #trigger>
            <div class="overflow-hidden max-w-30 max-h-60">
              <img class="max-w-30" :src="step.screenshotSafari" />
            </div>
          </template>
          <template #content>
            <img :src="step.screenshotSafari" />
          </template>
        </BaseOverlay>
        <div v-if="getSafariErrors(step.errors)" class="mt-4 flex flex-col">
          <template
            v-for="(error, index) in getSafariErrors(step.errors)"
            :key="'safari-error-' + index"
          >
            <div
              class="my-4 mr-4 bg-red-100 p-4 rounded-md"
              v-html="error.message"
            />
          </template>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import { filter } from "lodash-es";

export default {
  name: "TestDetailSafari",
  props: {
    test: {
      type: Object,
      default: () => {},
    },
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
  methods: {
    getSafariErrors(errors) {
      return filter(errors, (error) => error.type == "safari");
    },
  },
};
</script>

<style lang="scss" scoped></style>
