import React, { Component } from 'react';
import Palestrante from './palestrante';
import '../css/palestranteList.css';

class palestranteList extends Component{

render(){
    return (
        <div id="sessionList">
            <div className="header">
                <h1 className="titleSession">Palestrantes</h1>
            </div>

            <div className="content">
                <Palestrante/>
                <Palestrante/>
                <Palestrante/>
                <Palestrante/>
                <Palestrante/>
            </div>
        </div>
    );
}
}

export default palestranteList