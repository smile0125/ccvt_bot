import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import { Form, FormCell, CellHeader, Label, CellBody, Input, Button } from 'react-weui';
import { GetCookie, SetCookie } from '../../assets/js/common.jsx';
import { ModifyPoolSet } from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import { withRouter,Link } from 'react-router-dom';

class EditWeChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poolInfo: '',
            manager_wechat_id: '',
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    componentDidMount() {
        const poolInfo = JSON.parse(GetCookie('current_pool'));
        const { manager_wechat_id } = poolInfo;
        this.setState({ manager_wechat_id, poolInfo});
    }
    groupNameChange = (e) => {
        this.setState({ manager_wechat_id: e.target.value });
    };
    modiyGroupName = () => {
        const { manager_wechat_id, poolInfo } = this.state;
        const params = { token: GetCookie('token'), manager_wechat_id, group_id: poolInfo.id };
        this.setState({ loadingShow: true });
        ModifyPoolSet(params, res => {
            if (res.errcode == 0) {
                this.setState({
                    loadingShow: false, toptipType: 'primary',
                    showTopTips: true, text: `修改成功`
                });
                this.stopTopTips();
                poolInfo.manager_wechat_id = manager_wechat_id;
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
            this.setState({ showTopTips: false });
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <Link to='/manageMent/poolSet' className='hight_color'>矿池设置</Link>&nbsp;|&nbsp;
            <span>矿主微信号</span>
        </span>;
        return (
            <div>
                {
                    this.state.showTopTips ? <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text} /> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow} />
                        : ''
                }
                <Page className="article" title="编辑矿主微信号" subTitle={bread} >
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>矿主微信号</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入矿主微信号" value={this.state.manager_wechat_id} onChange={this.groupNameChange} />
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div className='margin_top_1 page_padding'>
                        <Button onClick={this.modiyGroupName}>提交</Button>
                    </div>
                </Page>
            </div>
        )
    }
}
export default withRouter(EditWeChat)