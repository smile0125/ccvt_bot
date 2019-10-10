import React, { Component } from 'react';
import { CellsTitle, CellBody, CellFooter, Cell, Cells } from 'react-weui';
import { withRouter } from 'react-router-dom';

class PoolOthersEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poolInfo: ''
        }
    }

    //编辑矿池名称
    toEditPoolName = () => {
        this.props.history.push({ pathname: '/manageMent/poolSet/editPoolName', query: { group_name: this.props.poolInfo.name } })
    };

    //编辑矿池关键字
    toEditKeyWord = () => {
        this.props.history.push({ pathname: '/manageMent/poolSet/editKeyWord', query: { keyWord: this.props.poolInfo.keyWord } })
    };

    //编辑欢迎语
    toEditWelcome = () => {
        this.props.history.push({
            pathname: '/manageMent/poolSet/editWelcome', query: {
                is_welcome: this.props.poolInfo.is_welcome, welcome: this.props.poolInfo.welcome
            }
        })
    };

    //编辑新闻推送时间
    toEditNews = () => {
        this.props.history.push({
            pathname: '/manageMent/poolSet/editNews', query: {
                news_switch: this.props.poolInfo.news_switch, chat_time: this.props.poolInfo.chat_time
            }
        })
    };

    //编辑二维码
    toEditQr = () => {
        this.props.history.push({
            pathname: '/manageMent/poolSet/qr', query: {
                qr_code_address: this.props.poolInfo.qr_code_address
            }
        })
    };

    //编辑矿主微信号
    toEditWeChat = () => {
        this.props.history.push({
            pathname: '/manageMent/poolSet/toEditWeChat', query: {
                manager_wechat_id: this.props.poolInfo.manager_wechat_id
            }
        })
    };

    //编辑PUID
    toEditPuid = () => {
        this.props.history.push({
            pathname: '/manageMent/poolSet/toEditPuid', query: {
                puid: this.props.poolInfo.puid
            }
        })
    };
    render() {
        const { name, keyWord, is_welcome, welcome, news_switch, chat_time,manager_wechat_id,puid } = this.props.poolInfo;
        const style = {
            maxWidth: '50%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize:'0.85rem'
        };
        return (
            <div>
                <CellsTitle>矿池设置</CellsTitle>
                <Cells>
                    <Cell onClick={this.toEditPoolName} access>
                        <CellBody>
                            矿池名称
                        </CellBody>
                        <CellFooter>{name}</CellFooter>
                    </Cell>
                    <Cell onClick={this.toEditKeyWord} access>
                        <CellBody>
                            矿池关键词
                        </CellBody>
                        <CellFooter>{keyWord}</CellFooter>
                    </Cell>
                    <Cell onClick={this.toEditWelcome} access>
                        <CellBody>
                            欢迎新人
                        </CellBody>
                        <CellFooter style={style}>{is_welcome == '1' ? welcome : '关闭'}</CellFooter>
                    </Cell>
                    <Cell onClick={this.toEditNews} access>
                        <CellBody>
                            新闻推送
                        </CellBody>
                        <CellFooter>{news_switch == '1' ? chat_time+'分钟' : '关闭'}</CellFooter>
                    </Cell>
                    <Cell onClick={this.toEditQr} access>
                        <CellBody>
                            矿池二维码
                        </CellBody>
                        <CellFooter/>
                    </Cell>
                    <Cell onClick={this.toEditWeChat} access>
                        <CellBody>
                            矿主微信号
                        </CellBody>
                        <CellFooter>{manager_wechat_id}</CellFooter>
                    </Cell>
                    <Cell onClick={this.toEditPuid} access>
                        <CellBody>
                            PUID
                        </CellBody>
                        <CellFooter>{puid}</CellFooter>
                    </Cell>
                </Cells>
            </div>
        )
    }
}
export default withRouter(PoolOthersEdit);