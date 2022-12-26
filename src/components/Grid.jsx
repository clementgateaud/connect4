import { useEffect, useContext } from "react";
import Confetti from "react-dom-confetti";
import { whoIsTheWinner } from "../utils";
import { Puissance4GameContext } from "../Puissance4GameContext";
import { Case } from "./Case";
import { ReactComponent as SupportSVG } from "../assets/support.svg";
import styles from "./Grid.module.css";

export const Grid = () => {
  const { grid, winner, setWinner, setWinningCombination, setIsDraw } =
    useContext(Puissance4GameContext);

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
          <Confetti active={winner} config={CONFETTI_CONFIG} />
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
