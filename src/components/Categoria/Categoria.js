import React, { Component } from "react";
import Pelicula from "../Pelicula/Pelicula"; 
import Loader from "../Loader/loader";

class Categoria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [], // guarda todas las películas de la categoría
            primeraPagina: 1, // controla la pagina actual
            value: ""
        };
    }

    // diferentes URLs segun la categoría
    urls = {
        Populares: "https://api.themoviedb.org/3/movie/popular?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US",
        Cartelera: "https://api.themoviedb.org/3/movie/now_playing?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US",
        Movies: "https://api.themoviedb.org/3/trending/movie/day?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US",
        TV: "https://api.themoviedb.org/3/tv/popular?api_key=a016baaa9f1f222d6f473a9acae180a0&language=en-US"
    }

    // se ejecuta cuando el componente se carga por primera vez
    componentDidMount() {
        const urlBase = this.urls[this.props.categoria]; // el valor viene de la prop del screen Categorias.js. Dependiendo lo que viene se usa un endpoint u otro.
        console.log(urlBase)
        fetch(`${urlBase}&page=1`)
            .then(res => res.json())
            .then(data => this.setState({ peliculas: data.results })) 
            .catch(err => console.log(err));
    }

    // se ejecuta cuando cambian las props (ej: cambia la categoría)
    componentDidUpdate(props) {
        if (this.props.categoria !== props.categoria) {
            
            // resetea el estado
            this.setState({ 
                peliculas: [], 
                primeraPagina: 1 
            }, () => {
                const urlBase = this.urls[this.props.categoria];

                // vuelve a hacer fetch con la nueva categoría
                fetch(`${urlBase}&page=1`)
                    .then(res => res.json())
                    .then(data => this.setState({ peliculas: data.results }))
                    .catch(err => console.log(err));
            });
        }
        console.log(this.state.peliculas)
    }

    // función para cargar más películas (paginacion)
    cargarMas = () => {
        const proximaPagina = this.state.primeraPagina + 1;

        fetch(this.obtenerUrl(proximaPagina)) // trae la siguiente página y junta la info con la que ya teniamos
            .then(response => response.json())
            .then(data => {
                this.setState({
                    // agrega las nuevas películas a las que ya tenía y cambia el valor paginaactual a la variable proximapagina
                    peliculas: this.state.peliculas.concat(data.results),
                    paginaActual: proximaPagina
                });
            })
            .catch(error => console.log(error));
    }
     controlCambios(e){
        this.setState({
        value: e.target.value
    })
}
    render() {
        let peliculasFiltradas = this.state.peliculas.filter(peli => {
        // Busca title. Si no hay, busca name. Si por algún motivo no hay ninguno, usa un string vacío.
       const tituloSeguro = peli.title || peli.name || ""; 
    
        return tituloSeguro.toLowerCase().includes(this.state.value.toLowerCase());
    });
        return (
            <main>
                <form className="form">
                    <label className="label-filtrar">
                        Filtrar pelicula : </label>
                    <input type="text" onChange={(e)=> this.controlCambios(e)} value={this.state.value}/>

            </form>
                {/* muestra el nombre de la categoría */}
                <h2 className="alert alert-primary">
                    {this.props.categoria}
                </h2>

                <section className="row cards all-movies">
                    {
                        // si no hay datos loader
                        this.state.peliculas.length === 0 ? (
                            <Loader/>
                        ) : (
                            // si hay datos muestra películas
                            <Pelicula info={peliculasFiltradas} /> 
                        )
                    }
                </section>

                {/* botón para cargar más películas */}
                <button className="btn btn-info mt-3" onClick={this.cargarMas}>
                    Cargar más
                </button>
            </main>
        );
    }
}

export default Categoria;