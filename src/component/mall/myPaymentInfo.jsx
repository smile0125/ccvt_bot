import React, {Component} from 'react';
import { Panel, PanelHeader, CellsTitle, Cells, Cell, CellBody, CellFooter, Button, ButtonArea } from "react-weui";
import {GetCookie} from "../../assets/js/common.jsx";
import { myPaymentInfoHttp } from '../../http/http.jsx';
import { withRouter } from 'react-router-dom';

class MyPaymentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        }
    }

    componentDidMount() {
        this.fnMyPaymentInfo()
    }

    fnMyPaymentInfo = async () => {
        const unionid = GetCookie('unionid');
        const token = GetCookie('token');
        const params = { unionid, token };
        const response = await myPaymentInfoHttp(params);
        if(response.data.errcode == 0){
            this.setState({info: response.data.rows})
        }

    };

    render() {
        const { account, bank_name, id } = this.state.info;
        return (
            <div>
                <Panel style={{ minHeight: '100vh' }}>
                    <PanelHeader onClick={ () => this.props.history.goBack() }>返回</PanelHeader>
                    <CellsTitle>收款信息</CellsTitle>
                    <Cells>
                        <Cell>
                            <CellBody>收款方式</CellBody>
                            <CellFooter>{ bank_name }</CellFooter>
                        </Cell>
                    </Cells>
                    <Cells style={{margin: '0'}}>
                        <Cell>
                            <CellBody>收款账号</CellBody>
                            <CellFooter>{ account }</CellFooter>
                        </Cell>
                    </Cells>
                    <ButtonArea>
                        <p style={{ textAlign: 'right', color: '#1AAD19' }} onClick={ () => this.props.history.push({pathname: `/mall/merchants/modifyPayment/${id}`}) }>修改</p>
                    </ButtonArea>
                </Panel>
            </div>
        );
    }
}

export default withRouter(MyPaymentInfo);