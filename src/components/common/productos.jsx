import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import styles from "./styles/productos.module.scss";
import { useConsumirOfertas, useConsumirProductos } from "../../consumirAxios";
import InfiniteScroll from "react-infinite-scroll-component"; // libreria para el scroll infinito
import { useLocation, useNavigate } from "react-router-dom";

export const Productos = () => {
    const [busqueda, setBusqueda] = useState("");
    const { data: productos, error: error_productos } = useConsumirProductos();
    const { data: ofertas, error_ofertas } = useConsumirOfertas();
    const location = useLocation();
    const navigate = useNavigate();
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

    // configuramos para q al actualizar o darle a buscar salgan todos
    useEffect(() => {
        if (busquedaProductos) {
            setBusqueda(busquedaProductos);
        } else {
            setBusqueda("");
        }
    }, [busquedaProductos]);

    // Recalcular productos con oferta
    const productosConOferta =
        Array.isArray(productos) && Array.isArray(ofertas)
            ? productosFiltrados(productos, busqueda).map((producto) => {
                const oferta = ofertas.find(o => o.id_producto === producto.id);
                if (oferta) {
                    const descuento = oferta.descuento;
                    const precioConDescuento = parseFloat(
                        (producto.precio - (producto.precio * descuento / 100)).toFixed(2)
                    );
                    return {
                        ...producto,
                        descuento,
                        precioConDescuento,
                    };
                }
                return producto;
            })
            : [];

    // Función de búsqueda en el navbar (esto debería estar en el Navbar.js, pero lo dejo aquí como referencia)
    const handleBuscar = (e) => {
        e.preventDefault();
        if (busqueda.trim() !== "") {
            navigate(`/productos?search=${encodeURIComponent(busqueda)}`); // asegurmaos q el url se pase correctamente
        }
    };

    return (
        <>
            <header>
                <Navbar
                    className={styles.navbar}
                    busqueda={busqueda}
                    setBusqueda={setBusqueda}
                    handleBuscar={handleBuscar} // le pasamos para q lo q escribamos lo vaya cargando
                />
            </header>

            <section className={styles.seccion_productos}>
                <h3 className="text-black p-2">{productosConOferta.length} Productos encontrados</h3>
                {error_productos && <p className="text-danger">{error_productos}</p>}

                {productosConOferta.length > 0 ? (
                    <InfiniteScroll // componente para el infinite scroll 
                        dataLength={visible}
                        next={cargarScroll}
                        hasMore={visible < productosConOferta.length}
                        loader={<h4 className="text-light text-center">Cargando más productos...</h4>}
                        endMessage={<p className="text-light text-center">No hay más productos</p>}
                    >
                        <div className={styles.todos_productos}>
                            {productosConOferta
                                .slice(0, visible)
                                .map((producto) => (
                                    <div key={producto.id} className="card_personalizada bg-dark p-3 m-3 rounded-2 position-relative">
                                        {producto.descuento > 0 && (
                                            <span className={styles.discount}>
                                                {producto.descuento}%
                                            </span>
                                        )}
                                        <img
                                            src={producto.url}
                                            className="card-img-top p-2 w-100"
                                            alt={producto.nombre}
                                        />
                                        <div className="card-body mt-3">
                                            <h5 className="card-title">{producto.nombre}</h5>
                                            <p className="card-text">{producto.descripcion}</p>
                                            <div className="total_precio">
                                                <a href="#" className="btn btn-primary">Comprar</a>
                                                <div className="precios mt-2">
                                                    <p>Antes: {producto.precio} €</p>
                                                    {producto.descuento > 0 && (
                                                        <p className="text-danger">
                                                            Total: {producto.precioConDescuento} €
                                                        </p>
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
