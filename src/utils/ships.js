import { randomBetweenZeroAnd } from "./random.js";
import { mapNTimes } from "@/utils/mapNTimes.js";

export const isValidPosition = ({ x, y }) => {
  return x >= 0 && x <= 9 && y >= 0 && y <= 9;
};

export const searchClosure = ({ x, y }) => {
  return (ship) =>
    ship.positions.find((position) => position.x === x && position.y === y);
};

export const buildShips = (ship, isEmptyCb) => {
  const buildedShips = [];

  mapNTimes(ship.NUMBER, () => {
    let complete = false;
    let positions = [];

    do {
      const initialPosition = {
        x: randomBetweenZeroAnd(9),
        y: randomBetweenZeroAnd(9),
        hit: false,
      };

      if (isValidPosition(initialPosition) && isEmptyCb(initialPosition)) {
        const axisOptions = ["x", "y"];
        const randomAxisDirection = randomBetweenZeroAnd(2);

        const axis = axisOptions[randomAxisDirection];

        const nextPositions = mapNTimes(ship.LENGTH - 1, (_n, index) => {
          const next = {
            ...initialPosition,
            [axis]: initialPosition[axis] + index + 1,
          };

          if (isValidPosition(next) && isEmptyCb(next)) {
            return next;
          }
        }).filter((next) => next);

        positions = [initialPosition, ...nextPositions];

        complete = positions.length === ship.LENGTH;
      }
    } while (!complete);

    const completedShip = {
      label: ship.NAME,
      size: ship.LENGTH,
      destroyed: false,
      positions,
    };

    buildedShips.push(completedShip);
  });

  return buildedShips;
};
