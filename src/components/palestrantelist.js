import React, { Component } from 'react';
import PalestranteListitem from './palestranteListitem';
import '../css/palestranteList.css';

class palestranteList extends Component{

render(){
    return (
        <div id="list-Palestrante">
            <div className="header-Palestrante">
                <h1 className="title-Palestrante">Palestrantes</h1>
            </div>

            <div className="content-Palestrante">
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