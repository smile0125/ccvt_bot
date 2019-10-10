import React, {Component} from 'react';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import Page from '../../assets/js/page.jsx';
import {GetCookie, Throttling} from '../../assets/js/common.jsx';
import {GetKeyWordList} from '../../http/http.jsx';
import DelKeyWord from './delKeyWord.jsx';
import EditKeyWord from './editKeyWord.jsx';
import {Link} from 'react-router-dom';
import ScrollData from '../../assets/js/scrollData.jsx';
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
import '../../assets/css/keyWord.scss';

export default class KeyWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingShow: false,
            showTopTips: false,
            group_id: '',
            toptipType: '',
            toptTipsTimer: null,
            text: '',
            total: '',
            limit: 10,
            offset: 0,
        }
    }

    componentDidMount() {
        const token = GetCookie('token');
        const poolInfo = JSON.parse(GetCookie('current_pool'));
        const group_id = poolInfo.id;
        this.setState({ token, group_id }, () => this.handleVisit());
    }

    //监听滚动距离，如果滚动到底部，加载更多数据；
    handleScroll = Throttling(() => {
        const is_bottom = ScrollData();
        if (is_bottom) {
            this.handleVisit();
        }
    }, 2000);

    //获取数据
    handleVisit = () => {
        const {data, total, limit, offset} = this.state;
        if (data.length <= 0) {
            this.getkeyWordList();
        } else if (data.length < total) {
            this.setState({loadingShow: true, offset: offset + limit}, () => this.getkeyWordList())
        } else {
            this.setState({showTopTips: true, toptipType: 'warn', text: '暂无更多数据'});
            this.stopTopTips();
        }
    };

    //获取关键字列表
    getkeyWordList = () => {
        const {token, group_id, search_keywords, limit, offset} = this.state;

        let params = {
            token: GetCookie('token') || token,
            search_keywords,
            group_id,
            limit: limit,
            offset: offset
        };

        this.setState({loadingShow: true});
        GetKeyWordList(params, res => {
            if (res.errcode == 0) {
                let data = this.state.data;
                data = data.concat(res.rows);
                this.setState({loadingShow: false, data: data, total: res.total});
            }
        }, res => {
            this.setState({loadingShow: false, toptipType: 'warn', showTopTips: true, text: `获取失败 ${res.errmsg}`});
            this.stopTopTips();
        });
    };

    uploadkeyWordList = (key_id) => {
        const _state = this.state.data;
        _state.map((item, index) => {
            if (item.id == key_id) {
                _state.splice(index, 1)
            }
            this.setState({data:_state})
        })
    };

    toAddKeyWord = () => {
        window.location.hash = 'addKeyWord';
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
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <span>关键字</span>
        </span>;
        return (
            <div onScroll={this.handleScroll}>
                {
                    this.state.showTopTips ?
                        <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text}/> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow}/>
                        : ''
                }
                <Page className="article" title="关键字回复" subTitle={bread}>
                    <div className='page_padding addBtnStyle'>
                        <Button size='small' onClick={this.toAddKeyWord}>添加关键字回复</Button>
                    </div>
                    <Panel>
                        <PanelHeader>关键字回复列表</PanelHeader>
                        <PanelBody>
                            {
                                this.state.data.length > 0 ?
                                    this.state.data.map((item, index) => {
                                        return (
                                            <MediaBox type="text" key={item.id}>
                                                <MediaBoxTitle>{item.ask}</MediaBoxTitle>
                                                <MediaBoxDescription>{item.answer}</MediaBoxDescription>
                                                <MediaBoxInfo className='key_word_item_footer'>
                                                    <MediaBoxInfoMeta className='float-right' extra>
                                                        <EditKeyWord item={item}/>
                                                    </MediaBoxInfoMeta>
                                                    <MediaBoxInfoMeta className='float-right'>
                                                        <DelKeyWord id={item.id}
                                                                    uploadkeyWordList={this.uploadkeyWordList}/>
                                                    </MediaBoxInfoMeta>
                                                </MediaBoxInfo>
                                            </MediaBox>
                                        )
                                    }) : <MediaBox type='text'>
                                        <MediaBoxTitle>暂无数据</MediaBoxTitle>
                                    </MediaBox>
                            }
                        </PanelBody>
                    </Panel>
                </Page>
            </div>
        )
    }
}
