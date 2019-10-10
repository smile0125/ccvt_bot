import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import { Form, FormCell, TextArea, CellBody, Button } from 'react-weui';
import { GetCookie, SetCookie, DelCookie } from '../../assets/js/common.jsx';
import { ModifyPoolSet } from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import { withRouter,Link } from 'react-router-dom';

class EditPoolKeyWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: '',
            welcome: '',
            is_welcome: '',
            poolInfo: '',
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    componentDidMount() {
        const poolInfo = JSON.parse(GetCookie('current_pool'));
        const { welcome, is_welcome } = poolInfo;
        this.setState({ welcome, is_welcome, poolInfo});
    }
    welcomeChange = (e) => {
        this.setState({ welcome: e.target.value });
    };
    modiykeyWord = (type) => {
        let is_welcome = '';
        if (type == 'on') {
            is_welcome = 1
        } else {
            is_welcome = 2
        }
        const group_id = this.state.poolInfo.id;

        const params = {
            token: GetCookie('token'),
            is_welcome: is_welcome,
            welcome: this.state.welcome,
            group_id
        };
        this.setState({ loadingShow: true });
        ModifyPoolSet(params, res => {
            if (res.errcode == 0) {
                this.setState({
                    loadingShow: false, toptipType: 'primary',
                    showTopTips: true, text: `修改成功`
                });
                this.stopTopTips();
                let poolInfo = this.state.poolInfo;
                poolInfo.welcome = this.state.welcome;
                poolInfo.is_welcome = is_welcome;
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
    }
    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
        DelCookie('is_welcome');
        DelCookie('welcome');
    }
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <Link to='/manageMent/poolSet' className='hight_color'>矿池设置</Link>&nbsp;|&nbsp;
            <span>欢迎语</span>
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
                <Page className="article" title="编辑欢迎语" subTitle={bread} >
                    <Form>
                        <FormCell>
                            <CellBody>
                                <TextArea value={this.state.welcome} onChange={this.welcomeChange} placeholder="请输入欢迎语" rows="3"></TextArea>
                            </CellBody>
                        </FormCell>
                    </Form>

                    <div className='margin_top_1 page_padding'>
                        {
                            this.state.is_welcome == 1 ?
                                <div>
                                    <Button   onClick={() => this.modiykeyWord('on')}>修改</Button>
                                    <Button type='warn' onClick={() => this.modiykeyWord('off')}>关闭</Button>
                                    
                                </div>
                                : <Button onClick={() => this.modiykeyWord('on')}>开启</Button>
                        }

                    </div>
                </Page>
            </div>
        )
    }
}
export default withRouter(EditPoolKeyWord)