<template>
  <button
    :style="`background-color: ${coordStyles[state]}`"
    v-on:click="handleClick"
  >
    {{ possition.x }} , {{ possition.y }}
  </button>
</template>

<script>
import {
  INITIAL,
  SUCCESS,
  FAIL,
  DESTROYED,
} from "@/constants/coorditaneTypes.js";

export default {
  props: {
    possition: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0,
      }),
    },
    isEmpty: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      coordStyles: {
        [INITIAL]: "gray",
        [SUCCESS]: "green",
        [FAIL]: "red",
        [DESTROYED]: "blue",
      },
      state: INITIAL,
    };
  },
  methods: {
    handleSuccess() {
      this.state = SUCCESS;
    },
    handleError() {
      this.state = FAIL;
    },
    handleDestroyed() {
      this.state = DESTROYED;
    },
    handleClick() {
      if (!this.isEmpty) {
        this.handleSuccess();
      } else {
        this.handleError();
      }

      this.$emit('click', this.possition);
    },
  },
};
</script>
