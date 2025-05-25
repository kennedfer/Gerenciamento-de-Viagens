import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, H3 } from "@blueprintjs/core";
import styles from "./Header.module.css";
export const Header = ({ openTravelDialog }) => (_jsxs("div", { className: styles.container, children: [_jsx(H3, { children: "Viagens da Lu" }), _jsx(Button, { intent: "primary", onClick: openTravelDialog, children: "Nova viagem" })] }));
