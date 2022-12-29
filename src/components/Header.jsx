import { useContext } from "react";
import { Connect4GameContext } from "../Connect4GameContext";
import styles from "./Header.module.css";

export const Header = () => {
  const {
    grid,
    setGrid,
    playerTurn,
    setPlayerTurn,
    winner,
    setWinner,
    isDraw,
    setIsDraw,
    setWinningCombination,
    player2Mode,
    playerStarting,
    setPlayerStarting,
  } = useContext(Connect4GameContext);

  const resetGame = () => {
    setGrid(Array(42).fill(0));
    setPlayerStarting((prev) => (prev === 1 ? 2 : 1));
    setPlayerTurn(playerStarting);
    setWinner(null);
    setIsDraw(false);
    setWinningCombination(null);
  };

  return (
    <div>
      <h1 className={styles.title}>
        {isDraw && `It's a draw !`}
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
            >{`Player ${playerTurn}`}</span>
            <span>
              {playerTurn === 2 && player2Mode > 0
                ? " is playing !"
                : " : your turn !"}
            </span>
          </>
        )}
        {(winner === 1 || (winner === 2 && player2Mode === 0)) && (
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
        {winner === 2 && player2Mode > 0 && <span>You lost :( </span>}
      </h1>
      <button className={styles.button} onClick={resetGame}>
        Restart
      </button>
    </div>
  );
};
