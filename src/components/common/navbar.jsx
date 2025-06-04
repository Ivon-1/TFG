import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './styles/navbar.css';
import todas_imagenes from "../../data/imagenes";
import { useFetchData } from "../../consumirAxios";
import Checkout from "../checkout/Checkout";

export const Navbar = ({
    busqueda,
    setBusqueda,
    handleToggleCarritoNavbar,
    handleCloseCarritoNavbar,
    handleAddToCartLocal,
    handleEliminarCantidad,
    handleSumarCantidad,
    handleRestarCantidad,
    openCarrito,
    carrito
}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    // conexion axios desestructurando el array
    const { data: productos_datos, loading: loading_productos, error: error_productos } = useFetchData('api/productos');

    // manejar loguin
    const [logueado, setLogueado] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [emailUsuario, setEmailUsuario] = useState("");

    // comprobamos si estamos logueados
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('user');
        if (usuarioGuardado) {
            const usuario = JSON.parse(usuarioGuardado);
            setLogueado(true);
            setNombreUsuario(usuario.name || usuario.email);
            setEmailUsuario(usuario.email);
        }
    }, []);

    const navigate = useNavigate();
    // apertura y cierre menu
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    // Toggle del menú de usuario
    const toggleUserMenu = () => {
        setOpenUserMenu(prev => !prev);
        if (openCarrito) handleCloseCarritoNavbar();
    };

    const closeUserMenu = () => {
        setOpenUserMenu(false);
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

    // funcion para manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem('user');
        setLogueado(false);
        setNombreUsuario("");
        setEmailUsuario("");
        setOpenUserMenu(false);
        navigate('/');
    };

    // Función para limpiar la URL
    const getLimpiarUrl = (url) => {
        if (!url) return '';
        // Buscar la URL de DigitalOcean
        const match = url.match(/(https:\/\/.*\.digitaloceanspaces\.com\/.*\.jpg)/);
        return match ? match[1] : url;
    };

    const handleCheckoutSuccess = (details) => {
        console.log('Pago completado:', details);
    };

    const calcularTotal = () => {
        return carrito.reduce((total, producto) => 
            total + (producto.precioConDescuento ?? producto.precio) * producto.cantidad,
            0
        );
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
                                                style={{ display: 'flex', 
                                                    alignItems: 'center', 
                                                    marginBottom: '15px', 
                                                    padding: '10px', 
                                                    backgroundColor: '#f8f9fa', 
                                                    borderRadius: '8px' }}
                                            >
                                                <div style={{ marginRight: '15px' }}>
                                                    <img
                                                        src={producto.url.replace('http://localhost:5173/api', '')} // replace porque se me duplicaba la url y no cargaba
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
                                                {console.log(producto.url)}
                                                <div style={{ flex: 1 }}>
                                                    <div style={{
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
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        marginTop: '5px'
                                                    }}>
                                                        <button
                                                            onClick={() => handleRestarCantidad(producto.id)}
                                                            className="btn btn-outline-danger btn-sm me-2"
                                                            disabled={producto.cantidad <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <span style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                            marginRight: '10px'
                                                        }}>{producto.cantidad}</span>
                                                        <button
                                                            onClick={() => handleSumarCantidad(producto.id)}
                                                            className="btn btn-outline-success btn-sm me-2"
                                                        >
                                                            +
                                                        </button>
                                                        <button
                                                            onClick={() => handleEliminarCantidad(producto.id)}
                                                            className="btn btn-danger btn-sm"
                                                        >
                                                            Eliminar
                                                        </button>
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
                                            {calcularTotal().toFixed(2)} €
                                        </span>
                                    </div>
                                </div> {/* paypal */}
                                <div className="mt-3">
                                    {showCheckout ? (
                                        <Checkout 
                                            total={calcularTotal()} 
                                            carrito={carrito}
                                            onSuccess={handleCheckoutSuccess}
                                        />
                                    ) : (
                                        <button 
                                            className="btn btn-primary btn-lg w-100"
                                            onClick={() => setShowCheckout(true)}
                                        >
                                            Confirmar compra
                                        </button>
                                    )}
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
                                <div className="nombre_usuario" onClick={toggleUserMenu}>
                                    <div className="user-avatar">
                                        {nombreUsuario.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login">
                                    <img src={todas_imagenes.imagen_usuario.url}
                                        alt={todas_imagenes.imagen_usuario.nombre}
                                        className="img-fluid" style={{ height: '40px' }} />
                                </Link>
                            )}
                        </div>
                        <div className="carrito">
                            <img src={todas_imagenes.imagen_carrito.url}
                                alt={todas_imagenes.imagen_carrito.nombre}
                                onClick={handleToggleCarritoNavbar}
                                className="img-fluid" style={{ height: '40px' }} />
                        </div>
                    </div>

                    {/* Toggle del menú de usuario */}
                    {openUserMenu && (
                        <div className="user_toggle open">
                            <button className="close-btn" onClick={closeUserMenu}>X</button>
                            <div className="user-header">
                                <div className="user-avatar">
                                    {nombreUsuario.charAt(0).toUpperCase()}
                                </div>
                                <div className="user-info">
                                    <h3>{nombreUsuario}</h3>
                                    <p>{emailUsuario}</p>
                                </div>
                            </div>
                            <div className="user-options">
                                <button onClick={handleLogout} className="logout-button">
                                    <i className="fas fa-sign-out-alt"></i>
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav >
        </div >
    );
}
