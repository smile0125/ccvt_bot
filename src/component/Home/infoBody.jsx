import React from 'react';
import {CellsTitle, Cells, Cell, CellHeader, CellBody, CellFooter} from 'react-weui';

const InfoBody = (props) => {
    const {group_name, application_group, base_amount = '', scale = ''} = props.info;
    const toInnerPage = props.toInnerPage;
    const navArr = [
        { "name": "账户积分", "path":  "/integralRecode", "icon": "#icon-jf", "isRender": true, "rightValue": `${base_amount} CCVT` },
        { "name": "荣耀等级", "path":  "/gloryIntegral", "icon": "#icon-dj", "isRender": true, "rightValue": `LV.${scale}`},
        { "name": "所属矿池", "path":  "/selectDomain", "icon": "#icon-qz", "isRender": true, "rightValue": `${ group_name ? group_name : "未入群" }`},
        { "name": "矿池管理", "path":  "/poolList", "icon": "#icon-kc", "isRender": application_group, "rightValue": "" },
        { "name": "申请矿池", "path":  "/applicationPool", "icon": "#icon-sq", "isRender": true, "rightValue": "" },
        { "name": "荣耀榜", "path":  "/leaderBoard", "icon": "#icon-pm", "isRender": true, "rightValue": "" },
        { "name": "广告发布", "path":  "/ad", "icon": "#icon-ad", "isRender": true, "rightValue": "" },
        { "name": "邀请有礼", "path":  "/invite", "icon": "#icon-yq", "isRender": true, "rightValue": "" },
        { "name": "荣耀提名", "path":  "/vote", "icon": "#icon-timing", "isRender": true, "rightValue": "" },
        { "name": "每日抽奖", "path":  "/lottery", "icon": "#icon-lottery", "isRender": true, "rightValue": "" },
        // { "name": "商家", "path":  "/mall", "icon": "#icon-lottery", "isRender": true, "rightValue": "" },
    ];
    return (
        <div>
            <CellsTitle>基本信息</CellsTitle>
            <Cells>
                {
                    navArr.map((item, index) => {
                        return (
                            item.isRender ?
                                <Cell access onClick={ () => toInnerPage(item.path) } key={item.name}>
                                    <CellHeader>
                                        <svg className="icon">
                                            <use xlinkHref={item.icon}>
                                            </use>
                                        </svg>
                                    </CellHeader>
                                    <CellBody>{item.name}</CellBody>
                                    {
                                        item.rightValue ? <CellFooter>{item.rightValue}</CellFooter> : <CellFooter/>
                                    }
                                </Cell>
                            : null
                        )
                    })
                }
            </Cells>
        </div>
    )
};
export default InfoBody;