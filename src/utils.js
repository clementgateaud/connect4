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
    caseToPlay = getComputerCaseToFinishNext(grid);
    if (caseToPlay !== null) return caseToPlay;
    caseToPlay = getHumanCaseToFinishNext(grid);
    if (caseToPlay !== null) return caseToPlay;
  }
  if (player2Mode > 2) {
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
        (element) => element === realValuesArray[0] && element !== null
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

  // it's a draw if all grid elements are truthy
  const isDraw = !winningCombination && grid.every((element) => element);

  console.log({ winningCombinations, winningCombination, winner, isDraw });
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

const getHumanCaseToDo2SidedRow = (grid) => {
  const replaceNullInArray = (arr) => {
    // replace null by 0 (because null becomes empty when stringifying)
    return arr.map((item) => (item === null ? 0 : item));
  };
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
  const formattedGrid = removeSideValuesFromArray(replaceNullInArray(grid));
  for (let i = 0; i < combinations.length; i++) {
    const formattedCombination = replaceNullInArray(combinations[i]);
    const caseToPlay = subArrayIndexInArray(
      formattedGrid,
      formattedCombination
    );
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

const subArrayIndexInArray = (array, subarray) => {
  const strArray = array.join("");
  const strSubArray = subarray.join("");
  if (strArray.includes(strSubArray)) {
    return strArray.indexOf(strSubArray);
  }
  return null;
};
