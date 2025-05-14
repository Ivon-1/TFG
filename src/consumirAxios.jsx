import { useEffect, useState } from "react";
import env from "./env";  // Asegúrate de importar correctamente
import axios from "axios";

export function useFetchData(url = null) {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!url) return;
        axios.get(env.url_local + url)
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

    return {data, loading, error}
}



