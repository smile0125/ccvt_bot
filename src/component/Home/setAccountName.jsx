import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import { Form, FormCell, CellHeader, Label, Input, CellBody, Button } from 'react-weui';
import { ModifyAccountName } from '../../http/http.jsx';
import { GetCookie } from '../../assets/js/common.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';

export default class SetAccountName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            us_account: '',
            loadingShow: false,
            loadingText: '',
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    componentWillMount() {
        if (this.props.location.query) {
            const us_account = this.props.location.query.us_account;
            this.setState({ us_account: us_account });
        }

    }
    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer)
    }
    usAccountChange = (e) => {
        this.setState({ us_account: e.target.value });
    }
    modifyAccountNameClick = () => {
        const us_account = this.state.us_account;
        const params = {
            token: GetCookie('token'),
            us_account: us_account
        }

        if (!us_account) {
            this.setState({ toptipType: 'warn', showTopTips: true, text: `请输入账户昵称` });
            this.stopTopTips();
            return;
        }

        if(!us_account.match(/^[a-zA-Z][0-9a-zA-Z\._\-]{1,16}[^!\._\-]$/g)){
            this.setState({ toptipType: 'warn', showTopTips: true, text: `格式错误` });
            this.stopTopTips();
            return;
        }

        if(us_account.match("/([\.]{2})[^\d]*/i") || us_account.match("/([\_]{2})[^\d]*/i") || us_account.match("/([\-]{2})[^\d]*/i")){
            this.setState({ toptipType: 'warn', showTopTips: true, text: `格式错误` });
            this.stopTopTips();
            return;
        }

        this.setState({ loadingShow: true });
        ModifyAccountName(params, res => {
            if (res.errcode == 0) {
                this.setState({ toptipType: 'primary', showTopTips: true, text: `修改成功`, loadingShow: false });
                window.location.hash = '/'
            }
        }, res => {
            this.setState({ toptipType: 'warn', showTopTips: true, text: `修改失败`, loadingShow: false });
        })
    }

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    render() {
        const style = {
            fontSize: '12px',
            marginTop: '1rem',
            background: '#E8FFE4',
            padding: '0.5rem',
            borderRadius: '5px',
            textAlign: 'justify',
            textAlignLast: 'left'
        }
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
                <Page className="article" title="修改账户昵称">
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>账户昵称</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入账户昵称" value={this.state.us_account} onChange={this.usAccountChange} />
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div className='margin_top_1 margin_bottom_1 page_padding'>
                        <Button onClick={this.modifyAccountNameClick}>提交</Button>
                        <div style={style}>
                        <p>长度为3～18个字符;</p>
                        <p>a～z的英文字母（不区分大小写）开头;</p>
                        <p>可由英文字母、0～9的数字（但不能使用全数字）、点、减号或下划线组成;</p>
                        <p>不能以点、减号或下划线结尾，不能出现连续两个或两个以上的点、减号或下划线;</p>
                    </div>
                    </div>
                    
                </Page>
            </div>
        )
    }
}
