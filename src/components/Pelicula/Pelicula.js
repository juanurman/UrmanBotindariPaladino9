import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Cookies from "universal-cookie";

//El id es simplemente un identificador único que tiene cada película, como si fuera su DNI. En tu componente lo usás para recordar cuál es la película que el usuario abrió al hacer clic en “ver más”. En lugar de guardar muchas variables para cada película, guardás solo un dato: el id de la película seleccionada. Entonces, cada vez que React dibuja la pantalla, compara el id de cada película con el que tenés guardado en el estado. Si coinciden, esa película se muestra “abierta” (con su descripción visible); si no coinciden, queda cerrada.


//Se crea el componente con estado. Tiene un estado con la variable ID
//Cada pelicula que viene de la API (TMDB) tiene un id único
class Pelicula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descripcion: [],
            seleccionadoId: null,
            usuario: undefined,
            favoritos: []
            
        };
    }
    componentDidMount(){
        let infoModificada = this.props.info.map(peli => {
            // Le "enchufamos" la propiedad nueva directamente al objeto
            peli.verDescripcion = false; 
            
            // Devolvemos la película ya modificada
            return peli; 
        });
        let favoritos = localStorage.getItem("favoritos");
        
        // Si no hay nada, crear array vacío
        if (favoritos === null) {
            favoritos = [];
        } else {
            favoritos = JSON.parse(favoritos);
        }
        this.setState({ 
            peliculas: infoModificada,
            favoritos: favoritos    
        });

        }
    //Si hay un update inserta el verdescripcion y vuelve todo false
    componentDidUpdate(props) {
        if (this.props.info !== props.info) {
           let infoModificada = this.props.info.map(peli => {
            // Le "enchufamos" la propiedad nueva directamente al objeto
            peli.verDescripcion = false; 
            
            // Devolvemos la película ya modificada
            return peli; 
        });
            
            this.setState({ 
                peliculas: infoModificada,
                // favoritos: favoritosCargados
            });
        }
        console.log(this.peliculas)
    }
    // se ejecuta cuando hacés click en el botón
    verMas(id) {
       let infoCambiada = this.state.peliculas.map(peli => {
            if (peli.id === id) {
                // Invertimos el valor directamente usando el punto
                peli.verDescripcion = !peli.verDescripcion; 
            }
            return peli;
        });

        this.setState({ peliculas: infoCambiada });
    };
    agregarFavorito(pelicula) {

    const tipo = pelicula.title ? "movie" : "tv";
    
    const nuevaPelicula = {
        id: pelicula.id,
        tipo: tipo,
        titulo: pelicula.title || pelicula.name
    };

    // 2. Traemos la lista que ya está en el localStorage
    let favoritosGuardados = localStorage.getItem("favoritos");
    let listaFavoritos = []; // Empezamos con un array vacío por defecto

    // Si ya había algo guardado, lo convertimos a array
    if (favoritosGuardados !== null) {
        listaFavoritos = JSON.parse(favoritosGuardados);
    }

    // 3. Usamos el .push() clásico que ya conoces
    // (No hacemos chequeos de si ya existe, simplemente lo agregamos)
    listaFavoritos.push(nuevaPelicula);

    // 4. Guardamos la lista actualizada de vuelta en el localStorage
    localStorage.setItem("favoritos", JSON.stringify(listaFavoritos));
    
    // 5. Actualizamos el estado de React con la lista nueva para que la pantalla se entere
    this.setState({ favoritos: listaFavoritos });
  }

    render() {
        const cookies = new Cookies()
        let usuario = cookies.get("usuario");
        console.log(usuario);
        return (
            // recorre el array de películas que viene por props. Viene del componente padre Peliculas.js
            this.props.info.map((pelicula) => {
                const tipo = pelicula.title ? "movie" : "tv";

                return(
                    <article className="single-card-movie" key={pelicula.id}>
                        
                        {/* imagen de la película */}
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} 
                            className="card-img-top" 
                            alt={pelicula.title} 
                        />
                        
                        <div className="cardBody">
                            {/* título */}
                            <h5 className="card-title">{pelicula.title}</h5>
                            
                            {/* descripción: se muestra o se oculta según el state */}
                            <section className={pelicula.verDescripcion ? "block" : "hide"}>
                                <p className="card-text">{pelicula.overview}</p>
                            </section>

                            {/* botón para mostrar/ocultar descripción */}
                            <button 
                                className='btn btn-secondary' 
                                onClick={() => this.verMas(pelicula.id)}
                            >
                                {/* cambia el texto según si está abierta o cerrada */}
                                {pelicula.verDescripcion
                                    ? "Ocultar descripción" 
                                    : "Ver descripción"}
                            </button>

                            {/* link para ir al detalle de la película */}
                            <Link to={`/detalle/${tipo}/${pelicula.id}`} className="btn btn-primary">
                                Ver más
                            </Link>

                            {usuario !== undefined ?
                            <button onClick={() => this.agregarFavorito(pelicula)}>
                                    Agregar a favoritos
                            </button> 
                             :
                            ""
                            }
                        </div>
                            
                    </article>
            )})
        );
    }
}

export default Pelicula;