import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import { Form, FormCell, CellBody, Button, Input } from 'react-weui';
import { GetCookie, SetCookie, DelCookie } from '../../assets/js/common.jsx';
import { ModifyPoolSet } from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import { withRouter,Link } from 'react-router-dom';

class EditPoolKeyWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poolInfo: '',
            news_switch: '',
            chat_time: '',
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    componentWillMount() {
        const poolInfo = JSON.parse(GetCookie('current_pool'));
        console.log(poolInfo)
        const { news_switch, chat_time } = poolInfo;
        this.setState({ news_switch, chat_time, poolInfo});
    }
    newsChange = (e) => {
        this.setState({ chat_time: e.target.value });
    };
    modiyNews = (type) => {
        let news_switch = '';
        if (type == 'on') {
            news_switch = 1
        } else {
            news_switch = 2
        }
        const params = {
            token: GetCookie('token'),
            news_switch: news_switch,
            chat_time: this.state.chat_time,
            group_id: this.state.poolInfo.id
        };
        this.setState({ loadingShow: true });
        ModifyPoolSet(params, res => {
            if (res.errcode == 0) {
                this.setState({
                    loadingShow: false, toptipType: 'primary',
                    showTopTips: true, text: `修改成功`
                });
                this.stopTopTips();
                let poolInfo = this.state.poolInfo;
                poolInfo.chat_time = this.state.chat_time;
                poolInfo.news_switch = news_switch;
                SetCookie('current_pool', JSON.stringify(poolInfo));
                this.props.history.push('/manageMent/poolSet')
            }
        }, res => {
            this.setState({
                loadingShow: false, toptipType: 'warn',
                showTopTips: true, text: `修改失败 ${res.errmsg}`
            });
            this.stopTopTips();
        })
    };
    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
        DelCookie('chat_time');
        DelCookie('news_switch');
    }
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <Link to='/manageMent/poolSet' className='hight_color'>矿池设置</Link>&nbsp;|&nbsp;
            <span>新闻推送</span>
        </span>;
        return (
            <div>
                {
                    this.state.showTopTips ? <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text} /> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow} />
                        : ''
                }
                <Page className="article" title="编辑新闻推送" subTitle={bread} >
                    <Form>
                        <FormCell>
                            <CellBody>
                                <Input type="text" placeholder="输入新闻推送间隔时间" value={this.state.chat_time} onChange={this.newsChange} />
                            </CellBody>
                        </FormCell>
                    </Form>

                    <div className='margin_top_1 page_padding addBtnStyle'>
                        <p className='font-size-12'>选择新闻推送间隔时间</p>
                    <Button
                        size="small"
                        type='default'
                        onClick={()=> {
                            this.setState({ chat_time:10})
                        }}>
                        10分钟
                    </Button>
                    <Button
                        style={{marginLeft: '10px'}}
                        size="small"
                        type='default'
                        onClick={()=> {
                            this.setState({ chat_time:30})
                        }}>
                        30分钟
                    </Button>
                    <Button
                        style={{marginLeft: '10px'}}
                        size="small"
                        type='default'
                        onClick={()=> {
                            this.setState({ chat_time:60})
                        }}>
                        60分钟
                    </Button>
                    </div>

                    <div className='margin_top_1 page_padding'>
                        {
                            this.state.news_switch == 1 ?
                                <div>
                                    <Button onClick={() => this.modiyNews('on')}>修改</Button>
                                    <Button type='warn' onClick={() => this.modiyNews('off')}>关闭</Button>
                                    
                                </div>

                                : <Button onClick={() => this.modiyNews('on')}>开启</Button>
                        }

                    </div>
                </Page>
            </div>
        )
    }
}
export default withRouter(EditPoolKeyWord)