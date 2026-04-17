import React, { Component } from "react";
import Loader from "../../components/Loader/loader.js";
import DetalleCard from "../../components/DetalleCard/detalleCard.js";
import Header from "../../components/Header/Header.js";

//Ese es un componente el cual toma como prop un id el cual saca con const id = this.props.match.params.id; cuando se monta el componente.
//Cuando tiene el id, me meto directo en la API de ese Id (CON EL API KEY QUE ES LA CONTRA) y la info la guardo en el estado.

//Luego con un if comparo si hay algo en el estado, si no hay es porque no hay un personaje en la API con ese id
//Si si hay algo, se guarda en el estado y lo renderizzo.

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {

    //Estos son componentes que nos da React Router DOM para obteeer valor de la ruta de navegacion
    //Ej: /detalle/movie/550
    const tipo = this.props.match.params.tipo; //"movie"
    const id = this.props.match.params.id; //"550"
    //Cada pelicula en el ver detalle tiene un path asi <Link to={`/detalle/${tipo}/${pelicula.id}`}

    
    //Con esta data me meto en el endpoint justo con la info de la pelicula que corresponde. 
    fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=e9f925b12dca795f233417e113ec423a`)
      .then(response => response.json())
      .then(data => this.setState({ 
        data: data,
        tipo:tipo
       }))
      .catch(error => console.log(error));

  }


  //Hago al funcion para agregar a favoritos una pelicula
  agregarFavorito() {

    // Traigo lo que ya hay o nada
    let favoritos = localStorage.getItem("favoritos");

    // Si no hay nada, crear array vacío
    if (favoritos === null) {
        favoritos = [];
    } else {
        favoritos = JSON.parse(favoritos);
    }

    // Agregar el nuevo favorito a la lista de favoritos previa. Tambien guardo el titulo para usarlo en favoritos.
    favoritos.push({
        id: this.state.data.id,
        tipo: this.state.tipo,
        titulo: this.state.data.title || this.state.data.name
    
    });

    // Guardo todo otra vez en el Storae para podes usarlo en otra sxreen. 
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    console.log(this.state.data.id, this.state.tipo, this.state.data.name)
  }

  //Los || es un or, se muestra o uno o el otro, dependiendo lo que corresponda si es serie o pelicula. 
  render() {
    if (!this.state.data) {
      return <Loader />;
    }

    return (
      <>
        <Header/>
        <main>
          <DetalleCard 
              //Le paso como prop toda la data en el estado
              data={this.state.data} 
              
              //A el componente hijo le paso la funcion de agregarfavorito para el boton. 
              agregar={() => this.agregarFavorito()} 
              />
        </main>
      </>
    );
  }
}

export default Detalle;