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
                        className="w-25 rounded-3"
                            alt={todas_imagenes.logo.nombre} />
                    </Link>
                </div>
                <div className={styles.empresa_info}>
                    <h2>ModTech</h2>
                    <p>C/ Tecnología, 123</p>
                    <p>28001 Madrid</p>
                    <p>Tel: 91 123 45 67</p>
                    <p>CIF: B12345678</p>
                </div>
            </header>

            <div className={styles.documento_info}>
                <div className={styles.tipo_documento}>
                    <h1>FACTURA</h1>
                    <div className={styles.factura_detalles}>
                        <p><strong>Nº Factura:</strong> MOD-2024-123456</p>
                        <p><strong>Fecha:</strong> 20/10/2024</p>
                        <p><strong>Método de pago:</strong> Tarjeta de crédito</p>
                    </div>
                </div>
            </div>

            {/* datos cliente */}
            <div className={styles.datos_compra}>
                <div className={styles.cliente_info}>
                    <h3>DATOS DEL CLIENTE</h3>
                    <div className={styles.cliente_detalles}>
                        <p><strong>Cliente:</strong> Juan Pérez García</p>
                        <p><strong>NIF/CIF:</strong> 12345678A</p>
                        <p><strong>Dirección:</strong> Calle del Mono 24, 28002 Madrid</p>
                        <p><strong>Teléfono:</strong> 987 987 987</p>
                        <p><strong>Email:</strong> correo@correo.es</p>
                    </div>
                </div>
            </div>

            {/* tabla de productos */}
            <div className={styles.tabla_container}>
                <table className="w-100">
                    <thead>
                        <tr>
                            <th>REF.</th>
                            <th>DESCRIPCIÓN</th>
                            <th>CANT.</th>
                            <th>PRECIO UNIT.</th>
                            <th>DTO.</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RTX4080-MSI</td>
                            <td>
                                <div className={styles.producto_detalle}>
                                    MSI GeForce RTX 4080 GAMING X TRIO 16GB GDDR6X
                                    <small>S/N: MSI-2024-123456</small>
                                </div>
                            </td>
                            <td>1</td>
                            <td>1.299,99 €</td>
                            <td>5%</td>
                            <td>1.234,99 €</td>
                        </tr>
                        <tr>
                            <td>RAM32-COR</td>
                            <td>
                                <div className={styles.producto_detalle}>
                                    Corsair Vengeance RGB 32GB (2x16GB) DDR4
                                    <small>S/N: COR-2024-789012</small>
                                </div>
                            </td>
                            <td>1</td>
                            <td>149,99 €</td>
                            <td>0%</td>
                            <td>149,99 €</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr className={styles.subtotal}>
                            <td colSpan="5">Subtotal</td>
                            <td>1.384,98 €</td>
                        </tr>
                        <tr className={styles.iva}>
                            <td colSpan="5">IVA (21%)</td>
                            <td>290,85 €</td>
                        </tr>
                        <tr className={styles.total}>
                            <td colSpan="5">TOTAL</td>
                            <td>1.675,83 €</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className={styles.factura_footer}>
                <div className={styles.terminos}>
                    <h4>TÉRMINOS Y CONDICIONES</h4>
                    <ul>
                        <li>Garantía de 2 años en todos los productos</li>
                        <li>14 días para devoluciones</li>
                        <li>Soporte técnico gratuito</li>
                    </ul>
                </div>
                
                <div className={styles.agradecimiento}>
                    <p>Gracias por confiar en ModTech</p>
                </div>

                <div className={styles.descargar_factura}>
                    <button className="btn btn-info" type="button">
                        <i className="fas fa-download me-2"></i>
                        Descargar Factura PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
