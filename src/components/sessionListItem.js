import React, { Component } from 'react';
import '../css/sessionListItem.css';

class sessionListItem extends Component{


    render(){
        return (
            <div id="item-SessionItem" key={this.props.id}>
                <p className="titulo-SessionItem">{this.props.nome}</p>
                <p className="horarioLocal-SessionItem">{this.props.dataInicio} - {this.props.dataFinal}: {this.props.local}</p>
            </div>
        );
    }
}

export default sessionListItem;