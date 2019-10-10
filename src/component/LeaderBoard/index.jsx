import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import {Link} from 'react-router-dom';
import Tab from './tab.jsx';
import ScrollLeavemessage from './scrollLeavemessage.jsx';
import ScrollData from '../../assets/js/scrollData.jsx';
import PubSub from 'pubsub-js';
import {Throttling} from "../../assets/js/common.jsx";

export default class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {moreData: false};
    }

    //监听滚动距离，如果滚动到底部，加载更多数据；
    handleScroll = Throttling(() => {
        const is_bottom = ScrollData();
        if (is_bottom) {
            PubSub.publish('is_bottom', true);
            this.setState({moreData: true});
        } else {
            this.setState({moreData: false});
        }
    }, 2000);

    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <span>荣耀榜</span>
        </span>;
        return (
            <div onScroll={this.handleScroll}>
                <Page className="article" title="荣耀榜" subTitle={bread}>
                    <ScrollLeavemessage/>
                    <Tab moreData={this.state.moreData}/>
                </Page>
            </div>
        )
    }
}
