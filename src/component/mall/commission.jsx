import React, {Component} from 'react';
import { Toast, Toptips, Panel, PanelHeader, Form, FormCell, CellHeader, Label, CellBody, Input, CellsTitle, Cells, Cell, CellFooter, ButtonArea, Button } from "react-weui";
import {GetCookie} from "../../assets/js/common.jsx";
import {getCommissionHttp, setCommissionHttp} from '../../http/http.jsx'

class Commission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputList: [1],
            inputListValue:[{level: 0, value: ''}, {level: 1, value: ''}],
            showLoading: false,
            loadingText: '',
            showTopTips: false,
            topTipsType: 'warn',
            topTipsTimer: null,
            topTipsText: '',
        }
    }

    componentDidMount() {
        this.fnGetCommission();
    }
    fnGetCommission = async () => {
        const token = GetCookie('token');
        const store_id = GetCookie('store_id');
        const params = {token, store_id};
        const response = await getCommissionHttp(params);
        console.log(response)
    };

    //添加
    addInput = () => {
        let {inputList, inputListValue} = this.state;
        const len = inputList.length;
        inputList.push(len + 1);
        inputListValue.push({level: len + 1, value: ''});
        this.setState({inputList, inputListValue});
    };

    //输入
    handleInputChange = (level, value) => {
        let {inputListValue} = this.state;
        inputListValue.forEach(item => {
            if(item['level'] == level){
                item['value'] = value
            }
        });
    };

    //设置
    setCommission = async () => {
        const token = GetCookie('token');
        const store_id = GetCookie('store_id');
        const commission = this.state.inputListValue;
        const params = { token, store_id, commission: JSON.stringify(commission) };
        this.setState({  showLoading: true });
        const response = await setCommissionHttp(params);
        if(response.data.errcode == 0){
            this.setState({  showLoading: false, topTipsType: 'primary', showTopTips: true, topTipsText: `成功` });
            this.stopTopTips();
        }else{
            this.setState({  showLoading: false, topTipsType: 'warn', showTopTips: true, topTipsText: `${ response.data.errmsg }` });
            this.stopTopTips();
        }
    };

    stopTopTips = () => {
        this.state.topTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer)
    }

    render() {
        const { showLoading, loadingText, showTopTips, topTipsType, topTipsText, inputList} = this.state;
        return (
            <div>
                { showLoading ? <Toast icon="loading" show={showLoading}><span style={{color:'#fff'}}>{ loadingText }</span></Toast> : null }
                { showTopTips ? <Toptips type={ topTipsType } show={ showTopTips }> { topTipsText } </Toptips> : null }
                <Panel style={{ minHeight: '100vh' }}>
                    <PanelHeader onClick={() => this.props.history.goBack()}>返回</PanelHeader>
                    <CellsTitle>佣金比例设置</CellsTitle>
                    <CellsTitle>售出店铺比例：下线当中所售出商品的店铺所获得的佣金比例</CellsTitle>
                    <CellsTitle>上一级：相对于所售出商品的店铺的上一级邀请人所获得的佣金比例，后续上二级等以此类推</CellsTitle>
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>售出店铺比例</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="售出商品的店铺佣金比例" onChange={(e) => this.handleInputChange(0, e.target.value)}/>
                            </CellBody>
                        </FormCell>
                        {
                            inputList.map(item => {
                                return (
                                    <FormCell key={item}>
                                        <CellHeader>
                                            <Label>上 { item } 级</Label>
                                        </CellHeader>
                                        <CellBody>
                                            <Input type="text" placeholder={ `上 ${ item } 级佣金比例设置` } onChange={(e) => this.handleInputChange(item, e.target.value)}/>
                                        </CellBody>
                                    </FormCell>
                                )
                            })
                        }
                    </Form>
                    <ButtonArea>
                        <Button onClick={this.setCommission}>设置</Button>
                    </ButtonArea>
                    <Cells>
                        <Cell>
                            <CellBody style={{textAlign: 'center'}} onClick={this.addInput}>+ 添加</CellBody>
                            <CellFooter/>
                        </Cell>
                    </Cells>
                </Panel>
            </div>
        );
    }
}

export default Commission;