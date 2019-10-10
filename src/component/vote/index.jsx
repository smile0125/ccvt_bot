import React, {Component} from 'react';
import EditVote from './edit_vote.jsx';
import Page from '../../assets/js/page.jsx';
import {Cells, Cell, CellBody, CellFooter, CellHeader} from "react-weui";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import '../../assets/css/vote.scss';

const Vote = (props) => {
    const bread = <span>
        <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
        <span>荣耀提名</span>
    </span>;
    return (
        <Page className="article" title="荣耀提名" subTitle={bread}>
            <Cells>
                <Cell access onClick={() => {props.history.push({pathname: '/vote/voteList'})}}>
                    <CellHeader>
                        <svg className="icon">
                            <use xlinkHref='#icon-vote'/>
                        </svg>
                    </CellHeader>
                    <CellBody>
                        荣耀提名列表
                    </CellBody>
                    <CellFooter/>
                </Cell>
                <Cell access onClick={() => {props.history.push({pathname: '/vote/myVoteList'})}}>
                    <CellHeader>
                        <svg className="icon">
                            <use xlinkHref='#icon-wdfb'/>
                        </svg>
                    </CellHeader>
                    <CellBody>
                        我的提名
                    </CellBody>
                    <CellFooter/>
                </Cell>
            </Cells>
            <EditVote/>
        </Page>
    );

};

export default withRouter(Vote);