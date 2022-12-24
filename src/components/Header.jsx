import { useContext } from "react";
import { Puissance4GameContext } from "../Puissance4GameContext";
import styles from "./Header.module.css";

export const Header = () => {
  const {
    setGrid,
    playerTurn,
    setPlayerTurn,
    winner,
    setWinner,
    isDraw,
    setIsDraw,
  } = useContext(Puissance4GameContext);

  const resetGame = () => {
    setGrid(Array(42).fill(null));
    setPlayerTurn(1);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <>
      <h1>
        {!winner &&
          !isDraw &&
          `${
            playerTurn === 1 ? "🟡" : "🔴"
          } Joueur ${playerTurn} : à ton tour !`}
        {isDraw && `Égalité !`}
        {winner && `Bravo Joueur ${winner} !`}
      </h1>
      <button className={styles.button} onClick={resetGame}>
        Rejouer
      </button>
    </>
  );
};
