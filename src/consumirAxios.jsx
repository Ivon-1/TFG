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

        axios.post(env.url_produccion + "api/registro", credenciales)
            .then(response => {
                setData(response.data);
            })
            .catch(() => {
                setError("Faltan campos por rellenar o los campos son inválidos");
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { data, loading, error, registro };
}




