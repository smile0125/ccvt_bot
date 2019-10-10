import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import {CellsTitle, Cells, Cell, CellBody, CellFooter} from 'react-weui';
import {Link} from 'react-router-dom';
import {GetCookie} from '../../assets/js/common.jsx';
import {withRouter} from 'react-router-dom';

class Management extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_pool: ''
        }
    }

    componentDidMount() {
        document.title = "矿池管理-CCVT";
        const current_pool = JSON.parse(GetCookie('current_pool'));
        this.setState({current_pool})
    }

    toTimeTask = () => {
        this.props.history.push({pathname: '/manageMent/timeTask'});
    };

    toPoolSet = () => {
        this.props.history.push({pathname: '/manageMent/poolSet'});
    };

    toKeyWord = () => {
        this.props.history.push({pathname: '/manageMent/keyWord'});
    };
    //登录ai
    loginAi = () => {
        this.props.history.push({pathname: '/manageMent/ai'});
    };

    render() {
        const { name } = this.state.current_pool;
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/poolList' className='hight_color'>矿池列表</Link>&nbsp;|&nbsp;
            <span>矿池管理</span>
        </span>;
        return (
            <div>
                <Page className="article" title="矿池管理" subTitle={bread}>

                    <CellsTitle>矿池管理</CellsTitle>
                    <Cells>
                        <Cell>
                            <CellBody>
                                专属矿池
                            </CellBody>
                            <CellFooter>{ name }</CellFooter>
                        </Cell>
                        {/*<Cell access onClick={this.loginAi}>*/}
                            {/*<CellBody>*/}
                                {/*AI登录*/}
                            {/*</CellBody>*/}
                            {/*<CellFooter/>*/}
                        {/*</Cell>*/}
                        <Cell onClick={this.toTimeTask} access>
                            <CellBody>
                                定时任务
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                        <Cell onClick={this.toKeyWord} access>
                            <CellBody>
                                关键字回复
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                        <Cell onClick={this.toPoolSet} access>
                            <CellBody>
                                矿池设置
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                    </Cells>
                </Page>
            </div>
        )
    }
}

export default withRouter(Management)