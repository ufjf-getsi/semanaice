import React, { Component } from 'react';
import PalestranteListitem from './palestranteListitem';
import '../css/palestranteList.css';

class palestranteList extends Component{

render(){
    return (
        <div id="sessionList">
            <div className="header">
                <h1 className="titleSession">Palestrantes</h1>
            </div>

            <div className="content">
                <PalestranteListitem/>
                <PalestranteListitem/>
                <PalestranteListitem/>
                <PalestranteListitem/>
                <PalestranteListitem/>
                <PalestranteListitem/>
                <PalestranteListitem/>
                <PalestranteListitem/>
            </div>
        </div>
    );
}
}

export default palestranteList