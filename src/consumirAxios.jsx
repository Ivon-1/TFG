import { useEffect, useState } from "react";
import env from "./env";  // Asegúrate de importar correctamente
import axios from "axios";

export function useFetchData(url = null) {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!url) return;
        axios.get(env.url_produccion + url)
            .then(response => {
                setData(response.data);
                setLoading(false);
                console.log(response);
            })
            .catch(error => {
                setError("Error al obtener los datos");
                setLoading(false);
                console.log(error);
            })
    }, [url])

    return { data, loading, error }
}
// funcion login
export function useLogin() {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const login = (credenciales) => {
        setLoading(true);
        setError("");

        axios.post(env.url_produccion + "api/login", credenciales)
            .then(response => {
                setData(response.data);
            })
            .catch(() => {
                setError("Usuario o contraseña incorrectos");
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { data, loading, error, login };
}

// funcion registro
export function useRegistro() {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const registro = (credenciales) => {
        setLoading(true);
        setError("");
        
        console.log('Enviando datos de registro:', credenciales);

        axios.post(env.url_produccion + "api/registro", credenciales)
            .then(response => {
                console.log('Respuesta del servidor:', response.data);
                setData(response.data);
                
                if (response.data && response.data.usuario) {
                    // Guardamos los datos del usuario en localStorage
                    const userData = {
                        name: response.data.usuario.name,
                        email: response.data.usuario.email,
                        id: response.data.usuario.id
                    };
                    console.log('Guardando datos del usuario:', userData);
                    localStorage.setItem('user', JSON.stringify(userData));
                } else {
                    console.error('Respuesta del servidor no contiene datos de usuario:', response.data);
                    setError("Error en el formato de respuesta del servidor");
                }
            })
            .catch((error) => {
                console.error('Error en el registro:', error);
                if (error.response && error.response.data) {
                    console.error('Datos del error:', error.response.data);
                    
                    // manejo de errores
                    if (error.response.data.errors) {
                        const errors = error.response.data.errors;
                        if (errors.email && errors.email.includes("The email has already been taken.")) {
                            setError("Este correo electrónico ya está registrado.");
                        } else {
                            // si hay mas de un error los mostramos todos
                            const errorMessages = Object.values(errors)
                                .flat()
                                .join(". ");
                            setError(errorMessages);
                        }
                    } else {
                        setError(error.response.data.mensaje || "Error en el registro");
                    }
                } else if (error.request) {
                    console.error('No se recibio respuesta:', error.request);
                    setError("No se pudo conectar con el servidor.");
                } else {
                    console.error('Error de configuración:', error.message);
                    setError("Error al procesar la solicitud. Por favor, inténtalo de nuevo.");
                }
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { data, loading, error, registro };
}

// funcion recuperar contraseña
export function useRecuperarPassword() {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const recuperarPassword = (email) => {
        setLoading(true);
        setError("");
        setSuccess(false);

        axios.post(env.url_produccion + "forgot-password", {
            email: email
        })
            .then(response => {
                setData(response.data);
                setSuccess(true);
            })
            .catch((error) => {
                setError(error.response.data.message || "Error al enviar el correo de recuperación");
                setSuccess(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { data, loading, error, success, recuperarPassword };
}


