import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class EditKeyWord extends Component {
    toModifyTask = () => {
        this.props.history.push({ pathname: '/modifyKeyWord', query: {item:this.props.item} })
    };
    render() {
        return (
            <svg className="icon" onClick={this.toModifyTask}>
                <use xlinkHref={'#icon-bianji'}>
                </use>
            </svg>
        )
    }
}
export default withRouter(EditKeyWord);