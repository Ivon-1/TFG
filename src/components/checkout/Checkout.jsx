import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const Checkout = ({ total, onSuccess }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);

    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total.toString(),
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transacción completada por ${name}`);
            if (onSuccess) {
                onSuccess(details);
            }
        });
    }

    return (
        <div className="checkout">
            {isPending ? <p>Cargando...</p> : (
                <>
                    <div className="currency-selector mb-3">
                        <select 
                            className="form-select" 
                            value={currency} 
                            onChange={onCurrencyChange}
                        >
                            <option value="EUR">💶 Euro</option>
                            <option value="USD">💵 USD</option>
                        </select>
                    </div>
                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
        </div>
    );
}

export default Checkout; 