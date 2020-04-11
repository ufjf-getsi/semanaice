import React, { Component } from 'react';
import '../css/AtividadeDetalhes.css';
import { parseISO, format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/esm/locale';
import Speakers from '../data/speakers';
import Modal from 'react-modal';

var x = window.matchMedia("(max-width: 48em)");

Modal.setAppElement('#root');
class AtividadeDetalhes extends Component {
    constructor() {
        super();
        if (x.matches) {
            this.state = {modalOverlayStyles: { backgroundColor: 'rgba(0,0,0,0.5)', left: 0, display: 'flex', justifyContent: 'center' }, modalContentStyles: { position: 'absolute', width: '90%', maxWidth: 1000, outline: 'none', borderRadius: 5 }};
        } else {
            this.state = {modalOverlayStyles: { backgroundColor: 'rgba(0,0,0,0.5)', left: 150, display: 'flex', justifyContent: 'center' }, modalContentStyles: { position: 'absolute', width: '80%', maxWidth: 1000, outline: 'none', borderRadius: 5 }};
        }

        this.windowManager = this.windowManager.bind(this);

        x.addListener(this.windowManager);
    }

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

    windowManager(x) {
        if (x.matches) {
            this.setState({modalOverlayStyles: { backgroundColor: 'rgba(0,0,0,0.5)', left: 0, display: 'flex', justifyContent: 'center' }, modalContentStyles: { position: 'absolute', width: '90%', maxWidth: 1000, outline: 'none', borderRadius: 5 }});
        } else {
            this.setState({modalOverlayStyles: { backgroundColor: 'rgba(0,0,0,0.5)', left: 150, display: 'flex', justifyContent: 'center' }, modalContentStyles: { position: 'absolute', width: '80%', maxWidth: 1000, outline: 'none', borderRadius: 5 }});
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
                    style={{ overlay: this.state.modalOverlayStyles, content: this.state.modalContentStyles }}
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