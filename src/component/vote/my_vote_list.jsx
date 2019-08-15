import React,{useState} from 'react';
import {Link} from "react-router-dom";
import Page from '../../assets/js/page.jsx';
import {Panel, PanelHeader, PanelBody, MediaBox, MediaBoxTitle, MediaBoxDescription, MediaBoxInfo, MediaBoxInfoMeta} from 'react-weui';
import {debounce} from '../../assets/js/common.jsx';
import VoteNumInput from './vote_num_input.jsx'

const VoteList = (props) => {
    //显示投票输入框
    const [showVoteNumInput,setShowVoteNumInput] = useState(false);
    //跳转百度百科
    const toBaiDuBaiKe = (e) => {
        e.preventDefault();
        window.location.href = 'https://baike.baidu.com/item/%E5%88%98%E5%BE%B7%E5%8D%8E/114923?fr=aladdin'
    };

    //显示隐藏投票输入
    const handleVoteClick = () => {
        setShowVoteNumInput(true);
    };
    const cancelShowVoteNumInput = () => {
        setShowVoteNumInput(false);
    };

    //提交投票
    const submitVote = (num) => {
        setShowVoteNumInput(false);
    };

    const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
        <Link to='/vote' className='hight_color'>投票</Link>&nbsp;|&nbsp;
        <span>投票列表</span>
        </span>;
    return (
        <Page className="article" title="投票列表" subTitle={bread}>
            {showVoteNumInput ? <VoteNumInput submitVote={submitVote} cancelShowVoteNumInput={cancelShowVoteNumInput}/> : null}
            <Panel>
                <PanelHeader>投票列表</PanelHeader>
                <PanelBody>

                    <MediaBox type="text">
                        <MediaBoxTitle>刘德华</MediaBoxTitle>
                        <MediaBoxDescription className='vote_num vote_num_total'>票数：<span>12345</span> CCVT</MediaBoxDescription>
                        <MediaBoxDescription className='vote_num vote_num_item'>投票次数：<span>123</span> 次</MediaBoxDescription>
                        <MediaBoxInfo>
                            <MediaBoxInfoMeta>发起人：大晚上的不睡觉</MediaBoxInfoMeta>
                            <MediaBoxInfoMeta extra>2016-8-8</MediaBoxInfoMeta>
                            <MediaBoxInfoMeta style={{color:'#1AAD19',cursor:'pointer'}} extra onClick={(e) => {toBaiDuBaiKe(e)}}>百度百科</MediaBoxInfoMeta>
                        </MediaBoxInfo>
                        <div className='vote_btn' onClick={handleVoteClick}>投票</div>
                    </MediaBox>

                </PanelBody>
            </Panel>
        </Page>
    )
};
export default VoteList;