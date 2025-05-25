import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@blueprintjs/core";
import styles from "./Pagination.module.css";
export const Pagination = ({ previous, next, periodLabel, }) => {
    return (_jsxs("div", { className: styles.container, children: [_jsx(Button, { onClick: previous, children: "<" }), _jsx(Button, { className: styles["pages-counter"], children: periodLabel }), _jsx(Button, { onClick: next, children: ">" })] }));
};
