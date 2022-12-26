import { useContext } from "react";
import { Puissance4GameContext } from "../Puissance4GameContext";
import styles from "./Footer.module.css";

export const Footer = () => {
  const { player2Mode, setPlayer2Mode } = useContext(Puissance4GameContext);
  return (
    <div className={styles.main}>
      <label htmlFor="player2mode">Joueur 2 : </label>
      <select
        name="player2mode"
        id="player2mode"
        onChange={(e) => {
          setPlayer2Mode(parseInt(e.target.value));
        }}
        value={player2Mode}
      >
        <option value="0">Humain</option>
        <option value="1">Facile</option>
        <option value="2">Intermédiaire</option>
        <option value="3">Difficile</option>
      </select>
    </div>
  );
};
