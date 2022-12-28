import { useEffect, useContext } from "react";
import Confetti from "react-dom-confetti";
import { whoIsTheWinner, getCaseToFill, getComputerCaseToPlay } from "../utils";
import { Connect4GameContext } from "../Connect4GameContext";
import { Case } from "./Case";
import { ReactComponent as SupportSVG } from "../assets/support.svg";
import winSound from "../assets/win.mp3";
import loseSound from "../assets/lose.mp3";
import styles from "./Grid.module.css";

export const Grid = () => {
  const {
    grid,
    setGrid,
    winner,
    setWinner,
    winningCombination,
    setWinningCombination,
    setIsDraw,
    playerTurn,
    setPlayerTurn,
    isLoading,
    setIsLoading,
    player2Mode,
  } = useContext(Connect4GameContext);

  // detect if winner
  useEffect(() => {
    const { winner, winningCombination, isDraw } = whoIsTheWinner(grid);
    setWinningCombination(winningCombination);
    const timeout = setTimeout(() => {
      setWinner(winner);
      setIsDraw(isDraw);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [grid, setWinner, setWinningCombination, setIsDraw]);

  useEffect(() => {
    if (winner === 1 || (winner === 2 && player2Mode === 0)) {
      const winAudio = new Audio(winSound);
      winAudio.play();
    }
    if (winner === 2 && player2Mode > 0) {
      const loseAudio = new Audio(loseSound);
      loseAudio.play();
    }
  }, [winner, player2Mode]);

  // computer playing
  useEffect(() => {
    if (!player2Mode || isLoading || winningCombination || playerTurn === 1) {
      return;
    }
    const indexToClick = getComputerCaseToPlay(grid, player2Mode);
    const caseToFill = getCaseToFill(indexToClick, grid);
    const newGrid = [...grid];
    newGrid[caseToFill] = playerTurn;
    setGrid(newGrid);
    setIsLoading(true);
    setTimeout(() => {
      setPlayerTurn(1);
      setIsLoading(false);
    }, 750);
  }, [
    playerTurn,
    grid,
    setGrid,
    isLoading,
    setIsLoading,
    setPlayerTurn,
    winningCombination,
    player2Mode,
  ]);

  const CONFETTI_CONFIG = {
    angle: 360,
    spread: 360,
    startVelocity: "20",
    elementCount: 500,
    dragFriction: 0.08,
    duration: 4000,
    stagger: 3,
    width: "13px",
    height: "13px",
    perspective: "700px",
    colors: winner === 1 ? ["var(--color-player1)"] : ["var(--color-player2)"],
  };

  return (
    <div className={styles.main}>
      <div className={styles.gridBody}>
        <div className={styles.confettiContainer}>
          <Confetti
            active={winner === 1 || (winner === 2 && player2Mode === 0)}
            config={CONFETTI_CONFIG}
          />
        </div>
        <SupportSVG className={styles.support} fill="var(--color-support)" />
        <div className={styles.cases}>
          {grid.map((owner, index) => (
            <Case key={index} owner={owner} index={index} />
          ))}
        </div>
      </div>
      <div className={styles.bottomBar}></div>
    </div>
  );
};
