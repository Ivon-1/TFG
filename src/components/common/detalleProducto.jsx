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

    const producto = productos.find(p => p.id === parseInt(id));

    // Estado para el carrito
    const [openCarrito, setOpenCarrito] = useState(false);
    const [carrito, setCarrito] = useState([]);

    // Funciones del carrito
    const handleToggleCarritoNavbar = () => setOpenCarrito(!openCarrito);
    const handleCloseCarritoNavbar = () => setOpenCarrito(false);

    const handleAddToCartLocal = (item) => {
        setCarrito(prev => {
            const existingItem = prev.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prev.map(cartItem => 
                    cartItem.id === item.id 
                        ? { ...cartItem, cantidad: cartItem.cantidad + 1 }
                        : cartItem
                );
            }
            return [...prev, { ...item, cantidad: 1 }];
        });
    };

    const handleEliminarCantidad = (itemId) => {
        setCarrito(prev => prev.filter(item => item.id !== itemId));
    };

    const handleSumarCantidad = (itemId) => {
        setCarrito(prev => prev.map(item => 
            item.id === itemId 
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        ));
    };

    const handleRestarCantidad = (itemId) => {
        setCarrito(prev => prev.map(item => 
            item.id === itemId 
                ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
                : item
        ));
    };

    // Estado para la búsqueda
    const [busqueda, setBusqueda] = useState('');

    if (loading) return <div className="text-center p-5">Cargando...</div>;
    if (error) return <div className="text-center p-5 text-danger">Error: {error}</div>;
    if (!producto) return <div className="text-center p-5">Producto no encontrado</div>;

    return (
        <>
            <Navbar 
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                handleToggleCarritoNavbar={handleToggleCarritoNavbar}
                handleCloseCarritoNavbar={handleCloseCarritoNavbar}
                handleAddToCartLocal={handleAddToCartLocal}
                handleEliminarCantidad={handleEliminarCantidad}
                handleSumarCantidad={handleSumarCantidad}
                handleRestarCantidad={handleRestarCantidad}
                openCarrito={openCarrito}
                carrito={carrito}
            />

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
                        <button 
                            className="btn btn-primary btn-lg"
                            onClick={() => handleAddToCartLocal(producto)}
                        >
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