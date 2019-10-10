import React, { Component } from 'react';
import { CellsTitle, Form, FormCell, CellHeader, Checkbox, CellBody, Input, Label, Button, TextArea } from 'react-weui';
import { GetCookie } from '../../assets/js/common.jsx';
import { EditTaskHttp } from '../../http/http.jsx';
import { GetGroupId } from '../../assets/js/getGroupId.jsx';
import Page from '../../assets/js/page.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import {Link} from 'react-router-dom';

const date = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']

export default class ModiyTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            timer_id: '',
            tx_content: '',
            content: '',
            content_props: '',
            time: '',
            tx_content_arr: [],
            type: 1,
            loadingShow: false,
            loadingText: '',
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }

    componentWillMount() {
        const token = GetCookie('token');
        this.setState({ token: token });
        const group_id = GetCookie('group_id');
        if (group_id) {
            this.setState({ group_id: group_id });
        } else {
            GetGroupId();
        }

        if (this.props.location.query) {
            const content = this.props.location.query.content;
            this.setState({ 
                content_props: content,
                content: content.content,
                time: content.time,
                timer_id: content.id,
                tx_content: content.tx_content
            })
        }

        clearTimeout(this.state.toptTipsTimer);
    }

    //获取选择的日期
    checkChange = (index, e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        const arr = this.state.tx_content_arr;
        if (checked) {
            switch (value) {
                case '星期一':
                    arr.splice(index, 0, 'monday');
                    break;
                case '星期二':
                    arr.splice(index, 0, 'tuesday');
                    break;
                case '星期三':
                    arr.splice(index, 0, 'wednesday');
                    break;
                case '星期四':
                    arr.splice(index, 0, 'thursday');
                    break;
                case '星期五':
                    arr.splice(index, 0, 'friday');
                    break;
                case '星期六':
                    arr.splice(index, 0, 'saturday');
                    break;
                case '星期日':
                    arr.splice(index, 0, 'sunday');
                    break;
                default:
            }
        } else {
            switch (value) {
                case '星期一':
                    arr.splice(arr.indexOf('monday'), 1);
                    break;
                case '星期二':
                    arr.splice(arr.indexOf('tuesday'), 1);
                    break;
                case '星期三':
                    arr.splice(arr.indexOf('wednesday'), 1);
                    break;
                case '星期四':
                    arr.splice(arr.indexOf('thursday'), 1);
                    break;
                case '星期五':
                    arr.splice(arr.indexOf('friday'), 1);
                    break;
                case '星期六':
                    arr.splice(arr.indexOf('saturday'), 1);
                    break;
                case '星期日':
                    arr.splice(arr.indexOf('sunday'), 1);
                    break;
                default:
            }
        }
        if (arr.length == 1) {
            this.setState(({ tx_content: arr[0] }));
        } else {
            this.setState(({ tx_content: arr.join('-') }));
        }

        if (arr.length == 7) {
            this.setState({ type: 1 });
        } else {
            this.setState({ type: 2 });
        }
    }

    //选择时间
    timeChange = (e) => {
        this.setState({ time: e.target.value });
    }

    //内容
    contentChange = (e) => {
        this.setState({ content: e.target.value });
    }


    //确认提交任务
    confirmModifyTask = () => {
        const { tx_content, token, timer_id, content, type, time } = this.state;
        let new_time = '';
        let h = time.split(':')[0]
        let m = time.split(':')[1]

        if (parseInt(h) < 10) {
            h = h.split('0')[1]
        }
        new_time = `${h}:${m}`;
        const params = {
            token: token,
            timer_id: timer_id,
            content: content,
            send_type: '1',
            tx_content: tx_content,
            time: new_time,
            type: type,
        };

        if (!tx_content) {
            this.setState({ toptipType: 'warn', showTopTips: true, text: `请选择日期` });
            this.stopTopTips();
            return;
        }

        if (!time) {
            this.setState({ toptipType: 'warn', showTopTips: true, text: `请选择时间` });
            this.stopTopTips();
            return;
        }

        if (!content) {
            this.setState({ toptipType: 'warn', showTopTips: true, text: `请填写内容` });
            this.stopTopTips();
            return;
        }

        this.setState({ loadingShow: true, loadingText: '添加中' })
        EditTaskHttp(params, res => {
            if (res.errcode == 0) {
                this.setState({ toptipType: 'primary', showTopTips: true, text: '添加成功', loadingShow: false });
                this.stopTopTips();
                window.location.hash = '/manageMent/timeTask';
            }
        }, res => {
            this.setState({ toptipType: 'warn', showTopTips: true, text: `添加失败${res.errmsg}`, loadingShow: false });
            this.stopTopTips();
        })
    }

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer)
    }

    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <Link to='/manageMent/timeTask' className='hight_color'>定时任务</Link>&nbsp;|&nbsp;
            <span>修改</span>
        </span>
        return (
            <div>

                {
                    this.state.showTopTips ? <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text} /> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow} loadingText={this.state.loadingText} />
                        : ''
                }
                <Page className="article" title="修改定时任务" subTitle={bread}>
                    <div>
                        <CellsTitle>选择日期</CellsTitle>
                        <Form checkbox>
                            {
                                date.map((item, index) => {
                                    return (
                                        <FormCell key={item} checkbox >
                                            <CellHeader>
                                                <Checkbox name="sunday" value={item} onClick={this.checkChange.bind(this, index)} />
                                            </CellHeader>
                                            <CellBody>{item}</CellBody>
                                        </FormCell>
                                    )
                                })
                            }
                        </Form>

                        <CellsTitle>选择时间</CellsTitle>
                        <Form>
                            <FormCell>
                                <CellHeader>
                                    <Label>时间</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="time" value={this.state.time} onChange={this.timeChange} placeholder="" />
                                </CellBody>
                            </FormCell>
                        </Form>

                        <CellsTitle>内容</CellsTitle>
                        <Form>
                            <FormCell>
                                <CellBody>
                                    <TextArea placeholder="请输入定时任务内容" onChange={this.contentChange} value={this.state.content} rows="3"></TextArea>
                                </CellBody>
                            </FormCell>
                        </Form>
                        <div className='margin_top_1 margin_bottom_1'>
                            <Button onClick={this.confirmModifyTask}>提交</Button>
                        </div>
                    </div>
                </Page>
            </div>
        )
    }
}
