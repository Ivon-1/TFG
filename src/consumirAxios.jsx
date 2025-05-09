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
                console.log(response.data.productos);
            })
            .catch((error) => {
                setError("Error al obtener los productos en oferta");
                console.error(error);
            });
    }, []);

    return {data, error};
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
                console.log(response.data.ofertas);
            })
            .catch((error) => {
                setError("Error al obtener los productos en oferta");
                console.error(error);
            });
    }, []);

    return {data, error};
}



