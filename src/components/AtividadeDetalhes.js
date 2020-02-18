import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import '../css/AtividadeDetalhes.css';
import { parseISO, format, differenceInDays } from 'date-fns';
import {ptBR} from 'date-fns/esm/locale';
import Speakers from '../data/speakers';


class AtividadeDetalhes extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        var primeiraData = parseISO(this.props.atividade.dateTimeStart);
        var segundaData = parseISO(this.props.atividade.dateTimeEnd);

        var diferencaDias = differenceInDays(primeiraData, segundaData);

        if(diferencaDias === 0){
            this.setState({mesmoDia : true});
        } else {
            this.setState({mesmoDia : false});
        }
    }

    render(){
        var localAtividade = this.props.atividade;
        return(
            <div className="corpo-detalhes">
                <div className="header-detalhes">
                    <button id="back-detalhes" onClick={this.props.onHide} />
                    <p>Atividade</p>
                </div>
                <div className="body-datalhes">
                    <h2 className="titulo-detalhes"> {this.props.atividade.name} </h2>
                    <p className="datatitulo-detalhes" >Data: </p> <p className="data-detalhes" > {format(parseISO(this.props.atividade.dateTimeStart), "'dia' dd 'de' MMMM', as ' HH:mm'hs;'", {locale: ptBR})} </p> <br/>
                    <p className="localtitulo-detalhes" >Local: </p> <p className="local-detalhes" > {this.props.atividade.location};</p> <br/>
                    <p className="palestrantetitulo-detalhes" >Palestrante: </p> {
                        Speakers.map(function(palestrante){
                            if(palestrante.id === localAtividade.speakerIds){
                                return(<p key={palestrante.id} className="palestrante-detalhes" > {palestrante.name}; </p>);
                            }
                        })
                    } <br/>
                    <label className="descricao-detalhes" ><p className="descricaotitulo-detalhes" >Descrição: </p> {this.props.atividade.description} </label>
                </div>
            </div>
        );
    }
}

export default AtividadeDetalhes;