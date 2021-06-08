<template>
  <div>
    <div v-for="(rows, indexRow) in positions" :key="`row-${indexRow}`">
      <battle-coordinate
        v-for="(possition, indexColumn) in rows"
        :key="`possition-(${indexRow},${indexColumn})`"
        :possition="{ x: possition.x, y: possition.y }"
        :isEmpty="isPositionEmpty(possition)"
      />
    </div>
  </div>
</template>

<script>
import BattleCoordinate from "./BattleCoordinate.vue";
import { mapNTimes } from "@/utils/mapNTimes.js";
import { buildShips, generateValidation } from "@/utils/ships.js";
import {
  BATTLESHIP,
  CRUISER,
  SUBMARINE,
  DESTROYER,
} from "@/constants/ships.js";

const positionsMap = mapNTimes(10, (x, rowIndex) => {
  return mapNTimes(10, (y, colIndex) => ({
    x: rowIndex,
    y: colIndex,
  }));
});

export default {
  components: { BattleCoordinate },
  data() {
    return {
      positions: positionsMap,
      ships: {
        [BATTLESHIP.NAME]: [],
        [CRUISER.NAME]: [],
        [SUBMARINE.NAME]: [],
        [DESTROYER.NAME]: [],
      },
    };
  },
  methods: {
    isPositionEmpty({ x, y }) {
      const validation = generateValidation({ x, y });

      return (
        !this.ships[BATTLESHIP.NAME].some(validation) &&
        !this.ships[CRUISER.NAME].some(validation) &&
        !this.ships[SUBMARINE.NAME].some(validation) &&
        !this.ships[DESTROYER.NAME].some(validation)
      );
    },
  },
  created() {
    this.ships[BATTLESHIP.NAME] = buildShips(BATTLESHIP, this.isPositionEmpty);
    this.ships[CRUISER.NAME] = buildShips(CRUISER, this.isPositionEmpty);
    this.ships[SUBMARINE.NAME] = buildShips(SUBMARINE, this.isPositionEmpty);
    this.ships[DESTROYER.NAME] = buildShips(DESTROYER, this.isPositionEmpty);

    // this.ships[BATTLESHIP.NAME].forEach(ships => {
    //   ships.positions.forEach(p => {
    //     console.log({...p});
    //   })
    // })
    // this.ships[CRUISER.NAME].forEach(ships => {
    //   ships.positions.forEach(p => {
    //     console.log({...p});
    //   })
    // })
    // this.ships[SUBMARINE.NAME].forEach(ships => {
    //   ships.positions.forEach(p => {
    //     console.log({...p});
    //   })
    // })
    // this.ships[DESTROYER.NAME].forEach(ships => {
    //   ships.positions.forEach(p => {
    //     console.log({...p});
    //   })
    // })
  },
};
</script>
