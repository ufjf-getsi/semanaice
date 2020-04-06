import React, { Component } from 'react';
import '../css/PalestrantesListItem.css';

class PalestrantesListItem extends Component {

    render() {
        return (
            <div id="content-PalestrantesItem" key={this.props.id}>
                <img id="perfil" src={this.props.perfil} alt={this.props.nome} />
                <p id="nome"><label className="titles">Nome: </label> {this.props.nome}</p>
                <p id="descricao"><label className="titles">Descrição: </label> {this.props.descricao}</p>
                <p id="contato"><label className="titles">Contato: </label> {this.props.contato} </p>
            </div>
        );
    }
}

export default PalestrantesListItem;