import React, {Component} from 'react';
import {GetGroupList} from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import GroupItem from './groupItem.jsx';
import PubSub from 'pubsub-js';

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            limit: 20,
            offset: 0,
            total: '',
            scale: '',
            type_id: '',
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: '',
            timer: '',
        }
    }

    componentDidMount() {
        this.groupList();
        this.groupSubscribe = PubSub.subscribe('groupScroll', (msg, content) => {
            if (content) {
                this.state.timer = setTimeout(() => {
                    this.handleVisit()
                }, 500);
            }
        })
    }

    handleVisit = () => {
        const {list, total, limit, offset} = this.state;
        if (list.length < total) {
            this.setState({loadingShow: true, offset: offset + limit}, () => this.groupList())
        } else {
            this.setState({showTopTips: true, toptipType: 'warn', text: '暂无更多数据'});
            this.stopTopTips();
        }
    };
    //获取矿池列表
    groupList = () => {
        const {limit, offset, search_name, scale, type_id} = this.state;
        const params = {
            limit: limit,
            offset: offset,
            search_name: search_name,
            scale: scale,
            type_id: type_id,
        };

        GetGroupList(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const rows = data.rows;
                let list = this.state.list;
                list = list.concat(rows);
                this.setState({loadingShow: false, list: list, total: data.total});
            } else {
                this.setState({
                    loadingShow: false,
                    toptipType: 'warn',
                    showTopTips: true,
                    text: `信息获取失败 ${res.errmsg}`
                });
                this.stopTopTips();
            }
        })
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
        clearTimeout(this.state.timer);
        PubSub.unsubscribe(this.groupSubscribe);
    }

    render() {
        return (
            <div id='groupList'>
                {
                    this.state.showTopTips ?
                        <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text}/> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow}/>
                        : ''
                }
                <GroupItem list={this.state.list}/>
            </div>
        )
    }
}
export default React.memo(GroupList)