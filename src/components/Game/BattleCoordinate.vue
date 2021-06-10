<template>
  <div
    class="battleship-cell"
    v-bind:class="coordStyles[state]"
    @click="handleClick"
  ></div>
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
        [INITIAL]: "is-initial",
        [SUCCESS]: "is-hit",
        [FAIL]: "is-fail",
        [DESTROYED]: "is-destroyed",
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
      console.log("hola");

      if (!this.isEmpty) {
        this.handleSuccess();
      } else {
        this.handleError();
      }

      this.$emit("click", this.possition);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.battleship-cell {
  height: 2em;
  width: 2em;
}

.is-hit {
  background-color: $hit;
}

.is-fail {
  background-color: $fail;
}

.is-destroyed {
  background-color: $destroyed;
}
</style>
