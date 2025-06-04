import React from 'react';
import { FacturasComp } from '../../components/common/facturasComp';
import { useLocation, Navigate } from 'react-router-dom';

export function Facturas() {
    const location = useLocation();
    const { detallesCompra, productos, total } = location.state || {};

    // si no hay datos de la compra volvemos al home
    if (!detallesCompra || !productos || !total) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <FacturasComp 
                detallesCompra={detallesCompra}
                productos={productos}
                total={total}
            />
        </div>
    );
}