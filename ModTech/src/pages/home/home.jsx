import { useState } from "react";
import React from 'react';
import './styles/home.css';
import { Navbar } from "../../components/common/navbar";
import { Footer } from "../../components/common/footer";
import imagenes_home from "../../data/imagenes_generales_home";
import ofertas_home from "../../data/ofertas_home";
import productos_mas_vendidos from "../../data/productos_mas_vendidos";
import imagenes_blog from "../../data/informacion_blog";
import todas_marcas from "../../data/marcas_colaboradoras";

export function Home() {
    // poner codigo react aqui despues 
    

    /**
     * Nav del menu principal
     */
    return <>
        <div className="navbar">
            {/* menu de opciones */}
            <Navbar />
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
        <h2 className="text-center m-2 p-2 text-black">Categorías destacadas</h2>
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
            {/* categorias auriculares */}
            <div className="card  " >
                <img src={imagenes_home.categoria_auriculares.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_auriculares.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-info text-white">Auriculares</a>
                </div>
            </div>

            {/* categorias moviles */}
            <div className="card" >
                <img src={imagenes_home.categoria_moviles.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_moviles.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-info text-white">Móviles</a>
                </div>
            </div>

            {/* categorias consolas */}
            <div className="card" >
                <img src={imagenes_home.categoria_consolas.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_consolas.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-info text-white">Consolas</a>
                </div>
            </div>

            {/* categorias graficas */}
            <div className="card" >
                <img src={imagenes_home.categoria_componentes.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_componentes.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-info text-white">Componentes</a>
                </div>
            </div>

            {/* categorias televisores */}
            <div className="card" >
                <img src={imagenes_home.categoria_televisiones.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_televisiones.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-info text-white">Televisores</a>
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
                {/* Portátil MSI */}
                <div className="card_personalizada bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag">-20%</span>
                    <img src={ofertas_home.portatiles.url}
                        className="card-img-top"
                        alt={ofertas_home.portatiles.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Portátil MSI</h5>
                        <p className="card-text">El MSI Gaming GX500 combina potencia y rendimiento con un procesador Intel i7 y una tarjeta gráfica RTX 3060.</p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {ofertas_home.portatiles.precio} €</p>
                        </div>
                    </div>
                </div>

                {/* Auriculares Corsair */}
                <div className="card_personalizada bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag">-20%</span>
                    <img src={ofertas_home.auriculares.url}
                        className="card-img-top"
                        alt={ofertas_home.auriculares.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Auriculares Corsair</h5>
                        <p className="card-text">Los auriculares Corsair HS60 ofrecen una excelente calidad de sonido y un micrófono ajustable para juegos intensos.</p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {ofertas_home.auriculares.precio} €</p>
                        </div>
                    </div>
                </div>

                {/* Raton Razer */}
                <div className="card_personalizada bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag">-20%</span>
                    <img src={ofertas_home.raton.url}
                        className="card-img-top"
                        alt={ofertas_home.raton.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Raton Razer</h5>
                        <p className="card-text">El ratón Razer HyperX X1 ofrece precisión y velocidad con un sensor de 16,000 DPI y una gran bateria.</p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {ofertas_home.raton.precio} €</p>
                        </div>
                    </div>
                </div>

                {/* Raton HP */}
                <div className="card_personalizada bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag">-20%</span>
                    <img src={ofertas_home.raton_hp.url}
                        className="card-img-top"
                        alt={ofertas_home.raton_hp.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Raton HP</h5>
                        <p className="card-text">Un ratón preciso con diseño ergonómico para largas sesiones de uso y con una gran estética.</p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {ofertas_home.raton_hp.precio} €</p>
                        </div>
                    </div>
                </div>



                {/* teclado corsair */}
                <div className="card_personalizada  d-lg-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag">-20%</span>
                    <img src={ofertas_home.teclado_home.url}
                        className="card-img-top"
                        alt={ofertas_home.teclado_home.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Teclado Corsair</h5>
                        <p className="card-text">Teclado Corsair mecánico, con retroiluminación y respuesta rápida para un rendimiento óptimo.</p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {ofertas_home.teclado_home.precio} €</p>
                        </div>
                    </div>
                </div>


                {/* portatil hp */}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag">-20%</span>
                    <img src={ofertas_home.raton_hp_dos.url}
                        className="card-img-top"
                        alt={ofertas_home.raton_hp_dos.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Raton HP v-2</h5>
                        <p className="card-text">Ratón hp de última generación con las últimas novedades del mercado.</p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {ofertas_home.raton_hp_dos.precio} €</p>
                        </div>
                    </div>
                </div>

                {/* portatil razer */}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag">-20%</span>
                    <img src={ofertas_home.portatil_razer.url}
                        className="card-img-top"
                        alt={ofertas_home.portatil_razer.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Portátil Razer</h5>
                        <p className="card-text">Un portátil Razer de alto rendimiento con diseño compacto y pantalla de alta resolución.</p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {ofertas_home.portatil_razer.precio} €</p>
                        </div>
                    </div>
                </div>
                {/* raton razer */}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag">-20%</span>
                    <img src={ofertas_home.portatil_hp.url}
                        className="card-img-top"
                        alt={ofertas_home.portatil_hp.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Raton Razer v-4</h5>
                        <p className="card-text">Ratón Razer ergonómico, preciso y con diseño optimizado para largas sesiones de juego.
                        </p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {ofertas_home.portatil_hp.precio} €</p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
        {/* SECCION PRODUCTOS MAS VENDIDOS */}
        <section className="productos_mas_vendidos">
            <h3 className="text-center bg-dark p-2 mt-2">Productos más vendidos</h3>
            <div className="todo_mas_vendido">
                {/* producto mas vendido uno */}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag_vendido">-20%</span>
                    <img src={productos_mas_vendidos.xbox.url}
                        className="card-img-top"
                        alt={productos_mas_vendidos.xbox.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Xbox One</h5>
                        <p className="card-text">Ofrece gráficos en alta definición, funciones multimedia y la posibilidad de jugar en línea a través de Xbox Live. 
                        </p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {productos_mas_vendidos.xbox.precio} €</p>
                        </div>
                    </div>
                </div>
                {/* producto mas vendido dos */}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag_vendido">-20%</span>
                    <img src={productos_mas_vendidos.iphone15.url}
                        className="card-img-top"
                        alt={productos_mas_vendidos.iphone15.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">iPhone 15 pro max</h5>
                        <p className="card-text">Gran potencia, diseño premium, calidad indiscutible y tecnología avanzada, todo en la palma de tu mano.
                        </p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {productos_mas_vendidos.iphone15.precio} €</p>
                        </div>
                    </div>
                </div>
                {/* producto mas vendido tres */}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag_vendido">-20%</span>
                    <img src={productos_mas_vendidos.iphone8.url}
                        className="card-img-top"
                        alt={productos_mas_vendidos.iphone8.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">iPhone 8</h5>
                        <p className="card-text">Rendimiento rápido, diseño elegante y una cámara avanzada en un solo dispositivo.</p>

                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {productos_mas_vendidos.iphone8.precio} €</p>
                        </div>
                    </div>
                </div>
                {/* producto mas vendido cuatro*/}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag_vendido">-20%</span>
                    <img src={productos_mas_vendidos.raton_msi.url}
                        className="card-img-top"
                        alt={productos_mas_vendidos.raton_msi.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Raton MSI</h5>
                        <p className="card-text">Ratón Razer ergonómico, preciso y con diseño optimizado para largas sesiones de juego.</p>

                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {productos_mas_vendidos.raton_msi.precio} €</p>
                        </div>
                    </div>
                </div>
                {/* producto mas vendido cinco */}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag_vendido">-20%</span>
                    <img src={productos_mas_vendidos.auriculares_corsair.url}
                        className="card-img-top"
                        alt={productos_mas_vendidos.auriculares_corsair.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Auriculares Corsair</h5>
                        <p className="card-text">Auriculares de alta calidad con sonido envolvente, comodidad para largas sesiones y micrófono de precisión.</p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {productos_mas_vendidos.auriculares_corsair.precio} €</p>
                        </div>
                    </div>
                </div>
                {/* producto mas vendido seis */}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag_vendido">-20%</span>
                    <img src={productos_mas_vendidos.portatil_razer.url}
                        className="card-img-top"
                        alt={productos_mas_vendidos.portatil_razer.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Portátil Razer</h5>
                        <p className="card-text">Potencia extrema, diseño elegante y rendimiento de nivel gaming para llevar tu experiencia al siguiente nivel.</p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {productos_mas_vendidos.portatil_razer.precio} €</p>
                        </div>
                    </div>
                </div>
                {/* producto mas vendido siete */}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag_vendido">-20%</span>
                    <img src={productos_mas_vendidos.portatil_msi.url}
                        className="card-img-top"
                        alt={productos_mas_vendidos.portatil_msi.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Raton HP</h5>
                        <p className="card-text">Ratón Razer ergonómico, preciso y con diseño optimizado para largas sesiones de juego.
                        </p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {productos_mas_vendidos.portatil_msi.precio} €</p>
                        </div>
                    </div>
                </div>
                {/* producto mas vendido ocho */}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag_vendido">-20%</span>
                    <img src={productos_mas_vendidos.tarjeta_grafica.url}
                        className="card-img-top"
                        alt={productos_mas_vendidos.tarjeta_grafica.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Raton HP</h5>
                        <p className="card-text">Ratón Razer ergonómico, preciso y con diseño optimizado para largas sesiones de juego.
                        </p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {productos_mas_vendidos.tarjeta_grafica.precio} €</p>
                        </div>
                    </div>
                </div>
            </div>
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
        </section >
    </>
}