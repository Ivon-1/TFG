import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import todas_imagenes from "../../data/imagenes";
import { useRegistro } from "../../consumirAxios";

export function Registro() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [politicaPrivacidad, setPoliticaPrivacidad] = useState(false);
    const [error, setError] = useState("");
    // naavigate
    const navigate = useNavigate();

    // consumir registro
    const { data, loading, error: errorRegistro, registro } = useRegistro();

    // funciones campos
    const handleChangeNombre = (e) => {
        setName(e.target.value);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangeContraseña = (e) => {
        setPassword(e.target.value);
    };

    const handleChangeRepetirContraseña = (e) => {
        setConfirmarPassword(e.target.value);
    };

    const handleChangePoliticaPrivacidad = (e) => {
        setPoliticaPrivacidad(e.target.checked);
    };

    // funcion para enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmarPassword) {
            setError("Faltan campos por rellenar");
            return;
        }

        if (password !== confirmarPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (!politicaPrivacidad) {
            setError("Debes aceptar la política de privacidad");
            return;
        }

        // limpiamos error
        setError("");


        // llamamos funcion con parametros (no enviamos confirmarPassword al backend)
        registro({ name, email, password });
    
    };

    return (
        <>
            <div className="registro">
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
                <h4 className="text-black m-2 p-2">Registrarse</h4>
                {/* registro en si mismo */}
                <form className="formulario" onSubmit={handleSubmit}>
                    {/* nombre */}
                    <div className="mb-3 mt-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Introducir nombre"
                            value={name}
                            onChange={handleChangeNombre}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Introducir correo"
                            value={email}
                            onChange={handleChangeEmail}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Introducir contraseña"
                            autoComplete="new-password"
                            value={password}
                            onChange={handleChangeContraseña}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Repetir contraseña"
                            autoComplete="new-password"
                            value={confirmarPassword}
                            onChange={handleChangeRepetirContraseña}
                        />
                    </div>

                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="privacyCheck"
                            checked={politicaPrivacidad}
                            onChange={handleChangePoliticaPrivacidad}
                        />
                        <label className="form-check-label" htmlFor="privacyCheck">
                            Acepto la{" "}
                            <span
                                className="text-primary text-decoration-underline"
                                role="button"
                                data-bs-toggle="modal"
                                data-bs-target="#privacyModal"
                            >
                                política de privacidad
                            </span>
                        </label>
                    </div>

                    {/* politica de privacidad */}
                    <div
                        className="modal fade"
                        id="privacyModal"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex="-1"
                        aria-labelledby="privacyModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black" id="privacyModalLabel">
                                        Política de Privacidad
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Cerrar"
                                    ></button>
                                </div>
                                <div className="modal-body text-black">
                                    <p>
                                        Este sitio web recopila y procesa tus datos personales para
                                        brindarte un mejor servicio. Consulta toda la información
                                        aquí.
                                    </p>
                                    <p>
                                        Puedes ejercer tus derechos de acceso, rectificación y
                                        eliminación de datos cuando lo desees.
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-warning">{error}</p>}

                    <button type="submit" className="btn btn-dark w-100">
                        Crear cuenta
                    </button>
                </form>
            </div>
        </>
    );
}
