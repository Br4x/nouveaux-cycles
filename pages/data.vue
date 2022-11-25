<template>
  <div
    class="flex flex-col items-center justify-center w-screen min-h-screen py-10"
  >
    <div class="flex flex-col mt-6">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden sm:rounded-lg">
            <table class="min-w-full text-sm text-gray-400 bg-white">
              <thead class="bg-gray-800 text-xs uppercase font-medium">
                <tr>
                  <th v-for="header in headers" :key="header">{{ header }}</th>
                  <th />
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody class="">
                <tr v-for="(row, index) in data" :key="'row' + index">
                  <td
                    v-for="attribute in getValues(row)"
                    class="px-6 py-4 whitespace-nowrap"
                    :key="'attr' + attribute"
                  >
                    {{ attribute }}
                  </td>
                  <td>
                    <span class="p-2 rounded-full bg-orange-400 text-white">
                      Editer
                    </span>
                  </td>
                  <td>
                    <span class="p-2 rounded-full bg-green-400 text-white">
                      Ajouter
                    </span>
                  </td>
                  <td>
                    <span class="p-2 rounded-full bg-red-400 text-white">
                      Supprimer
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Data",
  data() {
    return {
      data: [
        {
          name: "testname1",
          prout: "testname1",
          lol: "testname1",
          myname: "testname1",
          plotman: "testname1",
        },
        {
          name: "testname2",
          prout: "testname2",
          lol: "testname2",
          myname: "testname2",
          plotman: "testname2",
        },
        {
          name: "testname3",
          prout: "testname3",
          lol: "testname3",
          myname: "testname3",
          plotman: "testname3",
        },
      ],
    };
  },
  async mounted() {},
  computed: {
    headers() {
      return Object.keys(this.data[0]);
    },
  },
  methods: {
    getValues(item) {
      return Object.values(item);
    },
  },
};
</script>

<style lang="scss" scoped></style>
