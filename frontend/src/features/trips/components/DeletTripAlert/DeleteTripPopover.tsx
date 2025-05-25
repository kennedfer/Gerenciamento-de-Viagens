import { DeleteButton } from "@/components";
import { Alert, Button } from "@blueprintjs/core";
import { useState } from "react";

export function DeleteTripAlert({ onConfirm }: { onConfirm: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <>
      <DeleteButton onClick={() => setIsOpen(true)} />

      <Alert
        isOpen={isOpen}
        cancelButtonText="Cancelar"
        confirmButtonText="Confirmar"
        icon="trash"
        intent="danger"
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      >
        <p>Tem certeza que deseja deletar esta viagem?</p>
      </Alert>
    </>
  );
}
