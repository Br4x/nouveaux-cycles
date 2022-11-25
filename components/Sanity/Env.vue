<template>
  <div
    class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
    role="group"
  >
    <button
      type="button"
      :class="[
        {
          'bg-green text-white': env === 'rc',
          'bg-white text-slate-500': env !== 'rc',
        },
      ]"
      class="rounded-l inline-block px-6 py-2.5 font-medium text-xs leading-tight uppercase hover:bg-green-500 hover:text-white focus:bg-green-500 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      @click="$emit('change', 'rc')"
    >
      RC
    </button>
    <button
      type="button"
      :class="[
        {
          'bg-green text-white': env === 'staging',
          'bg-white text-slate-500': env !== 'staging',
        },
      ]"
      class="rounded-r inline-block px-6 py-2.5 font-medium text-xs leading-tight uppercase hover:bg-green-500 hover:text-white focus:bg-green-500 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      @click="$emit('change', 'staging')"
    >
      Staging
    </button>
  </div>
</template>

<script>
export default {
  name: "Env",
  props: {
    env: {
      type: String,
      default: "rc",
    },
  },
};
</script>
