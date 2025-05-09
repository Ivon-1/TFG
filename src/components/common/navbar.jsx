import { useState } from "react";
import { Link } from 'react-router-dom';
import './styles/navbar.css';
import todas_imagenes from "../../data/imagenes";

export function Navbar({ busqueda, setBusqueda }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // No se hace nada más, porque `Productos` ya usará `busqueda`
    };

    return (
        <div className="header">
            <nav className="navbar navbar-dark bg-white fixed-top">
                <div className="container-fluid d-flex align-items-center">

                    {/* Menú hamburguesa */}
                    <nav className="navbar navbar-dark bg-dark rounded">
                        <div className="container-fluid mx-auto">
                            <button className="navbar-toggler"
                                type="button"
                                onClick={toggleMenu}
                                aria-expanded={isOpen ? "true" : "false"}
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="d-none d-md-block">
                                <h4 className="titulos mx-2 ">Secciones</h4>
                            </div>

                            <div className={"navbar-collapse slide-menu " + (isOpen ? 'open' : '')}>
                                <ul className="navbar-nav">
                                    <h4 className="p-3">Opciones disponibles</h4>
                                    <li className="nav-item"><Link className="nav-link active" to="/">Inicio</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="">Soporte</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="">Sobre nosotros</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="">Contáctanos</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="#" onClick={closeMenu}>Volver</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    {/* Logo */}
                    <div className="logo_principal mr-lg-5">
                        <Link to="/">
                            <img src={todas_imagenes.logo.url} alt={todas_imagenes.logo.nombre}
                                className="img-fluid rounded-3" style={{ height: '60px' }} />
                        </Link>
                    </div>

                    {/* Buscador */}
                    <div className="buscar w-50 mx-lg-5">
                        <form className="d-flex" role="search" onSubmit={handleSubmit}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Buscar"
                                value={busqueda}
                                onChange={handleChange}
                            />
                            <button className="btn btn-outline-success" type="submit">Buscar</button>
                        </form>
                    </div>

                    {/* Usuario y carrito */}
                    <div className="usuario_carrito bg-white gap-md-3">
                        <div className="user">
                            <Link to="/login">
                                <img src={todas_imagenes.imagen_usuario.url}
                                    alt={todas_imagenes.imagen_usuario.nombre}
                                    className="img-fluid" style={{ height: '40px' }} />
                            </Link>
                        </div>
                        <div className="carrito">
                            <img src={todas_imagenes.imagen_carrito.url}
                                alt={todas_imagenes.imagen_carrito.nombre}
                                className="img-fluid" style={{ height: '40px' }} />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
