import { useState, useEffect } from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Grid } from "./components/Grid";
import { ComputerSwitch } from "./components/ComputerSwitch";
import { Puissance4GameContext } from "./Puissance4GameContext";

export const App = () => {
  const [grid, setGrid] = useState(Array(42).fill(null));
  const [playerTurn, setPlayerTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [versusComputer, setVersusComputer] = useState(true);

  useEffect(() => {
    document.title = "Puissance 4";
  }, []);

  return (
    <Puissance4GameContext.Provider
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
        versusComputer,
        setVersusComputer,
      }}
    >
      <div className={styles.main}>
        <Header />
        <Grid />
        <ComputerSwitch />
      </div>
    </Puissance4GameContext.Provider>
  );
};
