<template>
  <div class="container">
    <h1 class="battleship-title">Battleship Game</h1>
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <h2 class="battleship-subtitle">Options</h2>
            <div class="field">
              <label class="label">Level</label>
              <div class="control select is-fullwidth">
                <select v-model="levelId" class="is-fullwidth">
                  <option
                    v-for="level in levels"
                    :key="`level-${level.id}`"
                    :value="level.id"
                  >
                    {{ level.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label">Turns</label>
              <div class="control">
                <input
                  class="input is-normal"
                  type="text"
                  :value="
                    selectedLevel.turns === -1
                      ? 'Infinite'
                      : selectedLevel.turns
                  "
                  disabled
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Custom Turns</label>
              <div class="control">
                <input
                  v-model.number="turns"
                  class="input is-normal"
                  type="number"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link" @click="play">Play!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PATH from "@/constants/paths";
import { mapActions } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      levels: [
        {
          id: 0,
          name: "Eazy",
          turns: -1,
        },
        {
          id: 1,
          name: "Medium",
          turns: 100,
        },
        {
          id: 2,
          name: "Hard",
          turns: 50,
        },
      ],
      levelId: 0,
      turns: 0,
    };
  },
  computed: {
    selectedLevel() {
      return this.levels.find((level) => level.id === this.levelId);
    },
  },
  methods: {
    ...mapActions({
      setConfig: "game/setConfig",
    }),
    play() {
      this.setConfig({
        turns: this.turns || this.selectedLevel.turns,
        level: this.selectedLevel,
      });

      this.$router.push({ path: PATH.GAME });
    },
  },
};
</script>

<style lang="scss" scoped>
.battleship {
  &-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  &-subtitle {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
}
</style>
