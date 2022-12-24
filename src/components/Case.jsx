import { useContext } from "react";
import { Puissance4GameContext } from "../Puissance4GameContext";
import { getCaseToFill } from "../utils";
import classNamesMaker from "classnames";
import styles from "./Case.module.css";

export const Case = ({ owner, index }) => {
  const { grid, setGrid, playerTurn, setPlayerTurn, winner } = useContext(
    Puissance4GameContext
  );
  const handleCaseClick = () => {
    if (winner) {
      return;
    }
    const caseToFill = getCaseToFill(index, grid);
    if (typeof caseToFill === "number") {
      const newGrid = [...grid];
      newGrid[caseToFill] = playerTurn;
      setGrid(newGrid);
      setPlayerTurn(playerTurn === 1 ? 2 : 1);
    }
  };

  return (
    <div
      className={classNamesMaker(styles.main, {
        [styles["yellow"]]: owner === 1,
        [styles["red"]]: owner === 2,
      })}
      onClick={handleCaseClick}
    ></div>
  );
};
