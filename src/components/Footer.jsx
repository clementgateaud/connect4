import { useContext } from "react";
import { Puissance4GameContext } from "../Puissance4GameContext";
import styles from "./Footer.module.css";

export const Footer = () => {
  const { versusComputer, setVersusComputer } = useContext(
    Puissance4GameContext
  );
  return (
    <label className={styles.main}>
      <span>Joueur 2 automatique</span>
      <input
        type="checkbox"
        checked={versusComputer}
        onChange={() => {
          setVersusComputer((prev) => !prev);
        }}
      />
    </label>
  );
};
