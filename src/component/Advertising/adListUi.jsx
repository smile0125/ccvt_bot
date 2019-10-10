import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {
    Panel,
    PanelHeader,
    PanelBody,
    MediaBox,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
    Switch,
    Dialog
} from 'react-weui';

const renderState = (is_audit, cycle) => {
    if (is_audit == 1) {
        return (<p style={{color: '#ffb700'}}>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-shz"></use>
            </svg>
            审核中
        </p>)
    } else if (is_audit == 2) {
        return (<p style={{color: 'green'}}>
            {/* <svg class="icon" aria-hidden="true">
                <use xlinkHref="#icon-shtg"></use>
            </svg> */}
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-zq"></use>
            </svg>
            {cycle} 天
        </p>)
    } else if (is_audit == 3) {
        return (<p style={{color: 'red'}}>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-shsb"></use>
            </svg>
            审核被拒绝
        </p>)
    } else {
        return (<p style={{fontSize: '3rem'}}>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-ysx"></use>
            </svg>
        </p>)
    }
};


const adListUi = (props) => {
    const swithchToggle = props.swithchToggle;
    const adSwitchFun = props.adSwitchFun;
    const style2 = {
        title: '关闭广告',
        buttons: [
            {
                type: 'default',
                label: '取消',
                onClick: () => {
                    hideDialog()
                }
            },
            {
                type: 'primary',
                label: '确认',
                onClick: () => {
                    adSwitchFun()
                }
            }
        ]
    };
    const toAdInfo = (item) => {
        props.history.push({pathname: '/ad/adInfo', state: {item}})
    };
    //开关广告
    const adSwitchChange = (e, timer_id, is_close) => {
        swithchToggle(timer_id, is_close);
    };

    const hideDialog = () => {
        swithchToggle()
    };

    return (
        <Fragment>
            {
                props.showIOS2 ?
                    <Dialog type="ios" title={style2.title} buttons={style2.buttons} show={props.showIOS2}>
                        确认关闭此广告发送？
                    </Dialog> : ''
            }
            <Panel id='adListUi'>
                <PanelHeader>广告列表</PanelHeader>
                <PanelBody>
                    {
                        props.rows.length > 0 ?
                            props.rows.map((item, index) => {
                                return (
                                    <MediaBox type="text" key={item.id}>
                                        <MediaBoxTitle className='adListUi_header'>
                                            {
                                                renderState(item.is_audit, item.cycle)
                                            }
                                            <Switch onChange={(e) => {
                                                adSwitchChange(e, item.timer_id, item.is_close)
                                            }} checked={item.is_close == 1 ? true : false}/>
                                            {/* <p>
                                                <svg class="icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-zq"></use>
                                                </svg>{item.cycle} 天
                                        </p> */}
                                        </MediaBoxTitle>
                                        <MediaBoxDescription onClick={() => toAdInfo(item)}>{item.content}</MediaBoxDescription>
                                        <MediaBoxInfo>
                                            {/* <MediaBoxInfoMeta>广告费用：{item.cost_amount} CCVT</MediaBoxInfoMeta>
                                            <MediaBoxInfoMeta extra>奖励费用：{item.daily_award_amount} CCVT</MediaBoxInfoMeta> */}
                                            <MediaBoxInfoMeta>发送时间：{item.time}</MediaBoxInfoMeta>
                                        </MediaBoxInfo>
                                    </MediaBox>
                                )
                            })
                            : <MediaBox type="text">
                                <MediaBoxTitle className='adListUi_header'>
                                    暂无数据
                                </MediaBoxTitle>
                            </MediaBox>
                    }
                </PanelBody>
            </Panel>
        </Fragment>
    )
};
export default withRouter(adListUi);