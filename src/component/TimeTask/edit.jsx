import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class EditTask extends Component {
    toModifyTask = () => {
        this.props.history.push({ pathname: '/modifyTask', query: { content: this.props.content } })
    }
    render() {
        return (
            <svg className="icon" onClick={this.toModifyTask}>
                <use xlinkHref={'#icon-bianji'}>
                </use>
            </svg>
        )
    }
}
export default withRouter(EditTask);