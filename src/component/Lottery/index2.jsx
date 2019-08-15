import React, { Component } from 'react';
import { RefreshAmount, LotteryRule, LotteryApi } from '../../http/http.jsx';
import { GetCookie } from '../../assets/js/common.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import '../../assets/css/lottery.scss';
import bg from '../../assets/img/cj_bg01.png';

export default class Lottery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arr: [1, 2, 3],
            new_base_amount: 0,
            prize_amount: 0,
            prize_free_number: 0,
            residue_degree: 0,
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    componentDidMount() {
        document.title = "抽奖-CCVT"
        this.lotteryRuleFun();
        this.refreshAmountFun();
    }
    //点击抽奖
    lotteryOpenClick = (e) => {
        e.stopPropagation();
        const { new_base_amount, residue_degree, prize_amount } = this.state;
        if (new_base_amount <= 0) {
            this.setState({ showTopTips: true, toptipType: 'warn', text: '余额不足' });
            this.stopTopTips();
            return;
        }
        e.persist();
        this.setState({ loadingShow: true });
        this.lotteryFun(e);
        if (parseInt(residue_degree) > 0) {
            this.setState({ residue_degree: residue_degree - 1 })
        } else {
            this.setState({ new_base_amount: new_base_amount - prize_amount })
        }
    };
    //翻牌
    rotateCard = (e, prize_name) => {
        let div = '', nex_sibling = '';
        const className = e.target.className;
        if (className == 'box_red') {
            div = e.target;
            console.log(className);
            console.log(div);
        } else {
            div = e.target.parentNode;
            console.log(className);
            console.log(div);
        }
        nex_sibling = div.nextSibling;
        nex_sibling.children[0].innerHTML = prize_name;
        let box_red_class_name = div.className.split(" ");
        let box_fff_class_name = nex_sibling.className.split(" ");
        if (!box_red_class_name.includes('active')) {
            box_red_class_name.push('active');
            box_fff_class_name.push('active');
            div.className = box_red_class_name.join(" ");
            nex_sibling.className = box_fff_class_name.join(" ");
        }
    };

    //抽奖规则
    lotteryRuleFun = () => {
        const params = { token: GetCookie('token') };
        LotteryRule(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const rows = data.rows;
                this.setState({ prize_amount: rows.prize_amount, prize_free_number: rows.prize_free_number, residue_degree: rows.residue_degree })
            }
        })
    };
    //刷新余额
    refreshAmountFun = () => {
        const params = { token: GetCookie('token') };
        this.setState({ loadingShow: true });
        RefreshAmount(params).then(res => {
            this.setState({ loadingShow: false });
            const data = res.data;
            if (data.errcode == 0) {
                const new_base_amount = data.new_base_amount;
                this.setState({ new_base_amount: new_base_amount })
            }
        })
    };

    //抽奖
    lotteryFun = (e) => {
        const params = { token: GetCookie('token') };
        LotteryApi(params).then(res => {
            const data = res.data;
            this.setState({ loadingShow: false });
            if (data.errcode == 0) {
                const prize_name = data.rows.prize_name;
                this.rotateCard(e, prize_name);
            }
        })
    };
    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    };
    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer)
    }
    render() {
        const { new_base_amount, prize_amount, prize_free_number, residue_degree } = this.state;

        return (
            <div id='container' style={{ backgroundImage: `url(${bg})` }}>
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow} />
                        : ''
                }
                {
                    this.state.showTopTips ? <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text} /> : ''
                }
                <div className='header'>
                    <img src={require('../../assets/img/cj_bt.png')} alt="" />
                </div>
                <div>
                    <p className='text_align-center'>账户余额:{new_base_amount}CCVT <span onClick={this.refreshAmountFun}>刷新</span></p>
                    <p className='text_align-center'>免费次数：{prize_free_number}次 今日剩余{residue_degree}次</p>
                </div>
                <div className="nine_box">
                    {
                        this.state.arr.map((item, index) => {
                            return (<div className={'nine_box-row nine_box-row' + index} key={index}>
                                {
                                    this.state.arr.map((item, index) => {
                                        return (<div className="box" key={index}>
                                            <div className="box_red" onClick={(e) => this.lotteryOpenClick(e)}>
                                                <p className='text' onClick={(e) => this.lotteryOpenClick(e)}>开</p>
                                            </div>

                                            <div className="box_fff">
                                                <p>中奖啦</p>
                                            </div>
                                        </div>)
                                    })
                                }
                            </div>)
                        })
                    }
                </div>

                <div className='text_align-center'>
                    <a href="" className="my_prize">我的奖品</a>
                </div>
                <div className="activity_rule">
                    <h3 className='text_align-center'>活动规则</h3>
                </div>
                <div className="rule_item_box">
                    <p>1,每天有一次免费的抽奖机会</p>
                    <p>2,如果免费次数已用完，之后的抽奖将收取{prize_amount}CCVT</p>
                    <p>3,账户余额可能会有延迟，可刷新余额</p>
                </div>
            </div>
        )
    }
}
