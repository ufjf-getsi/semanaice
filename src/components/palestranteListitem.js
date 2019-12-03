import React, { Component } from 'react';
import '../css/palestranteListitem.css';

class palestranteListitem extends Component{

    render(){
        return (
            <div id="item">
                <p className="nome">Palestrante Nome</p>
                <p className="descricao">Descrição</p>
                <p className="contato"> Contato </p>
            </div>
        );
    }
}

export default palestranteListitem;