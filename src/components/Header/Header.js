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
                        <a className="nav-link" href="movies.html">Películas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="series.html">Series</a>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Favoritas</Link>
                    </li>
                    <li className="nav-item ml-auto">
                        <Link to="/" className="nav-link">Registro</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;