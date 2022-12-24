import { useEffect } from "react";
import { whoIsTheWinner } from "../utils";
import { useContext } from "react";
import { Puissance4GameContext } from "../Puissance4GameContext";
import { Case } from "./Case";
import supportSvg from "../assets/support.png";
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
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img className={styles.support} src={supportSvg} />
      <div className={styles.cases}>
        {grid.map((owner, index) => (
          <Case key={index} owner={owner} index={index} />
        ))}
      </div>
    </div>
  );
};
