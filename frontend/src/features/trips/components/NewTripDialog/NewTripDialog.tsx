import { useEffect, useState } from "preact/hooks";
import { createRef } from "preact";
import { Button, InputGroup, HTMLSelect, Card } from "@blueprintjs/core";
import { PassengersTable } from "@features/trips/components";

import styles from "./NewTripDialog.module.css";

interface NewTripDialogProps {
  open: boolean;
  close: () => void;
  submit: (data: typeof emptyTrip) => void;
  initialData?: Partial<typeof emptyTrip>;
}

const ensureFullDateTime = (val: string) =>
  val.length === 16 ? val + ":00" : val;

const emptyTrip = {
  carId: "",
  km: "",
  tripType: "programas",
  execDate: "",
  origin: "",
  destination: "",
  vehicleType: "onibus",
  totalCost: 0,
  entryType: "labour",
  account: "",
  passengers: [],
};

export const NewTripDialog = ({
  open,
  close,
  submit,
  initialData,
}: NewTripDialogProps) => {
  const editableFieldsInEditMode = [
    "carId",
    "km",
    "origin",
    "destination",
  ] as readonly string[];

  const isEditing = !!initialData;

  const isFieldEditable = (field: string) =>
    !isEditing || editableFieldsInEditMode.includes(field);

  const dialogRef = createRef<HTMLDialogElement>();
  const [tripData, setTripData] = useState(emptyTrip);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
      setTripData({ ...emptyTrip, ...initialData });
    } else {
      dialogRef.current?.close();
    }
  }, [open, initialData]);

  const onSubmit = (ev: Event) => {
    ev.preventDefault();
    submit(tripData);
    dialogRef.current?.close();
    setTripData(emptyTrip);
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setTripData((prev) => ({
      ...prev,
      [name]:
        name === "totalCost" || name === "account" ? Number(value) : value,
    }));
  };

  return (
    <dialog ref={dialogRef} onClose={close}>
      <Card
        compact
        elevation={3}
        title={initialData ? "Editar viagem" : "Nova viagem"}
      >
        <form className={styles.form} onSubmit={onSubmit}>
          <div>
            <label htmlFor="car-id">Identificação do Veículo:</label>
            <InputGroup
              required
              id="car-id"
              size="small"
              name="carId"
              placeholder="Ex: Ônibus 12B"
              value={tripData.carId}
              onChange={handleChange}
              disabled={!isFieldEditable("carId")}
            />
          </div>
          <div>
            <label htmlFor="km">KM Total:</label>
            <InputGroup
              required
              id="km"
              size="small"
              name="km"
              placeholder="Ex: 250"
              value={tripData.km}
              onChange={handleChange}
              disabled={!isFieldEditable("km")}
            />
          </div>
          <div>
            <label htmlFor="trip-type">Tipo da viagem:</label>
            <HTMLSelect
              required
              id="trip-type"
              name="tripType"
              value={tripData.tripType}
              onChange={handleChange}
              options={[
                { value: "programas", label: "Programas" },
                { value: "extra-visitas", label: "Extra visitas" },
                { value: "extra", label: "Extra" },
                { value: "fifo", label: "FIFO" },
                { value: "diaria-motorista", label: "Diária motorista" },
                { value: "outro", label: "Outro" },
              ]}
              disabled={!isFieldEditable("tripType")}
            />
          </div>
          <div>
            <label htmlFor="exec-date">Data da viagem:</label>
            <InputGroup
              required
              id="exec-date"
              size="small"
              name="execDate"
              type="datetime-local"
              value={tripData.execDate}
              disabled={!isFieldEditable("execDate")}
              onChange={(e) => {
                const fixed = ensureFullDateTime(e.target.value);
                e.target.value = fixed;
                handleChange(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="origin">Origem:</label>
            <InputGroup
              required
              id="origin"
              size="small"
              name="origin"
              leftIcon="map-marker"
              placeholder="Ex: Belém"
              value={tripData.origin}
              onChange={handleChange}
              disabled={!isFieldEditable("origin")}
            />
          </div>
          <div>
            <label htmlFor="destination">Destino:</label>
            <InputGroup
              required
              id="destination"
              size="small"
              name="destination"
              leftIcon="map-marker"
              placeholder="Ex: Aurizona"
              value={tripData.destination}
              onChange={handleChange}
              disabled={!isFieldEditable("destination")}
            />
          </div>
          <div>
            <label htmlFor="vehicle-type">Tipo do Veículo:</label>
            <HTMLSelect
              required
              id="vehicle-type"
              name="vehicleType"
              value={tripData.vehicleType}
              onChange={handleChange}
              options={[
                { value: "onibus", label: "Ônibus" },
                { value: "van", label: "Van" },
                { value: "outro", label: "Outro" },
              ]}
              disabled={!isFieldEditable("vehicleType")}
            />
          </div>
          <div>
            <label htmlFor="total-cost">Valor total:</label>
            <InputGroup
              id="total-cost"
              size="small"
              name="totalCost"
              type="number"
              placeholder="Ex: 1000"
              leftIcon="dollar"
              required
              value={String(tripData.totalCost)}
              onChange={handleChange}
              disabled={!isFieldEditable("totalCost")}
            />
          </div>
          <div>
            <label htmlFor="entry-type">Tipo de lançamento:</label>
            <HTMLSelect
              required
              id="entry-type"
              name="entryType"
              value={tripData.entryType}
              onChange={handleChange}
              options={[
                { value: "labour", label: "Labour" },
                { value: "opex", label: "OPEX" },
              ]}
              disabled={!isFieldEditable("entryType")}
            />
          </div>
          <div>
            <label htmlFor="account">Conta contábil:</label>
            <InputGroup
              required
              id="account"
              size="small"
              name="account"
              type="number"
              placeholder="Ex: 432123"
              value={String(tripData.account)}
              onChange={handleChange}
              disabled={!isFieldEditable("account")}
            />
          </div>

          <PassengersTable
            passengers={tripData.passengers}
            setTripData={setTripData}
            total={tripData.totalCost}
          />

          <div className={styles.footer}>
            <Button minimal onClick={close}>
              Fechar
            </Button>
            <Button intent="primary" type="submit">
              {initialData ? "Atualizar Viagem" : "Salvar Viagem"}
            </Button>
          </div>
        </form>
      </Card>
    </dialog>
  );
};
