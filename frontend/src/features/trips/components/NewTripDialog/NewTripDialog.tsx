import { useEffect, useState } from "preact/hooks";
import { createRef } from "preact";
import { Button, InputGroup, HTMLSelect, Card, TextArea } from "@blueprintjs/core";
import { PassengersTable } from "@features/trips/components";

import styles from "./NewTripDialog.module.css";

const tripVehicles = {
  "Ônibus rodoviário 45 lugares": {
    "CM-ADM": {
      "MENSAL": 3215012,
      "DIARIA": 146136
    },
    "CM-TURNO": {
      "MENSAL": 5591322
    },
    "GV-ADM1": {
      "MENSAL": 3087349,
      "DIARIA": 140339
    },
    "GV-ADM2": {
      "MENSAL": 3087349
    },
    "GV-ADM3": {
      "MENSAL": 2446205
    },
    "GV-ADM4": {
      "MENSAL": 3087460
    },
    "GV-ADM5": {
      "MENSAL": 3087460
    },
    "LD2-ADM": {
      "MENSAL": 3145121
    },
    "N/A": {
      "KM": 1573
    }
  },
  "Van 16 lugares": {
    "GV-Turno": {
      "MENSAL": 3636000
    }
  },
  "Van 11 lugares": {
    "LD-Turno": {
      "MENSAL": 2791064
    },
    "N/A": {
      "KM": 1048
    },
    "SLZ": {
      "TRECHO": 238069
    },
    "CUJUPE": {
      "TRECHO": 331985
    },
    "BEL": {
      "TRECHO": 281000
    }
  },
  "Carro Executivo": {
    "N/A": {
      "KM": 673
    },
    "SLZ": {
      "TRECHO": 182595
    },
    "CUJUPE": {
      "TRECHO": 253357
    },
    "BEL": {
      "TRECHO": 161624
    }
  },
  "Van 19 lugares": {
    "GV-ADM": {
      "DIARIA": 110079
    },
    "LD-ADM": {
      "DIARIA": 124560
    }
  },
  "Taxi": {
    "N/A": {
      "KM": 699
    }
  },
  "Diária motorista": {
    "N/A": {
      "UNIDADE": 50000
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
  km: "",
  vehicle: "Ônibus rodoviário 45 lugares",
  tripType: "programas",
  execDate: "",
  origin: "",
  destination: "",
  totalCost: 0,
  codeRoute: "N/A",
  details: "",
  unit: "",
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

    setTripData((prev) => {
      let updatedData: typeof prev = {
        ...prev,
        [name]: name === "totalCost" || name === "account" ? Number(value) : value,
      };

      if (name === "vehicle") {
        updatedData = {
          ...updatedData,
          codeRoute: "",     
          unit: "",     
        };
      } else if (name === "codeRoute") {
        updatedData = {
          ...updatedData,
          unit: "",    
        };
      }

      if (updatedData.unit !== "KM") {
        if (updatedData.vehicle && updatedData.codeRoute && updatedData.unit) {
          const valueInCents = tripVehicles[updatedData.vehicle][updatedData.codeRoute][updatedData.unit];
          updatedData.totalCost = Number((valueInCents / 100).toFixed(2));
        }
      }

      if (name === "km") {
        const kmValueInCents = tripVehicles[updatedData.vehicle]?.[updatedData.codeRoute]?.["KM"];  

        if (kmValueInCents !== undefined) {  
          const km = Number.parseFloat(value) || 0;  

          const totalInCents = Math.round(kmValueInCents * km);  
          updatedData.totalCost = Number((totalInCents / 100).toFixed(2));  
        } 
      }

      return updatedData;
    });
  };


  const vehicleOptions = Object.keys(tripVehicles);

  const codeRouteOptions = tripData.vehicle
    ? Object.keys(tripVehicles[tripData.vehicle])
    : [];

  const unitOptions =
    tripData.vehicle && tripData.codeRoute &&
      tripVehicles[tripData.vehicle] &&
      tripVehicles[tripData.vehicle][tripData.codeRoute]
      ? Object.keys(tripVehicles[tripData.vehicle][tripData.codeRoute])
      : [];

  return (
    <dialog ref={dialogRef} onClose={close}>
      <Card
        compact
        elevation={3}
        title={initialData ? "Editar viagem" : "Nova viagem"}
      >
        <form className={styles.form} onSubmit={onSubmit}>
          <div>
            <label htmlFor="vehicle">Veiculo:</label>
            <HTMLSelect
              required
              id="vehicle"
              name="vehicle"
              value={tripData.vehicle}
              onChange={handleChange}
              options={
                vehicleOptions.map(vehicle => ({ value: vehicle, label: vehicle }))
              }
              disabled={!isFieldEditable("tripType")}
            />
          </div>
          <div>
            <label htmlFor="trip-type">Código de Rota:</label>
            <HTMLSelect
              required
              id="cod-route"
              name="codeRoute"
              value={tripData.codeRoute || ""}
              onChange={handleChange}
              options={
                codeRouteOptions.map(codeRoute => ({ value: codeRoute, label: codeRoute }))
              }
              disabled={!isFieldEditable("tripType")}
            />
          </div>
          <div>
            <label htmlFor="trip-type">Unidade Contratual:</label>
            <HTMLSelect
              required
              id="unit"
              name="unit"
              value={tripData.codeRoute ? tripData.unit : ""}
              onChange={handleChange}
              options={
                unitOptions.map(unit => ({ value: unit, label: unit }))
              }
              disabled={!isFieldEditable("tripType")}
            />
          </div>
          {tripData.unit === "KM" &&
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
            </div>}
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
              disabled
            />
          <label htmlFor="details">Observação:</label>
          <textarea
            placeholder="Viagem de volta para casa..."
            class="bp5-input"
            id="details"
            name="details"
            value={tripData.details || ''}
            onChange={handleChange}
          ></textarea>
          <textarea placeholder="Viagem de volta para casa..." class="bp5-input" id="details" name="details" value={tripData.details} onChange={handleChange}></textarea>

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
