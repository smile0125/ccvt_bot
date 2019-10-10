import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import { Link } from 'react-router-dom';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import { UpGloryIntegral } from '../../http/http.jsx';
import { GetCookie } from '../../assets/js/common.jsx';
import { CellsTitle, Cells, Cell, CellBody, CellFooter, ButtonArea, Button, Form, FormCell, CellHeader, Label, Input, CellsTips } from 'react-weui';

export default class GloryIntegral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            glory_integral: '',
            info_rows: '',
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }
    componentDidMount() {
        document.title = "荣耀积分-CCVT";
        const info_rows = JSON.parse(GetCookie('rows'));
        this.setState({ info_rows: info_rows })
    }
    //输入荣耀积分
    gloryIntegralChange = (e) => {
        this.setState({ glory_integral: e.target.value });
    };
    //提升荣耀积分
    upGloryIntegral = () => {
        const account = this.state.glory_integral;
        const reg = /^[0-9]\d*\.\d*|-0\.\d*[1-9]\d*$/
        const { glory_of_integral, next_scale_poor } = this.state.info_rows;
        if (!account) {
            this.setState({ toptipType: 'warn', showTopTips: true, text: '请输入需要提升的荣耀积分' })
            this.stopTopTips();
            return;
        }
        if (reg.test(account)) {
            this.setState({ toptipType: 'warn', showTopTips: true, text: '必须是正整数' })
            this.stopTopTips();
            return;
        }
        if (parseInt(account) < 0) {
            this.setState({ toptipType: 'warn', showTopTips: true, text: '必须是正整数' })
            this.stopTopTips();
            return;
        }
        const params = {
            token: GetCookie('token'),
            account: account
        }
        this.setState({ loadingShow: true })
        UpGloryIntegral(params).then(res => {
            const data = res.data;
            let info_rows = this.state.info_rows;
            if (data.errcode == 0) {
                info_rows.glory_of_integral = parseInt(glory_of_integral) + parseInt(account)
                this.setState({ loadingShow: false, toptipType: 'primary', showTopTips: true, text: '提升成功', info_rows: info_rows })
                this.stopTopTips();
                if (this.state.next_scale_poor > 0) {
                    info_rows.next_scale_poor = parseInt(next_scale_poor) - parseInt(account)
                    this.setState({ info_rows: info_rows })
                }
            } else {
                this.setState({ loadingShow: false, toptipType: 'warn', showTopTips: true, text: `提升失败 ${res.data.errmsg}` })
                this.stopTopTips();
            }
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
    toLeaveMessage = () => {
        window.location.hash = 'leaveMessage';
    };

    toChangeCode = () => {
        window.location.hash = 'changeCode';
    };
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <span>荣耀积分</span>
        </span>;
        const {all_integral,glory_of_integral,scale,next_scale_poor,several} = this.state.info_rows;
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
                <Page className="article" title="荣耀积分" subTitle={bread} >
                    <CellsTitle>荣耀积分</CellsTitle>
                    <Cells>

                        <Cell>
                            <CellBody>
                                总荣耀积分
                            </CellBody>
                            <CellFooter>{all_integral}</CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                当前荣耀积分
                            </CellBody>
                            <CellFooter>{glory_of_integral}</CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                荣耀积分比例
                            </CellBody>
                            <CellFooter>{several} ‱</CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                当前荣耀等级
                            </CellBody>
                            <CellFooter>LV.{scale}</CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                距离下一级所需
                            </CellBody>
                            <CellFooter>{next_scale_poor}</CellFooter>
                        </Cell>

                        <Cell access onClick={this.toLeaveMessage}>
                            <CellBody>
                                荣耀留言
                            </CellBody>
                            <CellFooter />
                        </Cell>

                        <Cell access onClick={this.toChangeCode}>
                            <CellBody>
                                荣耀积分变动记录
                            </CellBody>
                            <CellFooter />
                        </Cell>


                    </Cells>
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>提升荣耀积分</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" value={this.glory_integral} onChange={this.gloryIntegralChange} placeholder="请输入提升的荣耀积分" />
                            </CellBody>
                        </FormCell>
                    </Form>
                    <CellsTips>1CCVT可提升1荣耀积分</CellsTips>

                    <ButtonArea>
                        <Button onClick={this.upGloryIntegral}>提升</Button>
                    </ButtonArea>
                </Page>
            </div>
        )
    }
}
