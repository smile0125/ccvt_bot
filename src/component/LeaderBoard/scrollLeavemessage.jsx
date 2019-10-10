import React, {Component} from 'react';
import {LeaveMessageList} from '../../http/http.jsx';
import '../../assets/css/scrollLeaveMessage.scss';

let setIntervalTimer = null;
let setTimeoutTimer = null;
export default class ScrollLeaveMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: [{id: "1", leave_message: "暂无留言"}],
            animate: false
        }
    }

    componentDidMount() {
        this.LeaveMessageListFun();
        setIntervalTimer = setInterval(this.Dt, 3000);
        document.title = '荣耀留言-CCVT';
    }

    LeaveMessageListFun = () => {
        const params = {};
        LeaveMessageList(params).then(res => {
            const data = res.data;
            this.setState({numbers: data.rows});
        })
    };

    Dt = () => {
        this.setState({animate: true});   // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeoutTimer = setTimeout(() => {      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
            this.state.numbers.push(this.state.numbers[0]);  // 将数组的第一个元素添加到数组的
            this.state.numbers.shift();               //删除数组的第一个元素
            this.setState({animate: false}); // margin-top 为0 的时候取消过渡动画，实现无缝滚动
            // this.forceUpdate();
        }, 1000)
    };

    componentWillUnmount() {
        clearInterval(setIntervalTimer);
        clearTimeout(setTimeoutTimer);
    }

    render() {
        const numbers = this.state.numbers;
        return (
            <div>
                <div className="cosultation-wrap">
                    <a href="javascript:;">
                        <div className="cosulation-news">
                            <ul className={this.state.animate ? 'anim' : ''}>
                                {numbers.map((item, index) => (
                                    <li className="consulation-news-item" style={{color:'#fff'}} key={index}>
                                        {item.wechat}: {item.leave_message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}
