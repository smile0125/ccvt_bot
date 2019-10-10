import React, {Component} from 'react';
import {
    Popup,
    Article,
    Button,
    ButtonArea,
    Panel,
    PanelHeader,
    PanelBody,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription
} from 'react-weui';
import {SelectAiList} from '../../http/http.jsx';
import {GetCookie} from '../../assets/js/common.jsx';

export default class AdminLoginTips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullpage_show: false,
            list: []
        }
    }

    hide = (us_id) => {
        this.setState({fullpage_show: false});
        this.props.toggleAdmin(us_id)
    };

    componentDidMount() {
        this.SelectAiListFun();
    }

    SelectAiListFun = () => {
        const token = GetCookie('token');
        const params = {token};
        SelectAiList(params).then(res => {
            if (res.data.errcode == 0) {
                const list = res.data.rows;
                this.setState(() => {
                    return {list: list}
                })
            }
        })
    };

    render() {
        return (
            <div>
                <ButtonArea>
                    <Button onClick={e => this.setState({fullpage_show: true})}>切换官方登录</Button>
                </ButtonArea>

                <Popup
                    show={this.state.fullpage_show}
                    onRequestClose={e => this.setState({fullpage_show: false})}
                >
                    <div style={{height: '100vh', overflow: 'scroll'}}>
                        <Panel>
                            <PanelHeader>
                                选择一个AI机器人管理
                            </PanelHeader>
                            <PanelBody>
                                {
                                    this.state.list.map((item, index) => {
                                        return (
                                            <MediaBox key={item.id} type="appmsg" onClick={() => this.hide(item.us_id)}
                                                      href="javascript:void(0);">
                                                <MediaBoxHeader className='aiLogin_toggle_header'>
                                                    <svg className="icon">
                                                        <use xlinkHref='#icon-robot'>
                                                        </use>
                                                    </svg>
                                                </MediaBoxHeader>
                                                <MediaBoxBody>
                                                    <MediaBoxTitle>{item.bot_name}</MediaBoxTitle>
                                                    <MediaBoxDescription>
                                                        微信号：{item.wechat_id}
                                                    </MediaBoxDescription>
                                                </MediaBoxBody>
                                            </MediaBox>
                                        )
                                    })
                                }
                            </PanelBody>
                        </Panel>
                        <Article>

                            {/* <h1>切换大白登录？</h1> */}
                            <section>
                                <h2 className="title">重要提示</h2>
                                <section>
                                    <p>1 请加AI机器人为好友</p>
                                    <p>2 将AI机器人拉到当前群中</p>
                                </section>
                            </section>
                            <Button type='warn' plain onClick={e => this.setState({fullpage_show: false})}>取消</Button>
                            {/* <Button plain onClick={this.hide}>确认</Button> */}
                        </Article>
                    </div>
                </Popup>
            </div>
        )
    }
}
