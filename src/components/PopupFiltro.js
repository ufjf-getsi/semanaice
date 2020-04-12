import React, { Component } from 'react';
import Modal from 'react-modal';
import '../css/PopupFiltro.css';

var x = window.matchMedia("(max-width: 48em)");

class PopupFiltro extends Component {
    constructor() {
        super();

        if (x.matches) {
            this.state = { modalOverlayStyles: { display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', left: 0 }, modalContentStyles: { position: 'absolute', width: 310, height: 'auto', backgroundColor: '#fff', outline: 'none', borderRadius: 5 } };
        } else {
            this.state = { modalOverlayStyles: { display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', left: 150 }, modalContentStyles: { position: 'absolute', width: 500, height: 'auto', backgroundColor: '#fff', outline: 'none', borderRadius: 5 } };
        }

        this.limparFiltro = this.limparFiltro.bind(this);
        this.salvar = this.salvar.bind(this);
        this.windowManager = this.windowManager.bind(this);

        x.addListener(this.windowManager);
    }

    //Método para resetar o filtro
    limparFiltro() {
        this.props.resetar();
        this.props.rotulos.map(function (rotulo) {
            if (document.getElementById(rotulo)) {
                document.getElementById(rotulo).checked = true;
            }
            return (null);
        })
    }

    //Método para salvar o filtro
    salvar() {
        var aux = [];
        this.props.rotulos.map(function (rotulo) {
            if (document.getElementById(rotulo).checked) {
                aux.push(rotulo);
            }
            return (null);
        })

        if (aux.length < this.props.rotulos.length) {
            this.props.salvar(aux);
        } else {
            this.props.resetar();
        }
    }

    windowManager(x) {
        if (x.matches) {
            this.setState({ modalOverlayStyles: { display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', left: 0 }, modalContentStyles: { position: 'absolute', width: 310, height: 'auto', backgroundColor: '#fff', outline: 'none', borderRadius: 5 } });
        } else {
            this.setState({ modalOverlayStyles: { display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', left: 150 }, modalContentStyles: { position: 'absolute', width: 500, height: 'auto', backgroundColor: '#fff', outline: 'none', borderRadius: 5 } });
        }
    }


    render() {
        var localFiltro = this.props.filtro;
        var localColors = this.props.colors;
        var cont = 0;

        if (this.props.show) {
            return (
                <Modal
                    isOpen={this.props.show}
                    onRequestClose={this.props.onHide}
                    className="modalDetalhes"
                    shouldCloseOnEsc={true}
                    style={{ overlay: this.state.modalOverlayStyles, content: this.state.modalContentStyles }}
                >
                    <div id="content-Filtro">
                        <div id="header" >
                            <p>Filtro</p>
                        </div>

                    </div>
                    <div id="body">
                        <form action="#">
                            {
                                this.props.filtrado ?

                                    this.props.rotulos.map(function (rotulo) {
                                        var checado = false;

                                        localFiltro.map(function (auxFiltro) {
                                            if (rotulo === auxFiltro) {
                                                checado = true;
                                            }
                                            return (null);
                                        })
                                        cont++;
                                        return (
                                            <div key={rotulo}>
                                                <label className="point-popup" style={{ backgroundColor: localColors[cont - 1].hexadecimal }}></label>
                                                <p className="titleFilter-popup">{rotulo}</p>
                                                <label className="switch-popup">
                                                    <input type="checkbox" id={rotulo} defaultChecked={checado} />
                                                    <span className="slider-popup"></span>
                                                </label>
                                            </div>
                                        )
                                    }) : this.props.rotulos.map(function (rotulo) {
                                        cont++;
                                        return (
                                            <div key={rotulo}>
                                                <label className="point-popup" style={{ backgroundColor: localColors[cont - 1].hexadecimal }}></label>
                                                <p className="titleFilter-popup">{rotulo}</p>
                                                <label className="switch-popup">
                                                    <input type="checkbox" id={rotulo} defaultChecked={true} />
                                                    <span className="slider-popup"></span>
                                                </label>
                                            </div>
                                        )
                                    })
                            }

                            <div className="filtroBotoes-popup">
                                <input type="button" value="Fechar" className="filtroCancelar-popup" onClick={this.props.onHide} />
                                <input type="button" value="Salvar" className="filtroSalvar-popup" onClick={this.salvar} />
                                <input type="button" value="Resetar" className="filtroResetar-popup" onClick={this.limparFiltro} />
                            </div>
                        </form>
                    </div>
                </Modal>
            );
        } else {
            return (null);
        }
    }
}

export default PopupFiltro;