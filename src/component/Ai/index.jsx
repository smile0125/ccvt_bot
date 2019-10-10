import React, { Component } from 'react';
import Login from './login.jsx';
import Page from '../../assets/js/page.jsx';
import {Link} from 'react-router-dom';
import '../../assets/css/aiLogin.scss';

export default class AI extends Component {
    componentDidMount(){
        document.title="AI登录-CCVT"
    }
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <span>AI登录</span>
        </span>;
        return (
            <div>
                <Page className="article" title="AI登录" subTitle={bread}  children={<Login />}></Page>
            </div>
        )
    }
}
