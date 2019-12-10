import React, { Component } from 'react';
import '../css/PalestrantesListItem.css';

class PalestrantesListItem extends Component{

    render(){
        return (
            <div id="item-PalestrantesItem" key={this.props.id}>
                <img className="perfil-PalestrantesItem" src={this.props.perfil} alt="Perfil"/>
                <p className="nome-PalestrantesItem">{this.props.nome}</p>
                <p className="descricao-PalestrantesItem">{this.props.descricao}</p>
                <p className="contato-PalestrantesItem"> {this.props.contato} </p>
            </div>
        );
    }
}

export default PalestrantesListItem;