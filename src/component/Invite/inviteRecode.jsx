import React from 'react';
import { CellsTitle, Cells, Cell, CellBody, CellFooter } from 'react-weui';

const InviteRecodeClass = (props) => {
    return (
        <div className='invite_recode'>
            <CellsTitle>邀请记录</CellsTitle>
            <Cells>
                <Cell>
                    <CellBody>
                        微信昵称(ID)
                        </CellBody>
                    <CellFooter>
                        注册时间
                        </CellFooter>
                </Cell>
                {props.list ?
                    props.list.map((item, index) => {
                        return (
                            <Cell key={index}>
                                <CellBody>
                                    {
                                        item.wechat ? item.wechat : item.us_account
                                    }
                                    &nbsp;
                                    (
                                        {
                                        item.us_nm
                                    }
                                    )

                                    </CellBody>
                                <CellFooter>
                                    {item.ctime}
                                </CellFooter>
                            </Cell>
                        )
                    })
                    :
                    <Cell>
                        <CellBody>
                            暂无数据
                            </CellBody>
                    </Cell>
                }
            </Cells>
        </div>
    )
}

export default InviteRecodeClass;