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
    setWinningCombination,
  } = useContext(Puissance4GameContext);

  const resetGame = () => {
    setGrid(Array(42).fill(null));
    setPlayerTurn(1);
    setWinner(null);
    setIsDraw(false);
    setWinningCombination(null);
  };

  return (
    <div>
      <h1 className={styles.title}>
        {!winner && !isDraw && (
          <>
            <span
              className={styles.highlight}
              style={{
                background: `linear-gradient(to bottom, transparent 50%, ${
                  playerTurn === 1
                    ? "rgba(252, 224, 65, 70%)"
                    : "rgba(238, 99, 82, 70%)"
                } 60%)`,
              }}
            >{`Joueur ${playerTurn}`}</span>
            <span> : à ton tour !</span>
          </>
        )}
        {isDraw && `Égalité !`}
        {winner && (
          <>
            <span>Bravo </span>
            <span
              className={styles.highlight}
              style={{
                background: `linear-gradient(to bottom, transparent 50%, ${
                  winner === 1
                    ? "rgba(252, 224, 65, 70%)"
                    : "rgba(238, 99, 82, 70%)"
                } 60%)`,
              }}
            >{`Joueur ${winner}`}</span>
            <span> !</span>
          </>
        )}
      </h1>
      {(winner || isDraw) && (
        <button className={styles.button} onClick={resetGame}>
          Rejouer
        </button>
      )}
    </div>
  );
};
