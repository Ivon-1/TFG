import { Link, useNavigate } from "react-router-dom";
import todas_imagenes from "../../data/imagenes";
import { useLogin, useRecuperarPassword } from "../../consumirAxios";
import { useState, useEffect } from "react";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggued, setLoggued] = useState(false);
    const [error, setError] = useState("");
    
    // Estados para recuperación de contraseña
    const [emailRecuperar, setEmailRecuperar] = useState("");
    const [showModal, setShowModal] = useState(false);
    
    // redirigir
    const navigate = useNavigate();

    const { data, loading, error: loginError, login } = useLogin();
    const { loading: loadingRecuperar, error: errorRecuperar, success: successRecuperar, recuperarPassword } = useRecuperarPassword();

    // verificamos el token sino error
    useEffect(() => {
        if (data && data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.usuario));
            setError("");
            navigate("/");
        } else if (loginError) {
            setError(loginError);
        }
    }, [data, loginError, navigate]);

    // ponemos valor que escribimos
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeEmailRecuperar = (e) => {
        setEmailRecuperar(e.target.value);
    }

    // enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Datos incorrectos o falta completar campos');
            return;
        }

        // llamamos al login con email y password
        login({email, password});
    }

    // Manejar recuperación de contraseña
    const handleRecuperarPassword = (e) => {
        e.preventDefault();
        if (!emailRecuperar) {
            return;
        }
        recuperarPassword(emailRecuperar);
    }

    // Cerrar modal y limpiar estado
    const handleCloseModal = () => {
        setShowModal(false);
        if (successRecuperar) {
            setEmailRecuperar("");
        }
    }

    return (
        <>
            <div className="login">
                <form action="" className="formulario" onSubmit={handleSubmit} >
                    <header className="header">
                        <div className="titulo">
                            <h2 className="text-center bold text-black">ModTech</h2>
                        </div>

                        <div className="logo text-center m-auto">
                            <Link to="/">
                                <img
                                    src={todas_imagenes.logo.url}
                                    alt={todas_imagenes.logo.alt}
                                    style={{ width: "100px" }}
                                />
                            </Link>
                        </div>
                    </header>

                    {/* iniciar sesion */}
                    <div className="iniciar_sesion">
                        <h4 className="mt-3 text-center p-2 ">Iniciar sesion</h4>
                    </div>

                    {/* campos correo y contraseña */}
                    <div className="correo_contraseña">
                        <div className="correo mt-3">
                            <input
                                type="email"
                                className="form-control text-center"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Email"
                                onChange={handleChangeEmail}
                                value={email}
                            />
                        </div>

                        <div className="contraseña mt-3">
                            <input
                                type="password"
                                className="form-control text-center"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Contraseña"
                                autoComplete="new-password"
                                onChange={handleChangePassword}
                                value={password}
                            />
                        </div>
                    </div>

                    {/* recuperar contraseña */}
                    <div className="mb-3">
                        <div className="text-start mt-2">
                            <button 
                                type="button" 
                                className="btn btn-link text-black text-decoration-none p-0"
                                onClick={() => setShowModal(true)}
                            >
                                He olvidado mi contraseña
                            </button>
                        </div>
                    </div>

                    {/* iniciar sesion */}
                    <div className="iniciar_sesion">
                        <button type="submit" className="btn btn-dark w-100 p-2">
                            Iniciar sesion
                        </button>

                        <div className="error-message text-warning" >
                            {error && <p>{error}</p>}
                        </div>
                    </div>

                    {/* posibilidad registrarse */}
                    <div className="crear_cuenta">
                        <h3 className="text-center bold text-black mt-2">¿Eres nuevo cliente?</h3>
                        <div className="boton_crear ">
                            <Link to="/registrarse" className="btn btn-dark w-100">
                                Crear cuenta
                            </Link>
                        </div>
                    </div>
                </form>
            </div>

            {/* Modal de recuperación de contraseña */}
            <div 
                className={`modal fade ${showModal ? 'show' : ''}`} 
                style={{ display: showModal ? 'block' : 'none' }}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="recuperarPasswordModal"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Recuperar contraseña</h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                onClick={handleCloseModal}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p className="text-dark">Introducir correo para recuperación de contraseña</p>
                            <form onSubmit={handleRecuperarPassword}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Correo electrónico"
                                        value={emailRecuperar}
                                        onChange={handleChangeEmailRecuperar}
                                        required
                                    />
                                </div>
                                {errorRecuperar && (
                                    <div className="alert alert-danger">{errorRecuperar}</div>
                                )}
                                {successRecuperar && (
                                    <div className="alert alert-success">
                                        Se ha enviado un correo con las instrucciones para restablecer tu contraseña.
                                    </div>
                                )}
                                <div className="d-grid gap-2">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={loadingRecuperar}
                                    >
                                        {loadingRecuperar ? 'Correo enviado' : 'Enviar correo'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>}
        </>
    );
}
