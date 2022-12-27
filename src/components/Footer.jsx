import { useContext } from "react";
import { Connect4GameContext } from "../Connect4GameContext";
import styles from "./Footer.module.css";

export const Footer = () => {
  const { player2Mode, setPlayer2Mode } = useContext(Connect4GameContext);
  return (
    <div className={styles.main}>
      <label htmlFor="player2mode">Player 2 : </label>
      <select
        name="player2mode"
        id="player2mode"
        onChange={(e) => {
          setPlayer2Mode(parseInt(e.target.value));
        }}
        value={player2Mode}
      >
        <option value="0">Human</option>
        <option value="1">Computer - Easy</option>
        <option value="2">Computer - Medium</option>
        <option value="3">Computer - Hard</option>
      </select>
    </div>
  );
};
