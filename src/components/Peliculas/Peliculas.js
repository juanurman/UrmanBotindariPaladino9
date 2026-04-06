import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Loader from "../Loader/loader";
import Pelicula from "../Pelicula/Pelicula"; 


let url_popular = "https://api.themoviedb.org/3/discover/movie?api_key=a016baaa9f1f222d6f473a9acae180a0&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

let url_cartel = "https://api.themoviedb.org/3/discover/movie?api_key=a016baaa9f1f222d6f473a9acae180a0&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2%7C3&release_date.gte=2026-03-01&release_date.lte=2026-04-30";
class Peliculas extends Component {
    constructor() {
        super();
        this.state = {
            populares: [],
            cartelera: []
        };
    }

    componentDidMount() {
        fetch(url_popular)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    populares: data.results.filter((pelicula, index) => index < 4)
                });
            })
            .catch(error => console.log(error));

        fetch(url_cartel)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    cartelera: data.results.filter((pelicula, index) => index < 4)
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <>
                <h2 className="alert alert-primary">Popular movies this week</h2>
                <section className='row cards'>
                    {this.state.populares.length === 0 ? 
                        <Loader/> : 
                        <Pelicula info={this.state.populares} />
                    }
                </section>
                <Link to="/categoria/Populares" className="btn btn-primary">
                        Ver todas las Populares
                </Link>

                <h2 className="alert alert-primary">Movies now playing</h2>
                <section className="row cards">
                    {this.state.cartelera.length === 0 ? 
                        <Loader/> : 
                        <Pelicula info={this.state.cartelera} />
                    }
                </section>
                 <Link to="/categoria/Cartelera" className="btn btn-primary">
                        Ver todas en Cartelera
                </Link>


            </>
        );
    }
}

export default Peliculas;