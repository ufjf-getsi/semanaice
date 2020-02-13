import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
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
                                                <label className="point-popup" style={{backgroundColor: localColors[cont-1].hexadecimal}}></label>
                                                <p className="titleFilter-popup">{rotulo}</p>
                                                <label className="switch-popup">
                                                    <input type="checkbox" id={rotulo} defaultChecked={checado}/>
                                                    <span className="slider-popup"></span>
                                                </label>
                                            </div>
                                        )
                                    }) : this.props.rotulos.map(function(rotulo){
                                            cont++;
                                            return(
                                                <div key={rotulo}>
                                                    <label className="point-popup" style={{backgroundColor: localColors[cont-1].hexadecimal}}></label>
                                                    <p className="titleFilter-popup">{rotulo}</p>
                                                    <label className="switch-popup">
                                                        <input type="checkbox" id={rotulo} defaultChecked={true}/>
                                                        <span className="slider-popup"></span>
                                                    </label>
                                                </div>
                                            )
                                        })
                                }

                                <div className="filtroBotoes-popup">
                                    <input type="button" value="Fechar" className="filtroCancelar-popup" onClick={this.props.onHide} />
                                    <input type="button" value="Salvar" className="filtroSalvar-popup" onClick={this.props.salvar}/>
                                    <input type="button" value="Resetar" className="filtroResetar-popup" onClick={this.props.resetar}/>
                                </div>
                            </form>
                        </Modal.Body>
                    </div>
                </Modal>
            
        );
    }
}

export default PopupFiltro;