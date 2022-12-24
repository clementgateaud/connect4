import { useEffect } from "react";
import { whoIsTheWinner } from "../utils";
import { useContext } from "react";
import { Puissance4GameContext } from "../Puissance4GameContext";
import { Case } from "./Case";
import styles from "./Grid.module.css";

export const Grid = () => {
  const { grid, setWinner, setIsDraw } = useContext(Puissance4GameContext);

  useEffect(() => {
    const { winner, isDraw } = whoIsTheWinner(grid);
    setWinner(winner);
    setIsDraw(isDraw);
  }, [grid, setWinner, setIsDraw]);

  return (
    <div className={styles.main}>
      {grid.map((owner, index) => (
        <Case key={index} owner={owner} index={index} />
      ))}
    </div>
  );
};
