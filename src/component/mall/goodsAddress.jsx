import React, {Component} from 'react';
import {Form,FormCell,CellHeader,Label,CellBody,Input,CellsTitle,TextArea,ButtonArea,Button,Toast, Dialog, Panel, PanelHeader, CellFooter, Switch} from 'react-weui';
import Address from './address.jsx';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputChangeAction from '../../redux/action/inputChangeAction.jsx';
import addEditAddressAction from './action/addEditAddressAction.jsx'
import {GetCookie} from "../../assets/js/common.jsx";

class GoodsAddress extends Component {
    constructor(props) {
        super(props);
        this.state={
            showLoading: false,
            showTop: true,
        }
    }

    componentDidMount() {
        this.fnModifyAddressDefault();
    }

    //修改默认值
    fnModifyAddressDefault = () => {
        const _id = this.props.match.params.id;
        const addressList = this.props.addressListState.rows;
        if(_id !== 'newAddress'){
            const target = addressList.find(item => item.id == _id)
            const { name, phone, province, city, area, address, is_default, id } = target;
            this.handleChange(name, 'name');
            this.handleChange(phone, 'phone');
            this.handleChange(province, 'province');
            this.handleChange(city, 'city');
            this.handleChange(area, 'area');
            this.handleChange(address, 'address');
            this.handleChange(is_default, 'is_default');
            this.handleChange(id, 'id');
        }
    };

    handleChange = (val, type) => {
        // console.log(type, val)
        const params = { type, val };
        this.props.inputHandleChange(params);
    };

    //提交地址
    submitAddress = async () => {
        const { name, phone, province, city, area, address, is_default, id } = this.props.reducerState;
        const unionid = GetCookie('unionid');
        const params = { unionid, name, phone, province, city, area,address, is_default, id};
        this.props.addEditAddress(params, () => {
            this.props.history.goBack()
        });
    };

    render() {
        const { showLoading } = this.state;
        const { name, phone, province, city, area, address, is_default } = this.props.reducerState;

        return (
            <div>
                { showLoading ? <Toast icon="loading" show={ showLoading }/> : null }
                {/*<Page className="article" title="奖品兑换" subTitle={bread}>*/}
                <Panel>
                <PanelHeader onClick={ () => this.props.history.goBack() }>返回</PanelHeader>
                </Panel>
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>收货人</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" defaultValue={ name } onChange={(e) => this.handleChange(e.target.value, 'name')} placeholder="请填写收货人姓名"/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>手机号码</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" defaultValue={ phone } onChange={(e) => this.handleChange(e.target.value, 'phone')} placeholder="请填写收货人手机号"/>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <Address address={`${province} ${city} ${area}`} handleChange={this.handleChange} />
                    <CellsTitle>详细地址</CellsTitle>
                    <Form>
                        <FormCell>
                            <CellBody>
                                <TextArea placeholder="街道 楼牌号等" value={ address } onChange={(e) => this.handleChange(e.target.value, 'address')} rows="3"/>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <Form>
                        <FormCell switch>
                            <CellBody>设置为默认地址</CellBody>
                            <CellFooter>
                                <Switch checked={is_default == 1 ? true : false} onChange={(e) => this.handleChange(e.target.checked ? 1 : 0, 'is_default')}/>
                            </CellFooter>
                        </FormCell>
                    </Form>
                    <ButtonArea>
                        <Button onClick={this.submitAddress} style={{ background: 'linear-gradient(-41deg, #ff4f18, #ff2000 24%, #f10000)' }}>提交</Button>
                    </ButtonArea>
                {/*</Page>*/}

            </div>
        );
    }
}

const mapStateToProps = state => ({
    reducerState: state.inputChangeReducer,
    addEditAddressState: state,
    addressListState: state.addressListReducer,
});
const mapDispatchToProps = dispatch => ({
    inputHandleChange : bindActionCreators(InputChangeAction, dispatch),
    addEditAddress: bindActionCreators(addEditAddressAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GoodsAddress));