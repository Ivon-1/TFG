import { useState } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import styles from "./styles/productos.module.scss";
import imagenes_home from "../../data/imagenes_generales_home";
import { useConsumirProductos } from "../../consumirAxios";

export const Productos = () => {

    const { data: productos, error: error_productos } = useConsumirProductos();

    return <>
        <header>
            {/* header */}
            <div className="header">
                <Navbar />
            </div>
        </header>
        {/* seccion intermedia */}
        <section className={styles.seccion_intermedia}>
            <div className={styles.titulo_seccion}>
                <img src={imagenes_home.productos_color.url}
                    alt={imagenes_home.productos_color.alt} />
                <h1>Nuestros Productos</h1>
            </div>
        </section>
        {/* productos al uso */}
        <section className={styles.seccion_productos}>
            <h3 className="text-black p-2">{productos.cantidad} Productos</h3>
            <div className={styles.todos_productos}>
                {/* producto */}
                {error_productos && <p className="text-danger">{error_productos}</p>}
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <div key={producto.id} className="card_personalizada bg-dark p-3 m-3 rounded-2 position-relative">
                            {producto.descuento > 0 && (
                                <span className={styles.descuento_tag}  >{producto.descuento}%</span>
                            )}

                            <img src={producto.url}
                                className="card-img-top"
                                alt={producto.nombre}

                            />
                            <div className="card-body mt-3">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">{producto.descripcion}</p>
                                <div className={styles.total_precio}>
                                    <div>
                                        <a href="#" className="btn btn-primary">Comprar</a>
                                    </div>
                                    <div>
                                        <p>Total: {producto.precio} €</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-light text-center">Cargando productos</p>
                )}
            </div>
        </section>

        {/* footer */}
        <footer>
            <div className="footer">
                <Footer />
            </div>
        </footer>

    </>
}

export default Productos;


