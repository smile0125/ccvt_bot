import React, {Component} from 'react';
import {
    Panel,
    PanelHeader,
    PanelBody,
    MediaBox,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
    Button
} from 'react-weui';
import Edit from './edit.jsx';
import Del from './del.jsx';
import OnOff from './OnOff.jsx';
import {TaskHttp} from '../../http/http.jsx';
import {GetCookie} from '../../assets/js/common.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import Loading from '../../assets/js/loading.jsx';
import {withRouter} from 'react-router-dom';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            data: [],
            loadingShow: false,
            editDelete: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: 'warn',
            text: ''
        }
    }

    componentWillMount() {
        const token = GetCookie('token');
        this.setState({token: token});
    }


    componentDidMount() {
        this.task();
    }

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }


    task = () => {
        const poolInfo = JSON.parse(GetCookie('current_pool'));
        const group_id = poolInfo.id;
        const params = {
            token: this.state.token || GetCookie('token'),
            group_id
        };
        this.setState({loadingShow: true,});
        TaskHttp(params).then(res => {
            const data = res.data;
            this.setState({loadingShow: false});
            if (data.errcode == 0) {
                const rows = data.rows;
                rows.map((item, index) => {
                    let item_one;
                    if (item.tx_content) {
                        item_one = item.tx_content.split("-");
                        if (item_one.indexOf("sunday") != -1) {
                            item_one[item_one.indexOf("sunday")] = "#星期日";
                        }
                        if (item_one.indexOf("monday") != -1) {
                            item_one[item_one.indexOf("monday")] = " #星期一";
                        }
                        if (item_one.indexOf("tuesday") != -1) {
                            item_one[item_one.indexOf("tuesday")] = " #星期二";
                        }
                        if (item_one.indexOf("wednesday") != -1) {
                            item_one[item_one.indexOf("wednesday")] = " #星期三";
                        }
                        if (item_one.indexOf("thursday") != -1) {
                            item_one[item_one.indexOf("thursday")] = " #星期四";
                        }
                        if (item_one.indexOf("friday") != -1) {
                            item_one[item_one.indexOf("friday")] = " #星期五";
                        }
                        if (item_one.indexOf("saturday") != -1) {
                            item_one[item_one.indexOf("saturday")] = " #星期六";
                        }
                    }
                    item.tx_content = item_one;
                });
                this.setState({data:rows})
            } else {
                this.setState({loadingShow: false, toptipType: 'warn', showTopTips: true, text: '加载失败' + res.errmsg});
                this.stopTopTips()
            }
        })
    };

    //动态更新列表
    upLoadList = () => {
        this.task();
    };

    toAddTask = () => {
        this.props.history.push({pathname: '/addTask'})
    };

    toAdInfo = (item) => {
        this.props.history.push({pathname: '/ad/adInfo', state: {item}})
    };

    render() {
        return (
            <div>
                {
                    this.state.showTopTips ?
                        <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text}/> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow}/>
                        : ''
                }

                <div className='page_padding addBtnStyle'>
                    <Button size='small' onClick={this.toAddTask}>添加定时任务</Button>
                </div>
                <Panel>
                    <PanelHeader>
                        定时任务
                    </PanelHeader>
                    <PanelBody>
                        {
                            this.state.data.length >= 1 ?
                                this.state.data.map((item, index) => {
                                    return (
                                        <MediaBox type='text' key={item.id}
                                            // onClick={item.is_type == 3 ? () => this.toAdInfo(item) : ()=>{}}
                                        >
                                            <MediaBoxTitle className='task_title'>
                                                <p>【{item.name}】</p>
                                                <div>
                                                    <p>{item.time}</p>&nbsp;&nbsp;
                                                    <OnOff is_close={item.is_close} timer_id={item.id}
                                                           upLoadList={this.upLoadList}/>
                                                </div>

                                            </MediaBoxTitle>
                                            <MediaBoxDescription className='task_content'>
                                                {item.content}
                                            </MediaBoxDescription>
                                            <p style={{fontSize: '0.8rem'}}>{item.tx_content}</p>
                                            {
                                                item.is_type == 1 ?
                                                    <MediaBoxInfo className='task_footer'>
                                                        <MediaBoxInfoMeta className='float-right' extra
                                                                          style={{paddingRight: 0}}>
                                                            <Edit timer_id={item.id} content={item}/>
                                                        </MediaBoxInfoMeta>

                                                        <MediaBoxInfoMeta extra className='float-right'>
                                                            <Del timer_id={item.id} upLoadList={this.upLoadList}/>
                                                        </MediaBoxInfoMeta>
                                                    </MediaBoxInfo> : ''
                                            }
                                        </MediaBox>
                                    )
                                }) : <MediaBox type='text'>
                                    <MediaBoxTitle>暂无数据</MediaBoxTitle>
                                </MediaBox>
                        }
                    </PanelBody>
                </Panel>
            </div>
        )
    }
}

export default withRouter(Task);