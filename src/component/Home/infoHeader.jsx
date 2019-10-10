import React from 'react';
import {withRouter} from  'react-router-dom';

const InfoHeader = (props) => {
    const toChangeBind = () => {
      props.history.push({pathname:'/changeBind'})
    };
    return(
        <div id='account_center_top'>

                    <div className='home_img_box' onClick={toChangeBind}>
                        {
                            props.info.wechat_headimgurl ?
                                <img src={props.info.wechat_headimgurl} alt="" />
                                :
                                <img src={require('../../assets/img/ccvt-logo.png')} alt="" />
                        }

                    </div>
                    <div className='home_name'>
                        <div className="home_name_change">
                            <h3 className='text_align-center'>{props.info.us_nm}</h3>
                            {/*<p onClick={toChangeBind}>换绑</p>*/}
                            <svg className="icon nickNameEditImg" onClick={toChangeBind}>
                                <use xlinkHref={'#icon-gh'}>
                                </use>
                            </svg>
                        </div>
                        <h4 className='text_align-center'>
                            <div>
                                {props.info.wechat}
                                <svg className="icon nickNameEditImg" onClick={props.setWeChat}>
                                    <use xlinkHref={'#icon-bianji'}>
                                    </use>
                                </svg>
                            </div>
                        </h4>
                    </div>
                </div>
    )
};
export default withRouter(InfoHeader);