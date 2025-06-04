import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';

const Checkout = ({ total, carrito, onSuccess }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

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
        try {
            // calculamos subtotal de los items
            const itemTotal = carrito.reduce((sum, item) => {
                return sum + (parseFloat(item.precioConDescuento) * item.cantidad);
            }, 0).toFixed(2);

            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            currency_code: currency,
                            value: total.toString(),
                            breakdown: {
                                item_total: {
                                    currency_code: currency,
                                    value: itemTotal
                                }
                            }
                        },
                        items: carrito.map(item => ({
                            name: item.nombre,
                            unit_amount: {
                                currency_code: currency,
                                value: item.precioConDescuento.toString()
                            },
                            quantity: item.cantidad.toString()
                        }))
                    },
                ],
            });
        } catch (error) {
            console.error("Error al crear la orden:", error);
            setError("Error al crear la orden de PayPal");
            return null;
        }
    }

    const onApproveOrder = async (data, actions) => {
        try {
            const details = await actions.order.capture();
            
            // Primero notificamos el éxito
            if (onSuccess) {
                onSuccess(details);
            }

            // Limpiamos el localStorage
            localStorage.removeItem('carrito');
            
            // Finalmente redirigimos a la página de facturas
            navigate('/facturas', { 
                state: { 
                    detallesCompra: details,
                    productos: carrito,
                    total: total
                }
            });
        } catch (error) {
            console.error("Error al procesar el pago:", error);
            setError("Error al procesar el pago con PayPal");
        }
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
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
                        onError={(err) => {
                            console.error("Error en PayPal:", err);
                            setError("Error en el proceso de pago con PayPal");
                        }}
                    />
                </>
            )}
        </div>
    );
}

export default Checkout; 