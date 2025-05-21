import { Link, useNavigate } from "react-router-dom";
import todas_imagenes from "../../data/imagenes";
import { useLogin } from "../../consumirAxios";
import { useState, useEffect } from "react";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggued, setLoggued] = useState(false);
    const [error, setError] = useState("");
    // redirigir
    const navigate = useNavigate();

    const { data, loading, error: loginError, login } = useLogin();

    // verificamos el token sino error
    useEffect(() => {
        if (data && data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
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

                            // Corregido para actualizar el estado
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
                            // Corregido para actualizar el estado
                            />
                        </div>
                    </div>

                    {/* recuperar contraseña */}
                    <div className="mb-3">
                        <div className="text-start mt-2">
                            <Link to="/recuperar" className="text-decoration text-black">
                                He olvidado mi contraseña
                            </Link>
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
        </>
    );
}
