import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { DeleteButton } from "@/components";
import { Alert } from "@blueprintjs/core";
import { useState } from "react";
export function DeleteTripAlert({ onConfirm }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleConfirm = () => {
        onConfirm();
        setIsOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(DeleteButton, { onClick: () => setIsOpen(true) }), _jsx(Alert, { isOpen: isOpen, cancelButtonText: "Cancelar", confirmButtonText: "Confirmar", icon: "trash", intent: "danger", onCancel: () => setIsOpen(false), onConfirm: handleConfirm, children: _jsx("p", { children: "Tem certeza que deseja deletar esta viagem?" }) })] }));
}
