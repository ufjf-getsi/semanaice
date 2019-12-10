import React, { Component } from 'react';
import '../css/PalestrantesListItem.css';

class PalestrantesListItem extends Component{

    render(){
        return (
            <div id="item-PalestrantesItem" key={this.props.id}>
                <img className="perfil-PalestrantesItem" src={this.props.perfil} alt={this.props.nome}/>
                <p className="nome-PalestrantesItem"><label className="titles-PalestrantesItem">Nome: </label> {this.props.nome}</p>
                <p className="descricao-PalestrantesItem"><label className="titles-PalestrantesItem">Descrição: </label> {this.props.descricao}</p>
                <p className="contato-PalestrantesItem"><label className="titles-PalestrantesItem">Contato: </label> {this.props.contato} </p>
            </div>
        );
    }
}

export default PalestrantesListItem;