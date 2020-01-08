import React, { Component } from 'react';
import '../css/Sobre.css';

class Sobre extends Component {
    render() {
        document.title = 'Semana do ICE - Sobre';
        return(
            <div className="content-Sobre">
                <div className="header-Sobre">
                    <h1 className="title-Sobre">Sobre</h1>
                </div>
                <div className="corpo-Sobre">
                    <img src="img/ice.jpg" className="ice-Sobre" alt="ICE"/>
                    <h2>Semana do ICE</h2>
                    <p>A semana do ICE acontece anualmente há mais de 20 anos na Universidade Federal de 
                        Juiz de Fora (UFJF), sempre durante a Semana Nacional de Ciência e Tecnologia e 
                        apresenta programações específicas das semanas dos departamentos que fazem parte 
                        do Instituto (Computação, Matemática, Física, Química e Estatística) que promovem 
                        palestras, minicursos, uma Feira de Ciências e mais. O objetivo do evento é 
                        proporcionar aos alunos contato com o universo científico e profissional desta área 
                        de conhecimento, despertando neles o interesse pela inovação. A Semana do ICE é 
                        destinada aos alunos de Exatas pelas especificidades dos temas, no entanto, as 
                        atividades são abertas a toda comunidade acadêmica e aos estudantes de outras 
                        instituições.</p>
                </div>
            </div>
        );
    }
}

export default Sobre;