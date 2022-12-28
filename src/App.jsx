import { useState, useEffect } from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Grid } from "./components/Grid";
import { Footer } from "./components/Footer";
import { Connect4GameContext } from "./Connect4GameContext";

export const App = () => {
  const [grid, setGrid] = useState(Array(42).fill(0));
  const [playerTurn, setPlayerTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [player2Mode, setPlayer2Mode] = useState(0);

  useEffect(() => {
    document.title = "Connect 4";
  }, []);

  return (
    <Connect4GameContext.Provider
      value={{
        grid,
        setGrid,
        playerTurn,
        setPlayerTurn,
        winner,
        setWinner,
        winningCombination,
        setWinningCombination,
        isDraw,
        setIsDraw,
        isLoading,
        setIsLoading,
        player2Mode,
        setPlayer2Mode,
      }}
    >
      <div className={styles.main}>
        <Header />
        <Grid />
        <Footer />
      </div>
    </Connect4GameContext.Provider>
  );
};
