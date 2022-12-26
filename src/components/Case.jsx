import { useContext } from "react";
import { Puissance4GameContext } from "../Puissance4GameContext";
import { getCaseToFill } from "../utils";
import classNamesMaker from "classnames";
import styles from "./Case.module.css";

export const Case = ({ owner, index }) => {
  const {
    grid,
    setGrid,
    playerTurn,
    setPlayerTurn,
    winningCombination,
    setIsLoading,
    isLoading,
    versusComputer,
  } = useContext(Puissance4GameContext);

  const handleCaseClick = () => {
    if (
      (versusComputer && playerTurn === 2) ||
      isLoading ||
      winningCombination
    ) {
      return;
    }
    const caseToFill = getCaseToFill(index, grid);
    // if column is not already full
    if (typeof caseToFill === "number") {
      setIsLoading(true);
      const newGrid = [...grid];
      newGrid[caseToFill] = playerTurn;
      setGrid(newGrid);
      setTimeout(() => {
        setPlayerTurn(playerTurn === 1 ? 2 : 1);
        setIsLoading(false);
      }, 750);
    }
  };

  return (
    <div
      className={classNamesMaker(styles.main, {
        [styles["player1Case"]]: owner === 1,
        [styles["player2Case"]]: owner === 2,
        [styles["winning"]]: winningCombination?.includes(index) && !isLoading,
      })}
      onClick={handleCaseClick}
    ></div>
  );
};
