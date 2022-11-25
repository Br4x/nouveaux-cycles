<template>
  <div class="Overlay">
    <div class="Overlay--Trigger" @click="openOverlay">
      <slot name="trigger" />
    </div>

    <div
      v-if="isOpen"
      class="fixed inset-0 flex flex-col justify-center z-50 bg-gray-900 bg-opacity-50 items-center"
      @mousedown.self="saveClickOnBackdrop"
      @mouseup.self="closeModalBackdrop"
    >
      <div class="relative bg-transparent shadow overflow-auto">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Overlay",
  data() {
    return {
      isOpen: false,
      overlayBackdropClicked: false,
    };
  },
  methods: {
    async openOverlay() {
      this.isOpen = !this.isOpen;
    },
    closeModalBackdrop() {
      if (this.overlayBackdropClicked === true) {
        this.isOpen = false;
      }

      this.overlayBackdropClicked = false;
    },
    saveClickOnBackdrop(e) {
      // click outside the window so on the scrollbar don't close modale
      if (
        !(e.offsetX > e.target.clientWidth || e.offsetY > e.target.clientHeight)
      ) {
        this.overlayBackdropClicked = true;
      }
    },
  },
};
</script>
