import { useEffect, useContext } from "react";
import Confetti from "react-dom-confetti";
import { whoIsTheWinner } from "../utils";
import { Puissance4GameContext } from "../Puissance4GameContext";
import { Case } from "./Case";
import { ReactComponent as SupportSVG } from "../assets/support.svg";
import styles from "./Grid.module.css";

export const Grid = () => {
  const { grid, winner, setWinner, setIsDraw } = useContext(
    Puissance4GameContext
  );

  useEffect(() => {
    const { winner, isDraw } = whoIsTheWinner(grid);
    setWinner(winner);
    setIsDraw(isDraw);
  }, [grid, setWinner, setIsDraw]);

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
    colors:
      winner === 1
        ? ["#b6c6109b", "#e8d607", "#a1a10d"]
        : ["#ff2f2f", "#a21414", "#e85050"],
  };

  return (
    <div className={styles.main}>
      <div className={styles.confettiContainer}>
        <Confetti active={winner} config={CONFETTI_CONFIG} />
      </div>
      <div className={styles.gridBody}>
        <SupportSVG className={styles.support} fill="#197BBD" />
        <div className={styles.cases}>
          {grid.map((owner, index) => (
            <Case key={index} owner={owner} index={index} />
          ))}
        </div>
      </div>
      <div className={styles.bottomBar}>Puissance 4</div>
    </div>
  );
};
