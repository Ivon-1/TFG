import { useState } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import  styles from "./styles/productos.module.scss";
import imagenes_home from "../../data/imagenes_generales_home";

export const Productos = () => {
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
        {/* footer */}
        <footer>
            <div className="footer">
                <Footer />
            </div>
        </footer>

    </>
}

export default Productos;


