import { Button } from "@blueprintjs/core";
import { DeleteButtonProps } from "./DeleteButton.types";

export const DeleteButton = ({ onClick, label = "" }: DeleteButtonProps) => (
  <Button size="small" icon="trash" intent="danger" onClick={onClick}>
    {label}
  </Button>
);
