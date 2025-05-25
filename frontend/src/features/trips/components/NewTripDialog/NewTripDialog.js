import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "preact/hooks";
import { createRef } from "preact";
import { Button, InputGroup, HTMLSelect, Card } from "@blueprintjs/core";
import { PassengersTable } from "@features/trips/components";
import styles from "./NewTripDialog.module.css";
const ensureFullDateTime = (val) => val.length === 16 ? val + ":00" : val;
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
export const NewTripDialog = ({ open, close, submit, initialData, }) => {
    const editableFieldsInEditMode = [
        "carId",
        "km",
        "origin",
        "destination",
    ];
    const isEditing = !!initialData;
    const isFieldEditable = (field) => !isEditing || editableFieldsInEditMode.includes(field);
    const dialogRef = createRef();
    const [tripData, setTripData] = useState(emptyTrip);
    useEffect(() => {
        if (open) {
            dialogRef.current?.showModal();
            setTripData({ ...emptyTrip, ...initialData });
        }
        else {
            dialogRef.current?.close();
        }
    }, [open, initialData]);
    const onSubmit = (ev) => {
        ev.preventDefault();
        submit(tripData);
        dialogRef.current?.close();
        setTripData(emptyTrip);
    };
    const handleChange = (e) => {
        const target = e.target;
        const { name, value } = target;
        setTripData((prev) => ({
            ...prev,
            [name]: name === "totalCost" || name === "account" ? Number(value) : value,
        }));
    };
    return (_jsx("dialog", { ref: dialogRef, onClose: close, children: _jsx(Card, { compact: true, elevation: 3, title: initialData ? "Editar viagem" : "Nova viagem", children: _jsxs("form", { className: styles.form, onSubmit: onSubmit, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "car-id", children: "Identifica\u00E7\u00E3o do Ve\u00EDculo:" }), _jsx(InputGroup, { required: true, id: "car-id", size: "small", name: "carId", placeholder: "Ex: \u00D4nibus 12B", value: tripData.carId, onChange: handleChange, disabled: !isFieldEditable("carId") })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "km", children: "KM Total:" }), _jsx(InputGroup, { required: true, id: "km", size: "small", name: "km", placeholder: "Ex: 250", value: tripData.km, onChange: handleChange, disabled: !isFieldEditable("km") })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "trip-type", children: "Tipo da viagem:" }), _jsx(HTMLSelect, { required: true, id: "trip-type", name: "tripType", value: tripData.tripType, onChange: handleChange, options: [
                                    { value: "programas", label: "Programas" },
                                    { value: "extra-visitas", label: "Extra visitas" },
                                    { value: "extra", label: "Extra" },
                                    { value: "fifo", label: "FIFO" },
                                    { value: "diaria-motorista", label: "Diária motorista" },
                                    { value: "outro", label: "Outro" },
                                ], disabled: !isFieldEditable("tripType") })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "exec-date", children: "Data da viagem:" }), _jsx(InputGroup, { required: true, id: "exec-date", size: "small", name: "execDate", type: "datetime-local", value: tripData.execDate, disabled: !isFieldEditable("execDate"), onChange: (e) => {
                                    const fixed = ensureFullDateTime(e.target.value);
                                    e.target.value = fixed;
                                    handleChange(e);
                                } })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "origin", children: "Origem:" }), _jsx(InputGroup, { required: true, id: "origin", size: "small", name: "origin", leftIcon: "map-marker", placeholder: "Ex: Bel\u00E9m", value: tripData.origin, onChange: handleChange, disabled: !isFieldEditable("origin") })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "destination", children: "Destino:" }), _jsx(InputGroup, { required: true, id: "destination", size: "small", name: "destination", leftIcon: "map-marker", placeholder: "Ex: Aurizona", value: tripData.destination, onChange: handleChange, disabled: !isFieldEditable("destination") })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "vehicle-type", children: "Tipo do Ve\u00EDculo:" }), _jsx(HTMLSelect, { required: true, id: "vehicle-type", name: "vehicleType", value: tripData.vehicleType, onChange: handleChange, options: [
                                    { value: "onibus", label: "Ônibus" },
                                    { value: "van", label: "Van" },
                                    { value: "outro", label: "Outro" },
                                ], disabled: !isFieldEditable("vehicleType") })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "total-cost", children: "Valor total:" }), _jsx(InputGroup, { id: "total-cost", size: "small", name: "totalCost", type: "number", placeholder: "Ex: 1000", leftIcon: "dollar", required: true, value: String(tripData.totalCost), onChange: handleChange, disabled: !isFieldEditable("totalCost") })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "entry-type", children: "Tipo de lan\u00E7amento:" }), _jsx(HTMLSelect, { required: true, id: "entry-type", name: "entryType", value: tripData.entryType, onChange: handleChange, options: [
                                    { value: "labour", label: "Labour" },
                                    { value: "opex", label: "OPEX" },
                                ], disabled: !isFieldEditable("entryType") })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "account", children: "Conta cont\u00E1bil:" }), _jsx(InputGroup, { required: true, id: "account", size: "small", name: "account", type: "number", placeholder: "Ex: 432123", value: String(tripData.account), onChange: handleChange, disabled: !isFieldEditable("account") })] }), _jsx(PassengersTable, { passengers: tripData.passengers, setTripData: setTripData, total: tripData.totalCost }), _jsxs("div", { className: styles.footer, children: [_jsx(Button, { minimal: true, onClick: close, children: "Fechar" }), _jsx(Button, { intent: "primary", type: "submit", children: initialData ? "Atualizar Viagem" : "Salvar Viagem" })] })] }) }) }));
};
