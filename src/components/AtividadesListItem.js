import React, { Component } from 'react';
import '../css/AtividadesListItem.css';
import Speakers from '../data/speakers'
import PubSub from 'pubsub-js';

class AtividadesListItem extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(this.props.fav){
            document.getElementById(this.props.id).style.background = "#d61f1f";
            document.getElementById(this.props.id).style.color = "#ffffff";
        } else {
            document.getElementById(this.props.id).style.background = "#ffffff";
            document.getElementById(this.props.id).style.color = "#000000";
        }
    }

    favoritar(evento){    
        if(localStorage.getItem("favoritos") != null){
            var favoritos = JSON.parse(localStorage.getItem("favoritos"));
            var atual = this.props.atividade;
            var existe = false;
            favoritos.map(function(item){
                if(item.id === atual.id){
                    existe = true;
                }
                return(null);
            })
            if(!existe){
                favoritos.push(this.props.atividade);
                localStorage.setItem("favoritos", JSON.stringify(favoritos));

                document.getElementById(this.props.id).style.background = "#d61f1f";
                document.getElementById(this.props.id).style.color = "#ffffff";
            } else {
                var novoFavoritos = [];
                favoritos.map(function(item){
                    if(item.id !== atual.id){
                        novoFavoritos.push(item);
                    }
                })
                localStorage.setItem("favoritos", JSON.stringify(novoFavoritos));
                PubSub.publish('atualizaFavoritos', novoFavoritos);

                document.getElementById(this.props.id).style.background = "#ffffff";
                document.getElementById(this.props.id).style.color = "#000000";
            }
        } else {
            var favoritos = [];
            favoritos.push(this.props.atividade);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));

            document.getElementById(this.props.id).style.background = "#d61f1f";
            document.getElementById(this.props.id).style.color = "#ffffff";
        }
    }


    render(){
        return (
            <div id="item-AtividadesItem">
                <p className="titulo-AtividadesItem">{this.props.nome}</p>
                <p className="horarioLocal-AtividadesItem">{this.props.dataInicio} - {this.props.dataFinal}: {this.props.local}</p>
                <button className="favoritar-AtividadesItem" id={this.props.id} onClick={this.favoritar.bind(this)}>Favoritar </button>
                
            </div>
        );
    }
}

export default AtividadesListItem;