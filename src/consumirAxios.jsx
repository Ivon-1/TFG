import { useEffect, useState } from "react";
import env from "./env";  // Asegúrate de importar correctamente
import axios from "axios";

export const useConsumirProductos = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Usamos env.url_local directamente
        axios.get(env.url_local + "api/productos")
            .then((response) => {
                setData(response.data.productos);
            })
            .catch((error) => {
                setError("Error al obtener los productos en oferta");
                console.error(error);
            });
    }, []);

    return { data, error };
}

// consumir ofertas 
export const useConsumirOfertas = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Usamos env.url_local directamente
        axios.get(env.url_local + "api/ofertas")
            .then((response) => {
                setData(response.data.ofertas);
            })
            .catch((error) => {
                setError("Error al obtener los productos en oferta");
                console.error(error);
            });
    }, []);

    return { data, error };
}

// filtrar productos por nombre
export const useConsumirPorNombre = (nombre) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Usamos env.url_local directamente
        axios.get(env.url_local + "api/productos/nombre" + nombre)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                setError("Error al obtener los productos en oferta");
                console.error(error);
            });
    }, []);

    return { data, error };
}

// obtenerUsuarios
export const useConsumirPorUsuario = (email, password) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!email || !password) {
            setError("Por favor, introduce un nombre de usuario y contraseña");
            return;
        }
        // Usamos env.url_local directamente
        axios.post(env.url_local + "api/login", {
            email: email,
            password: password
        })
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                setError("Error al obtener los datos del usuario");
                console.error(error);
            });
    }, [email, password]);

    return { data, error };
}



