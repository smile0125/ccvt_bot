import React from 'react';
import {Cells, CellsTitle, Cell, CellBody, CellFooter, CellHeader} from 'react-weui';
const RecodeItem = (props) => {

    return (
        <div>
            <CellsTitle>账户积分变动记录表</CellsTitle>
            <Cells>
                <Cell>
                    <CellFooter>类型</CellFooter>
                    <CellBody>金额</CellBody>
                    <CellHeader>时间</CellHeader>
                </Cell>

                {
                    props.items.length > 0 ?
                        props.items.map((item, i) => {
                            return (
                                <Cell key={i}>
                                    <CellHeader className='table_list_size table_left'>{item.tx_type}</CellHeader>
                                    <CellBody className='table_list_size table_middle'>
                                        {item.tx_amount}
                                    </CellBody>
                                    <CellFooter className='table_list_size table_right'>
                                        {item.ctime}
                                    </CellFooter>
                                </Cell>
                            )
                        }) :
                        <Cell>
                            <CellHeader/>
                            <CellBody>
                                暂无数据
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                }
            </Cells>
        </div>
    )
}
export default RecodeItem;