<template>
  <li class="flex flex-col border-gray-300">
    <SanityTestLine
      :test="test"
      :is-expanded="isExpanded"
      :is-running="isRunning"
      @expanded="isExpanded = $event"
      @launchtests="$emit('launchtests', $event)"
    />

    <div class="flex flew-row" v-if="isExpanded">
      <SanityTestDetailChrome :test="test" />
      <SanityTestDetailSafari :test="test" />
    </div>
  </li>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      isExpanded: this.test.status === "in_progress",
    };
  },
  props: {
    test: {
      type: Object,
      default: () => {},
    },
    isRunning: Boolean,
  },
  watch: {
    test() {
      if (this.test.statusChrome === "in_progress") {
        this.isExpanded = true;
      }
    },
  },
};
</script>

<style lang="scss">
.progress {
  width: calc((var(--progress)) * 1%);
}

.spin {
  animation: spin 2s infinite;
}

@keyframes spin {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.in_progress {
  color: rgba(74, 222, 128, 1);
}

.success {
  color: rgba(74, 222, 128, 1);
}

.error {
  color: rgba(248, 113, 113, 1);
}

.code {
  padding: 5px 10px;
  border-radius: 33px;
  background: rgba(248, 113, 113, 1);
  font-weight: 500;
  color: white;
  margin-right: 10px;
}
</style>
