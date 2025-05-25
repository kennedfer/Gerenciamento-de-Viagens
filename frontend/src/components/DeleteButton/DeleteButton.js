import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@blueprintjs/core";
export const DeleteButton = ({ onClick, label = "" }) => (_jsx(Button, { size: "small", icon: "trash", intent: "danger", onClick: onClick, children: label }));
