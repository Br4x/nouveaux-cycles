<template>
  <div>
    <transition name="scale-fade">
      <button
        v-if="options"
        class="fixed top-2 right-2 ml-2 toast flex items-stretch p-0 text-left border-none rounded-md shadow-xl bg-white z-50"
        @click="dismiss"
      >
        <div
          class="shrink-0 w-10 pt-4 text-center rounded-l-md"
          :class="{
            'bg-red-400': options.type == 'danger',
            'bg-orange-400': options.type == 'warning',
            'bg-green-400': options.type == 'success',
            'bg-blue-400': options.type == 'info',
          }"
        >
          <div
            :class="[
              'w-6 h-6 inline-block text-white',
              {
                'i-carbon-idea': options.type === 'info',
                'i-carbon-warning-alt': options.type === 'warning',
                'i-carbon-error': options.type === 'danger',
                'i-carbon-checkmark': options.type === 'success',
              },
            ]"
          />
        </div>
        <div class="p-4">
          <div class="flex space-between">
            <p class="mb-0 pr-4 font-semibold">{{ options.title }}</p>
            <svg
              v-if="options.timeout"
              class="timeout shrink-0 w-4 h-4"
              viewBox="0 0 10 10"
              :style="`--timeout: ${options.timeout}ms`"
            >
              <circle cx="5" cy="5" r="4" fill="transparent" />
            </svg>
          </div>
          <p class="mt-1 mb-1 text-sm text-slate-400">{{ options.body }}</p>
          <span class="text-slate-300 text-xs"> Fermer </span>
        </div>
      </button>
    </transition>
  </div>
</template>

<script>
import { uniqueId } from "lodash-es";

export default {
  name: "BaseToaster",
  data() {
    return {
      options: null,
      toastKey: null,
      timeoutId: null,
    };
  },
  methods: {
    push(options) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }

      const { timeout } = options;
      this.options = options;
      this.toastKey = uniqueId();

      if (timeout) {
        this.timeoutId = setTimeout(() => {
          this.dismiss();
        }, timeout);
      }
    },
    dismiss() {
      this.options = null;
      this.toastKey = null;
    },
  },
};
</script>

<style lang="scss">
.toast {
  transition: (box-shadow);
  &.scale-fade-enter-active,
  &.scale-fade-leave-active {
    transition: (opacity, transform);
  }

  &.scale-fade-enter,
  &.scale-fade-leave-to {
    transform: scale(0.975);
    opacity: 0;
  }

  &.scale-fade-enter-to,
  &.scale-fade-leave {
    transform: scale(1);
    opacity: 1;
  }

  .timeout {
    $toast-timeout-perimeter: 25.1327412287; // timeout circle radius * 2 * pi
    stroke-dasharray: $toast-timeout-perimeter;
    transform: rotate(-90deg) scaleY(-1);
    animation: timeout var(--timeout) linear forwards;
    stroke: var(--ha-color-border);

    stroke-dashoffset: 0;
    stroke-width: 1.5;

    @keyframes timeout {
      from {
        stroke-dashoffset: 0;
      }

      to {
        stroke-dashoffset: $toast-timeout-perimeter;
      }
    }
  }
}
</style>
