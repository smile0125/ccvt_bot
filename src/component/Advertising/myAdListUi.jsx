import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {
    Panel, PanelHeader, PanelBody, MediaBox, MediaBoxTitle, MediaBoxDescription, MediaBoxInfo, MediaBoxInfoMeta
} from 'react-weui';

const renderState = (is_audit) => {
    if (is_audit == 1) {
        return (<p style={{color: '#ffb700'}}>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-shz"></use>
            </svg>
            审核中
        </p>)
    } else if (is_audit == 2) {
        return (<p style={{color: 'green'}}>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-shtg"></use>
            </svg>
            审核通过
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
    const toAdInfo = (item) => {
        props.history.push({pathname: '/ad/adInfo', state: {item}})
    };
    return (
        <Fragment>
            <Panel id='adListUi'>
                <PanelHeader>我的发布</PanelHeader>
                <PanelBody>
                    {
                        props.rows.length > 0 ?
                            props.rows.map((item, index) => {
                                return (
                                    <MediaBox type="text" key={item.id} onClick={() => toAdInfo(item)}>
                                        <MediaBoxTitle className='adListUi_header'>
                                            {
                                                renderState(item.is_audit)
                                            }

                                            <p>
                                                <svg className="icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-zq"></use>
                                                </svg>
                                                {item.cycle} 天
                                            </p>
                                        </MediaBoxTitle>
                                        <MediaBoxDescription>{item.content}</MediaBoxDescription>
                                        {
                                            item.why ?
                                                <MediaBoxDescription>原因：{item.why}</MediaBoxDescription> : ''
                                        }
                                        <MediaBoxInfo>
                                            <MediaBoxInfoMeta>广告费用：{item.cost_amount} CCVT</MediaBoxInfoMeta>
                                            <MediaBoxInfoMeta
                                                extra>每日奖励费用：{item.daily_award_amount} CCVT</MediaBoxInfoMeta>
                                            <MediaBoxInfoMeta extra>{item.time}</MediaBoxInfoMeta>
                                        </MediaBoxInfo>
                                    </MediaBox>
                                )
                            }) :
                            <MediaBox type="text">
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