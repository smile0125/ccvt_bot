import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import {Form, FormCell, CellHeader, Label, CellBody, Input, Button, CellsTips} from 'react-weui';
import {GetCookie, SetCookie} from '../../assets/js/common.jsx';
import {ModifyPoolSet} from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import {withRouter, Link} from 'react-router-dom';

class EditPuid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poolInfo: '',
            puid: '',
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }

    componentWillMount() {
        const poolInfo = JSON.parse(GetCookie('current_pool'));
        const { puid } = poolInfo;
        this.setState({ puid, poolInfo});
    }

    groupNameChange = (e) => {
        this.setState({puid: e.target.value});
    };
    modiyPuid = () => {
        const { puid, poolInfo } = this.state;
        const params = {token: GetCookie('token'), puid, group_id: poolInfo.id};
        this.setState({loadingShow: true});
        ModifyPoolSet(params, res => {
            if (res.errcode == 0) {
                this.setState({
                    loadingShow: false, toptipType: 'primary',
                    showTopTips: true, text: `修改成功`
                });
                this.stopTopTips();
                poolInfo.puid = puid;
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
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }

    render() {
        const {puid, showTopTips, toptipType, loadingShow, text} = this.state;
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <Link to='/manageMent/poolSet' className='hight_color'>矿池设置</Link>&nbsp;|&nbsp;
            <span>PUID</span>
        </span>;
        return (
            <div>
                {
                    showTopTips ?
                        <TopTip type={toptipType} show={showTopTips} text={text}/> : ''
                }
                {
                    loadingShow ?
                        <Loading show={loadingShow}/>
                        : ''
                }
                <Page className="article" title="编辑矿主微信号" subTitle={bread}>
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>PUID</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入 PUID" value={puid ? puid : ''}
                                       onChange={this.groupNameChange}/>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div className='margin_top_1 page_padding'>
                        <Button onClick={this.modiyPuid}>提交</Button>
                    </div>
                    <CellsTips>PUID是关联矿池和矿主的唯一标示</CellsTips>
                    <CellsTips>请务必填写正确的PUID值</CellsTips>
                    <CellsTips>PUID值获取方式：</CellsTips>
                    <CellsTips>1>无机器人好友，加机器人为好友，通过后将会收到PUID值</CellsTips>
                    <CellsTips>2>已有机器人好友，与机器人聊天中输入"puid"并发送，稍后机器人会将puid发送给您</CellsTips>
                </Page>
            </div>
        )
    }
}

export default withRouter(EditPuid)