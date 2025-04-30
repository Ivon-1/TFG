import visa from "../assets/img/FormasPago/visa.webp";
import MasterCard from "../assets/img/FormasPago/masterCardOriginal.png";
import transferencia from "../assets/img/FormasPago/transferencia-removebg-preview.png";
import efectivo from "../assets/img/FormasPago/efectivo.png";

const formas_de_pago = {
    visa: {
        id: 1,
        url: visa,
        alt: "visa"
    },
    MasterCard: {
        id: 2,
        url: MasterCard,
        alt: "MasterCard"
    },
    transferencia: {
        id: 3,
        url: transferencia,
        alt: "transferencia"
    },
    efectivo: {
        id: 4,
        url: efectivo,
        alt: "efectivo"
    }
}

export default formas_de_pago;