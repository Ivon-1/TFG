import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import styles from "./styles/productos.module.scss";
import { useFetchData } from "../../consumirAxios";
import InfiniteScroll from "react-infinite-scroll-component"; // libreria para el scroll infinito
import { useLocation, useNavigate } from "react-router-dom";

export const Productos = () => {
    const [busqueda, setBusqueda] = useState("");
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
        ? array_productos.map(({ id, nombre, descripcion, precio, url }) => {

            const oferta = array_ofertas.find(({ id_producto }) => id_producto === id);
            // si hay oferta ponmeos descuento sino 0
            const descuento = oferta?.descuento ?? 0;
            // precio con descuento
            const precioConDescuento = parseFloat(
                (precio - (precio * descuento) / 100).toFixed(2)
            );

            // retornamos el producto con los campos
            return {
                id,
                nombre,
                descripcion,
                precio,
                url,
                descuento,
                precioConDescuento,
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
                            {productosFiltrados(productosConOferta, busqueda)
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
