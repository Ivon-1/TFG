import { useState } from "react";
import styles from "./styles/facturas.module.scss";
import todas_imagenes from "../../data/imagenes";

export function Facturas() {
    return (
        <div className={styles.facturas}>
            <header className={styles.header_facturas}>
                <div className={styles.logo_facturas}>
                    <img src={todas_imagenes.logo.url}
                        alt={todas_imagenes.logo.nombre} />
                </div>
            </header>
        </div>
    );
}
