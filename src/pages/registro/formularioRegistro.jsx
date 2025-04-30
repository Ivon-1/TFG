import { useState } from "react";
import styles from "./styles/registro.module.scss";
import { Registro } from "../../components/common/register";
export function RegistroPage() {
    return <div className={styles.registro}>
        <Registro />
    </div>
}