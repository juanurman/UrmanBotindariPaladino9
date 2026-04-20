import React, {Component} from "react";
import Header from "../Header/Header.js";
import Search from "../Search/Search.js";
import Pelicula from "../Pelicula/Pelicula";
import Loader from "../Loader/loader";

class Results extends Component{
    constructor(props) {
        super(props);
        this.state = {
            resultados: [],
        };
    }

    componentDidMount() {
        const busqueda = this.props.match.params.busqueda;
        const tipo = this.props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/search/${tipo}?query=${busqueda}&api_key=a016baaa9f1f222d6f473a9acae180a0`)
            .then(res => res.json())
            .then(data => {
                if(data.results){
                    this.setState({
                        resultados: data.results,
                    });
                }
            })
            .catch(err => console.log(err));
    }

    render(){
    return (
        <>
        <Header />
        <section className="row cards">
            {this.state.resultados === 0 ?
            <Loader/>:
            <Pelicula info={this.state.resultados}/>
        }
        </section>
        </>
        );

}}

export default Results
