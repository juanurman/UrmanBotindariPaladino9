import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Loader from "../Loader/loader";
import Pelicula from "../Pelicula/Pelicula"; 

// URL para traer películas populares
let url_popular = "https://api.themoviedb.org/3/discover/movie?api_key=a016baaa9f1f222d6f473a9acae180a0&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

// URL para traer películas en cartelera
let url_cartel = "https://api.themoviedb.org/3/discover/movie?api_key=a016baaa9f1f222d6f473a9acae180a0&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2%7C3&release_date.gte=2026-03-01&release_date.lte=2026-04-30";

class Peliculas extends Component {
    constructor() {
        super();
        this.state = {
            populares: [], // guarda películas populares
            cartelera: []  // guarda películas en cartelera
        };
    }

    // se ejecuta automáticamente cuando el componente se carga
    componentDidMount() {

        // fetch para películas populares
        fetch(url_popular)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    // guarda solo las primeras 4 películas
                    populares: data.results.filter((pelicula, index) => index < 4)
                });
            })
            .catch(error => console.log(error));

        // fetch para películas en cartelera
        fetch(url_cartel)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    // guarda solo las primeras 4 películas
                    cartelera: data.results.filter((pelicula, index) => index < 4)
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <>
                {/* título sección populares */}
                <h2 className="alert alert-primary">Popular movies this week</h2>

                <section className='row cards'>
                    {
                        // si todavía no cargaron los datos → muestra loader. Si si hay algo se lo pasa al componente.
                        this.state.populares.length === 0 ? 
                        <Loader/> : 
                        // si ya cargaron → muestra el componente pelicula el cual va a recorrer el array con todas las peliculas
                        <Pelicula info={this.state.populares} />
                    }
                </section>

                {/* link para ver todas las populares */}
                <Link to="/categoria/Populares" className="btn btn-primary">
                    Ver todas las Populares
                </Link>

                {/* título sección cartelera */}
                <h2 className="alert alert-primary">Movies now playing</h2>

                <section className="row cards">
                    {
                        // si todavía no cargaron los datos → loader. Si si hay algo le pasa ese array como prop al componente pelicula. 
                        this.state.cartelera.length === 0 ? 
                        <Loader/> : 
                        // si ya cargaron → muestra el componente hijo pelicula.
                        <Pelicula info={this.state.cartelera} />
                    }
                </section>

                {/* link para ver toda la cartelera */}
                <Link to="/categoria/Cartelera" className="btn btn-primary">
                    Ver todas en Cartelera
                </Link>
            </>
        );
    }
}

export default Peliculas;