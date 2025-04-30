import { useState } from "react";
import styles from "./styles/login.module.css";
import { Login } from "../../components/common/login";
export function FormularioLogin() {
    return <div className={styles.login}>
        <Login />
    </div>
}