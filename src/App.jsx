import { useState } from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Grid } from "./components/Grid";
import { Puissance4GameContext } from "./Puissance4GameContext";

export const App = () => {
  const [grid, setGrid] = useState(Array(42).fill(null));
  const [playerTurn, setPlayerTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

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
        <Header />
        <Grid />
      </div>
    </Puissance4GameContext.Provider>
  );
};

// wait to announce winner and change playerturn
// Big winner announcement
// confetti
// line to show the winning combination
// make board more realistic
// multi pages (leaderboard, homepage, other games)
// edit player names
