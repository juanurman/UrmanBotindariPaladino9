import React from "react";

function Header() {
    return (
        <div>
            <h1>UdeSA Movies</h1>
            <nav>
                <ul className="nav nav-tabs my-4">
                    <li className="nav-item">
                        <a className="nav-link" href="index.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="movies.html">Películas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="series.html">Series</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="favorites.html">Favoritas</a>
                    </li>
                    <li className="nav-item ml-auto">
                        <a className="nav-link" href="register.html">Registro</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="login.html">Login</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;