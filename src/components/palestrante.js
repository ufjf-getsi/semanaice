import React, { Component } from 'react';
import '../css/palestrante.css';

class palestrante extends Component{

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

export default palestrante;