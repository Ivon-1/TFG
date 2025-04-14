import { useState } from "react";
import todas_imagenes from "../../data/imagenes";
import redes from "../../data/redes";
import formas_de_pago from "../../data/formas_pago";
export function Footer() {
    return <>
        <div className="informacion_general bg-dark p-3">
            <div className="logo_y_modtech">
                <div className="logo">
                    <img src={todas_imagenes.logo.url}
                        alt={todas_imagenes.logo.alt}
                    />
                </div>
                <div className="modtech">
                    <h3>Modtech</h3>
                </div>
            </div>
            {/* redes */}
            <div className="redes">
                <div className="red">
                    <img src={redes.whatsapp.url} alt={redes.whatsapp.alt} />
                </div>
                <div className="red">
                    <img src={redes.twitter.url} alt={redes.twitter.alt} />
                </div>

                <div className="red">
                    <img src={redes.instagram.url} alt={redes.instagram.alt} />
                </div>

                <div className="red">
                    <img src={redes.facebook.url} alt={redes.facebook.alt} />
                </div>
            </div>

            <div className="todo">
                {/* por qué comprar */}
                <div className="que_comprar">
                    <h2>Qué comprar</h2>
                    <div className="item">
                        <a href="#">Cómo comprar</a>
                    </div>

                    <div className="item">
                        <a href="#">Formas de pago</a>
                    </div>

                    <div className="item">
                        <a href="#">Gastos de envío</a>
                    </div>

                    <div className="item">
                        <a href="#">Cupones descuento</a>
                    </div>

                    <div className="item">
                        <a href="#">Preguntas frecuentas</a>
                    </div>

                    <div className="item">
                        <a href="#">Opiniones de clientes</a>
                    </div>

                    <div className="item">
                        <a href="#">Tarjetas regalo</a>
                    </div>

                    <div className="item">
                        <a href="#">Servicio para empresas</a>
                    </div>

                    <div className="item">
                        <a href="#">Compras para empresas</a>
                    </div>
                </div>

                {/* quienes somos */}
                <div className="quienes_somos">
                    <h2>Quiénes somos</h2>
                    <div className="item">
                        <a href="#">Cómo comprar</a>
                    </div>

                    <div className="item">
                        <a href="#">Formas de pago</a>
                    </div>

                    <div className="item">
                        <a href="#">Gastos de envío</a>
                    </div>

                    <div className="item">
                        <a href="#">Cupones descuento</a>
                    </div>

                    <div className="item">
                        <a href="#">Preguntas frecuentas</a>
                    </div>

                    <div className="item">
                        <a href="#">Opiniones de clientes</a>
                    </div>

                    <div className="item">
                        <a href="#">Tarjetas regalo</a>
                    </div>

                    <div className="item">
                        <a href="#">Servicio para empresas</a>
                    </div>

                    <div className="item">
                        <a href="#">Compras para empresas</a>
                    </div>
                </div>

                {/* contactar */}

                <div className="contactar">
                    <h2>Contactar</h2>
                    <div className="item">
                        <a href="#">Contactar</a>
                    </div>

                    <div className="item">
                        <a href="#">Formas de pago</a>
                    </div>

                    <div className="item">
                        <a href="#">Gastos de envío</a>
                    </div>

                    <div className="item">
                        <a href="#">Cupones descuento</a>
                    </div>

                    <div className="item">
                        <a href="#">Preguntas frecuentas</a>
                    </div>

                    <div className="item">
                        <a href="#">Opiniones de clientes</a>
                    </div>

                    <div className="item">
                        <a href="#">Tarjetas regalo</a>
                    </div>

                    <div className="item">
                        <a href="#">Servicio para empresas</a>
                    </div>

                    <div className="item">
                        <a href="#">Compras para empresas</a>
                    </div>
                </div>

                {/* otros */}
                <div className="otros">
                    <h2>Otros</h2>
                    <div className="item">
                        <a href="#">Cómo comprar</a>
                    </div>

                    <div className="item">
                        <a href="#">Formas de pago</a>
                    </div>

                    <div className="item">
                        <a href="#">Gastos de envío</a>
                    </div>

                    <div className="item">
                        <a href="#">Cupones descuento</a>
                    </div>

                    <div className="item">
                        <a href="#">Preguntas frecuentas</a>
                    </div>

                    <div className="item">
                        <a href="#">Opiniones de clientes</a>
                    </div>

                    <div className="item">
                        <a href="#">Tarjetas regalo</a>
                    </div>

                    <div className="item">
                        <a href="#">Servicio para empresas</a>
                    </div>

                    <div className="item">
                        <a href="#">Compras para empresas</a>
                    </div>
                </div>
            </div>

            {/* formas de pago aceptadas */}
            <div className="formas_pago">
                <div className="visa">
                    <img src={formas_de_pago.visa.url} 
                    alt={formas_de_pago.visa.alt} />
                </div>

                <div className="mastercard">
                    <img src={formas_de_pago.MasterCard.url} 
                    alt={formas_de_pago.MasterCard.alt} />
                </div>

                <div className="trasnferencia">
                    <img src={formas_de_pago.transferencia.url} // aqui te quedaste
                    alt={formas_de_pago.transferencia.alt} />
                </div>

                <div className="efectivo">
                    <img src={formas_de_pago.efectivo.url} 
                    alt={formas_de_pago.efectivo.alt} />
                </div>
            </div>

            {/* all rights reserved */}
            <p className="text-center bold text-white p-2">All Rights Reserved @Modtech</p>
        </div>
    </>
}