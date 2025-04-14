/** importamos cada foto */
import logoPrincipal from "../assets/img/General/logo.webp";
import carrito from "../assets/img/General/carrito-de-compras.png";
import usuario from "../assets/img/General/usuario.png";
import lupa from "../assets/img/General/lupa(1).png";
/** variable con todas las imagenes */
const todas_imagenes = {
    // imagen logo principal
    logo: {
        id: 1,
        url: logoPrincipal,
        nombre: "logo principal"
    },
    // imagenes logos navbar
    imagen_usuario: {
        id: 2,
        url: usuario,
        nombre: "logo usuario"
    },

    imagen_carrito: {
        id: 3,
        url: carrito,
        nombre: "logo carrito"
    },

    imagen_buscar: {
        id: 4,
        url: lupa,
        nombre: "logo carrito"
    }
}

export default todas_imagenes;