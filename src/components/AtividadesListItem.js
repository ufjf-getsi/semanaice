import React, { Component } from 'react';
import '../css/AtividadesListItem.css';

class AtividadesListItem extends Component{



    favoritar(evento){
        if(localStorage.getItem("favoritos") != null){
            var favoritos = JSON.parse(localStorage.getItem("favoritos"));
            favoritos.push(this.props.atividade);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        } else {
            var favoritos = [];
            favoritos.push(this.props.atividade);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        }
    }


    render(){
        return (
            <div id="item-AtividadesItem" key={this.props.id}>
                <p className="titulo-AtividadesItem">{this.props.nome}</p>
                <p className="horarioLocal-AtividadesItem">{this.props.dataInicio} - {this.props.dataFinal}: {this.props.local}</p>

                <button className="favoritar-AtividadesItem" id={"fav-" + this.props.id} onClick={this.favoritar.bind(this)}><span>Favoritar </span></button>
            </div>
        );
    }
}

export default AtividadesListItem;