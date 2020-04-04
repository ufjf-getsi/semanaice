import React, {Component} from 'react';
import '../css/AtividadeDetalhes.css';
import { parseISO, format, differenceInDays } from 'date-fns';
import {ptBR} from 'date-fns/esm/locale';
import Speakers from '../data/speakers';
import Modal from 'react-modal';


Modal.setAppElement('#root');
class AtividadeDetalhes extends Component{

    componentWillMount(){
        if(this.props.show) {
            var primeiraData = parseISO(this.props.atividade.dateTimeStart);
            var segundaData = parseISO(this.props.atividade.dateTimeEnd);

            var diferencaDias = differenceInDays(primeiraData, segundaData);

            if(diferencaDias === 0){
                this.setState({mesmoDia : true});
            } else {
                this.setState({mesmoDia : false});
            }
        }
    }

    render(){
        var localAtividade = this.props.atividade;
        if(this.props.show) {
            return(
                <Modal 
                    isOpen={this.props.show} 
                    onRequestClose={this.props.onHide} 
                    className="modalDetalhes"
                    shouldCloseOnEsc={true}
                    style={{overlay: {backgroundColor: 'rgba(0,0,0,0.5)'}}}
                    >
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
                                return(null);
                            })
                        } <br/>
                        <label className="descricao-detalhes" ><p className="descricaotitulo-detalhes" >Descrição: </p> {this.props.atividade.description} </label>
                    </div>
                </div>
                </Modal>
            );
        } else {
            return(null);
        }
    }
}

export default AtividadeDetalhes;