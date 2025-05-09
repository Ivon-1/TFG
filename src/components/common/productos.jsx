import { useState } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import styles from "./styles/productos.module.scss";
import imagenes_home from "../../data/imagenes_generales_home";
import { useConsumirOfertas, useConsumirProductos } from "../../consumirAxios";

export const Productos = () => {
    const [busqueda, setBusqueda] = useState("");
    const { data: productos, error: error_productos } = useConsumirProductos();
    const { data: ofertas, error_ofertas } = useConsumirOfertas();

    const productosFiltrados = (productos, busqueda) => {
        if (!busqueda) return productos;
        return productos.filter((producto) =>
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
    };

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

    return (
        <>
            
            <header>
                <Navbar className={styles.navbar} busqueda={busqueda} setBusqueda={setBusqueda} />
            </header>

            <section className={styles.seccion_intermedia}>
                <div className={styles.titulo_seccion}>
                    <img src={imagenes_home.productos_color.url}
                        alt={imagenes_home.productos_color.alt} />
                    <h1>Nuestros Productos</h1>
                </div>
            </section>

            <section className={styles.seccion_productos}>
                <h3 className="text-black p-2">{productosConOferta.length} Productos encontrados</h3>
                <div className={styles.todos_productos}>
                    {error_productos && <p className="text-danger">{error_productos}</p>}
                    {productosConOferta.length > 0 ? (
                        productosConOferta.reverse().map((producto) => (
                            <div key={producto.id} className="card_personalizada bg-dark p-3 m-3 rounded-2 position-relative">
                                {producto.descuento > 0 && (
                                    <span className={styles.discount}>
                                        {producto.descuento}%
                                    </span>
                                )}
                                <img src={producto.url}
                                    className="card-img-top p-2"
                                    alt={producto.nombre} />

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
                        ))
                    ) : (
                        <p className="text-light text-center">No se encontraron productos</p>
                    )}
                </div>
            </section>

            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default Productos;
