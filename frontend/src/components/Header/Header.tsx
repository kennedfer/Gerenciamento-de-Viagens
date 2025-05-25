import { Button, H3 } from "@blueprintjs/core";

import styles from "./Header.module.css";
import type { HeaderProps } from "./Header.types";

export const Header = ({ openTravelDialog }: HeaderProps) => (
  <div className={styles.container}>
    <H3>Viagens da Lu</H3>
    <Button intent="primary" onClick={openTravelDialog}>
      Nova viagem
    </Button>
  </div>
);
