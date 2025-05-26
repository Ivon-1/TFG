import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './styles/navbar.css';
import todas_imagenes from "../../data/imagenes";
import { useFetchData } from "../../consumirAxios";

export const Navbar = ({ busqueda, setBusqueda, handleToggleCarritoNavbar, handleCloseCarritoNavbar, handleAddToCartLocal, openCarrito, carrito }) => {

    const [isOpen, setIsOpen] = useState(false);
    // estado del carrito
    const [productosCarrito, setProductosCarrito] = useState([]);
    // conexion axios desestructurando el array
    const { data: productos_datos, loading: loading_productos, error: error_productos } = useFetchData('api/productos');

    // manejar loguin
    const [logueado, setLogueado] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState("");

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
                            <button className="close-btn text-red" onClick={handleCloseCarritoNavbar}>X</button>

                            <div className="carrito_contenido">
                                <h2>Tu carrito</h2>

                                {carrito.length === 0 ? (
                                    <p>No hay productos en tu carrito.</p>
                                ) : (
                                    <div className="productos_carrito">
                                        {carrito.map((producto, index) => (
                                            <div
                                                key={index}
                                                className="producto_objeto"
                                                style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}
                                            >
                                                <div style={{ marginRight: '15px' }}>
                                                    <img
                                                        src={producto.url}
                                                        alt={producto.nombre}
                                                        style={{
                                                            width: '80px',
                                                            height: '80px',
                                                            objectFit: 'cover',
                                                            borderRadius: '4px',
                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <div style={{ // aplicamos los estilos en general
                                                        fontWeight: 'bold', 
                                                        fontSize: '16px',
                                                        marginBottom: '5px'
                                                    }}>{producto.nombre}</div>
                                                    <div style={{  
                                                        fontWeight: 'bold', 
                                                        color: '#dc3545',
                                                        fontSize: '18px'
                                                    }}>
                                                        {(producto.precioConDescuento ?? producto.precio).toFixed(2)} €
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Sección de total y botón */}
                            <div className="total_y_boton mt-4">
                                <div className="total">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="fw-bold">Total:</span>
                                        <span className="fw-bold text-danger h4">
                                            {carrito.reduce((total, producto) => total + (producto.precioConDescuento ?? producto.precio), 0).toFixed(2)} €
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <Link to="/cesta" className="btn btn-primary btn-lg w-100">
                                        Ir a la cesta
                                    </Link>
                                </div>
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
                                onClick={handleToggleCarritoNavbar}
                                className="img-fluid" style={{ height: '40px' }} />
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    );
}
