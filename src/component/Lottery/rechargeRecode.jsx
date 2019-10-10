import React, {Component} from 'react';
import {GetRechargeRecode} from '../../http/http.jsx';
import {GetCookie} from "../../assets/js/common.jsx";
import Page from '../../assets/js/page.jsx';
import {Link} from "react-router-dom";
import {Cells, CellsTitle, Cell, CellBody, CellFooter, CellHeader} from 'react-weui';

class RechargeRecode extends Component {
    constructor(props) {
        super(props);
        this.state={
            rechargeRecode:[]
        }
    }

    componentDidMount() {
        this.fnRechargeRecode()
    }

    fnRechargeRecode = () => {
        const token = GetCookie('token');
        const params ={token};
        GetRechargeRecode(params).then(res => {
            if(res.data.errcode == 0){
                const rechargeRecode = res.data.rows;
                this.setState({rechargeRecode})
            }
        })
    };

    render() {
        const {rechargeRecode} = this.state;
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/lottery' className='hight_color'>抽奖</Link>&nbsp;|&nbsp;
            <span>充值记录</span>
        </span>;
        return (
            <div id='integralRecode'>
                <Page className="article" title="充值记录" subTitle={bread}>
                    <CellsTitle>充值记录</CellsTitle>
                    <Cells>
                        <Cell className='recharge-recode-table' >
                            <CellBody>金额</CellBody>
                            <CellHeader>数量</CellHeader>
                            <CellFooter>时间</CellFooter>
                        </Cell>
                        {
                            rechargeRecode.length > 0 ?
                                rechargeRecode.map((item, i) => {
                                    return (
                                        <Cell key={i}>
                                            <CellHeader className='table_list_size table_left'>{item.price}</CellHeader>
                                            <CellBody className='table_list_size table_middle'>
                                                {item.num}
                                            </CellBody>
                                            <CellFooter className='table_list_size table_right'>
                                                {item.ctime}
                                            </CellFooter>
                                        </Cell>
                                    )
                                }) :
                                <Cell>
                                    <CellHeader/>
                                    <CellBody>
                                        暂无数据
                                    </CellBody>
                                    <CellFooter/>
                                </Cell>
                        }
                    </Cells>
                </Page>
            </div>
        );
    }
}

export default RechargeRecode;