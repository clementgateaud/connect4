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

export const getComputerCaseToPlay = (grid, player2Mode) => {
  let caseToPlay = null;
  if (player2Mode > 1) {
    // check if computer can win next
    caseToPlay = canComputerFinishNext(grid);
    if (caseToPlay !== null) return caseToPlay;

    // check if human can finish next
    caseToPlay = canHumanFinishNext(grid);
    if (caseToPlay !== null) return caseToPlay;
  }
  if (player2Mode > 2) {
    // no assist (loop to go through compulsory assist)
    for (let i = 0; i < 100; i++) {
      const duplicatedGrid2 = [...grid];
      const index = Math.floor(Math.random() * 8);
      const caseToFillComputer = getCaseToFill(index, duplicatedGrid2);
      duplicatedGrid2[caseToFillComputer] = 2;
      const isSafe = !canHumanFinishNext(duplicatedGrid2);
      if (isSafe) {
        return index;
      }
    }
  }
  // pick random case
  return Math.floor(Math.random() * grid.length);
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
  const isDraw = !winningCombination && grid.every((element) => element);

  return { winningCombination, winner, isDraw };
};

const canHumanFinishNext = (grid) => {
  for (let i = 0; i < 7; i++) {
    const duplicatedGrid = [...grid];
    const caseToFillHuman = getCaseToFill(i, duplicatedGrid);
    duplicatedGrid[caseToFillHuman] = 1;
    if (whoIsTheWinner(duplicatedGrid).winner === 1) {
      return i;
    }
  }
  return null;
};

const canComputerFinishNext = (grid) => {
  for (let i = 0; i < 7; i++) {
    const duplicatedGrid = [...grid];
    const caseToFillComputer = getCaseToFill(i, duplicatedGrid);
    duplicatedGrid[caseToFillComputer] = 2;
    if (whoIsTheWinner(duplicatedGrid).winner === 2) {
      return i;
    }
  }
  return null;
};
