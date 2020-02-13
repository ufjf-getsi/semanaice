import React, {Component} from 'react';
import AtividadesList from './AtividadesList';
import AtividadeDetalhes from './AtividadeDetalhes';
import PubSub from 'pubsub-js';

class BoxAtividades extends Component{
    constructor(){
        super();
        this.state = {showDetalhes : false, atividade : null};
    }

    componentDidMount(){
        PubSub.subscribe('showDetalhes', function(topico, detalhes){
            this.setState({showDetalhes : detalhes.show, atividade : detalhes.atividade});
        }.bind(this));
    }

    render(){
        let closeDetalhes =() => this.setState({showDetalhes : false});

        if(!this.state.showDetalhes){
            return(
                <AtividadesList/>
            );
        } else {
            return(
                <AtividadeDetalhes onHide={closeDetalhes} atividade={this.state.atividade} />
            );
        }
    }
}

export default BoxAtividades;