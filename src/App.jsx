import { useState, useEffect } from "react";
import { getCaseToFill, whoIsTheWinner } from "./utils";
import styles from "./App.module.css";
import { Grid } from "./components/Grid";

export const App = () => {
  const [grid, setGrid] = useState(Array(42).fill(null));
  const [playerTurn, setPlayerTurn] = useState(1);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const { winner } = whoIsTheWinner(grid);
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

  const resetGame = () => {
    setGrid(Array(42).fill(null));
    setPlayerTurn(1);
    setWinner(null);
  };

  return (
    <div className={styles.main}>
      <h1>
        {!winner && `Joueur ${playerTurn} : à ton tour !`}
        {winner && `Bravo Joueur ${winner} !`}
      </h1>
      {winner && (
        <button className={styles.button} onClick={resetGame}>
          Rejouer
        </button>
      )}
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
