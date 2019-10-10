import React,{Component} from 'react';
import {Link} from "react-router-dom";
import Page from '../../assets/js/page.jsx';
import {Panel, PanelHeader, PanelBody, MediaBox, MediaBoxTitle, MediaBoxDescription, MediaBoxInfo, MediaBoxInfoMeta, Toptips, Toast} from 'react-weui';
import {GetCookie, Throttling} from "../../assets/js/common.jsx";
import {GetMyVoteList} from '../../http/http.jsx';
import ScrollData from '../../assets/js/scrollData.jsx';

class MyVoteList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            voteList: [],
            limit: 50,
            offset: 0,
            topTipsTimer:null,
            topTipsType:'primary',
            topTipsShow:false,
            topTipsText:'',
            showLoading: false
        }
    }

    componentDidMount(){
        //获取列表
        this.myVoteListFunc();
    }

    myVoteListFunc = () => {
        const { limit, offset } = this.state;
        const token = GetCookie('token');
        if (!token) {
            window.location.href = `http://wx.fnying.com/ahino/index_login.php?url=${ encodeURIComponent(window.location.href) }`;
        }
        const params = { token, limit, offset };
        this.setState(() => ({ showLoading: true }));
        GetMyVoteList(params).then(res => {
            this.setState(() => ({ showLoading: false }));
            const data = res.data;
            if(data.errcode == 0){
                this.setState(() => ({ voteList: data.rows }))
            }
        })
    };

    //监听滚动距离，如果滚动到底部，加载更多数据；
    handleScroll = Throttling(() => {
        const is_bottom = ScrollData();
        if (is_bottom) {
            this.handleVisit();
        }
    },2000);

    //滚动加载数据
    handleVisit = () => {
        const {voteList, total, limit, offset} = this.state;
        if (voteList.length <= 0) {
            this.myVoteListFunc();
        } else if (voteList.length < total) {
            this.setState({loadingShow: true, offset: offset + limit}, () => this.myVoteListFunc())
        } else {
            this.setState({loadingShow: false, topTipsShow: true, topTipsType: 'warn', topTipsText: '暂无更多数据'});
            this.hideTopTips();
        }
    };

    //跳转百度百科
    toBaiDuBaiKe = (e, url) => {
        e.preventDefault();
        window.location.href = url;
    };
    //关闭顶部信息提示
    hideTopTips = () => {
        this.state.topTipsTimer = setTimeout(() => {
            this.setState(() => ({ topTipsShow:false }))
        },2000)
    };

    //卸载组建之前
    componentWillUnmount(){
        clearTimeout(this.state.topTipsTimer);
    }
    render() {
        const { voteList, topTipsShow, topTipsType, topTipsText, showLoading } = this.state;
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/vote' className='hight_color'>荣耀提名</Link>&nbsp;|&nbsp;
            <span>我的提名</span>
        </span>;
        return (
            <div onScroll={this.handleScroll}>
            { topTipsShow ? <Toptips type={ topTipsType } show={ topTipsShow }> { topTipsText } </Toptips> : null }
            { showLoading ? <Toast icon="loading" show={showLoading}></Toast> : null }
            <Page className="article" title="我的提名" subTitle={bread}>
                <Panel>
                    <PanelHeader>我的提名</PanelHeader>
                    <PanelBody>
                        {
                            voteList ? voteList.map((item, index) => {
                            return(
                                <MediaBox type="text" key={item.id}>
                                    <MediaBoxTitle> {item.name} </MediaBoxTitle>
                                    { item.is_audit == 2 ? <MediaBoxDescription className='vote_num vote_num_total'>票数：<span>{ item.ccvt_count }</span> CCVT</MediaBoxDescription> : null }
                                    { item.is_audit == 3 ? <MediaBoxDescription className=''>拒绝理由：<span>{item.why}</span></MediaBoxDescription> : null }
                                    <MediaBoxInfo>
                                        <MediaBoxInfoMeta>{ item.ctime.split(' ')[0] }</MediaBoxInfoMeta>
                                        <MediaBoxInfoMeta style={{color: '#1AAD19', cursor: 'pointer'}} extra
                                                          onClick={(e) => this.toBaiDuBaiKe(e, item.url)}>百度百科
                                        </MediaBoxInfoMeta>
                                    </MediaBoxInfo>
                                    { item.is_audit == 1 ? <div className='vote_btn' style={{background: 'darkgray'}}>审核中</div> : null }
                                    { item.is_audit == 2 ? '已通过' : null }
                                    { item.is_audit == 3 ? <div className='vote_btn' style={{background: 'rgba(255,0,0,0.5)'}}>已拒绝</div> : null }
                                </MediaBox>
                            )
                            }) : '暂无数据'
                        }

                    </PanelBody>
                </Panel>
            </Page>
            </div>
        )
    }
}
export default MyVoteList;