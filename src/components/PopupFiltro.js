import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../css/PopupFiltro.css';

class PopupFiltro extends Component {
    constructor() {
        super();

        this.limparFiltro = this.limparFiltro.bind(this);
        this.salvar = this.salvar.bind(this);
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


    render() {
        var localFiltro = this.props.filtro;
        var localColors = this.props.colors;
        var cont = 0;
        return (

            <Modal className="modal-popup"
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className="modal-popup">
                    <Modal.Header className="header-popup">
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h2>Filtro</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="body-popup">
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
                    </Modal.Body>
                </div>
            </Modal>

        );
    }
}

export default PopupFiltro;