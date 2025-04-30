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
                <div className={styles.primeros_datos}>
                    {/* fecha de la factura */}
                    <div className={styles.fecha_factura}>
                        <h4>Fecha</h4>
                        <p>20/10/2024</p>
                    </div>
                    {/* numero de facturas */}
                    <div className={styles.numero_factura}>
                        <h4>Número de factura</h4>
                        <p>123456789c</p>
                    </div>
                    {/* id_cliente */}
                    <div className={styles.id_cliente}>
                        <h4>Id cliente</h4>
                        <p>123456</p>
                    </div>
                </div>

                {/* direccion cliente */}
                <div className={styles.direccion_cliente}>
                    <div className={styles.datos_direccion}>
                        <div className={styles.direccion}>
                            <h4>Dirección cliente</h4>
                            <p>Calle del mono 24</p>
                        </div>
                        <div className={styles.contacto}>
                            <h4>Teléfono</h4>
                            <p>987987987</p>
                        </div>
                        <div className={styles.telefono}>
                            <h4>Email</h4>
                            <p>correo@correo.es</p>
                        </div>
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
                {/* datos en si */}
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

                {/* total */}
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


            {/* boton para descargar factura */}
            <div className={styles.descargar_factura}>
                <button className="btn btn-info p-2 mt-4" 
                type="button"
                style={{ fontWeight: 'bold'}}>Descargar factura</button>
            </div>
        </div>
    );
}
