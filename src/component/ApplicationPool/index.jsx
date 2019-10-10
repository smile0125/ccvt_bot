import React from 'react';
import Page from '../../assets/js/page.jsx';
import ApplicationPool from './application.jsx';
import {Link} from 'react-router-dom';

const Index = () => {
    const bread = <span>
        <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
        <span>申请矿池</span>
    </span>;
    return (
        <div>
            <Page className="article" title="申请矿池" subTitle={bread}  children={<ApplicationPool />}></Page>
        </div>
    )
}
export default Index;