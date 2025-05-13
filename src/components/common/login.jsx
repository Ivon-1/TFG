import { Link, useNavigate } from "react-router-dom";
import todas_imagenes from "../../data/imagenes";
import { useConsumirPorUsuario } from "../../consumirAxios";
import { useState, useEffect } from "react";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // axios
    const { data, error: error_login } = useConsumirPorUsuario(email, password);

    // funcion enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();


        if (!email || !password) {
            setError("Error. Debe introducir los datos correctamente o faltan campos por rellenar");
            return;
        }
    }

    // Redirigir y guardar token en localStorage cuando el token esté disponible
    useEffect(() => {
        if (data?.token) {
            localStorage.setItem('authToken', data.token);
            navigate('/'); // Redirigir al home
        }
    }, [data, navigate]);

    // Manejar errores
    useEffect(() => {
        if (error_login) {
            setError(error_login);
        }
    }, [error_login]);


    return (
        <>
            <div className="login">
                <form action="" className="formulario" onSubmit={handleSubmit}>
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Corregido para actualizar el estado
                            />
                        </div>

                        <div className="contraseña mt-3">
                            <input
                                type="password"
                                className="form-control text-center"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Contraseña"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Corregido para actualizar el estado
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
