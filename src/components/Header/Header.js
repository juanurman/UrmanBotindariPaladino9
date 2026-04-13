import React from "react";
import { Link } from "react-router-dom";

function Header() {
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
                    <li className="nav-item">
                        <Link to="/favoritos" className="nav-link">Favoritas</Link>
                    </li>
                    <li className="nav-item ml-auto">
                        <Link to="/registro" className="nav-link">Registro</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;