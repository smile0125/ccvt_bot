import React, {Component} from 'react';
import {Tab, NavBar, NavBarItem, TabBody, Article} from 'react-weui';
import Honor from './honor.jsx';
import GroupList from './groupList.jsx';
import PubSub from 'pubsub-js';

export default class TabClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            tabGroup: false,
            show_hide_img_box: false,
            src: ''
        };
    }

    //关闭图片
    hideImgBox = () => {
        this.setState({show_hide_img_box: false});
    };
    //显示图片
    showImgFun = (src) => {
        if (src) {
            this.setState({show_hide_img_box: true, src: src});
        }
    };

    componentDidMount(){
        PubSub.subscribe('is_bottom',(name,is_bottom)=>{
            const tab = this.state.tab;
            if(is_bottom && tab == 0){
                PubSub.publish('honorScroll',true);
            }
            if(is_bottom && tab == 1){
                PubSub.publish('groupScroll',true);
            }
        })
    }

    render() {
        const src = this.state.src;
        return (
            <div>
                {
                    this.state.show_hide_img_box ?
                        <div className='show_img_box' onClick={this.hideImgBox}>
                            <img src={src} alt=""/>
                        </div> : ''
                }

                <Tab>
                    <NavBar>
                        <NavBarItem active={this.state.tab == 0} onClick={e => this.setState({tab: 0})}>
                            荣耀排行榜
                        </NavBarItem>
                        <NavBarItem active={this.state.tab == 1} onClick={e => this.setState({tab: 1})}>
                            矿池列表
                        </NavBarItem>
                    </NavBar>
                    <TabBody>
                        <Article style={{display: this.state.tab == 0 ? null : 'none'}}>
                            <Honor showImgFun={this.showImgFun}/>
                        </Article>
                        <Article style={{display: this.state.tab == 1 ? null : 'none'}}>
                            <GroupList tabGroup={this.state.tabGroup}/>
                        </Article>

                    </TabBody>
                </Tab>
            </div>
        )
    }
}
