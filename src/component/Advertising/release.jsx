import React, {Component} from 'react';
import {
    CellsTitle,
    Form,
    FormCell,
    CellHeader,
    CellBody,
    Input,
    Label,
    TextArea,
    CellFooter,
    Radio,
    Toast,
    CellsTips
} from 'react-weui';
import Page from '../../assets/js/page.jsx';
import {Link} from 'react-router-dom';
import ReleaseSubmit from './releaseSubmit.jsx';
import AdLinkImg from './adLinkImg.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import {AdCost} from '../../http/http.jsx';
import {GetCookie} from '../../assets/js/common.jsx';

class Release extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            content: '',
            tx_content: '',
            cost: '',
            cycleList: [{id: 7, day: '7天'}, {id: 3, day: '3天'}, {id: 1, day: '1天'}],
            cycle: 1,
            showLoading: false,
            loadingTimer: null,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: 'warn',
            text: '上传成功',
            daily_award_amount: 100
        }
    }

    componentDidMount = () => {
        this.adCostFun(100, this.state.cycle);
    };
    //选择时间
    timeChange = (e) => {
        const time = e.target.value;
        this.setState({time: time});
    };
    //广告内容
    contentChange = (e) => {
        const content = e.target.value;
        this.setState({content: content});
    };

    //广告周期
    radioClick = (e) => {
        const {daily_award_amount} = this.state;
        const cycle = e.target.value || this.state.cycle;
        this.setState({cycle: e.target.value});
        if (parseInt(daily_award_amount) <= 0 || !daily_award_amount) {
            this.setState({showTopTips: true, toptipType: 'warn', text: '请输入奖励金额'});
            this.stopTopTips();
            return;
        }
        this.adCostFun(daily_award_amount, cycle);
        this.setState({showLoading: true});
    };

    //获取广告费用
    adCostFun = (daily_award_amount, cycle) => {
        const params = {token: GetCookie('token'), daily_award_amount: daily_award_amount, cycle: cycle};
        AdCost(params).then(res => {
            this.setState({showLoading: false});
            if(res.data.errcode == 0){
                const data = res.data;
                const cost = data.cost;
                this.setState({cost: cost})
            }else{
                this.setState({showTopTips: true, toptipType: 'warn', text: `${res.data.errmsg}`});
                this.stopTopTips();
            }
        })
    };

    //广告选择二选一
    getLinkImgContent = (value) => {
        this.setState({tx_content: value})
    };

    //奖励费用
    amountChange = (e) => {
        const daily_award_amount = e.target.value;
        this.setState({daily_award_amount: daily_award_amount})
    };

    //发布成功或者失败
    releaseState = (type) => {
        if (type == 'success') {
            this.setState({showTopTips: true, toptipType: 'primary', text: '提交成功', content: ''});

        } else {
            this.setState({showTopTips: true, toptipType: 'warn', text: `提交失败 ${type}`});
        }
        this.stopTopTips();
    };

    //检查参数
    checkState = (msg) => {
        this.setState({showTopTips: true, toptipType: 'warn', text: `${msg}`});
        this.stopTopTips();
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }

    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/ad' className='hight_color'>广告</Link>&nbsp;|&nbsp;
            <span>广告发布</span>
        </span>;
        return (
            <div>
                {
                    this.state.showLoading ?
                        <Toast icon="loading" show={this.state.showLoading}></Toast>
                        : ''
                }

                {
                    this.state.showTopTips ?
                        <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text}/> : ''
                }
                <Page className="article" title="广告发布" subTitle={bread}>
                    <CellsTitle>发送时间</CellsTitle>
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>发送时间</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="time" value={this.state.time} onChange={this.timeChange}/>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <CellsTitle>广告内容</CellsTitle>
                    <Form>
                        <FormCell>
                            <CellBody>
                                <TextArea placeholder="请输入广告内容" value={this.state.content} onChange={this.contentChange}
                                          rows="3"></TextArea>
                            </CellBody>
                        </FormCell>
                    </Form>

                    <AdLinkImg getLinkImgContent={this.getLinkImgContent}/>

                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>奖励费用</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="请输入奖励费用" value={this.state.daily_award_amount}
                                       onChange={this.amountChange}/>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <CellsTips>每日观看广告奖励费用，最低为100CCVT，必须是100的整数倍，如：100，200。</CellsTips>
                    <CellsTitle>广告周期</CellsTitle>
                    <Form radio>
                        {
                            this.state.cycleList.map((item, index) => {
                                return (
                                    <FormCell radio key={item.id}>
                                        <CellBody>{item.day}</CellBody>
                                        <CellFooter>
                                            <Radio name="radio" value={item.id} onClick={this.radioClick}
                                                   defaultChecked/>
                                        </CellFooter>
                                    </FormCell>
                                )
                            })
                        }
                    </Form>
                    <CellsTips>所需广告费用：{this.state.cost} CCVT</CellsTips>
                    <ReleaseSubmit checkState={this.checkState} releaseState={this.releaseState} query={this.state}/>
                </Page>
            </div>
        )
    }
}

export default Release