import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";




function Header() {
    const cookies = new Cookies()
    let usuario = cookies.get("usuario");
    const logOut = () => {
        cookies.remove("usuario")
        alert("Se cerro sesión de forma correcta, recargue la página")
    }
    return (
        <div>
            <h1>UdeSA Movies</h1>
            <nav>
                <ul className="nav nav-tabs my-4">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/categoria/Populares" className="nav-link">
                            Populares
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/categoria/Cartelera" className="nav-link">
                            Cartelera
                        </Link>
                    </li>
                    {usuario ? (
                        <li className="nav-item">
                            <Link to="/favoritos" className="nav-link">Favoritas</Link>
                        </li>): ""}

                    {!usuario ? (
                        <li className="nav-item ml-auto">
                            <Link to="/registro" className="nav-link">Registro</Link>
                        </li>): ""}

                    {!usuario ? (
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    ): ""}
                    {!usuario ?  "":
                    (
                        <li className="nav-item ml-auto">
                            <button  onClick={logOut} className="nav-link">
                                Log out
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Header;