import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import {Link} from "react-router-dom";
import ChangeBindForm from './changeBindForm.jsx';

class ChangeBind extends Component {
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <span>更换CCVT账户</span>
            </span>;
        return (
            <div>
                <Page className="article" title="更换CCVT账户" subTitle={bread}>
                    <ChangeBindForm />
                </Page>
            </div>
        );
    }
}

export default ChangeBind;