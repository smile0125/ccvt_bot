import React, {Fragment} from 'react';
import {
    MediaBox,
    MediaBoxBody,
    MediaBoxDescription,
    MediaBoxHeader,
    MediaBoxTitle,
    Panel,
    PanelBody, PanelFooter,
    PanelHeader, Popup
} from "react-weui";

const RedEnvelope = (props) => {

    return (
        <Fragment>
            <div></div>
            <Popup show={props.fullpage_show}>
                <div className='redEnvelopeBox' style={{height: '100vh', overflow: 'scroll'}}>
                    <div className="redEnvelopeBox_header">
                        <div className="icon_close_box">
                            <p className="redEnvelopeBox_info">红包详情</p>
                            <svg className="icon" aria-hidden="true" onClick={props.showRedEnvelope}>
                                <use xlinkHref="#icon-close"></use>
                            </svg>
                        </div>
                        <div className="redEnvelopeBox_photo">
                            <img src={props.info.wechat_headimgurl} alt=""/>
                        </div>
                    </div>
                    <div className="redEnvelopeBox_money">
                        {
                            parseInt(props.adItem.bonus_amount) > 0 ?
                                <div>
                                    <h2>{props.adItem.bonus_amount + `CCVT`}</h2>
                                    <p>恭喜发财，大吉大利</p>
                                </div> : <h2>红包详情</h2>
                        }
                    </div>
                    <div className="redEnvelopeBox_list">
                        <Panel>
                            <PanelHeader>已领{props.adItem.give_count}/{props.adItem.all_count}个
                                共{props.adItem.send_count}/{props.adItem.daily_award_amount} CCVT</PanelHeader>
                            <PanelBody>
                                {
                                    props.redEnvelopeList.length > 0 ?
                                        props.redEnvelopeList.map((item, index) => {
                                            return (
                                                <MediaBox type="appmsg" href="javascript:void(0);" key={item.id}>
                                                    <MediaBoxHeader><img src={item.head_img}
                                                                         alt=""/></MediaBoxHeader>
                                                    <MediaBoxBody>
                                                        <MediaBoxTitle className="redEnvelopeBox_item_title">
                                                            <p>{item.wechat}</p>
                                                            <p className="redEnvelopeBox_num">{item.bonus_amount} CCVT</p>
                                                        </MediaBoxTitle>
                                                        <MediaBoxDescription>{item.ctime}</MediaBoxDescription>
                                                    </MediaBoxBody>
                                                </MediaBox>
                                            )
                                        }) : ''
                                }

                            </PanelBody>
                            <PanelFooter></PanelFooter>
                        </Panel>
                    </div>
                </div>
            </Popup>
        </Fragment>
    );
};

export default RedEnvelope;