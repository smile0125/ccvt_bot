import React from 'react';

const successInvite = (props) => {
    return (
        <div id='successInvite'>
            <div className='invite_header'>
                <div>
                    <p>{props.invite_count} 人</p>
                    <p>成功邀请</p>
                </div>
                <div>
                    <p>{props.invite_send_money} CCVT</p>
                    <p>邀请总奖励</p>
                </div>
            </div>

            <div className='invite_footer_box'>
                <p>邀请地址</p>
                <p className='invite_link'>
                    <span>{props.invite_link}</span>
                    <svg className="icon icon-paiming" onClick={() => props.copyInviteLink()}>
                        <use xlinkHref='#icon-copy'>
                        </use>
                    </svg>
                </p>
            </div>
            <div className='invite_tips'>
                <p>成功邀请一位，可获得50CCVT</p>
                <p>二级用户邀请，可再次获得20CCVT</p>
            </div>
        </div>
    )
}
export default successInvite;