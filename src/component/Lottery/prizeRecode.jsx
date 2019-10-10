import React, {useState} from 'react';
import {Popup, Tab, NavBar, NavBarItem, TabBody, Article} from 'react-weui';
import zjjlImg from '../../assets/img/zjjl-bg.png';
import {withRouter} from 'react-router-dom';
import { SetCookie } from '../../assets/js/common.jsx';

const PrizeRecode = (props) => {
    const [tab, setTab] = useState(0);
    const [all, setAll] = useState(true);
    const [xuni, setXuni] = useState(false);
    const [shiwu, setShuwu] = useState(false);
    const recodeData = props.recodeData.rows;
    const address = props.recodeData.address;
    //去兑换
    const toExchange = (address, id) => {
        address && SetCookie('address', JSON.stringify(address));
        SetCookie('order_id', id);
        props.history.push({pathname:'/lottery/exchangeInfoEdit'})
    };
    const mapRecodeItem = () => {
        let red = [];
        recodeData.map(item => {
            red.push(
                <li key={item.id} className='zjjl_pop_item'>
                    <p>{item.ctime}</p>
                    <p>
                        {item.prize_name}
                        { (item.type !=0 && item.is_exchange == 0) ? <span style={{cursor: 'pointer', color: '#1AAD19', marginLeft: '1rem'}} onClick={toExchange}>兑换</span> : null  }
                        { (item.type !=0 && item.is_exchange == 1) ? <span style={{color: 'gray', marginLeft: '1rem'}}>已兑换</span> : null  }
                        {/*{ item.is_exchange == 0 ? <span style={{cursor: 'pointer', color: '#1AAD19', marginLeft: '1rem'}} onClick={() => toExchange(address, item.id)}>兑换</span> : null  }*/}
                        {/*{ item.is_exchange == 1 ? <span style={{color: 'gray', marginLeft: '1rem'}}>已兑换</span> : null  }*/}
                    </p>
                </li>
            )
        });
        return red;
    };
    return (
        <div>
            <Popup show={props.bottom_show}>
                <div className='zjjl_pop' style={{height: '100vh', overflow: 'scroll', background: `url(${zjjlImg})`}}>
                    <div className='close_zjjl_pop' onClick={props.hideRecord}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-close"></use>
                        </svg>
                    </div>
                    <div className='zjjl_title_box'><img src={require('../../assets/img/zjjl-title.png')} alt=""/></div>
                    <div>
                        <div className='zjjl_pop_title'>
                            <p><span>时间</span><span>奖励</span></p>
                        </div>
                        <ul className='zjjl_pop_list' style={{padding: '0 1rem'}}>
                            {recodeData ? mapRecodeItem() : '暂无数据'}
                        </ul>
                    </div>
                    {/*<Tab>
                        <NavBar>
                            <NavBarItem active={tab == 0} onClick={() => setTab(0)}>全部</NavBarItem>
                            <NavBarItem active={tab == 1} onClick={() => setTab(1)}>虚拟奖品</NavBarItem>
                            <NavBarItem active={tab == 2} onClick={() => setTab(2)}>实物奖品</NavBarItem>
                        </NavBar>
                        <TabBody>
                            <Article style={{display: tab == 0 ? null : 'none'}}>
                                <div>
                                    <div className='zjjl_pop_title'>
                                        <p><span>时间</span><span>奖励</span></p>
                                    </div>
                                    <ul className='zjjl_pop_list'>
                                        {recodeData ? mapRecodeItem() : '暂无数据'}
                                    </ul>
                                </div>
                            </Article>
                            <Article style={{display: tab == 1 ? null : 'none'}}>
                                <div>
                                    <div className='zjjl_pop_title'>
                                        <p><span>时间</span><span>奖励</span></p>
                                    </div>
                                    <ul className='zjjl_pop_list'>
                                        {recodeData ? mapRecodeItem() : '暂无数据'}
                                    </ul>
                                </div>
                            </Article>
                            <Article style={{display: tab == 2 ? null : 'none'}}>
                                <div>
                                    <div className='zjjl_pop_title'>
                                        <p><span>时间</span><span>奖励</span></p>
                                    </div>
                                    <ul className='zjjl_pop_list'>
                                        {recodeData ? mapRecodeItem() : '暂无数据'}
                                    </ul>
                                </div>
                            </Article>
                        </TabBody>
                    </Tab>*/}
                </div>
            </Popup>
        </div>
    );
};

export default withRouter(PrizeRecode);