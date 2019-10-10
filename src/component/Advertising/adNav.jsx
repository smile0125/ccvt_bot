import React from 'react';
import { CellsTitle, Cells, Cell, CellBody, CellFooter } from 'react-weui';

const AdNav = (props) => {
    const [toRelease, toAdList, toMyRelease] = props.clickTo;

    return (
        <div>
            <CellsTitle>广告系统</CellsTitle>
            <Cells>
                <Cell access onClick={toRelease}>
                    <CellBody>广告发布</CellBody>
                    <CellFooter />
                </Cell>
                {/*<Cell access onClick={toAdList}>*/}
                    {/*<CellBody>广告列表</CellBody>*/}
                    {/*<CellFooter />*/}
                {/*</Cell>*/}
                <Cell access onClick={toMyRelease}>
                    <CellBody>我的广告</CellBody>
                    <CellFooter />
                </Cell>
            </Cells>
        </div>
    )
};
export default AdNav