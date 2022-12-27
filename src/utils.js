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
  if (player2Mode > 1) {
    if (getComputerCaseToFinishNext(grid) !== null)
      return getComputerCaseToFinishNext(grid);
    if (getHumanCaseToFinishNext(grid) !== null)
      return getHumanCaseToFinishNext(grid);
  }
  if (player2Mode > 2) {
    if (getComputerRandomCaseToPlayAvoidAssist(grid) !== null)
      return getComputerRandomCaseToPlayAvoidAssist(grid);
  }
  return getRandomCaseToPlay(grid);
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

const getHumanCaseToFinishNext = (grid) => {
  for (let i = 0; i < 7; i++) {
    const duplicatedGrid = [...grid];
    const caseToFillHuman = getCaseToFill(i, duplicatedGrid);
    if (typeof caseToFillHuman !== "number") {
      continue;
    }
    duplicatedGrid[caseToFillHuman] = 1;
    if (whoIsTheWinner(duplicatedGrid).winner === 1) {
      return i;
    }
  }
  return null;
};

const getComputerCaseToFinishNext = (grid) => {
  for (let i = 0; i < 7; i++) {
    const duplicatedGrid = [...grid];
    const caseToFillComputer = getCaseToFill(i, duplicatedGrid);
    if (typeof caseToFillComputer !== "number") {
      continue;
    }
    duplicatedGrid[caseToFillComputer] = 2;
    if (whoIsTheWinner(duplicatedGrid).winner === 2) {
      return i;
    }
  }
  return null;
};

const getComputerRandomCaseToPlayAvoidAssist = (grid) => {
  for (let i = 0; i < 100; i++) {
    const duplicatedGrid = [...grid];
    const index = Math.floor(Math.random() * 7);
    const caseToFillComputer = getCaseToFill(index, duplicatedGrid);
    if (typeof caseToFillComputer !== "number") {
      continue;
    }
    duplicatedGrid[caseToFillComputer] = 2;
    const isSafe = getHumanCaseToFinishNext(duplicatedGrid) === null;
    if (isSafe) {
      return index;
    }
  }
  return null;
};

const getRandomCaseToPlay = (grid) => {
  while (true) {
    const duplicatedGrid = [...grid];
    const index = Math.floor(Math.random() * 7);
    const caseToFillComputer = getCaseToFill(index, duplicatedGrid);
    if (typeof caseToFillComputer !== "number") {
      continue;
    } else {
      return index;
    }
  }
};
