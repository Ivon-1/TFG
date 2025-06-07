import { use, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFetchData, useFetchResenas } from "../../consumirAxios";
import { Navbar } from "./navbar";
import styles from "./styles/detalleProducto.module.scss";
import { Footer } from "./footer";

export function DetalleProducto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: productos_datos, loading, error } = useFetchData('api/productos');
    const { data: resenas_datos, loading: loadingResenas, error: errorResenas } = useFetchResenas(id);
    const { productos = [] } = productos_datos ?? {};
    // reseñas
    const resenas = resenas_datos?.reseña ?? []; // accedemos con los ? para que no de error si no hay

    const producto = productos.find(p => p.id === parseInt(id));
    // funcionalidad reseñas
    const valoracionPromedio = resenas.length > 0
        ? (resenas.reduce((acc, r) => acc + r.valoracion, 0) / resenas.length).toFixed(1)
        : "No hay valoraciones";

    /**
     * funcion para likes y dislikes
     */
    // estado local para likes y dislikes
    const [estadoResenas, setEstadoResenas] = useState([]);

    useEffect(() => {
        if (resenas && resenas.length > 0) {
            setEstadoResenas(resenas);
        }
    }, [resenas]);

    const handleLike = (id) => {
        setEstadoResenas(prev => prev.map(resena => resena.id === id  ? 
            {...resena, contador_likes: resena.contador_likes + 1} : resena))
    }

    const handleDislike = (id) => {
        setEstadoResenas(prev => prev.map(resena => resena.id === id ? 
            {...resena, contador_dislikes: resena.contador_dislikes + 1} : resena));
    }



    // estado para la búsqueda
    const [busqueda, setBusqueda] = useState('');
    // estado para el carrito
    const [openCarrito, setOpenCarrito] = useState(false);
    const [carrito, setCarrito] = useState([]);

    // funciones del carrito
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



    /**
     * errores generales
     */
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
            <div style={{ marginTop: "350px" }} className={`container py-5 mt-5  ${styles.container}`} >
                <button
                    className="btn btn-secondary mb-4"
                    onClick={() => navigate(-1)} // ponemos -1 porque asi redirecciona a la pagina anterior
                >
                    Volver
                </button>
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-6">
                        <img
                            src={producto.url}
                            alt={producto.nombre}
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-6 mt-2 ">
                        <h2>{producto.nombre}</h2>
                        <p className="text-white">Valoracion: {valoracionPromedio} <span id="estrellas_resenas" style={{ color: 'gold', fontSize: '20px' }}>⭐</span></p>
                        <p className="text-white">Total opiniones: {resenas.length}</p>
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

                        {/* envio, devolucion, vendido etc*/}
                        <div className="mt-4 ">
                            <div>Envío: Gratis</div>
                            <div>Devolucion: Gratis</div>
                            <div>Vendido y enviado por: ModTech </div>
                        </div>
                    </div>

                    {/* reseñas anonimas  */}
                    <div className="anonimo text-white mt-4">
                        <h3 className="text-center">Opiniones de clientes</h3>
                        <div className="text-white d-flex align-items-center justify-content-center gap-2 gap-md-4 text-center">
                            <div className="bg-white text-black col-md-6 mt-2"
                                style={{ height: '80px', width: '250px' }}>
                                <p >{valoracionPromedio}</p>
                                <p>{[...Array(Math.max(0, Math.floor(valoracionPromedio) || 0))].map((_, i) => (
                                    <span key={i} style={{ color: 'gold', fontSize: '20px' }}>⭐</span>
                                ))}</p>
                            </div>
                            <div className="bg-white text-black col-md-6 mt-2"
                                style={{ height: '80px', width: '250px' }}>
                                <p>100%</p>
                                <p>Recomendado</p>
                            </div>
                        </div>
                    </div>

                    {resenas.length === 0 ? (
                        <p className="text-center mt-3">Aún no hay reseñas para este producto.</p>
                    ) : (
                        <div className="mt-4 d-flex flex-column align-items-center">
                            {estadoResenas.map((resena) => (
                                <div
                                    key={resena.id}
                                    className="bg-white text-black rounded p-3 mb-3"
                                    style={{ width: '90%', maxWidth: '500px' }}
                                >
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-bold">Usuario anónimo</span>
                                        <span className="text-muted small">
                                            {new Date(resena.created_at).toLocaleDateString()} {/* convierte date a string */}
                                        </span>
                                    </div>
                                    <div style={{ color: 'gold', fontSize: '18px' }}>
                                        {'⭐'.repeat(resena.valoracion)}{'☆'.repeat(5 - resena.valoracion)} {/* 5 es el numero de estrellas - valoracion que hay */}
                                    </div>
                                    <p className="mb-0">{resena.descripcion}</p>

                                    <div className="d-flex gap-2 mt-2">
                                        <button className="btn btn-success"
                                            onClick={() => handleLike(resena.id)}>Like {resena.contador_likes}
                                            {console.log('like pulsado con exito')}</button>
                                        <button className="btn btn-danger"
                                            onClick={() => handleDislike(resena.id)}>Dislike</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* dejar opinion en si mismo */}
                    <div className="opiniones_clientes">

                    </div>
                </div>

            </div>
            <div style={{ height: '120px' }}></div> {/* separar la card */}
            <Footer />
        </>
    );
}