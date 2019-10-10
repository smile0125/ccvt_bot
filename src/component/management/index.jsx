import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import {CellsTitle, Cells, Cell, CellBody, CellFooter,Toast} from 'react-weui';
import {Link} from 'react-router-dom';
import {GetCookie, SetCookie} from '../../assets/js/common.jsx';
import {withRouter} from 'react-router-dom';
import {GetPoolInfo} from "../../http/http.jsx";

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            poolList:[],
            showLoading:false,
        }
    }

    componentDidMount() {
        this.getPoolListFun();
    }

    //获取矿池列表
    getPoolListFun = () => {
        const params = { token: GetCookie('token') };
        this.setState({showLoading:true});
        GetPoolInfo(params, res => {
            this.setState({showLoading:false});
            const poolList = res.rows;
            this.setState(() => ({poolList}));
        }, res => {

        });
    };

    //矿池管理
    toPoolManagement = (pool) => {
        SetCookie('current_pool', JSON.stringify(pool));
        this.props.history.push({pathname:'/manageMent'});
    };

    render() {
        const { poolList, showLoading } = this.state;
        const style = {
            background: '#1AAD19',
            // background: `#${ (Math.random()*1000000).toString().substr(0,6) }`,
            display: 'inline-block',
            width: '2rem',
            height: '2rem',
            lineHeight: '2rem',
            textAlign: 'center',
            borderRadius: '100%',
            color: '#fff',
        };
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <span>矿池列表</span>
        </span>;
        return (
            <div>
                {
                    showLoading ? <Toast icon="loading" show={showLoading}/> : null
                }
                <Page className="article" title="矿池列表" subTitle={bread}>

                    <CellsTitle>矿池列表</CellsTitle>
                    <Cells>
                        {
                            poolList.map(item => {
                                return (
                                    <Cell access onClick={() =>this.toPoolManagement(item)} key={ item.id }>
                                        <CellBody><span style={style}>{ item.name.split('')[0] }</span></CellBody>
                                        <CellFooter>{ item.name }</CellFooter>
                                        {/*<CellFooter/>*/}
                                    </Cell>
                                )
                            })
                        }
                    </Cells>
                </Page>
            </div>
        )
    }
}

export default withRouter(Index)