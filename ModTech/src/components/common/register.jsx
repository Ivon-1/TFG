import { useState } from "react";
import { Link } from "react-router-dom";
import todas_imagenes from "../../data/imagenes";
export function Registro() {
    
    return <>
        <div className="registro">
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
            <h4 className="text-black m-2 p-2">Registrarse</h4>
            {/* registro en si mismo */}
            <form action="" className="formulario">
                {/* nombre */}
                <div className="mb-3 mt-2">
                    <input type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Introducir nombre" />
                </div>

                <div className="mb-3">
                    <input type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Introducir correo" />

                </div>
                <div className="mb-3">
                    <input type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Introducir contraseña" />
                </div>

                <div className="mb-3">
                    <input type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Repetir contraseña" />
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1" />
                    <label className="form-check-label"
                        for="exampleCheck1">Acepto la política de privacidad</label>
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox"
                        className="form-check-input"
                        id="exampleCheck2" />
                    <label className="form-check-label"
                        for="exampleCheck2">Recibir descuentos exclusivos</label>
                </div>
                <button type="submit"
                    className="btn btn-dark w-100">Crear cuenta</button>
            </form>
        </div>
    </>
}