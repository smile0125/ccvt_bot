import React, {Component} from 'react';
import {RefreshAmount, LotteryRule, LotteryApi, WinningRecord, RollingList} from '../../http/http.jsx';
import {GetCookie} from '../../assets/js/common.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import bx_close from '../../assets/img/bx_close1.png';
import PrizeRecode from "./prizeRecode.jsx";
import AfterEffect from './afterEffect.jsx';
import ScrollMessage from './scrollMessage.jsx';
import '../../assets/css/lottery.scss';
import { withRouter } from 'react-router-dom';

let setTimeoutTimer = null;
class Lottery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new_base_amount: 0,
            prize_amount: 0,
            prize_free_number: 0,
            residue_degree: 0,//剩余次数
            prize_name: '',//奖品
            prize_value: '',//中奖金额
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: '',
            effectTimer: '',
            bottom_show: false,//中奖记录是否显示
            recodeData: [],//中奖记录
            two: 20,
            three: 50,
            scrollMessageList: []
        }
    }

    componentDidMount() {
        document.title = "抽奖-CCVT";
        clearInterval(this.effectTimer);
        this.lotteryRuleFun();
        this.refreshAmountFun();
        this.randomEffect();
        this.rollingListFun();
    }

    //获取滚动留言
    rollingListFun = async () => {
        const params = {'token': GetCookie('token')};
        try {
            const response = await RollingList(params);
            if (response.data.errcode == 0) {
                const scrollMessageList = response.data.rows;
                this.setState(() => ({'scrollMessageList': scrollMessageList}));
            }
        } catch (error) {
            console.log(error);
        }
    };

    //随机其中一个宝箱做效果
    randomEffect = () => {
        this.effectTimer = setInterval(() => {
            const boxList = document.getElementsByClassName('box no');
            const length = boxList.length;
            if (length > 0) {
                const num = Math.floor(Math.random() * length);
                if (boxList[num]) {
                    boxList[num].classList.add('effect');
                    setTimeout(() => {
                        boxList[num].classList.remove('effect');
                    }, 1000);
                }
            } else {
                clearInterval(this.effectTimer)
            }
        }, 1500);
    };

    //点击抽奖
    lotteryOpenClick = (e) => {
        const {new_base_amount, residue_degree, prize_amount} = this.state;
        //获取点击的元素
        const box = e.target.parentNode;
        const tagName = e.target.tagName;
        const childNode = box.childNodes[0];

        //判断是否已经点过
        if (tagName != 'P') {//没有点过
            //判断是否有免费次数
            if (parseInt(residue_degree) > 0) {
                this.setState({residue_degree: residue_degree - 1});
                this.lotteryFun(box,childNode);
            } else if (new_base_amount <= 0) {//余额不足
                this.setState({showTopTips: true, toptipType: 'warn', text: '余额不足'});
                this.stopTopTips();
                return;
            } else {
                this.lotteryFun(box,childNode);
                this.setState({new_base_amount: new_base_amount - prize_amount})
            }
        } else {
            // console.log('点过了')
        }
    };

    //抽奖
    lotteryFun = (box,childNode) => {
        const params = {token: GetCookie('token')};
        this.setState({loadingShow: true});
        LotteryApi(params).then(res => {
            const data = res.data;
            this.setState({loadingShow: false});
            if (data.errcode == 0) {
                const _childNode = childNode;
                box.classList.remove('no');
                box.classList.add('already');
                const prize_name = data.rows.prize_name;
                const prize_value = data.rows.prize_value;
                const prize_id = data.rows.prize_id;
                const type = data.rows.type;
                this.setState({prize_name, prize_value});
                this.rotateCard('add');
                if (prize_value > 0) {
                    this.rollingListFun();
                }
                _childNode.style.lineHeight = 'unset';
                if (prize_value < this.state.two && type == 0) {
                    _childNode.classList.add('one_bg');
                    _childNode.innerHTML = `<p class='one_color'>${prize_value}</p><p class="one_color">CCVT</p>`
                } else if (prize_value >= this.state.two && prize_value < this.state.three && type == 0) {
                    _childNode.classList.add('two_bg');
                    _childNode.innerHTML = `<p class='two_color'>${prize_value}</p><p class='two_color'>CCVT</p>`

                } else if (prize_value >= this.state.three && type == 0) {
                    _childNode.classList.add('three_bg');
                    _childNode.innerHTML = `<p class='three_color'>${prize_value}</p><p class="three_color">CCVT</p>`
                } else {
                    _childNode.classList.add('one_bg');
                    _childNode.innerHTML = "<p class='one_color'>" + prize_value + "</p>" +
                        "<img src=" + '../../src/assets/img/img' + prize_id + '.png' + " style='width:20px;height: 20px'>"
                }
            }
        })
    };

    //显示中奖效果
    rotateCard = () => {
        const afterEffect = document.getElementsByClassName('afterEffect')[0];
        afterEffect.classList.add('active');
        setTimeout(() => {
            afterEffect.classList.remove('active');
        }, 2000);
    };

    //抽奖规则
    lotteryRuleFun = () => {
        const params = {token: GetCookie('token')};
        LotteryRule(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const rows = data.rows;
                this.setState({
                    prize_amount: rows.prize_amount,
                    prize_free_number: rows.prize_free_number,
                    residue_degree: rows.residue_degree
                })
            }
        })
    };
    //刷新余额
    refreshAmountFun = () => {
        const params = {token: GetCookie('token')};
        this.setState({loadingShow: true});
        RefreshAmount(params).then(res => {
            this.setState({loadingShow: false});
            const data = res.data;
            if (data.errcode == 0) {
                const new_base_amount = data.new_base_amount;
                this.setState({new_base_amount: new_base_amount})
            }
        })
    };

    //显示5 X 10的红包列表
    showLotteryList = () => {
        let res = [];
        for (let i = 0; i < 50; i++) {
            res.push(
                <div className="box no" key={i} onClick={(e) => this.lotteryOpenClick(e)}>
                    <div className="box_red"
                         style={{background: `url(${bx_close})`}}
                    ></div>
                </div>
            );
        }
        return res;
    };

    //查看中奖记录
    winningRecord = () => {
        const params = {
            token: GetCookie('token'),
            limit: 100000,
            offset: 0
        };
        WinningRecord(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const recodeData = data;
                this.setState({recodeData, bottom_show: true})
            }
        })
    };
    //关闭中奖记录
    hideRecord = () => {
        this.setState({bottom_show: false})
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
        clearInterval(this.effectTimer);
        clearTimeout(setTimeoutTimer);
    }

    render() {
        const {two, prize_name, new_base_amount, prize_free_number, residue_degree, prize_amount, three, recodeData, bottom_show, prize_value, scrollMessageList} = this.state;
        return (
            <div id='container' className='carryLottery_box_title_box' style={{background: `#1e0d45`}}>
                {
                    this.state.loadingShow ? <Loading show={this.state.loadingShow}/> : ''
                }
                {
                    this.state.showTopTips ?
                        <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text}/> : ''
                }
                {/*点击抽奖中奖之后的效果*/}
                <AfterEffect prize_name={prize_name} prize_value={prize_value} two={two} three={three}/>

                <div className='header'>
                    <h1 className='title' data-title="疯狂大抽奖">疯狂大抽奖</h1>
                </div>

                {/*显示中奖滚动*/}
                <ScrollMessage scrollMessageList={scrollMessageList}/>

                {/*余额*/}
                <div className='my_amount'>
                    <p className='text_align-center'>
                        <span>免费:{prize_free_number}次 剩余:{residue_degree}次</span>
                        &nbsp;&nbsp;
                        <span className='recharge_btn'  style={{fontSize: '1rem', fontWeight: '500', textDecoration: 'underline'}} onClick={() => this.props.history.push({pathname:'/lottery/recharge'})}>充值</span>
                    </p>
                    <p>{new_base_amount} CCVT<span onClick={this.refreshAmountFun}> 刷新</span></p>
                </div>

                {/*显示5x10的抽奖列*/}
                <div className="nine_box">
                    {
                        this.showLotteryList()
                    }
                </div>

                {/*查看中奖记录*/}
                <div className='recode'>
                    <p className='ty_bg' onClick={this.winningRecord}>《 中奖记录 》</p>
                </div>

                <div className="rule_item_box">
                    <h3 className='text_align-center'>活动规则</h3>
                    <p>1,每天有一次免费的抽奖机会</p>
                    <p>2,如果免费次数已用完，之后的抽奖将收取{prize_amount}CCVT</p>
                    <p>3,账户余额可能会有延迟，可刷新余额</p>
                </div>
                {/*中奖记录*/}
                <PrizeRecode hideRecord={this.hideRecord} recodeData={recodeData} bottom_show={bottom_show}/>
            </div>
        )
    }
}
export default withRouter(Lottery);
