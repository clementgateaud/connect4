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
    winner,
    setIsLoading,
    isLoading,
  } = useContext(Puissance4GameContext);

  const handleCaseClick = () => {
    if (isLoading || winner) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    const caseToFill = getCaseToFill(index, grid);
    if (typeof caseToFill === "number") {
      const newGrid = [...grid];
      newGrid[caseToFill] = playerTurn;
      setGrid(newGrid);
      setTimeout(() => {
        setPlayerTurn(playerTurn === 1 ? 2 : 1);
      }, 1000);
    }
  };

  return (
    <div
      className={classNamesMaker(styles.main, {
        [styles["yellowCase"]]: owner === 1,
        [styles["redCase"]]: owner === 2,
        [styles["winning"]]: winningCombination?.includes(index) && !isLoading,
      })}
      onClick={handleCaseClick}
    ></div>
  );
};
