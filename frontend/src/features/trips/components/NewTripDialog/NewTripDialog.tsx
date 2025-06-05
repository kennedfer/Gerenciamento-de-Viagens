import { useEffect, useState } from "preact/hooks";
import { createRef } from "preact";
import { Button, InputGroup, HTMLSelect, Card } from "@blueprintjs/core";
import { PassengersTable } from "@features/trips/components";

import styles from "./NewTripDialog.module.css";

const tripVehicles = {
    "Ônibus rodoviário 45 lugares": {
        "CM-ADM": {
            "MENSAL": 32150.12,
            "DIARIA": 1461.36
        },
        "CM-TURNO": {
            "MENSAL": 55913.22
        },
        "GV-ADM1": {
            "MENSAL": 30873.49,
            "DIARIA": 1403.39
        },
        "GV-ADM2": {
            "MENSAL": 30873.49
        },
        "GV-ADM3": {
            "MENSAL": 24462.05
        },
        "GV-ADM4": {
            "MENSAL": 30874.60
        },
        "GV-ADM5": {
            "MENSAL": 30874.60
        },
        "LD2-ADM": {
            "MENSAL": 31451.21
        },
        "N/A": {
            "KM": 15.73
        }
    },
    "Van 16 lugares": {
        "GV-Turno": {
            "MENSAL": 36360.00
        }
    },
    "Van 11 lugares": {
        "LD-Turno": {
            "MENSAL": 27910.64
        },
        "N/A": {
            "KM": 10.48
        },
        "SLZ": {
            "TRECHO": 2380.69
        },
        "CUJUPE": {
            "TRECHO": 3319.85
        },
        "BEL": {
            "TRECHO": 2810.00
        }
    },
    "Carro Executivo": {
        "N/A": {
            "KM": 6.73
        },
        "SLZ": {
            "TRECHO": 1825.95
        },
        "CUJUPE": {
            "TRECHO": 2533.57
        },
        "BEL": {
            "TRECHO": 1616.24
        }
    },
    "Van 19 lugares": {
        "GV-ADM": {
            "DIARIA": 1100.79
        },
        "LD-ADM": {
            "DIARIA": 1245.60
        }
    },
    "Taxi": {
        "N/A": {
            "KM": 6.99
        }
    },
    "Diária motorista": {
        "N/A": {
            "UNIDADE": 500.00
        }
    }
};


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
            <label htmlFor="trip-type">Veiculo:</label>
            <HTMLSelect
              required
              id="trip-type"
              name="tripType"
              value={tripData.vehicleType}
              onChange={handleChange}
              // options={[
              //   { value: "programas", label: "Programas" },
              //   { value: "extra-visitas", label: "Extra visitas" },
              //   { value: "extra", label: "Extra" },
              //   { value: "fifo", label: "FIFO" },
              //   { value: "diaria-motorista", label: "Diária motorista" },
              //   { value: "outro", label: "Outro" },
              // ]}
              options={
                Object.values(tripVehicles).map(vehicle => ({value: vehicle, label: vehicle}))
              }
              disabled={!isFieldEditable("tripType")}
            />
          </div>a
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
