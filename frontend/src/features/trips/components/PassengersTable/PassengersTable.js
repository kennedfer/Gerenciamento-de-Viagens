import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, InputGroup } from "@blueprintjs/core";
import styles from "./PassengersTable.module.css";
import { DeleteButton } from "@/components";
const PassengerRow = ({ unitPrice, removePassenger, index, setTripData, passenger, }) => {
    function onEdit(ev) {
        const input = ev.target;
        setTripData((prev) => {
            prev.passengers[index] = {
                ...prev.passengers[index],
                [input.name]: input.value,
                unitPrice,
            };
            return { ...prev };
        });
    }
    return (_jsxs("div", { children: [_jsx(InputGroup, { placeholder: "Ex.: Kenned Ferreira", size: "small", onInput: onEdit, name: "name", type: "text", value: passenger.name }), _jsx(InputGroup, { placeholder: "Ex.: 405051", size: "small", onInput: onEdit, name: "costCenter", type: "text", value: passenger.costCenter }), _jsx(InputGroup, { size: "small", disabled: true, type: "number", value: unitPrice.toFixed(3).toString() }), _jsx(DeleteButton, { onClick: () => removePassenger(index) })] }));
};
export const PassengersTable = ({ total, setTripData, passengers, }) => {
    // const [passengers, setPassengers] = useState(passengers);
    const unitPrice = passengers.length > 0 ? total / passengers.length : 0;
    const addPass = () => {
        setTripData((last) => {
            last.passengers = [...last.passengers, {}];
            return { ...last };
        });
    };
    const removePassenger = (index) => {
        setTripData((last) => {
            if (last.passengers.length === 1)
                return last;
            return {
                ...last,
                passengers: last.passengers.filter((_, i) => i !== index),
            };
        });
    };
    return (_jsxs("div", { className: styles.table, children: [_jsx("span", { children: "Passageiros:" }), _jsx("div", { className: styles.container, children: passengers.map((passenger, i) => (_jsx(PassengerRow, { unitPrice: unitPrice, removePassenger: removePassenger, index: i, setTripData: setTripData, passenger: passenger }))) }), _jsx(Button, { size: "small", type: "button", onClick: addPass, children: "Adicionar Passageiro" })] }));
};
