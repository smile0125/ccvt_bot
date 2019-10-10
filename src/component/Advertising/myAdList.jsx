import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import { Link } from 'react-router-dom';
import { AdList } from '../../http/http.jsx';
import { GetCookie } from '../../assets/js/common.jsx';
import MyAdListUi from './myAdListUi.jsx';
import '../../assets/css/adList.scss';

class AdListClass extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            limit: 100,
            offset: 0,
            rows: []
        }
    }
    componentDidMount() {
        this.getAdListFun();
    }
    getAdListFun = () => {
        const token = GetCookie('token');
        const is_audit = '';
        const { limit, offset } = this.state;
        const params = { token, is_audit, limit, offset };
        AdList(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const rows = data.rows;
                this.setState({ rows: rows });
            }
        })
    };
    render() {
        const rows = this.state.rows;
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/ad' className='hight_color'>广告</Link>&nbsp;|&nbsp;
            <span>我的发布</span>
        </span>;
        return (
            <div>
                <Page className="article" title="我的发布" subTitle={bread}>
                    <MyAdListUi rows={rows} />
                </Page>
            </div>
        )
    }
}
export default AdListClass;