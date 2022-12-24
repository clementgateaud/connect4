import { useState } from "react";
import styles from "./App.module.css";
import { Grid } from "./components/Grid";
import { Puissance4GameContext } from "./Puissance4GameContext";

export const App = () => {
  const [grid, setGrid] = useState(Array(42).fill(null));
  const [playerTurn, setPlayerTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const resetGame = () => {
    setGrid(Array(42).fill(null));
    setPlayerTurn(1);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <Puissance4GameContext.Provider
      value={{
        grid,
        setGrid,
        playerTurn,
        setPlayerTurn,
        winner,
        setWinner,
        isDraw,
        setIsDraw,
      }}
    >
      <div className={styles.main}>
        <h1>
          {!winner &&
            !isDraw &&
            `${
              playerTurn === 1 ? "🟡" : "🔴"
            } Joueur ${playerTurn} : à ton tour !`}
          {isDraw && `Égalité !`}
          {winner && `Bravo Joueur ${winner} !`}
        </h1>
        {(winner || isDraw) && (
          <button className={styles.button} onClick={resetGame}>
            Rejouer
          </button>
        )}
        <Grid />
      </div>
    </Puissance4GameContext.Provider>
  );
};

// draw
// make cases fall from the top
// Big winner announcement
// confetti
// line to show the winning combination
// make board more realistic
// leaderboard
