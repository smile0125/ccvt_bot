import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import {Cells, CellsTitle, Cell, CellBody, CellFooter, CellHeader} from 'react-weui';
import {GetCookie, Throttling} from '../../assets/js/common.jsx';
import ScrollData from '../../assets/js/scrollData.jsx';
import {GetIntegralRecode} from '../../http/http.jsx';
import {Link} from "react-router-dom";
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';

class ChangeCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            total: '',
            limit: 50,
            offset: 0,
            loadingShow: true,
            showTopTips: false,
            toptipType: '',
            toptTipsTimer: null,
            text: '',
            timer: null
        };
    }

    componentDidMount() {
        this.getRecodeFun();
    }
    //监听滚动距离，如果滚动到底部，加载更多数据；
    handleScroll = Throttling(() => {
        const is_bottom = ScrollData();
        if (is_bottom) {
            this.handleVisit();
        }
    },2000);

    //滚动加载数据
    handleVisit = () => {
        const {items, total, limit, offset} = this.state;
        if (items.length <= 0) {
            this.getRecodeFun();
        } else if (items.length < total) {
            this.setState({loadingShow: true, offset: offset + limit}, () => this.getRecodeFun())
        } else {
            this.setState({showTopTips: true, toptipType: 'warn', text: '暂无更多数据'});
            this.stopTopTips();
        }
    };

    //获取记录
    getRecodeFun = () => {
        let params = {
            token: GetCookie('token'),
            limit: this.state.limit,
            offset: this.state.offset,
        };

        GetIntegralRecode(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const rows = data.rows;
                let items = this.state.items;
                items = items.concat(rows);
                this.setState({loadingShow: false, items: items, total: data.total})
            } else {
                this.setState({loadingShow: false});
            }
        })
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount(){
        clearInterval(this.state.toptTipsTimer);
    }

    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/gloryIntegral' className='hight_color'>荣耀积分</Link>&nbsp;|&nbsp;
            <span>荣耀积分变动记录</span>
        </span>;
        const list = this.state.items;
        return (
            <div onScroll={this.handleScroll}>>
                {
                    this.state.showTopTips ?
                        <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text}/> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow}/>
                        : ''
                }
                <Page className="article" title="荣耀积分变动记录" subTitle={bread} >
                    <div id='integralRecode'>
                        <CellsTitle>账户积分变动记录表</CellsTitle>
                        <Cells>
                            <Cell>
                                <CellFooter>类型</CellFooter>
                                <CellBody>金额</CellBody>
                                <CellHeader>时间</CellHeader>
                            </Cell>
                            {
                                list.length > 0 ? list.map((item, index) => {
                                    return(
                                        <Cell key={ item.utime }>
                                            <CellHeader className='table_list_size table_left'>{item.tx_detail}</CellHeader>
                                            <CellBody className='table_list_size table_middle'>{item.tx_amount}</CellBody>
                                            <CellFooter className='table_list_size table_right'>{item.utime}</CellFooter>
                                        </Cell>
                                    )
                                }) : <Cell>
                                    <CellHeader/>
                                    <CellBody>
                                        暂无数据
                                    </CellBody>
                                    <CellFooter/>
                                </Cell>
                            }
                        </Cells>
                    </div>
                </Page>
            </div>
        );
    }
}

export default ChangeCode;