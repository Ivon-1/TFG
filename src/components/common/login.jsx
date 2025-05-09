import { Link } from "react-router-dom";
import todas_imagenes from "../../data/imagenes";
export function Login() {
    // 

    return <>
        <div className="login">
            <form action="" className="formulario">
                <header className="header">
                    <div className="titulo">
                        <h2 className="text-center bold text-black">ModTech</h2>
                    </div>

                    <div className="logo text-center m-auto">
                        <Link to="/">
                            <img src={todas_imagenes.logo.url}
                                alt={todas_imagenes.logo.alt}
                                style={{ width: "100px" }} />
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
                        <input type="email"
                            className="form-control text-center"
                            aria-describedby="passwordHelpBlock"
                            placeholder="Email" />
                    </div>

                    <div className="contraseña mt-3">
                        <input type="password"
                            className="form-control  text-center"
                            aria-describedby="passwordHelpBlock"
                            placeholder="Contraseña"
                            autoComplete="new-password" />
                    </div>
                </div>
                {/* recuperar contraseña */}
                <div className="mb-3">
                    <div className="text-start mt-2">
                        <Link to="/recuperar"
                            className="text-decoration text-black">
                            He olvidado mi contraseña
                        </Link>
                    </div>
                </div>
                {/* iniciar sesion */}
                <div className="iniciar_sesion">
                    <Link href="/" className="btn btn-dark w-100 p-2">
                        Iniciar sesion
                    </Link>
                </div>

                {/* posibilidad registrarse */}
                <div className="crear_cuenta">
                    <h3 className="text-center bold text-black mt-2">¿Eres nuevo cliente?</h3>
                    <div className="boton_crear ">
                        <Link to="/registrarse"
                            className="btn btn-dark w-100">
                            Crear cuenta
                        </Link>
                    </div>
                </div>


            </form>
        </div>

    </>
}

