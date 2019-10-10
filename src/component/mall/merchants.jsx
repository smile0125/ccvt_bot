import React, {Component} from 'react';
import { Panel, Cells, Cell, CellBody, CellFooter, CellHeader, PanelBody, MediaBox, MediaBoxHeader, MediaBoxBody, MediaBoxTitle, MediaBoxDescription, Flex, FlexItem } from "react-weui";
import { GetCookie } from '../../assets/js/common.jsx';
import Page from '../../assets/js/page.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import merchantsAction from './action/merchantsAction.jsx';
import '../../assets/css/merchantsInfo.scss';

class Merchants extends Component {
    componentDidMount() {
        this.fnMerchantsInfo();
    }
    fnMerchantsInfo = () => {
        const unionid = GetCookie('unionid');
        const token = GetCookie('token');
        const params = { token, unionid };
        this.props.getMerchantsInfo(params);
    };
    render() {
        const info = this.props.merchantsInfo.rows;
        const Style = {
            fontSize: '14px',
            border: '1px solid #e93b3d',
            padding: '1px 0.6rem',
            color: '#e93b3d',
            borderRadius: '5px'
       };
        return (
            <div id='merchants_info'>
                <Page title='商家信息'>
                    <Panel style={{ minHeight: '100vh' }}>
                        {/*<PanelHeader onClick={() => this.props.history.goBack()}>返回</PanelHeader>*/}
                        {
                            info ?
                                <div>
                                    <PanelBody>
                                        <MediaBox type="appmsg" onClick={ () => this.props.history.push({pathname: `/mall/merchants/apply/${info.id}`}) }>
                                            <MediaBoxHeader>
                                                <div className='info_header' style={{ background: `url(${ info ? info.logo : null })`, backgroundSize: 'cover' }}/>
                                            </MediaBoxHeader>
                                            <MediaBoxBody>
                                                <MediaBoxTitle>
                                                    <Flex>
                                                        <FlexItem>
                                                            <div>{ info ? info.name : null }</div>
                                                        </FlexItem>
                                                        <FlexItem>
                                                            <div style={{textAlign: 'right'}}><span style={Style}>编辑</span></div>
                                                        </FlexItem>
                                                    </Flex>
                                                </MediaBoxTitle>
                                                <MediaBoxDescription/>
                                            </MediaBoxBody>
                                        </MediaBox>
                                    </PanelBody>
                                    <Cells style={{margin: '0'}}>
                                        <Cell access>
                                            <CellHeader/>
                                            <CellBody onClick={ () => this.props.history.push({pathname: '/mall/goods/addressList/false'}) }>我的收货地址</CellBody>
                                            <CellFooter/>
                                        </Cell>
                                    </Cells>
                                    <Cells style={{margin: '0'}} onClick={ () => this.props.history.push({pathname: '/mall/merchants/myPaymentInfo'}) }>
                                        <Cell access>
                                            <CellHeader/>
                                            <CellBody>我的收款信息</CellBody>
                                            <CellFooter/>
                                        </Cell>
                                    </Cells>
                                    {
                                        info ? info.level == 1 ?
                                            <Cells style={{margin: '0'}} onClick={() => this.props.history.push({pathname: '/mall/merchants/Commission'})}>
                                                <Cell access>
                                                    <CellHeader/>
                                                    <CellBody>佣金比例设置</CellBody>
                                                    <CellFooter/>
                                                </Cell>
                                            </Cells> : null : null
                                    }
                                </div>
                                : <div className='apply' onClick={ () => this.props.history.push({pathname: '/mall/merchants/apply/first'}) }>申请代理商</div>
                        }
                    </Panel>
                </Page>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    merchantsInfo: state.merchantsInfoReducer
});
const mapDispatchToProps = dispatch => ({
    getMerchantsInfo: bindActionCreators(merchantsAction, dispatch)
    });
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Merchants));