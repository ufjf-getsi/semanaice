import React, { Component } from 'react';
import '../css/sessionListItem.css';

class sessionListItem extends Component{

    render(){
        return (
            <div id="item">
                <p className="titulo">Curso React</p>
                <p className="horarioLocal">8:00 pm - 9 pm: SL105</p>
            </div>
        );
    }
}

export default sessionListItem;