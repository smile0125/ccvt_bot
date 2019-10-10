import React from 'react';
import { Panel, PanelBody, MediaBox, MediaBoxTitle, MediaBoxDescription, MediaBoxInfo, Button, MediaBoxInfoMeta } from 'react-weui';
const GroupItem = (props) => {
    return (
        <Panel>
            <PanelBody>
                {
                    props.list.length > 0 ?
                        props.list.map((item, index) => {
                            return (
                                <MediaBox type="text" key={item.id}>
                                    <MediaBoxTitle className='group_list_title'>
                                        <div className='group_list_name'>
                                            <svg className="icon">
                                                <use xlinkHref={'#icon-v' + item.scale}>
                                                </use>
                                            </svg>
                                            <p>&nbsp;{item.name}</p>
                                        </div>
                                        <div>
                                            <svg className="icon icon-xing">
                                                <use xlinkHref='#icon-xing'>
                                                </use>
                                            </svg>
                                            {item.glory_number}
                                        </div>
                                    </MediaBoxTitle>
                                    <MediaBoxDescription>
                                        {item.type_name}
                                    </MediaBoxDescription>
                                    <MediaBoxInfo className='group_list_footer'>
                                        <MediaBoxInfoMeta>
                                            <svg className="icon icon-jinbi">
                                                <use xlinkHref='#icon-jinbi'>
                                                </use>
                                            </svg>
                                            奖励：{item.send_amount}
                                        </MediaBoxInfoMeta>
                                        <MediaBoxInfoMeta style={{ paddingRight: 0 }}>
                                            <svg className="icon icon-redu">
                                                <use xlinkHref='#icon-redu'>
                                                </use>
                                            </svg>
                                            热度：{item.all_num}
                                        </MediaBoxInfoMeta>
                                    </MediaBoxInfo>
                                </MediaBox>
                            )
                        })
                        : <MediaBox type="text">
                            <MediaBoxTitle>
                                暂无数据
                                </MediaBoxTitle>

                        </MediaBox>
                }
            </PanelBody>
        </Panel>
    )
}
export default GroupItem;