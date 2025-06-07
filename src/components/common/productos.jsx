import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import styles from "./styles/productos.module.scss";
import "./styles/discount.css";
import { useFetchData } from "../../consumirAxios";
import InfiniteScroll from "react-infinite-scroll-component"; // libreria para el scroll infinito
import { useLocation, useNavigate } from "react-router-dom";
import { DetalleProducto } from "./detalleProducto";

export const Productos = () => {
    const [busqueda, setBusqueda] = useState("");
    const [categoriaElegida, setCategoriaElegida] = useState("");
    const [openCarrito, setOpenCarrito] = useState(false);

    // Estado del carrito con carga inicial desde localStorage
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });

    const location = useLocation();
    const navigate = useNavigate();

    /**
     * obtenemos productos y ofertas
     */
    const { data: productos_datos, loading: loading_productos, error: error_productos } = useFetchData('api/productos');
    const { data: ofertas_datos, loading: loading_ofertas, error: error_ofertas } = useFetchData('api/ofertas');
    /** 
    * desestructuramos los arrays para poder mostrar correctamente los productos
    */
    const { productos: array_productos = [] } = productos_datos ?? {};
    const { ofertas: array_ofertas = [] } = ofertas_datos ?? {};

    // scroll infinito
    const [visible, setVisible] = useState(12);

    const cargarScroll = () => {
        setVisible((prev) => prev + 12);
    }
    // obtenemos valor url
    const parametros = new URLSearchParams(location.search);
    const busquedaProductos = parametros.get("search");

    // Filtrar productos según la búsqueda
    const productosFiltrados = (productos, busqueda) => {
        if (!busqueda) return productos;
        return productos.filter((producto) =>
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
    };

    /**
     * Filtrar productos por categoria
     */
    const handleChangeCategoria = (e) => {
        setCategoriaElegida(e.target.value);
    };

    // Funciones del carrito
    const handleAddToCartLocal = (producto) => {
        const nuevoProducto = {
            ...producto,
            precioConDescuento: producto.precioConDescuento || producto.precio,
            url: producto.url, // Mantener la URL original sin modificar
            cantidad: 1
        };

        setCarrito(prev => {
            const nuevoCarrito = [...prev, nuevoProducto];
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            return nuevoCarrito;
        });
        setOpenCarrito(true);
    };

    const eliminarDelCarrito = (productoId) => {
        setCarrito(prev => {
            const nuevoCarrito = prev.filter(item => item.id !== productoId);
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            return nuevoCarrito;
        });
    };

    const incrementarCantidad = (productoId) => {
        setCarrito(prev => {
            const nuevoCarrito = prev.map(item => {
                if (item.id === productoId) {
                    return {
                        ...item,
                        cantidad: item.cantidad + 1
                    };
                }
                return item;
            });
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            return nuevoCarrito;
        });
    };

    const decrementarCantidad = (productoId) => {
        setCarrito(prev => {
            const nuevoCarrito = prev.map(item => {
                if (item.id === productoId && item.cantidad > 1) {
                    return {
                        ...item,
                        cantidad: item.cantidad - 1
                    };
                }
                return item;
            });
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            return nuevoCarrito;
        });
    };

    // filtrar por categoria
    const filtrarPorCategoria = (productos, categoriaId) => {
        if (!categoriaId) return productos;
        return productos.filter((producto) => BigInt(producto.id_categoria) === BigInt(categoriaId)); // convertimos valor a bigint
    };

    // funcion para filtrar productos por categoria y busqueda
    const productosFiltradosCategoria = () => {
        let productos = productosConOferta;

        if (categoriaElegida) {
            productos = filtrarPorCategoria(productos, categoriaElegida);
        }

        if (busqueda) {
            productos = productosFiltrados(productos, busqueda);
        }
        return productos;
    }



    // configuramos para q al actualizar o darle a buscar salgan todos
    useEffect(() => {
        if (busquedaProductos) {
            setBusqueda(busquedaProductos);
        } else {
            setBusqueda("");
        }
    }, [busquedaProductos]);

    // filtrar productos que tienen oferta
    const productosConOferta = Array.isArray(array_productos) && Array.isArray(array_ofertas)
        ? array_productos.map(producto => {
            const oferta = array_ofertas.find(oferta => oferta.id === producto.id_oferta);
            const ahora = new Date();

            let descuento = 0;
            let precioConDescuento = producto.precio;

            if (oferta) {
                const inicio = new Date(oferta.fecha_inicio);
                const fin = new Date(oferta.fecha_fin);

                if (ahora >= inicio && ahora <= fin) {
                    descuento = oferta.descuento;
                    precioConDescuento = parseFloat(
                        (producto.precio - (producto.precio * descuento) / 100).toFixed(2)
                    );
                }
            }

            return {
                ...producto,
                descuento,
                precioConDescuento
            };
        })
        : [];

    // funcion busqueda navbar
    const handleBuscar = (e) => {
        e.preventDefault();
        if (busqueda.trim() !== "") {
            navigate(`/productos?search=${encodeURIComponent(busqueda)}`); // asegurmaos q el url se pase correctamente
        }

        if (loading_productos) {
            return <p className="text-light text-center">Cargando productos y ofertas ...</p>
        }
    };

    return (
        <>
            <header>
                <Navbar
                    className={styles.navbar}
                    busqueda={busqueda}
                    setBusqueda={setBusqueda}
                    handleToggleCarritoNavbar={() => setOpenCarrito(true)}
                    handleCloseCarritoNavbar={() => setOpenCarrito(false)}
                    handleAddToCartLocal={handleAddToCartLocal}
                    handleEliminarCantidad={eliminarDelCarrito}
                    handleSumarCantidad={incrementarCantidad}
                    handleRestarCantidad={decrementarCantidad}
                    openCarrito={openCarrito}
                    carrito={carrito}
                    handleBuscar={handleBuscar} // le pasamos para q lo q escribamos lo vaya cargando
                />
            </header>

            {/* filtro por categorias */}
            <div className={styles.filtrarPorCategoria}>
                <select class="form-select"
                    aria-label="Default select example"
                    onChange={handleChangeCategoria}
                    value={categoriaElegida.toString()}>
                    <option value="" selected className="text-center">Seleccionar categoria</option>
                    <option value="1">Ordenadores</option>
                    <option value="2">Portatiles</option>
                    <option value="3">Telefonos</option>
                    <option value="4">Consolas</option>
                </select>
            </div>


            <section className={styles.seccion_productos}>
                <h3 className="text-black p-2">{productosConOferta.length} Productos encontrados</h3>
                {error_productos && <p className="text-danger">{error_productos}</p>}

                {productosConOferta.length > 0 ? (
                    <InfiniteScroll // componente para el infinite scroll a la hora de cargar productos
                        dataLength={visible}
                        next={cargarScroll}
                        hasMore={visible < productosConOferta.length}
                        loader={<h4 className="text-light text-center">Cargando más productos...</h4>}
                        endMessage={<p className="text-light text-center">No hay más productos</p>}
                    >
                        <div className={styles.todos_productos}>
                            {productosFiltradosCategoria()
                                .slice(0, visible)
                                .map((producto) => (
                                    <div key={producto.id} className="card_personalizada bg-dark p-3 m-3 rounded-2 position-relative">
                                        {producto.descuento > 0 && (
                                            <span className="discount">
                                                {producto.descuento}%
                                            </span>
                                        )}
                                        <img
                                            src={producto.url}
                                            className="card-img-top p-2 w-100"
                                            alt={producto.nombre}
                                            onClick={() => navigate(`/producto/${producto.id}`, {
                                                state: {
                                                   
                                                }
                                            })}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <div className="card-body mt-3">
                                            <h5 className="card-title">{producto.nombre}</h5>
                                            <p className="card-text">{producto.descripcion}</p>
                                            <div className="total_precio">
                                                <button onClick={() => handleAddToCartLocal(producto)} href="#" className="btn btn-primary">Comprar</button>
                                                <div className="precios mt-2">
                                                    {producto.descuento > 0 ? (
                                                        <>
                                                            <p>Antes: {producto.precio} € </p>
                                                            <p className="text-danger">Total: {producto.precioConDescuento} € </p>
                                                        </>
                                                    ) : (
                                                        <p>Total: {producto.precio} € </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </InfiniteScroll>
                ) : (
                    <p className="text-light text-center">No se encontraron productos</p>
                )}
            </section>

            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default Productos;
