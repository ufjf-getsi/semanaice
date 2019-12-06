import React, { Component } from 'react';
import '../css/PalestrantesListItem.css';

class PalestrantesListItem extends Component{

    render(){
        return (
            <div id="item-PalestrantesItem">
                <p className="nome-PalestrantesItem">Palestrante Nome</p>
                <p className="descricao-PalestrantesItem">Descrição</p>
                <p className="contato-PalestrantesItem"> Contato </p>
            </div>
        );
    }
}

export default PalestrantesListItem;