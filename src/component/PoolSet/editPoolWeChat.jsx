import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import { Form, FormCell, CellHeader, Label, CellBody, Input, Button } from 'react-weui';
import { GetCookie } from '../../assets/js/common.jsx';
import { ModifyPoolSet } from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import { withRouter,Link } from 'react-router-dom';

class EditPoolName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            group_name: '',
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    componentWillMount() {
        if (this.props.location.query) {
            const group_name = this.props.location.query.group_name;
            this.setState({ group_name: group_name });
        }
    }
    groupNameChange = (e) => {
        this.setState({ group_name: e.target.value });
    }
    modiyGroupName = () => {
        const params = { token: GetCookie('token'), group_name: this.state.group_name, group_id: GetCookie('group_id') }
        this.setState({ loadingShow: true });
        ModifyPoolSet(params, res => {
            if (res.errcode == 0) {
                this.setState({
                    loadingShow: false, toptipType: 'primary',
                    showTopTips: true, text: `修改成功`
                });
                this.stopTopTips();
                this.props.history.push('/poolSet')
            }
        }, res => {
            this.setState({
                loadingShow: false, toptipType: 'warn',
                showTopTips: true, text: `修改失败 ${res.errmsg}`
            });
            this.stopTopTips();
        })
    }
    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <Link to='/manageMent/poolSet' className='hight_color'>矿池设置</Link>&nbsp;|&nbsp;
            <span>矿池名称</span>
        </span>
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
                <Page className="article" title="编辑矿池名称" subTitle={bread} >
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>矿池名称</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="输入矿池名称" value={this.state.group_name} onChange={this.groupNameChange} />
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
export default withRouter(EditPoolName)