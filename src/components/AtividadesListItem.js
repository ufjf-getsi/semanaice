import React, { Component } from 'react';
import '../css/AtividadesListItem.css';

class AtividadesListItem extends Component{


    render(){
        return (
            <div id="item-AtividadesItem" key={this.props.id}>
                <p className="titulo-AtividadesItem">{this.props.nome}</p>
                <p className="horarioLocal-AtividadesItem">{this.props.dataInicio} - {this.props.dataFinal}: {this.props.local}</p>
            </div>
        );
    }
}

export default AtividadesListItem;