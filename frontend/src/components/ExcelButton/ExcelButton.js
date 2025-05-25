import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@blueprintjs/core";
import styles from "./ExcelButton.module.css";
export const ExcelButton = ({ onClick }) => {
    return (_jsx(Button, { size: "large", icon: "archive", intent: "success", className: styles.excelButton, onClick: () => onClick() }));
};
