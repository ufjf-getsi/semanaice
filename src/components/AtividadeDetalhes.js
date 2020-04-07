import React, { Component } from 'react';
import '../css/AtividadeDetalhes.css';
import { parseISO, format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/esm/locale';
import Speakers from '../data/speakers';
import Modal from 'react-modal';


Modal.setAppElement('#root');
class AtividadeDetalhes extends Component {

    componentWillMount() {
        if (this.props.show) {
            var primeiraData = parseISO(this.props.atividade.dateTimeStart);
            var segundaData = parseISO(this.props.atividade.dateTimeEnd);

            var diferencaDias = differenceInDays(primeiraData, segundaData);

            if (diferencaDias === 0) {
                this.setState({ mesmoDia: true });
            } else {
                this.setState({ mesmoDia: false });
            }
        }
    }

    getPalestrantes() {
        var palestrantesNomes = [];
        for(var i=0; i<this.props.atividade.speakerIds.length; i++) {
            for(var j=0; j<Speakers.length; j++) {
                if(this.props.atividade.speakerIds[i] === Speakers[j].id) {
                    palestrantesNomes.push({id: Speakers[j].id, name: Speakers[j].name});
                }
            }
        }

        return palestrantesNomes;
    }

    render() {
        if (this.props.show) {
            return (
                <Modal
                    isOpen={this.props.show}
                    onRequestClose={this.props.onHide}
                    className="modalDetalhes"
                    shouldCloseOnEsc={true}
                    style={{ overlay: { backgroundColor: 'rgba(0,0,0,0.5)' } }}
                >
                    <div id="content-Detalhes">
                        <div id="header">
                            <button id="back-detalhes" onClick={this.props.onHide} />
                            <p>Atividade</p>
                        </div>
                        <div id="body">
                            <h2 id="titulo"> {this.props.atividade.name} </h2>
                            <p className="titulos" >Data: </p> <p className="dados" > {format(parseISO(this.props.atividade.dateTimeStart), "'dia' dd 'de' MMMM', as ' HH:mm'hs,'", { locale: ptBR })} </p> <br />
                            <p className="titulos" >Local: </p> <p className="dados" > {this.props.atividade.location},</p> <br />
                            <p className="titulos" >Palestrante: </p> {
                                this.getPalestrantes().map(function(palestrante) {
                                    return (
                                        <p key={palestrante.id} className="dados" >{palestrante.name},</p>
                                    );
                                })
                            }
                            <label className="dados" id="descricao" ><p className="titulos" id="descricaoTitle" >Descrição: </p> {this.props.atividade.description} </label>
                        </div>
                    </div>
                </Modal>
            );
        } else {
            return (null);
        }
    }
}

export default AtividadeDetalhes;