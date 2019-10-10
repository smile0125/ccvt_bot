import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Page from '../../assets/js/page.jsx';
import VoteNumInput from './vote_num_input.jsx'
import {GetCookie, Throttling} from "../../assets/js/common.jsx";
import {GetVoteList, VoteGive} from '../../http/http.jsx';
import ScrollData from '../../assets/js/scrollData.jsx';
import {Panel, PanelHeader, PanelBody, MediaBox, MediaBoxTitle, MediaBoxDescription, MediaBoxInfo, MediaBoxInfoMeta, Toptips, Toast,Article, Button, Popup} from 'react-weui';

class VoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            voteList: [],
            currentItem:'',
            limit: 50,
            offset: 0,
            showVoteNumInput: false, //显示投票输入框
            vote_id: '',
            topTipsTimer:null,
            topTipsType:'primary',
            topTipsShow:false,
            topTipsText:'',
            showLoading: false,
            fullpage_show: false,
            nextDateArr: ['2019/9/6 20:00', '2019/10/4 20:00', '2019/11/1 20:00', '2019/11/29 20:00', '2019/12/27 20:00'],
            countdown:'',
            countDownTimer:null
        }
    }

    componentDidMount() {
        this.getVoteListFun();
        this.state.countDownTimer = setInterval(()=>{
            this.counter();
        }, 1000);
    }

    //调用计时器
    counter = () => {
        let { nextDateArr } = this.state;
        const nowDate = new Date();//当前时间
        for(let key in nextDateArr){
            if((new Date(nextDateArr[key]) - nowDate) >= 0){
                let endDate = new Date(nextDateArr[key]);
                this.countDownFunc(nowDate, endDate);
                break;
            }
        }
    };

    countDownFunc = (nowDate, endDate) => {
        //相差的总秒数
        let totalSeconds = parseInt((endDate - nowDate) / 1000);
        //天数
        let days = Math.floor(totalSeconds / (60 * 60 * 24));
        //取模（余数）
        let modulo = totalSeconds % (60 * 60 * 24);
        //小时数
        let hours = Math.floor(modulo / (60 * 60));
        modulo = modulo % (60 * 60);
        //分钟
        let minutes = Math.floor(modulo / 60);
        modulo = modulo % (60);
        //秒
        let seconds = modulo % 60;

        let dateTime = `${days}天${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
        this.setState({countdown:dateTime})
    };

    //获取列表数据
    getVoteListFun = () => {
        const { limit, offset } = this.state;
        const token = GetCookie('token');
        if (!token) {
            window.location.href = `http://wx.fnying.com/ahino/index_login.php?url=${encodeURIComponent(window.location.href)}`;
            return;
        }
        const params = { token, limit, offset };
        this.setState(() => ({ showLoading: true }));
        GetVoteList(params).then(res => {
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
            this.getVoteListFun();
        } else if (voteList.length < total) {
            this.setState({loadingShow: true, offset: offset + limit}, () => this.getVoteListFun())
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

    //显示投票输入
    handleVoteClick = (id, index) => {
        this.setState(() => ({ showVoteNumInput: true, vote_id: id, currentItem: index }))
    };
    //隐藏投票输入
    cancelShowVoteNumInput = () => {
        this.setState(() => ({showVoteNumInput: false}))
    };

    /*
    * 提交投票
    * @params num:投票数量
    */
    submitVote = (num) => {
        this.voteGiveFun(num);
        this.cancelShowVoteNumInput();
    };

    //提交投票
    voteGiveFun = (num) => {
        const token = GetCookie('token');
        if (!token) {
            window.location.href = `http://wx.fnying.com/ahino/index_login.php?url=${ encodeURIComponent(window.location.href) }`;
        }
        const { vote_id } = this.state;
        const params = { token, vote_id, amount:num };
        this.setState(() => ({ showLoading: true }));
        VoteGive(params).then(res => {
            this.setState(() => ({ showLoading: false }));
            const data = res.data;
            if(data.errcode == 0){
                this.modifyVoteCount(num);
                this.setState(() => ({ topTipsShow: true, topTipsType: 'primary', topTipsText: '投票成功' }));
            }else{
                this.setState(() => ({ topTipsShow: true, topTipsType: 'warn', topTipsText: `投票失败${ data.errmsg }` }));
            }
            this.hideTopTips();
        })
    };

    //修改对应的投票数量和次数
    modifyVoteCount = (num) => {
        const currentItem = this.state.currentItem;//当前投票项
        const voteList = this.state.voteList;//投票列表
        voteList[currentItem].count = parseInt(voteList[currentItem].count) + 1;
        let ccvt_count = parseInt(voteList[currentItem].ccvt_count) + parseInt(num);//相加之后的总数
        let parentIntNUm = parseInt(num);
        // console.log(ccvt_count);
        let timer = setInterval(() => {
            if(parentIntNUm >=1 && parentIntNUm <= 10){
                voteList[currentItem].ccvt_count = parseInt(voteList[currentItem].ccvt_count) + 1;
            }else if(parentIntNUm > 10 && parentIntNUm <= 100){
                console.log((parseInt(num) / 10));
                voteList[currentItem].ccvt_count = parseInt(voteList[currentItem].ccvt_count) + Math.floor(parseInt(num) / 10);
            }else{
                console.log((parseInt(num) / 100));
                voteList[currentItem].ccvt_count = parseInt(voteList[currentItem].ccvt_count) + Math.floor(parseInt(num) / 100);
            }

            this.setState(()=>({voteList}));
            if(voteList[currentItem].ccvt_count >= ccvt_count){
                clearInterval(timer);
                voteList[currentItem].ccvt_count = ccvt_count;
                this.setState(()=>({voteList}));
            }
            // console.log(voteList[currentItem].ccvt_count);
        },30);
        // voteList[currentItem].ccvt_count = parseInt(voteList[currentItem].ccvt_count) + parseInt(num);
        // voteList[currentItem].count = parseInt(voteList[currentItem].count) + 1;
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
        clearTimeout(this.state.countDownTimer);
    }

    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/vote' className='hight_color'>荣耀提名</Link>&nbsp;|&nbsp;
            <span>荣耀提名列表</span>
        </span>;
        const { showVoteNumInput, voteList, topTipsShow, topTipsType, topTipsText, showLoading, countdown } = this.state;
        const is_my_style = {
            width: '1.5rem',
            background: 'rgb(255, 102, 0)',
            position: 'absolute',
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: '2rem',
            top: 0,
            right: '17%',
            borderBottomLeftRadius: '0.2rem',
            borderBottomRightRadius: '0.2rem',
            fontSize: '0.6rem'
        };

        return (
            <div onScroll={this.handleScroll}>
            <Page className="article" title="荣耀提名列表" subTitle={bread}>
                { showVoteNumInput ? <VoteNumInput submitVote={ this.submitVote } cancelShowVoteNumInput={ this.cancelShowVoteNumInput }/> : null}
                { topTipsShow ? <Toptips type={ topTipsType } show={ topTipsShow }> { topTipsText } </Toptips> : null }
                { showLoading ? <Toast icon="loading" show={showLoading}></Toast> : null }
                <Panel>
                    <PanelHeader className='daojishi'>
                        <p style={{color:'#1AAD19'}} onClick={() => {this.setState({fullpage_show:true})}}>荣耀提名规则</p>
                        <p style={{color:'#1AAD19'}}>倒计时：<span style={{fontSize: '1rem',color:'#1AAD19'}}>{ countdown }</span></p>

                    </PanelHeader>
                    <PanelBody>
                        {
                            voteList.length > 0 ?
                                voteList.map((item, index) => {
                                    return (
                                        <MediaBox type="text" key={ item.id }>
                                            { item.is_my == 1 ? <p className='is_my' style={is_my_style}>我</p> : null }
                                            { item.sorting <= 3 ? <svg className='icon vote_top'><use xlinkHref={`#icon-pm${item.sorting}`}></use></svg> : <span className='sort' style={{ position:'absolute', left:'7px' }}>{item.sorting}</span> }
                                            <MediaBoxTitle>【{ item.name }】</MediaBoxTitle>
                                            <MediaBoxDescription className='vote_num vote_num_total'>
                                                票数：<span>{ item.ccvt_count }</span> CCVT</MediaBoxDescription>
                                            {/*<MediaBoxDescription className='vote_num vote_num_item'>投票次数：<span>{ item.count }</span> 次</MediaBoxDescription>*/}
                                            <MediaBoxInfo>
                                                {/*<MediaBoxInfoMeta className='vote_name'>发起人：{ item.wechat }</MediaBoxInfoMeta>*/}
                                                {/*<MediaBoxInfoMeta extra>{ item.ctime.split(' ')[0] }</MediaBoxInfoMeta>*/}
                                                <MediaBoxInfoMeta style={{color: '#1AAD19', cursor: 'pointer', WebkitTapHighlightColor:'transparent' }} onClick={(e) => { this.toBaiDuBaiKe(e, item.url) }}>
                                                    百度百科
                                                </MediaBoxInfoMeta>
                                            </MediaBoxInfo>
                                            <div className='vote_btn' onClick={ () => this.handleVoteClick(item.id, index) }>投票</div>
                                        </MediaBox>
                                    )
                                })
                                : <MediaBox>暂无数据</MediaBox>
                        }

                    </PanelBody>
                </Panel>

                <Popup show={this.state.fullpage_show}>
                    <div style={{height: '100vh', overflow: 'scroll'}}>
                        <Panel>
                            <PanelHeader>荣耀题名规则</PanelHeader>
                            <PanelBody>
                                <Article>

                                    <img src={require('../../assets/img/vote_rules.jpg')} alt=""/>
                                    <Button type='warn' plain onClick={() => this.setState({fullpage_show: false})}>关闭</Button>
                                </Article>
                            </PanelBody>
                        </Panel>
                    </div>
                </Popup>
            </Page>
            </div>
        )
    }
}
export default VoteList;