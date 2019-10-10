import React,{Component} from 'react';
let setIntervalTimer = null;
class ScrollMessage extends Component{
    constructor(props){
        super(props)

    }
    componentDidMount(){
        this.scrollMessage();
    }
    scrollMessage = () => {
        const scroll_box = this.scroll_box;
        const scroll_begin = this.scroll_begin;
        // const scroll_end = this.scroll_end;
        setInterval(() => {
            this.scrollStart(scroll_box, scroll_begin)
        }, 15);
    };

    scrollStart = (scroll_box, scroll_begin) => {
        if (scroll_begin.offsetWidth - scroll_box.scrollLeft <= 375) {
            scroll_box.scrollLeft = -375;
        } else {
            scroll_box.scrollLeft++;
        }
    };
    componentWillUnmount(){
        clearInterval(setIntervalTimer);
    }
    render(){
        const {scrollMessageList} = this.props;
        return(
            <div className='scrollMessage' ref={scroll_box => this.scroll_box = scroll_box}>
                <div className='scroll_begin' ref={scroll_begin => this.scroll_begin = scroll_begin}>
                    {
                        scrollMessageList.map((item, index) => {
                            return (
                                <span key={index}>恭喜 {item.wechat} 获得 {item.prize_name}</span>
                            )
                        })
                    }
                </div>
                <div className='scroll_end' ref={scroll_end => this.scroll_end = scroll_end}>
                    {
                        scrollMessageList.map((item, index) => {
                            return (
                                <span key={index}>恭喜 {item.wechat} 获得 {item.prize_name}</span>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ScrollMessage;