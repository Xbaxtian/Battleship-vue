<template>
  <div v-if="positions.length" class="battleship-wrapper">
    <table class="battleship-board" cellspacing="0">
      <thead>
        <tr>
          <th></th>
          <th
            v-for="(rows, indexRow) in positions"
            :key="`row-${indexRow}`"
            class="battleship-cell--column-header"
          >
            {{ String.fromCharCode(65 + indexRow) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rows, indexRow) in positions" :key="`row-${indexRow}`">
          <th class="battleship-cell--row-header">{{ indexRow + 1 }}</th>
          <td
            v-for="(possition, indexColumn) in rows"
            :key="`possition-(${indexRow},${indexColumn})`"
            class="battleship-cell"
          >
            <battle-coordinate
              :key="`possition-(${indexRow},${indexColumn})-${gameNumber}`"
              :ref="`possition-(${indexRow},${indexColumn})`"
              :possition="{ x: possition.x, y: possition.y }"
              :isEmpty="isPositionEmpty(possition)"
              @click="handleShoot"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="battleship-leyend">
      <div class="battleship-leyend__title">SHIPS</div>
      <div class="ship-types">
        <div class="ship-container ship--battleship">
          <div
            v-for="(ship, index) in ships['BATTLESHIP']"
            :key="`battleship-${index}`"
            class="ship"
          >
            <div
              v-for="(shipPart, sIndex) in ship.positions"
              :key="`battleship-part-${sIndex}`"
              class="ship-part"
              v-bind:class="{ 'ship-part--hit': shipPart.hit }"
            />
          </div>
        </div>
        <div class="ship-container ship--cruiser">
          <div
            v-for="(ship, index) in ships['CRUISER']"
            :key="`cruiser-${index}`"
            class="ship"
          >
            <div
              v-for="(shipPart, sIndex) in ship.positions"
              :key="`cruiser-part-${sIndex}`"
              class="ship-part"
              v-bind:class="{ 'ship-part--hit': shipPart.hit }"
            />
          </div>
        </div>
        <div class="ship-container ship--submarine">
          <div
            v-for="(ship, index) in ships['SUBMARINE']"
            :key="`submarine-${index}`"
            class="ship"
          >
            <div
              v-for="(shipPart, sIndex) in ship.positions"
              :key="`submarine-part-${sIndex}`"
              class="ship-part"
              v-bind:class="{ 'ship-part--hit': shipPart.hit }"
            />
          </div>
        </div>
        <div class="ship-container ship--destroyer">
          <div
            v-for="(ship, index) in ships['DESTROYER']"
            :key="`destroyer-${index}`"
            class="ship"
          >
            <div
              v-for="(shipPart, sIndex) in ship.positions"
              :key="`destroyer-part-${sIndex}`"
              class="ship-part"
              v-bind:class="{ 'ship-part--hit': shipPart.hit }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BattleCoordinate from "./BattleCoordinate.vue";
import { mapNTimes } from "@/utils/mapNTimes.js";
import { buildShips, searchClosure } from "@/utils/ships.js";
import {
  BATTLESHIP,
  CRUISER,
  SUBMARINE,
  DESTROYER,
} from "@/constants/ships.js";

const getPositionsMap = () => {
  return mapNTimes(10, (x, rowIndex) => {
    return mapNTimes(10, (y, colIndex) => ({
      x: rowIndex,
      y: colIndex,
    }));
  });
}

export default {
  components: { BattleCoordinate },
  props: {
    turns: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      positions: [],
      ships: {
        [BATTLESHIP.NAME]: [],
        [CRUISER.NAME]: [],
        [SUBMARINE.NAME]: [],
        [DESTROYER.NAME]: [],
      },
      gameTurns: this.turns,
      gameNumber: 0,
    };
  },
  computed: {
    allDestroyed() {
      const validation = (ship) =>
        ship.positions.reduce((acc, position) => acc && position.hit, true);

      return (
        this.ships[BATTLESHIP.NAME].every(validation) &&
        this.ships[CRUISER.NAME].every(validation) &&
        this.ships[SUBMARINE.NAME].every(validation) &&
        this.ships[DESTROYER.NAME].every(validation)
      );
    },
  },
  methods: {
    isPositionEmpty({ x, y }) {
      const validation = searchClosure({ x, y });

      return (
        !this.ships[BATTLESHIP.NAME].some(validation) &&
        !this.ships[CRUISER.NAME].some(validation) &&
        !this.ships[SUBMARINE.NAME].some(validation) &&
        !this.ships[DESTROYER.NAME].some(validation)
      );
    },
    findByPosition({ x, y }) {
      const search = searchClosure({ x, y });

      return (
        this.ships[BATTLESHIP.NAME].find(search) ||
        this.ships[CRUISER.NAME].find(search) ||
        this.ships[SUBMARINE.NAME].find(search) ||
        this.ships[DESTROYER.NAME].find(search)
      );
    },
    handleTurns({ shooted }) {
      if (shooted) {
        return;
      }

      this.gameTurns -= 1;

      if (this.allDestroyed) {
        this.$swal({
          title: "Game Over",
          text: "You win!",
          icon: "success",
          customClass: {
            popup: "pop-up",
          },
          showConfirmButton: true,
          confirmButtonText: "Play Again!",
          showCancelButton: true,
        }).then(result => {
          if (result.isConfirmed) {
            this.initGame();
          } else {
            this.$router.push({ path: "/" });
          }
        });
      }

      if (!this.gameTurns) {
        this.$swal({
          title: "Game Over",
          text: "You lose!",
          icon: "error",
          customClass: {
            popup: "pop-up",
          },
          showConfirmButton: true,
          confirmButtonText: "Play Again!",
          showCancelButton: true,
        }).then(result => {
          if (result.isConfirmed) {
            this.initGame();
          } else {
            this.$router.push({ path: "/" });
          }
        });
      }
    },
    handleShoot(payload) {
      const ship = this.findByPosition(payload);

      if (!ship) {
        this.handleTurns(payload);
        return;
      }

      const position = ship.positions.find(
        (p) => p.x === payload.x && p.y === payload.y
      );

      position.hit = true;
      ship.destroyed = ship.positions.reduce((acc, p) => acc && p.hit, true);

      if (!ship.destroyed) {
        this.handleTurns(payload);
        return;
      }

      ship.positions.forEach((pos) => {
        this.$refs[`possition-(${pos.x},${pos.y})`][0].handleDestroyed();
      });

      this.handleTurns(payload);
    },
    initGame() {
      this.gameTurns = this.turns;
      this.positions = getPositionsMap();
      this.gameNumber++;

      this.ships[BATTLESHIP.NAME] = buildShips(BATTLESHIP, this.isPositionEmpty);
      this.ships[CRUISER.NAME] = buildShips(CRUISER, this.isPositionEmpty);
      this.ships[SUBMARINE.NAME] = buildShips(SUBMARINE, this.isPositionEmpty);
      this.ships[DESTROYER.NAME] = buildShips(DESTROYER, this.isPositionEmpty);
    },
  },
  created() {
    this.initGame();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.battleship {
  &-wrapper {
    overflow-x: auto;
    position: relative;
    display: inline-block;
  }

  &-leyend {
    position: absolute;
    left: 15px;
    top: 50%;
    width: 120px;

    &__title {
      text-align: left;
      margin-bottom: 8px;
      font-weight: 500;
    }
  }

  &-board {
    margin: 0;
    margin-left: 150px;
    border-collapse: collapse;
    cursor: default;
    display: inline-block;
    position: relative;
  }

  &-cell {
    border: 1px solid $primary;
    padding: 0;
    margin: 0;

    &--column-header {
      padding-bottom: 0.75rem;
    }

    &--row-header {
      padding-right: 1rem;
    }
  }
}

.ship {
  display: flex;
  margin-right: 0.75rem;

  &-container {
    margin-bottom: 0.5rem;
    display: flex;
  }

  &-part {
    height: 8px;
    width: 8px;
    border: 1px solid $initial;
    margin-right: 0.1rem;

    &--hit {
      background-color: $destroyed;
    }
  }
}
</style>
