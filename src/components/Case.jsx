import classNamesMaker from "classnames";
import styles from "./Case.module.css";

export const Case = ({ owner, index, onClick }) => {
  return (
    <div
      className={classNamesMaker(styles.main, {
        [styles["yellow"]]: owner === 1,
        [styles["red"]]: owner === 2,
      })}
      onClick={onClick}
    ></div>
  );
};
