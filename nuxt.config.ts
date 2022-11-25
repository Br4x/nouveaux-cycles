export default {
  srcDir: "./",
  ssr: false,
  debug: true,
  modules: ["@unocss/nuxt", "@pinia/nuxt"],
  plugins: ["./plugins/pinia-persist.client"],
  unocss: {
    uno: true,
    preflight: true,
    icons: true,
  }
};
