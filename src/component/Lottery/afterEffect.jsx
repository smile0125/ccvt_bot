import React from 'react';

const AfterEffect = (props) => {
    const {prize_value, two, three,prize_name} = props;
    return (
        <div className='afterEffect'>
            {
                prize_value > 0 ?
                    <div className='light_box'>
                        <img src={require('../../assets/img/light.png')} alt=""/>
                    </div> : ''
            }

            <div className={`myPrize ${prize_value >= two && prize_value < three ? 'two_bg' : ''} ${prize_value >= three ? 'three_bg' : ''}`}>
                {
                    prize_value > 0 ?
                        <div>
                            <p className={`myPrize_prize ${prize_value >= two && prize_value < three ? 'two_color' : ''} ${prize_value >= three ? 'three_color' : ''}`}>
                                恭喜你 获得<br/>{prize_name}</p>
                        </div> :
                        <div>
                            <img style={{width: '60%'}} src={require('../../assets/img/nowin.png')} alt=""/>
                            <p className='myPrize_prize'>很遗憾 没有中哦！</p>
                        </div>
                }
            </div>
        </div>
    )
};
export default AfterEffect;