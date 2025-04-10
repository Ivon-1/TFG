import { useState } from "react";
import './styles/navbar.css';
import todas_imagenes from "../../data/imagenes";

export function Navbar() {
    /**
     * controlamos la apertura y cierre de la hamburguesa
     */
    const [isOpen, setIsOpen] = useState(false);
    /**
     * funcion para cambiar valor
     */
    const toggleMenu = () => {
        setIsOpen(prev => !prev); // cambiamos estado
    }
    /**
     * funcion para cerrar menu
     */
    const closeMenu = () => {
        setIsOpen(false);
    }


    return (
        <>
            <div className="header">
                {/* Barra de navegación principal con logo y búsqueda */}
                <nav className="navbar navbar-dark bg-white fixed-top">
                    <div className="container-fluid d-flex align-items-center">


                        {/* Menú de navegación (barra con fondo primario) */}
                        <nav className="navbar navbar-dark bg-dark ">
                            <div className="container-fluid mx-auto">
                                <button className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarNav"
                                    aria-controls="navbarNav"
                                    onClick={toggleMenu} // cambio estado
                                    aria-expanded={isOpen ? "true" : "false"} // poner menu en visible o no visible
                                    aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                {/* titulo del menu de opciones */}
                                <div className="d-none d-md-block">
                                    <h4 className="titulos mx-2 ">Secciones</h4>
                                </div>

                                <div className={"navbar-collapse slide-menu " + (isOpen ? 'open' : '')} id="navbarNav">
                                    <ul className="navbar-nav">
                                        <h4 className="p-3">Opciones disponibles</h4>
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#">Inicio</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Productos</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Soporte</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Sobre nosotros</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Contáctanos</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link"
                                                href="#"
                                                onClick={closeMenu}
                                            >Volver</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>


                        {/* logo principal */}
                        <div className="logo_principal mr-lg-5">
                            <img
                                src={todas_imagenes.logo.url}
                                alt={todas_imagenes.logo.nombre}
                                className="img-fluid rounded-3"
                                style={{ height: '60px' }} />
                        </div>

                        {/* Barra de búsqueda */}
                        <div className="buscar w-50  mx-lg-5">
                            <form className="d-flex" role="search">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Buscar"
                                    aria-label="Search"
                                />
                                <button className="btn btn-outline-success" type="submit">
                                    Buscar
                                </button>
                            </form>
                        </div>

                        {/* Icono del usuario y del carrito */}
                        <div className="usuario_carrito bg-white gap-md-3">
                            <div className="user">
                                <img
                                    src={todas_imagenes.imagen_usuario.url}
                                    alt={todas_imagenes.imagen_usuario.nombre}
                                    className="img-fluid"
                                    style={{ height: '40px' }} />
                            </div>

                            <div className="carrito">
                                <img
                                    src={todas_imagenes.imagen_carrito.url}
                                    alt={todas_imagenes.imagen_carrito.nombre}
                                    className="img-fluid"
                                    style={{ height: '40px' }} />
                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        </>
    );
}
