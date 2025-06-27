import { useState } from "preact/hooks";
import { Button, InputGroup } from "@blueprintjs/core";
import type { TripPayload } from "@/types";

import type {
  PassengerRowProps,
  PassengerTableProps,
} from "./PassengersTable.types";
import styles from "./PassengersTable.module.css";
import { DeleteButton } from "@/components";

const PassengerRow = ({
  unitPrice,
  removePassenger,
  index,
  setTripData,
  passenger,
}: PassengerRowProps) => {
  function onEdit(ev: InputEvent) {
    const input = ev.target as HTMLInputElement;

    setTripData((prev: TripPayload) => {
      prev.passengers[index] = {
        ...prev.passengers[index],
        [input.name]: input.value,
        unitPrice,
      };

      return { ...prev };
    });
  }

  return (
    <div>
      <InputGroup
        placeholder="Ex.: Kenned Ferreira"
        size={"small"}
        onInput={onEdit}
        name="name"
        type="text"
        value={passenger.name}
      />

      <InputGroup
        placeholder="Ex.: 405051"
        size={"small"}
        onInput={onEdit}
        name="costCenter"
        type="text"
        value={passenger.costCenter}
      />

      <InputGroup
        size={"small"}
        disabled
        type="number"
        value={unitPrice}
      />

      <DeleteButton onClick={() => removePassenger(index)} />
    </div>
  );
};

export const PassengersTable = ({
  total,
  setTripData,
  passengers,
}: PassengerTableProps) => {
  // const [passengers, setPassengers] = useState(passengers);

  const unitPrice = passengers.length > 0 ? ((total / passengers.length).toFixed(2)) : 0;

  const addPass = () => {
    setTripData((last) => {
      last.passengers = [...last.passengers, {}];
      return { ...last };
    });
  };

  const removePassenger = (index: number) => {
    setTripData((last) => {
      if (last.passengers.length === 1) return last;
      return {
        ...last,
        passengers: last.passengers.filter((_, i) => i !== index),
      };
    });
  };

  return (
    <div className={styles.table}>
      <span>Passageiros:</span>
      <div className={styles.container}>
        {passengers.map((passenger, i) => (
          <PassengerRow
            unitPrice={unitPrice}
            removePassenger={removePassenger}
            index={i}
            setTripData={setTripData}
            passenger={passenger}
          />
        ))}
      </div>
      <Button size="small" type="button" onClick={addPass}>
        Adicionar Passageiro
      </Button>
    </div>
  );
};
