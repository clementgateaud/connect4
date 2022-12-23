import classNamesMaker from "classnames";
import styles from "./Case.module.css";

export const Case = ({ owner, index, onClick }) => {
  return (
    <div className={styles.main} onClick={onClick}>
      <div
        className={classNamesMaker(styles.circle, {
          [styles["yellow"]]: owner === 1,
          [styles["red"]]: owner === 2,
        })}
      ></div>
    </div>
  );
};
