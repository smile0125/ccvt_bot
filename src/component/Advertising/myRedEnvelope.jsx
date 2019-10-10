import React, {Fragment} from 'react';

const MyRedEnvelope = (props) => {
    return (
        <Fragment>
            <div
                className="myRedEnvelopeHome_content open">
                <div className="myRedEnvelopeHome">
                    <div className="myRedEnvelopeHome_top">
                        <div>
                            <div className="myRedEnvelopeHome_top_box">
                                <div className="myRedEnvelopeHome_top_img"><img
                                    src={props.head_img} alt=""/></div>
                                &nbsp;<h3>{props.wechat}的红包</h3>
                            </div>
                            {
                                props.bonus_amount > 0 ? <h2>{props.bonus_amount} CCVT</h2> : <p>手慢了，红包已派完</p>
                            }

                        </div>
                    </div>
                    <div className="myRedEnvelopeHome_middle"></div>
                    <div className="myRedEnvelopeHome_bottom" onClick={props.showRedEnvelope}><span>查看领取详情 ></span>
                    </div>
                    <div className="myRedEnvelopeHome_footer" onClick={props.closeMyRedEnvelope}><span>X</span></div>
                </div>
            </div>
        </Fragment>
    );
};

export default MyRedEnvelope;