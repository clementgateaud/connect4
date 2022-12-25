import { useContext, useEffect, useState } from "react";
import { Puissance4GameContext } from "../Puissance4GameContext";
import { getCaseToFill, sleep } from "../utils";
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

  const [showWinningCombination, setShowWinningCombination] = useState(false);

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

  // wait before start blinking
  useEffect(() => {
    if (winningCombination) {
      const timeout = setTimeout(() => {
        setShowWinningCombination(true);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      setShowWinningCombination(false);
    }
  }, [winningCombination]);

  // blink
  useEffect(() => {
    if (winningCombination) {
      const timeout = setTimeout(() => {
        setShowWinningCombination(!showWinningCombination);
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWinningCombination, setShowWinningCombination]);

  return (
    <div
      className={classNamesMaker(styles.main, {
        [styles["yellow"]]: owner === 1,
        [styles["red"]]: owner === 2,
      })}
      onClick={handleCaseClick}
    >
      {showWinningCombination && winningCombination?.includes(index) && (
        <div
          className={classNamesMaker(styles.winningCase, {
            [styles["winningYellow"]]: owner === 1,
            [styles["winningRed"]]: owner === 2,
          })}
        ></div>
      )}
    </div>
  );
};
