import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/facturas.module.scss";
import todas_imagenes from "../../data/imagenes";

export function FacturasComp() {
    return (
        <div className={styles.facturas}>
            {/* HEADER */}
            <header className={styles.header_facturas}>
                <div className={styles.logo_facturas}>
                    <Link to="/">
                        <img src={todas_imagenes.logo.url}
                            alt={todas_imagenes.logo.nombre} />
                    </Link>

                </div>

                <div className={styles.titulo_facturas}>
                    <h2 className="text-dark bold">Factura de compra</h2>
                </div>
            </header>
            {/* datos generales */}
            <div className={styles.datos_compra}>
                <div className={styles.fecha_factura}>
                    <h4>Fecha</h4>
                </div>
                {/* numero de facturas */}
                <div className={styles.numero_factura}>
                    <h4>Número de factura</h4>
                </div>
                {/* id_cliente */}
                <div className={styles.id_cliente}>
                    <h4>Número cliente</h4>
                </div>
                {/* direccion cliente */}
                <div className={styles.direccion_cliente}>
                    <h4>Dirección cliente</h4>
                    <div className={styles.datos_direccion}>
                        <p>Dirección</p>
                        <p>Teléfono</p>
                        <p>Email</p>
                    </div>
                </div>
            </div>
            {/* tabla de informacion. CAMBIAR LUEGO PARA RECORRER CON MAP */}
            <table className="bg-white w-100 border border-black" style={{ borderCollapse: 'collapse' }}>
                <thead className="bg-dark text-white text-center">
                    <tr>
                        <th className="border border-black">Codigo</th>
                        <th className="border border-black">Artículo</th>
                        <th className="border border-black">Precio</th>
                        <th className="border border-black">Unidad</th>
                        <th className="border border-black">Total</th>
                    </tr>
                </thead>
                <tbody className="text-dark">
                    <tr>
                        <td className="border border-black">x</td>
                        <td className="border border-black">xataka</td>
                        <td className="border border-black">x</td>
                        <td className="border border-black">x</td>
                        <td className="border border-black">500</td>
                    </tr>
                    <tr>
                        <td className="border border-black">a</td>
                        <td className="border border-black">a</td>
                        <td className="border border-black">a</td>
                        <td className="border border-black">a</td>
                        <td className="border border-black">800</td>
                    </tr>
                </tbody>
                <tfoot className="bg-dark text-white">
                    <tr>
                        <th className="text-start p-2">Total</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-end p-1 font-weight-bold">$123.45</td>
                    </tr>
                </tfoot>
            </table>



        </div>
    );
}
