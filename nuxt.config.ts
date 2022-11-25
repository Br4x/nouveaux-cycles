export default {
  srcDir: "./",
  ssr: false,
  debug: true,
  modules: ["@unocss/nuxt", "@pinia/nuxt"],
  plugins: ["./plugins/pinia-persist.client"],
  env: {
    GOOGLE_SHEET_API: process.env.GOOGLE_SHEET_API,
    GOOGLE_SHEET_KEY: process.env.GOOGLE_SHEET_KEY,
  },
  unocss: {
    uno: true,
    preflight: true,
    icons: true,
  }
};
