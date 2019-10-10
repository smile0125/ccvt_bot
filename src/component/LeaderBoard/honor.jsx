import React, {Component} from 'react';
import {GetHonorList} from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import {withRouter} from 'react-router-dom';
import PubSub from 'pubsub-js';
import HonorItem from './honorItem.jsx';

class Honor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            limit: 50,
            offset: 0,
            total: '',
            search_content: '',
            group_id: 'all',
            loadingShow: true,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: '',
            timer: null
        }
    }

    componentDidMount() {
        this.getHonorUserList();
        this.honorScubscribe = PubSub.subscribe('honorScroll', (msg, content) => {
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
            this.setState({offset: offset + limit}, () => this.getHonorUserList())
        } else {
            this.setState({showTopTips: true, toptipType: 'warn', text: '暂无更多数据'});
            this.stopTopTips();
        }
    };

    //获取荣耀用户列表
    getHonorUserList = (text) => {
        const search = this.props.location.search;
        const group_id = search.split('=')[1] || 'all';
        const {limit, offset} = this.state;
        const params = {
            limit: limit,
            offset: offset,
            search_content: text,
            group_id: group_id
        };

        this.setState({loadingShow: true});
        GetHonorList(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const rows = data.rows;
                let list = this.state.list;
                list = list.concat(rows);
                this.setState({loadingShow: false, list: list, total: data.total});
            } else {
                console.log(res);
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
        PubSub.unsubscribe(this.honorScubscribe);
    }

    //去赞踩
    toZanCai = (us_id, wechat, type) => {
        this.props.history.push({pathname: '/zancai', query: {us_id: us_id, wechat: wechat, type: type}})
    };
    //输入搜索内容
    handleSearchChange = (text) => {
        if (text) {
            this.setState({search_content: text}, () => this.getHonorUserList(text));
        }
    };

    //点击头像显示
    headerImgClick = (src) => {

        const {showImgFun} = this.props;
        showImgFun(src);
    };

    render() {
        return (
            <div>
                {/* <SearchBar
                    onChange={this.handleSearchChange}
                    vlue={this.state.search_content}
                    placeholder="请输入搜索昵称"
                    lang={{
                        cancel: '取消'
                    }}
                /> */}
                {
                    this.state.showTopTips ?
                        <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text}/> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow}/>
                        : ''
                }
                <HonorItem toZanCai={this.toZanCai} headerImgClick={this.headerImgClick} list={this.state.list}/>
                {/*<InfiniteLoader onVisited={() => this.handleVisit()} />*/}
            </div>
        )
    }
}

export default React.memo(withRouter(Honor));