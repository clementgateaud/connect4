import styles from "./Grid.module.css";
import { Case } from "./Case";

export const Grid = ({ handleCaseClick, grid }) => {
  return (
    <div className={styles.main}>
      {grid.map((owner, index) => (
        <Case
          key={index}
          owner={owner}
          index={index}
          onClick={() => handleCaseClick(index)}
        />
      ))}
    </div>
  );
};
