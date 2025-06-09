import { use, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFetchData, useFetchResenas } from "../../consumirAxios";
import { Navbar } from "./navbar";
import styles from "./styles/detalleProducto.module.scss";
import { Footer } from "./footer";
import axios from "axios";
import env from "../../env";

export function DetalleProducto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: productos_datos, loading, error } = useFetchData('api/productos');
    const { data: resenas_datos, loading: loadingResenas, error: errorResenas } = useFetchResenas(id);
    const { productos = [] } = productos_datos ?? {};


    // reseñas
    const resenas = resenas_datos?.reseña ?? []; // accedemos con los ? para que no de error si no hay
    const [nuevaResena, setNuevaResena] = useState('');
    const [nuevaValoracion, setNuevaValoracion] = useState(5);

    const producto = productos.find(p => p.id === parseInt(id));
    // funcionalidad reseñas
    const [valoracionPromedio, setValoracionPromedio] = useState(0);
    const [totalOpiniones, setTotalOpiniones] = useState(0);

    /**
     * funciones para likes y dislikes
     */
    // estado local para likes y dislikes
    const [estadoResenas, setEstadoResenas] = useState([]);

    useEffect(() => {
        const resenasStorage = localStorage.getItem(`resenas_producto_${id}`);
        if (resenasStorage) {
            const resenasGuardadas = JSON.parse(resenasStorage);
            setEstadoResenas(resenasGuardadas);
            
            // Actualizar valoraciones y total
            if (resenasGuardadas.length > 0) {
                const totalValoraciones = resenasGuardadas.reduce((sum, resena) => sum + resena.valoracion, 0);
                const promedio = totalValoraciones / resenasGuardadas.length;
                setValoracionPromedio(promedio);
                setTotalOpiniones(resenasGuardadas.length);
            }
        } else if (resenas && resenas.length > 0) {
            const resenasConContadores = resenas.map(resena => ({
                ...resena,
                contador_likes: resena.contador_likes || 0,
                contador_dislikes: resena.contador_dislikes || 0
            }));
            setEstadoResenas(resenasConContadores);
            localStorage.setItem(`resenas_producto_${id}`, JSON.stringify(resenasConContadores));

            // Actualizar valoraciones y total inicial
            const totalValoraciones = resenasConContadores.reduce((sum, resena) => sum + resena.valoracion, 0);
            const promedio = totalValoraciones / resenasConContadores.length;
            setValoracionPromedio(promedio);
            setTotalOpiniones(resenasConContadores.length);
        }
    }, [resenas, id]);

    /**
     * funciones relacionadas con desplegar formulari de reseñas y añadirlas
     */
    const [openFormulario, setOpenFormulario] = useState(false);

    /**
     * abrir formulario de reseñas
     */
    const handleOpenFormulario = () => {
        setOpenFormulario(prev => !prev);
    }

    const handleSubmitResena = async () => {
        if (!nuevaResena.trim()) {
            alert('Por favor, escribe una opinión');
            return;
        }

        try {
            const datosResena = {
                id_producto: parseInt(id),
                valoracion: nuevaValoracion,
                descripcion: nuevaResena,
                contador_likes: 0,
                nombre: 'Usuario Anónimo'
            };

            console.log('Enviando reseña:', datosResena);

            const response = await axios.post(env.url_produccion + 'api/resena/store', datosResena);

            console.log('Respuesta del servidor:', response.data);

            if (response.data) {
                const nuevaResenaObj = {
                    id: response.data.id ?? Date.now(),
                    id_producto: parseInt(id),
                    valoracion: nuevaValoracion,
                    descripcion: nuevaResena,
                    nombre: 'Usuario Anónimo',
                    contador_likes: 0,
                    contador_dislikes: 0,
                    created_at: new Date().toISOString()
                };
                
                setEstadoResenas(prevResenas => {
                    const resenasActualizadas = [...prevResenas, nuevaResenaObj]; // añadimos la nueva reseña al array de reseñas
                    localStorage.setItem(`resenas_producto_${id}`, JSON.stringify(resenasActualizadas));

                    // Actualizar valoraciones y total
                    const totalValoraciones = resenasActualizadas.reduce((sum, resena) => sum + resena.valoracion, 0);
                    const promedio = totalValoraciones / resenasActualizadas.length; // calculamos el promedio y lo mostramos
                    setValoracionPromedio(promedio);
                    setTotalOpiniones(resenasActualizadas.length);

                    return resenasActualizadas;
                });

                setNuevaResena('');
                setNuevaValoracion(5);
                setOpenFormulario(false);
            }
        } catch (error) {
            console.error('Error al guardar la reseña:', error);
            alert('Error al guardar la reseña: ' + (error.response?.data?.message || 'Error al crear la reseña'));
        }
    };

    const handleLike = (resenaId) => {
        setEstadoResenas(prev => {
            const resenasActualizadas = prev.map(resena => {
                if (resena.id === resenaId && resena.id_producto === parseInt(id)) {
                    return { ...resena, contador_likes: resena.contador_likes + 1 };
                }
                return resena;
            });
            localStorage.setItem(`resenas_producto_${id}`, JSON.stringify(resenasActualizadas));
            return resenasActualizadas;
        });
    };

    const handleDislike = (resenaId) => {
        setEstadoResenas(prev => {
            const resenasActualizadas = prev.map(resena => {
                if (resena.id === resenaId && resena.id_producto === parseInt(id)) {
                    return { ...resena, contador_dislikes: resena.contador_dislikes + 1 };
                }
                return resena;
            });
            localStorage.setItem(`resenas_producto_${id}`, JSON.stringify(resenasActualizadas));
            return resenasActualizadas;
        });
    };



    // estado para la búsqueda
    const [busqueda, setBusqueda] = useState('');
    // estado para el carrito
    const [openCarrito, setOpenCarrito] = useState(false);
    const [carrito, setCarrito] = useState(() => {
        const carritoStorage = localStorage.getItem('carrito');
        return carritoStorage ? JSON.parse(carritoStorage) : [];
    });

    // funciones del carrito
    const handleToggleCarritoNavbar = () => setOpenCarrito(!openCarrito);
    const handleCloseCarritoNavbar = () => setOpenCarrito(false);

    /**
     * 
     * @param {añadir carrito y productos al mismo} item 
     */
    const handleAddToCartLocal = (item) => {
        setCarrito(prev => {
            const itemExistente = prev.find(cartItem => cartItem.id === item.id);
            let nuevoCarrito;

            // aseguramos que el precio con descuento realmente existe
            const productoParaCarrito = {
                ...item,
                precioConDescuento: item.descuento > 0 ? item.precioConDescuento : item.precio,
                cantidad: 1
            };

            if (itemExistente) {
                nuevoCarrito = prev.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, cantidad: cartItem.cantidad + 1 }
                        : cartItem
                );
            } else {
                nuevoCarrito = [...prev, productoParaCarrito];
            }

            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            return nuevoCarrito;
        });
    };

    /**
     * 
     * @param {eliminar cantidad carrito } itemId 
     */
    const handleEliminarCantidad = (itemId) => {
        setCarrito(prev => prev.filter(item => item.id !== itemId));
    };

    /**
     * 
     * @param {sumar cantidad carrito} itemId 
     */
    const handleSumarCantidad = (itemId) => {
        setCarrito(prev => prev.map(item =>
            item.id === itemId
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        ));
    };

    /**
     * 
     * @param {restar cantidad carrito } itemId 
     * @returns 
     */
    const handleRestarCantidad = (itemId) => {
        setCarrito(prev => prev.map(item =>
            item.id === itemId
                ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
                : item
        ));
        localStorage.setItem('carrito', JSON.stringify(carrito));
        return nuevoCarrito;
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
                    className="btn btn-warning mb-4"
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
                        <p className="text-white">Valoracion: {valoracionPromedio.toFixed(1)} <span id="estrellas_resenas" style={{ color: 'gold', fontSize: '20px' }}>⭐</span></p>
                        <p className="text-white">Total opiniones: {totalOpiniones}</p>
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
                            className="btn btn-warning btn-lg"
                            onClick={() => {
                                handleAddToCartLocal(producto);
                                handleToggleCarritoNavbar();
                            }}
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
                                <p >{valoracionPromedio.toFixed(1)}</p>
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

                    {estadoResenas.length === 0 ? (
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
                                        <span className="fw-bold">{resena.nombre}</span>
                                        <span className="text-muted small">
                                            {new Date(resena.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div style={{ color: 'gold', fontSize: '18px' }}>
                                        {'⭐'.repeat(resena.valoracion)}{'☆'.repeat(5 - resena.valoracion)}
                                    </div>
                                    <p className="mb-0">{resena.descripcion}</p>
                                    <div className="d-flex gap-2 mt-2">
                                        <button 
                                            className="btn btn-success"
                                            onClick={() => handleLike(resena.id)}
                                        >
                                            Like {resena.contador_likes || 0}
                                        </button>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => handleDislike(resena.id)}
                                        >
                                            Dislike {resena.contador_dislikes || 0}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* dejar opinion en si mismo */}
                    <div className="opiniones_clientes">
                        <button className="btn btn-warning"
                            onClick={handleOpenFormulario}
                        >Dejar opinión</button>

                        {openFormulario && (
                            <div className="bg-white text-black rounded p-3 mt-3" style={{ width: '90%', maxWidth: '500px' }}>
                                <div className="mb-3">
                                    <label className="form-label">Valoración</label>
                                    <select
                                        className="form-select"
                                        value={nuevaValoracion}
                                        onChange={(e) => setNuevaValoracion(parseInt(e.target.value))}
                                    >
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <option key={num}
                                                value={num}>{num} {'⭐'.repeat(num)}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tu opinión</label>
                                    <textarea
                                        className="form-control"
                                        value={nuevaResena}
                                        onChange={(e) => setNuevaResena(e.target.value)}
                                        rows="3"
                                    ></textarea>
                                </div>
                                <button
                                    className="btn btn-warning"
                                    onClick={handleSubmitResena}
                                >
                                    Enviar opinión
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <div style={{ height: '120px' }}></div> {/* separar la card */}
            <Footer />
        </>
    );
}