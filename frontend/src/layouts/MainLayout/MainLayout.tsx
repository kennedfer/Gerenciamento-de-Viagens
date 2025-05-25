import type { MainLayoutProps } from "./MainLayout.types";

export const MainLayout = ({ header, main, footer }: MainLayoutProps) => {
  return (
    <>
      <header>{header}</header>
      <main>{main}</main>
      <footer>{footer}</footer>
    </>
  );
};
