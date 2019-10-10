import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import Task from './task.jsx';
import '../../assets/css/task.scss';
import {Link} from 'react-router-dom';

 const TimeTask = () => {
    const bread = <span>
        <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
        <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
        <span>定时任务</span>
    </span>;
    return (
        <div>
            <Page className="article" title="定时任务" subTitle={bread} children={<Task />}></Page>
        </div>
    )
};
export default TimeTask