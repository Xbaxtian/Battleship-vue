<template>
  <div class="home">
    <div class="container">
      <div class="columns">
        <div class="column is-full">
          <battle-board />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BattleBoard from "../components/Game/BattleBoard.vue";

export default {
  name: "Home",
  components: {
    BattleBoard,
  },
};
</script>
