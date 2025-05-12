import { useEffect, useState } from "react";
import React from 'react';
import './styles/home.css';
import styles from '../../components/common/styles/productos.module.css';
import { Navbar } from "../../components/common/navbar";
import { Footer } from "../../components/common/footer";
import imagenes_home from "../../data/imagenes_generales_home";
import ofertas_home from "../../data/ofertas_home";
import productos_mas_vendidos from "../../data/productos_mas_vendidos";
import imagenes_blog from "../../data/informacion_blog";
import todas_marcas from "../../data/marcas_colaboradoras";
import { Facturas } from "../facturas/facturas";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useConsumirProductos, useConsumirPorNombre } from "../../consumirAxios";
import { useConsumirOfertas } from "../../consumirAxios";

export function Home() {
    /**
     * seccion de ofertas
     */
    const { data: productos, error: error_productos } = useConsumirProductos();
    const { data: ofertas, error_ofertas } = useConsumirOfertas();
    /**
     * filtro de productos
     */
    const [busqueda, setBusqueda] = useState("");
    // obtener todos los productos tengan oferta o no 
    const productosConOferta = Array.isArray(productos) && Array.isArray(ofertas)
        && productos.length > 0
        && ofertas.length > 0
        ? productos
            // filtramos los productos en funcion de si tienen oferta o no y mostramos solo los q tienen oferta
            .filter(producto => ofertas.some(oferta => oferta.id_producto === producto.id))
            .map(producto => {
                const oferta = ofertas.find(oferta => oferta.id_producto === producto.id);
                const descuento = oferta.descuento;
                const precioConDescuento = parseFloat( // parseamos directamente porque tofixed devuelve string y usamos tofixed para limitarlo a 2 decimales
                    (producto.precio - (producto.precio * descuento / 100)).toFixed(2)
                );

                return {
                    ...producto,
                    descuento,
                    precioConDescuento
                };
            })
        : [];

    return <>


        <div className="navbar">
            {/* menu de opciones */}
            <Navbar busqueda={busqueda} setBusqueda={setBusqueda}/>
            {/* carousel de imagenes principal */}
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={imagenes_home.ordenador_torre.url}
                            className="d-block w-100"
                            alt={imagenes_home.ordenador_torre.nombre}></img>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Odyssey Xtreme 5000</h5>
                            <p>El Odyssey Xtreme 5000 redefine el poder y la eficiencia. Con su innovador diseño y rendimiento de última generación, este ordenador de torre está diseñado para ofrecer una experiencia inigualable.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={imagenes_home.ordenador_torre2.url}
                            className="d-block w-100"
                            alt={imagenes_home.ordenador_torre2.nombre}></img>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Razer Viper Pro 9000</h5>
                            <p>El Razer Viper Pro 9000 fusiona el diseño elegante con la potencia sin límites. Equipado con la última tecnología de refrigeración y una tarjeta gráfica impresionante, es la máquina ideal para gamers y creadores de contenido que buscan un rendimiento constante y fluido, sin comprometer el estilo o la funcionalidad.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={imagenes_home.ordenador_torre3.url}
                            className="d-block w-100"
                            alt={imagenes_home.ordenador_torre3.nombre}></img>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Corsair Phantom 7000</h5>
                            <p>Con el Corsair Phantom 7000, cada tarea se convierte en un desafío emocionante. Este ordenador de torre lleva la velocidad y el diseño modular a un nivel completamente nuevo, ofreciendo un rendimiento sobresaliente para gaming y multitarea intensiva. Su estructura robusta y la integración perfecta de componentes hacen de él el compañero ideal para usuarios exigentes.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>

        {/* categorias destacadas*/}
        <h2 className="text-center m-2 p-2 text-black bg-dark text-white p-2">Categorías destacadas</h2>
        <div className="tarjetas_categorias">
            {/* categorias ordenador sobremesa */}
            <div className="card" >
                <img src={imagenes_home.categoria_monitores.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_monitores.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-info text-white">Sobremesa</a>
                </div>
            </div>

            {/* categorias portatiles */}
            <div className="card" >
                <img src={imagenes_home.categoria_televisiones.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_televisiones.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-info text-white">Portátiles</a>
                </div>
            </div>

            {/* categorias moviles */}
            <div className="card" >
                <img src={imagenes_home.categoria_moviles.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_moviles.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-info text-white">Teléfonos</a>
                </div>
            </div>

            {/* categoria consolas */}
            <div className="card" >
                <img src={imagenes_home.categoria_consolas.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_consolas.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-info text-white">Consola</a>
                </div>
            </div>

        </div>

        {/* seccion precio especial */}
        <section className="seccion_precio text-center">
            <div className="precio_especial">
                <img src={imagenes_home.categoria_ofertas.url}
                    alt={imagenes_home.categoria_ofertas.alt} />
            </div>
        </section>

        {/* seccion ofertas */}
        <section className="seccion_ofertas">
            <h3 className="text-center bg-danger text-white text-uppercase mt-2 p-2">Ofertas</h3>
            <div className="todas_ofertas">
                {/* oferta uno */}
                {error_productos && <p className="text-danger">{error_productos}</p>}
                {productosConOferta.length > 0 ? (
                    productosConOferta.map((producto) => (
                        <div key={producto.id} className="card_personalizada bg-dark p-3 m-3 rounded-2 position-relative">
                            {producto.descuento > 0 && (
                                <span className="discount-tag">{producto.descuento}%</span>
                            )}

                            <img src={producto.url}
                                className="card-img-top p-2"
                                alt={producto.nombre}

                            />
                            <div className="card-body mt-3">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">{producto.descripcion}</p>
                                <div className="total_precio">
                                    <a href="#" className="btn btn-primary">Comprar</a>
                                    <p>Total: {producto.precioConDescuento} €</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-light text-center">Cargando productos en oferta</p>
                )}
            </div>
        </section >

        {/* SECCION PRODUCTOS MAS VENDIDOS */}
        <section className="productos_mas_vendidos">
            <h3 className="text-center bg-dark p-2 mt-2">Productos más vendidos</h3>
            <div className="todo_mas_vendido">
                {/* oferta uno */}
                {error_productos && <p className="text-danger">{error_productos}</p>}
                {productosConOferta.length > 0 ? (
                    productosConOferta.reverse().map((producto) => (
                        <div key={producto.id} className="card_personalizada bg-dark p-3 m-3 rounded-2 position-relative">
                            {producto.descuento > 0 && (
                                <span className="discount-tag_vendido">{producto.descuento}%</span>
                            )}

                            <img src={producto.url}
                                className="card-img-top"
                                alt={producto.nombre}

                            />
                            <div className="card-body mt-3">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">{producto.descripcion}</p>
                                <div className="total_precio">
                                    <a href="#" className="btn btn-primary">Comprar</a>
                                    <p>Total: {producto.precioConDescuento || producto.precio} €</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-light text-center">Cargando productos en oferta</p>
                )}
            </div>
        </section>


        {/* seccion de nuestro blog */}
        <h3 className="text-center bg-dark p-2">Nuestros blogs</h3>
        <section className="nuestro_blog">
            <div id="carouselExample" class="carousel slide">
                {/* carousel uno */}
                <h3 className="titulo_tercer_carousel text-center bg-dark p-2">Informática</h3>
                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <a href="https://planderecuperacion.gob.es/noticias/que-es-inteligencia-artificial-ia-prtr"
                            target="blank">
                            <img src={imagenes_blog.blog_uno.url}
                                className="d-block w-100"
                                alt={imagenes_blog.blog_uno.alt}
                            /></a>
                    </div>

                    <div className="carousel-item">
                        <a href="https://www.intel.la/content/www/xl/es/processors/processor-numbers.html"
                            target="blank">
                            <img src={imagenes_blog.blog_tres.url}
                                className="d-block w-100"
                                alt={imagenes_blog.blog_tres.alt} />
                        </a>

                    </div>
                    <a href="">
                        <div className="carousel-item">
                            <a href="https://www.xataka.com/basics/que-vibe-coding-que-ventajas-desventajas-ofrece-este-concepto-programar-usando-inteligencia-artificial"
                                target="blank">
                                <img src={imagenes_blog.blog_cuatro.url}
                                    className="d-block w-100"
                                    alt={imagenes_blog.blog_cuatro.url} />
                            </a>
                        </div>
                    </a>

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* carousel dos */}
            <div id="carouselBlog2" class="carousel slide">
                <h3 className="titulo_tercer_carousel text-center bg-dark p-2">Productos</h3>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <a href="https://www.xataka.com/tag/nvidia"
                            target="blank">
                            <img src={imagenes_blog.blog_dos.url}
                                className="d-block w-100"
                                alt={imagenes_blog.blog_dos.alt} />
                        </a>

                    </div>
                    <div className="carousel-item">
                        <a href="https://www.eleconomista.es/compras/noticias/12694255/02/24/mejores-ordenadores-portatiles.html"
                            target="blank">
                            <img src={imagenes_blog.blog_cinco.url}
                                className="d-block w-100"
                                alt={imagenes_blog.blog_cinco.alt} />
                        </a>

                    </div>
                    <div className="carousel-item">
                        <a href="https://www.xataka.com/basics/tarjeta-grafica-que-que-hay-dentro-como-funciona"
                            target="blank">
                            <img src={imagenes_blog.blog_seis.url}
                                className="d-block w-100"
                                alt={imagenes_blog.blog_seis.alt} />
                        </a>

                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselBlog2" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselBlog2" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* carousel tres */}
            <div id="carouselBlog3" class="carousel slide">
                <h3 className="titulo_tercer_carousel text-center bg-dark p-2">Componentes</h3>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <a href="https://www.xataka.com/tag/nvidia"
                            target="blank">
                            <img src={imagenes_blog.blog_siete.url}
                                className="d-block w-100"
                                alt={imagenes_blog.blog_siete.alt} />
                        </a>

                    </div>
                    <div className="carousel-item">
                        <a href="https://toptecladosgaming.com/mejores-teclados-msi/"
                            target="blank">
                            <img src={imagenes_blog.blog_ocho.url}
                                className="d-block w-100"
                                alt={imagenes_blog.blog_ocho.alt} />
                        </a>

                    </div>
                    <div className="carousel-item">
                        <a href="https://www.xataka.com/basics/tarjeta-grafica-que-que-hay-dentro-como-funciona"
                            target="blank">
                            <img src={imagenes_blog.blog_nueve.url}
                                className="d-block w-100"
                                alt={imagenes_blog.blog_nueve.alt} />
                        </a>

                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselBlog3" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselBlog3" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </section>
        {/* nuestras marcas */}
        <section className="nuestras_marcas">
            <h3 className="text-center bg-dark text-white p-3">NUESTRAS MARCAS</h3>
            <div className="marcas">
                {/* AMD */}
                <div className="amd">
                    <img src={todas_marcas.amd.url}
                        alt={todas_marcas.amd.alt} />
                </div>
                {/* acer */}
                <div className="acer">
                    <img src={todas_marcas.acer.url}
                        alt={todas_marcas.acer.alt} />
                </div>
                {/* aoc */}
                <div className="aoc">
                    <img src={todas_marcas.aoc.url}
                        alt={todas_marcas.aoc.alt} />
                </div>
                {/* intel */}
                <div className="intel">
                    <img src={todas_marcas.intel.url}
                        alt={todas_marcas.intel.alt} />
                </div>
                {/* corsair */}
                <div className="corsair">
                    <img src={todas_marcas.corsair.url}
                        alt={todas_marcas.corsair.alt} />
                </div>
                {/* corsair */}
                <div className="msi">
                    <img src={todas_marcas.msi.url}
                        alt={todas_marcas.msi.alt} />
                </div>
                {/* lenovo */}
                <div className="lenovo">
                    <img src={todas_marcas.lenovo.url}
                        alt={todas_marcas.lenovo.alt} />
                </div>
                {/* asRock */}
                <div className="asRock">
                    <img src={todas_marcas.asRock.url}
                        alt={todas_marcas.asRock.alt} />
                </div>
                {/* apple */}
                <div className="apple">
                    <img src={todas_marcas.apple.url}
                        alt={todas_marcas.apple.alt} />
                </div>
                {/* nvidia */}
                <div className="nvidia">
                    <img src={todas_marcas.nvidia.url}
                        alt={todas_marcas.nvidia.alt} />
                </div>
                {/* kingston */}
                <div className="kingston">
                    <img src={todas_marcas.kingston.url}
                        alt={todas_marcas.kingston.alt} />
                </div>
                {/* hp */}
                <div className="hp">
                    <img src={todas_marcas.hp.url}
                        alt={todas_marcas.hp.alt} />
                </div>
            </div>
        </section>
        {/* footer */}
        <Footer />

        {/* pruebas facturas MODIFICAR LUEGO*/}
        <section>
            <Link to="facturas" className="btn btn-danger m-2 p-2">
                Facturas
            </Link>
        </section>

    </ >
}