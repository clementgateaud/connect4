import { useContext } from "react";
import { Puissance4GameContext } from "../Puissance4GameContext";
import styles from "./ComputerSwitch.module.css";

export const ComputerSwitch = () => {
  const { versusComputer, setVersusComputer } = useContext(
    Puissance4GameContext
  );
  return (
    <div className={styles.main}>
      <span>Joueur 2 automatique</span>
      <input
        type="checkbox"
        checked={versusComputer}
        onChange={() => {
          setVersusComputer((prev) => !prev);
        }}
      />
    </div>
  );
};
