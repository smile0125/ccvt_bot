import React from 'react';
import { Panel, PanelBody, MediaBox, MediaBoxHeader, MediaBoxBody, MediaBoxTitle, MediaBoxDescription } from 'react-weui';
const HonorItem = (props) => {
    return (
        <Panel>
            <PanelBody>
                {
                    props.list.length > 0 ?
                        props.list.map((item, index) => {
                            return (
                                <MediaBox type="appmsg" key={index}>
                                    {
                                        parseInt(item.sorting) <= 3 ?
                                            <p className='honor_paming'>
                                                <svg className="icon icon-paiming">
                                                    <use xlinkHref={'#icon-pm' + item.sorting}>
                                                    </use>
                                                </svg>
                                            </p> : <p className='honor_paming'>{item.sorting}</p>
                                    }
                                    <MediaBoxHeader className='honor_header_box'>
                                        <div className='honor_header'>
                                            <img src={item.head_img ? item.head_img : require('../../assets/img/ccvt-logo.png')} onClick={() => props.headerImgClick(item.head_img)} alt="" />
                                        </div>
                                    </MediaBoxHeader>
                                    <MediaBoxBody>
                                        <MediaBoxTitle className='honor_title_box'>
                                            {
                                                parseInt(item.scale) > 0 ?
                                                    <svg className="icon">
                                                        <use xlinkHref={'#icon-v' + item.scale}>
                                                        </use>
                                                    </svg>
                                                    : ''

                                            }
                                            {item.wechat}
                                        </MediaBoxTitle>
                                        <MediaBoxDescription style={{ margin: 0 }}>
                                            {item.group_name}
                                        </MediaBoxDescription>
                                    </MediaBoxBody>
                                    <div>
                                        <div className='zan_cai_img_box'>
                                            <svg className="icon" onClick={() => props.toZanCai(item.us_id, item.wechat, '点赞')}>
                                                <use xlinkHref={'#icon-zan'}>
                                                </use>
                                            </svg>
                                        </div>
                                        <div className='zan_cai_img_box'>
                                            <svg className="icon" onClick={() => props.toZanCai(item.us_id, item.wechat, '砸踩')}>
                                                <use xlinkHref={'#icon-cai'}>
                                                </use>
                                            </svg>
                                            &nbsp;
                                                </div>
                                    </div>
                                </MediaBox>
                            )
                        })
                        :
                        <MediaBox type="appmsg">
                            <MediaBoxHeader />
                            <MediaBoxBody>
                                <MediaBoxTitle>暂无数据</MediaBoxTitle>
                            </MediaBoxBody>
                        </MediaBox>
                }
            </PanelBody>
        </Panel>
    )
}
export default HonorItem;