import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './styles/navbar.css';
import todas_imagenes from "../../data/imagenes";
import { useFetchData } from "../../consumirAxios";

export function Navbar({ busqueda, setBusqueda  }) {

    const [isOpen, setIsOpen] = useState(false);
    // conexion axios desestructurando el array
    const { data: productos_datos, loading: loading_productos, error: error_productos } = useFetchData('api/productos');

    // manejar loguin
    const [logueado, setLogueado] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState("");
    // variables carrito
    const [openCarrito, setOpenCarrito] = useState(false);


    const navigate = useNavigate();
    // apertura y cierre menu
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    // Función para actualizar la búsqueda
    const handleChange = (e) => {
        setBusqueda(e.target.value);
    };

    // formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (busqueda.trim() !== "") {
            navigate(`/productos?search=${encodeURIComponent(busqueda)}`);
        }
    };

    // manejar toggle carrito
    const handleToggleCarrito = () => {
        setOpenCarrito(prev => !prev);
    }

    const handleCloseCarrito = () => {
        setOpenCarrito(false);
    }


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
                                <h4 className="titulos mx-2">Secciones</h4>
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

                    {/* toggle carrito */}
                    {openCarrito && (
                        <div className="carrito_toggle text-dark">
                            <button className="close-btn text-red" onClick={handleCloseCarrito}>X</button>

                            <div className="carrito_contenido">
                                <h2>Tu carrito</h2>
                                {/* validaciones y mostrar productos */}
                                {loading_productos && <p>Cargando productos...</p>}

                                {error_productos && <p>{error_productos.message}</p>}

                                {!loading_productos && productos_datos.length > 0 && (
                                    <div className="productos_carrito">
                                        {productos_datos.map((producto) => (
                                            <div key={producto.id}
                                                className="producto_objeto"
                                                style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>


                                                <img src={producto.url}
                                                    alt={producto.nombre}
                                                    style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '10px' }}
                                                />

                                                <div>
                                                    <div style={{ fontWeight: 'bold' }}>{producto.nombre}</div>
                                                    <div style={{ fontWeight: 'bold' }}>{producto.precio.tofixed(2)}</div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>

                                )}

                            </div>
                        </div>
                    )}

                    {/* Logo */}
                    <div className="logo_principal mr-lg-5">
                        <Link to="/">
                            <img src={todas_imagenes.logo.url} alt={todas_imagenes.logo.nombre}
                                className="img-fluid rounded-3" style={{ height: '60px' }} />
                        </Link>
                    </div>

                    {/* Buscador */}
                    <div className="buscar w-50 mx-lg-5">
                        <form className="d-flex"
                            role="search"
                            onSubmit={handleSubmit}>
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
                            {logueado ? (
                                <div className="nombre_usuario">
                                    <span className="iniciado text-black">{nombreUsuario}</span>
                                </div>
                            ) : <Link to="/login">
                                <img src={todas_imagenes.imagen_usuario.url}
                                    alt={todas_imagenes.imagen_usuario.nombre}
                                    className="img-fluid" style={{ height: '40px' }} />
                            </Link>}

                        </div>
                        <div className="carrito">
                            <img src={todas_imagenes.imagen_carrito.url}
                                alt={todas_imagenes.imagen_carrito.nombre}
                                onClick={handleToggleCarrito}
                                className="img-fluid" style={{ height: '40px' }} />
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    );
}
