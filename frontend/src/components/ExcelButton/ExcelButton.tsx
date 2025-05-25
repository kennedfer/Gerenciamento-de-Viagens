import { Button } from "@blueprintjs/core";
import styles from "./ExcelButton.module.css";

export const ExcelButton = ({ onClick }) => {
  return (
    <Button
      size="large"
      icon="archive"
      intent="success"
      className={styles.excelButton}
      onClick={() => onClick()}
    ></Button>
  );
};
