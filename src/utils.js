import { WINNING_COMBINATIONS } from "./constants";

export const getCaseToFill = (index, grid) => {
  // set all the column cases in an array
  const columnCases = [];
  const column = index % 7;
  for (let i = 0; i < 6; i++) {
    columnCases.unshift(column + 7 * i);
  }
  // return first case from the bottom that is 0
  return columnCases.find((index) => grid[index] === 0) || null;
};

export const getComputerCaseToPlay = (grid, player2Mode) => {
  let caseToPlay = null;
  caseToPlay = getComputerCaseToFinishNext(grid);
  if (caseToPlay !== null) return caseToPlay;
  caseToPlay = getHumanCaseToFinishNext(grid);
  if (caseToPlay !== null) return caseToPlay;

  if (player2Mode > 1) {
    caseToPlay = getHumanCaseToDo2SidedRow(grid);
    if (caseToPlay !== null) return caseToPlay;
    caseToPlay = getComputerRandomCaseToPlayAvoidAssist(grid);
    if (caseToPlay !== null) return caseToPlay;
  }

  caseToPlay = getRandomCaseToPlay(grid);
  return caseToPlay;
};

export const whoIsTheWinner = (grid) => {
  const winningCombinations = [];
  WINNING_COMBINATIONS.forEach((combination) => {
    const realValuesArray = [];
    combination.forEach((element) => {
      realValuesArray.push(grid[element]);
    });
    if (
      realValuesArray.every(
        (element) => element === realValuesArray[0] && element > 0
      )
    ) {
      winningCombinations.push(combination);
    }
  });
  let winningCombination = null;
  if (winningCombinations.length > 0) {
    const winningCombinationWithDuplicates = winningCombinations.flat();
    winningCombination = [];
    winningCombinationWithDuplicates.forEach((element) => {
      if (!winningCombination.includes(element)) {
        winningCombination.push(element);
      }
    });
  }

  const winner = winningCombination ? grid[winningCombination[0]] : null;

  // it's a draw if all grid elements are > 0
  const isDraw = !winningCombination && grid.every((element) => element > 0);

  return { winningCombination, winner, isDraw };
};

const getHumanCaseToFinishNext = (grid) => {
  for (let i = 0; i < 7; i++) {
    const duplicatedGrid = [...grid];
    const caseToFillHuman = getCaseToFill(i, duplicatedGrid);
    if (caseToFillHuman === null) {
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
    if (caseToFillComputer === null) {
      continue;
    }
    duplicatedGrid[caseToFillComputer] = 2;
    if (whoIsTheWinner(duplicatedGrid).winner === 2) {
      return i;
    }
  }
  return null;
};

const getHumanCaseToDo2SidedRow = (grid) => {
  const removeSideValuesFromArray = (arr) => {
    // replace first and last column values by "X"
    return arr.map((item, index) =>
      index % 7 === 0 || index % 7 === 6 ? "X" : item
    );
  };
  const combinations = [
    ["X", 1, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, "X"],
  ];
  const formattedGrid = removeSideValuesFromArray(grid);
  for (let i = 0; i < combinations.length; i++) {
    const caseToPlay = subArrayIndexInArray(formattedGrid, combinations[i]);
    if (caseToPlay !== null) {
      const rowBelowIsPresent =
        caseToPlay >= 35 ||
        ([1, 2].includes(grid[caseToPlay + 7]) &&
          [1, 2].includes(grid[caseToPlay + 3 + 7]));
      if (rowBelowIsPresent) {
        const randomIndex = Math.floor(Math.random() * 2);
        const casesToPlay = [caseToPlay, caseToPlay + 3];
        return casesToPlay[randomIndex];
      }
    }
  }
  return null;
};

const getComputerRandomCaseToPlayAvoidAssist = (grid) => {
  const numberOfPiecesPlayed = grid.filter((element) => element > 0).length;
  const ponderatedIndexes1 = [2, 3, 4];
  const ponderatedIndexes2 = [0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6];
  for (let i = 0; i < 100; i++) {
    const duplicatedGrid = [...grid];
    let index = 0;
    if (numberOfPiecesPlayed < 6) {
      index =
        ponderatedIndexes1[
          Math.floor(Math.random() * ponderatedIndexes1.length)
        ];
    } else if (numberOfPiecesPlayed < 14) {
      index =
        ponderatedIndexes2[
          Math.floor(Math.random() * ponderatedIndexes2.length)
        ];
    } else {
      index = Math.floor(Math.random() * 7);
    }

    const caseToFillComputer = getCaseToFill(index, duplicatedGrid);
    if (caseToFillComputer === null) {
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
    if (caseToFillComputer === null) {
      continue;
    } else {
      return index;
    }
  }
};

const subArrayIndexInArray = (array, subarray) => {
  const strArray = array.join("");
  const strSubArray = subarray.join("");
  if (strArray.includes(strSubArray)) {
    return strArray.indexOf(strSubArray);
  }
  return null;
};
