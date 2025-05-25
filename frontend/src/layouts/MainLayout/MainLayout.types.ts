import type { FunctionComponent } from "preact";

export interface MainLayoutProps {
  header: FunctionComponent;
  main: FunctionComponent;
  footer?: FunctionComponent;
}
