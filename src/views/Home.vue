<template>
  <div class="home">
    <battle-board />
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
