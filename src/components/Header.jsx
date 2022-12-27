import { useContext } from "react";
import { Connect4GameContext } from "../Connect4GameContext";
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
  } = useContext(Connect4GameContext);

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
            <span>: your turn !</span>
          </>
        )}
        {isDraw && `It's a draw !`}
        {winner && (
          <>
            <span>Congrats </span>
            <span
              className={styles.highlight}
              style={{
                background: `linear-gradient(to bottom, transparent 50%, ${
                  winner === 1
                    ? "rgba(252, 224, 65, 70%)"
                    : "rgba(238, 99, 82, 70%)"
                } 60%)`,
              }}
            >{`Player ${winner}`}</span>
            <span> !</span>
          </>
        )}
      </h1>
      {(winner || isDraw) && (
        <button className={styles.button} onClick={resetGame}>
          Play again
        </button>
      )}
    </div>
  );
};
