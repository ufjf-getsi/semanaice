import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import '../css/PopupFiltro.css';

class PopupFiltro extends Component {
    constructor(props){
        super(props);
    }

    render(){
        var localFiltro = this.props.filtro;
        var localColors = this.props.colors;
        var cont = 0;
        return(
            
                <Modal className="modal"
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <div className="modal">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <h2>Filtro</h2>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form action="#">
                                {
                                this.props.filtrado ?
                                    
                                    this.props.rotulos.map(function(rotulo){
                                        var checado = false;
                                        
                                        localFiltro.map(function(auxFiltro){
                                            if(rotulo === auxFiltro){
                                                checado = true;
                                            }
                                        })
                                        cont++;
                                        return(
                                            <div key={rotulo}>
                                                <label className="point" style={{backgroundColor: localColors[cont-1].hexadecimal}}></label>
                                                <p className="titleFilter">{rotulo}</p>
                                                <label className="switch">
                                                    <input type="checkbox" id={rotulo} defaultChecked={checado}/>
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                        )
                                    }) : this.props.rotulos.map(function(rotulo){
                                            cont++;
                                            return(
                                                <div key={rotulo}>
                                                    <label className="point" style={{backgroundColor: localColors[cont-1].hexadecimal}}></label>
                                                    <p className="titleFilter">{rotulo}</p>
                                                    <label className="switch">
                                                        <input type="checkbox" id={rotulo} defaultChecked={true}/>
                                                        <span className="slider"></span>
                                                    </label>
                                                </div>
                                            )
                                        })
                                }

                                <div className="filtroBotoes">
                                    <input type="button" value="Cancelar" className="filtroCancelar" onClick={this.props.onHide} />
                                    <input type="button" value="Salvar" className="filtroSalvar" onClick={this.props.save}/>
                                    <input type="button" value="Resetar" className="filtroResetar" onClick={this.props.reset}/>
                                </div>
                            </form>
                        </Modal.Body>
                    </div>
                </Modal>
            
        );
    }
}

export default PopupFiltro;