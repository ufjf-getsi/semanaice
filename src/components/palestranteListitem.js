import React, { Component } from 'react';
import '../css/palestranteListitem.css';

class palestranteListitem extends Component{

    render(){
        return (
            <div id="item-PalestranteItem">
                <p className="nome-PalestranteItem">Palestrante Nome</p>
                <p className="descricao-PalestranteItem">Descrição</p>
                <p className="contato-PalestranteItem"> Contato </p>
            </div>
        );
    }
}

export default palestranteListitem;