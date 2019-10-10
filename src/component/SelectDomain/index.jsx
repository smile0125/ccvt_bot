import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import {Link} from 'react-router-dom';
import DmainList from './list.jsx';
import { Throttling} from '../../assets/js/common.jsx';
import ScrollData from "../../assets/js/scrollData.jsx";
import {SelectDomainList} from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import '../../assets/css/domain.scss';

export default class SelectDomain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            limit: 10,
            offset: 0,
            total: '',
            loadingShow: false,
            show_hide_img_box: false,
            toptTipsTimer: null,
            showTopTips: false,
            toptipType: '',
            src: '',
        }
    }

    componentDidMount() {
        this.getDomainList();
    }

    getDomainList = () => {
        const {limit, offset} = this.state;
        const params = {
            limit: limit,
            offset: offset,
        };

        this.setState({loadingShow: true});
        SelectDomainList(params, res => {
            if (res.errcode == 0) {
                this.setState({
                    loadingShow: false,
                    list: res.rows,
                    total: res.total,
                });
            }
        }, res => {
            this.setState({loadingShow: false});
        });
    };
    //监听滚动距离，如果滚动到底部，加载更多数据；
    handleScroll = Throttling(() => {
        const is_bottom = ScrollData();
        if (is_bottom) {
            this.handleVisit();
        }
    }, 2000);

    handleVisit = () => {
        const {list, total, limit, offset} = this.state;
        if (list.length <= 0) {
            this.getDomainList();
        } else if (list.length < total) {
            this.setState({loadingShow: true, offset: offset + limit}, () => this.getDomainList())
        } else {
            this.setState({showTopTips: true, toptipType: 'warn', text: '暂无更多数据'});
            this.stopTopTips();
        }
    };

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }

    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <span>选择矿池</span>
        </span>;
        return (
            <div onScroll={this.handleScroll}>
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow} />
                        : ''
                }
                <Page className="article" title="选择矿池" subTitle={bread}>
                    <DmainList list={this.state.list}/>
                </Page>
            </div>
        )
    }
}
