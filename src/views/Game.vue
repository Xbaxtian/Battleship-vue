<template>
  <div class="game">
    <div class="container">
      <div class="columns">
        <div class="column is-full">
          <battle-board :turns="turns" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BattleBoard from "@/components/Game/BattleBoard.vue";
import { mapGetters } from "vuex";

export default {
  name: "GameView",
  components: {
    BattleBoard,
  },
  computed: {
    ...mapGetters({
      turns: "game/turns",
    }),
  },
};
</script>
