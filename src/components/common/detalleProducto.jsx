import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFetchData } from "../../consumirAxios";
import { Navbar } from "./navbar";
import styles from "./styles/detalleProducto.module.scss";
import { Footer } from "./footer";

export function DetalleProducto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: productos_datos, loading, error } = useFetchData('api/productos');
    const { productos = [] } = productos_datos ?? {};

    /**
     * FUNCIONES DEL NAVBAR
     */
    const producto = productos.find(p => p.id === parseInt(id));

    if (loading) return <div className="text-center p-5">Cargando...</div>;
    if (error) return <div className="text-center p-5 text-danger">Error: {error}</div>;
    if (!producto) return <div className="text-center p-5">Producto no encontrado</div>;

    return (
        <>
            <Navbar />

            <div style={{ height: '120px' }}></div> {/* separar la card */}
            <div style={{ marginTop: "350px" }} className={`container py-5 mt-5 ${styles.container}`} >
                <button
                    className="btn btn-secondary mb-4"
                    onClick={() => navigate(-1)} // ponemos -1 porque asi redirecciona a la pagina anterior
                >
                    Volver
                </button>
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={producto.url}
                            alt={producto.nombre}
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2>{producto.nombre}</h2>
                        <p className="lead">{producto.descripcion}</p>
                        <div className="my-4">
                            {producto.descuento > 0 ? (
                                <>
                                    <p className="text-muted text-decoration-line-through">
                                        Precio original: {producto.precio}€
                                    </p>
                                    <h3 className="text-danger">
                                        Precio con descuento: {producto.precioConDescuento}€
                                    </h3>
                                    <span className="badge bg-danger">
                                        {producto.descuento}% OFF
                                    </span>
                                </>
                            ) : (
                                <h3>Precio: {producto.precio}€</h3>
                            )}
                        </div>
                        <button className="btn btn-primary btn-lg">
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ height: '120px' }}></div> {/* separar la card */}
            <Footer />
        </>
    );
}