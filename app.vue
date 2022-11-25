<template>
  <div class="h-full bg-gray-100">
    <BaseToaster ref="notifications" />
    <NuxtPage />
  </div>
</template>

<script setup>
import "@unocss/reset/tailwind.css";
</script>

<script>
export default {
  name: "BaseLayout",
  provide() {
    return {
      $notifications: {
        push: this.pushToast,
      },
    };
  },
  methods: {
    pushToast(options) {
      this.$refs.notifications.push(options)
    }
  },
};
</script>

<style lang="scss" scoped></style>
