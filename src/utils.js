import { WINNING_COMBINATIONS } from "./constants";

export const getCaseToFill = (index, grid) => {
  // set all the column cases in an array
  const columnCases = [];
  const column = index % 7;
  for (let i = 0; i < 6; i++) {
    columnCases.unshift(column + 7 * i);
  }
  // return first case from the bottom that is null
  return columnCases.find((index) => !grid[index]);
};

export const whoIsTheWinner = (grid) => {
  const winningCombination = WINNING_COMBINATIONS.find((combination) => {
    const realValuesArray = [];
    combination.forEach((element) => {
      realValuesArray.push(grid[element]);
    });
    return realValuesArray.every(
      (element) => element === realValuesArray[0] && element !== null
    );
  });

  const winner = winningCombination ? grid[winningCombination[0]] : null;

  // it's a draw if all grid elements are truthy
  const isDraw = grid.every((element) => element);

  return { winningCombination, winner, isDraw };
};
