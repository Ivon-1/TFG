import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/facturas.module.scss";
import todas_imagenes from "../../data/imagenes";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function FacturasComp({detallesCompra, productos, total}) {
    const fecha = new Date().toLocaleDateString();
    // genera el año actual, un numero aleatorio entre 0 y 1000000
    const numeroFactura = `MOD-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000)}`;
    // calculamos iva y subtotal
    const iva = total * 0.21;
    const subtotal = total - iva;

    // funcion para generar factura en pdf
    const generarFacturaPdf = async () => {
        try {
            const element = document.getElementById('factura-pdf');
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: true
            });
            
            const pdf = new jsPDF('p', 'mm', 'a4'); // formato de pagina 
            const imgData = canvas.toDataURL('image/png'); // convertimos el canvas a imagen
            const imgProps = pdf.getImageProperties(imgData); // obtenemos las propiedades de la imagen
            const pdfWidth = pdf.internal.pageSize.getWidth(); // obtenemos el ancho de la pagina
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width; // calculamos la altura de la imagen
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); // añadimos la imagen al pdf
            pdf.save(`factura-${numeroFactura}.pdf`); // guardamos el pdf
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        }
    };

    
    }

    return (
        <div className={styles.facturas} id="factura-pdf">
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
                        <p><strong>Nº Factura:</strong> {numeroFactura}</p>
                        <p><strong>Fecha:</strong> {fecha}</p>
                        <p><strong>Método de pago:</strong> PayPal</p>
                    </div>
                </div>
            </div>

            {/* datos cliente. PAYER viene de la aplicacion de paypal para poder acceder a las propiedades */}
            <div className={styles.datos_compra}>
                <div className={styles.cliente_info}>
                    <h3>DATOS DEL CLIENTE</h3>
                    <div className={styles.cliente_detalles}>
                        <p><strong>Cliente:</strong> {detallesCompra?.payer?.name?.given_name} {detallesCompra?.payer?.name?.surname}</p>
                        <p><strong>Email:</strong> {detallesCompra?.payer?.email_address}</p>
                        {detallesCompra?.payer?.address && (
                            <p><strong>Dirección:</strong> {`${detallesCompra.payer.address.address_line_1}, ${detallesCompra.payer.address.admin_area_2}`}</p>
                        )}
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
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>
                                    <div className={styles.producto_detalle}>
                                        {producto.nombre}
                                        <small>REF: {producto.id}</small>
                                    </div>
                                </td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.precio.toFixed(2)} €</td>
                                <td>{producto.descuento || 0}%</td>
                                <td>{(producto.precioConDescuento * producto.cantidad).toFixed(2)} €</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className={styles.subtotal}>
                            <td colSpan="5">Subtotal</td>
                            <td>{subtotal.toFixed(2)} €</td>
                        </tr>
                        <tr className={styles.iva}>
                            <td colSpan="5">IVA (21%)</td>
                            <td>{iva.toFixed(2)} €</td>
                        </tr>
                        <tr className={styles.total}>
                            <td colSpan="5">TOTAL</td>
                            <td>{total.toFixed(2)} €</td>
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
                    <button className="btn btn-info" 
                    type="button"
                    onClick={generarFacturaPdf}>
                        <i className="fas fa-download me-2"></i>
                        Descargar Factura PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
