import { useState, useEffect } from "react";
import { getCaseToFill, whoIsTheWinner } from "./utils";
import styles from "./App.module.css";
import { Grid } from "./components/Grid";

export const App = () => {
  const [grid, setGrid] = useState(Array(42).fill(null));
  const [playerTurn, setPlayerTurn] = useState(1);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    //check if winner
    const { winningCombination, winner } = whoIsTheWinner(grid);
    setWinner(winner);
  }, [grid]);

  const handleCaseClick = (index) => {
    if (winner) {
      return;
    }
    const caseToFill = getCaseToFill(index, grid);
    const newGrid = [...grid];
    newGrid[caseToFill] = playerTurn;
    setGrid(newGrid);
    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Puissance 4</h1>
      <h2 className={styles.playerTurn}>
        {!winner && `Joueur ${playerTurn} : à ton tour !`}
        {winner && `Bravo Joueur ${winner} !`}
      </h2>
      <Grid handleCaseClick={handleCaseClick} grid={grid} />
    </div>
  );
};

// make cases fall from the top
// replay button
// Big winner announcement
// confetti
// line to show the winning combination
// make board more realistic
