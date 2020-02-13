import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import '../css/AtividadeDetalhes.css';

class AtividadeDetalhes extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props.atividade);
    }

    render(){
        return(
            <div className="corpo-detalhes">
                <div className="header-detalhes">
                    <button id="back-detalhes" onClick={this.props.onHide} />
                    <p>Atividade</p>
                </div>
                <div className="body-datalhes">
                <h2> {this.props.atividade.name} </h2>
                </div>
            </div>
        );
    }
}

export default AtividadeDetalhes;