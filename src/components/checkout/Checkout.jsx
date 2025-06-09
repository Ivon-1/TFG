import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import env from '../../env';

const Checkout = ({ total, carrito, onSuccess }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Configuración global de axios para incluir credenciales
    axios.defaults.withCredentials = true;

    // Función para guardar productos en el carrito de la base de datos
    const guardarProductosEnBD = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('token');

            if (!usuario || !usuario.id || !token) {
                throw new Error('No hay usuario logueado');
            }

            // vaciamos el carrito actual de la bbdd
            await axios.delete(env.url_produccion + 'api/carrito/vaciar', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // agregamos los productos 1 a 1
            for (const item of carrito) {
                await axios.post(env.url_produccion + 'api/carrito/agregar', {
                    id_producto: item.id,
                    cantidad: item.cantidad
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }

            // comprobamos que el carrito se guarde 
            const carritoResponse = await axios.get(env.url_produccion + 'api/carrito', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!carritoResponse.data || carritoResponse.data.length === 0) {
                throw new Error('Error al guardar el carrito en la base de datos');
            }

            console.log('Carrito guardado en BD:', carritoResponse.data);
            return true;
        } catch (error) {
            console.error('Error al guardar carrito en BD:', error);
            throw new Error('Error al guardar el carrito: ' + (error.response?.data?.message || error.message));
        }
    };

    const onApproveOrder = async (data, actions) => {
        try {
            setIsProcessing(true);
            setError(null);

            // guardamos los productos en la bbdd
            await guardarProductosEnBD();

            const details = await actions.order.capture();
            console.log('Detalles de PayPal:', details);
            
            const usuario = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('token');

            if (!usuario || !usuario.id || !token) {
                throw new Error('No hay usuario logueado');
            }

            // Obtenemos la dirección de envío de PayPal
            const direccion = details.purchase_units[0]?.shipping?.address
                ? `${details.purchase_units[0].shipping.address.address_line_1}, ${details.purchase_units[0].shipping.address.admin_area_2}, ${details.purchase_units[0].shipping.address.postal_code}`
                : details.payer?.address?.address_line_1 || 'Sin dirección especificada';

            console.log('Dirección de envío:', direccion);

            // datos para enviar al back
            const datosCompra = {
                direccion: direccion,
                detalles_paypal: details
            };

            console.log('Enviando datos de compra:', datosCompra);

            // Enviamos los datos al backend con el token
            const response = await axios.post(
                env.url_produccion + 'api/finalizar_compra', 
                datosCompra,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            console.log('Respuesta del backend:', response.data);

            if (response.data.success === 404) {
                throw new Error(response.data.message || 'El carrito está vacío');
            }

            // Notificamos el éxito
            if (onSuccess) {
                onSuccess(details);
            }

            // Limpiamos el localStorage del carrito
            localStorage.removeItem('carrito');
            
            // redirigimos a facturas
            navigate('/facturas', { 
                state: { 
                    detallesCompra: details,
                    productos: carrito,
                    total: total,
                    factura_id: response.data.factura_id
                }
            });
        } catch (error) {
            console.error("Error al procesar el pago:", error);
            setError(error.message || "Error al procesar el pago");
        } finally {
            setIsProcessing(false);
        }
    };

    const onCreateOrder = (data, actions) => {
        try {
            // Calculamos el total de los items
            const itemTotal = carrito.reduce((sum, item) => {
                const precio = parseFloat(item.precioConDescuento || item.precio);
                return sum + (precio * item.cantidad);
            }, 0).toFixed(2);

            console.log('Total a pagar:', total);
            console.log('Item total:', itemTotal);

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
                                value: (item.precioConDescuento || item.precio).toString()
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
    };

    return (
        <div className="checkout">
            {error && <div className="alert alert-danger">{error}</div>}
            {isProcessing && <div className="alert alert-info">Procesando tu compra...</div>}
            {isPending ? <p>Cargando PayPal...</p> : (
                <>
                    <div className="currency-selector mb-3">
                        <select 
                            className="form-select" 
                            value={currency} 
                            onChange={({ target: { value } }) => {
                                setCurrency(value);
                                dispatch({
                                    type: "resetOptions",
                                    value: {
                                        ...options,
                                        currency: value,
                                    },
                                });
                            }}
                        >
                            <option value="EUR">💶 Euro</option>
                            <option value="USD">💵 USD</option>
                        </select>
                    </div>
                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={onCreateOrder}
                        onApprove={onApproveOrder}
                        onError={(err) => {
                            console.error("Error en PayPal:", err);
                            setError("Error en el proceso de pago con PayPal");
                        }}
                        disabled={isProcessing}
                    />
                </>
            )}
        </div>
    );
};

export default Checkout; 