import { Button } from "@blueprintjs/core";
import styles from "./Pagination.module.css";

type PaginationProps = {
  previous: () => void;
  next: () => void;
  periodLabel: string;
};

export const Pagination = ({
  previous,
  next,
  periodLabel,
}: PaginationProps) => {
  return (
    <div className={styles.container}>
      <Button onClick={previous}>{"<"}</Button>
      <Button className={styles["pages-counter"]}>{periodLabel}</Button>
      <Button onClick={next}>{">"}</Button>
    </div>
  );
};
