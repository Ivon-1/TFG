import { useState } from "react";
import './styles/home.css';
import { Navbar } from "../../components/common/navbar";
import imagenes_home from "../../data/imagenes_generales_home";
import ofertas_home from "../../data/ofertas_home";
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
                    <a href="#" className="btn btn-primary">Sobremesa</a>
                </div>
            </div>
            {/* categorias auriculares */}
            <div className="card  " >
                <img src={imagenes_home.categoria_auriculares.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_auriculares.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-primary">Auriculares</a>
                </div>
            </div>

            {/* categorias moviles */}
            <div className="card" >
                <img src={imagenes_home.categoria_moviles.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_moviles.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-primary">Móviles</a>
                </div>
            </div>

            {/* categorias consolas */}
            <div className="card" >
                <img src={imagenes_home.categoria_consolas.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_consolas.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-primary">Consolas</a>
                </div>
            </div>

            {/* categorias graficas */}
            <div className="card" >
                <img src={imagenes_home.categoria_componentes.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_componentes.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-primary">Componentes</a>
                </div>
            </div>

            {/* categorias televisores */}
            <div className="card" >
                <img src={imagenes_home.categoria_televisiones.url}
                    className="card-img-top"
                    alt={imagenes_home.categoria_televisiones.alt} />
                <div className="card-body bg-black text-center">
                    <a href="#" className="btn btn-primary">Televisores</a>
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
                        <h5 className="card-title">Raton HP</h5>
                        <p className="card-text">Teclado Corsair con teclas mecánicas y retroiluminación, ideal para jugar y trabajar con comodidad.</p>
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
                        <h5 className="card-title">Raton HP</h5>
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
                {/* producto mas vendido dos */}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag_vendido">-20%</span>
                    <img src={ofertas_home.portatil_hp.url}
                        className="card-img-top"
                        alt={ofertas_home.portatil_hp.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Raton HP</h5>
                        <p className="card-text">Ratón Razer ergonómico, preciso y con diseño optimizado para largas sesiones de juego.
                        </p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {ofertas_home.portatil_hp.precio} €</p>
                        </div>
                    </div>
                </div>
                {/* producto mas vendido tres */}
                <div className="card_personalizada   d-block bg-dark p-3 m-3 rounded-2 position-relative">
                    <span className="discount-tag_vendido">-20%</span>
                    <img src={ofertas_home.portatil_hp.url}
                        className="card-img-top"
                        alt={ofertas_home.portatil_hp.alt} />
                    <div className="card-body mt-3">
                        <h5 className="card-title">Raton HP</h5>
                        <p className="card-text">Ratón Razer ergonómico, preciso y con diseño optimizado para largas sesiones de juego.
                        </p>
                        <div className="total_precio">
                            <a href="#" className="btn btn-primary">Comprar</a>
                            <p>Total: {ofertas_home.portatil_hp.precio} €</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}