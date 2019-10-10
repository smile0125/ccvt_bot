import React, {Component} from 'react';
import Page from '../../assets/js/page.jsx';
import {Form, FormCell, CellHeader, Label, CellBody, Input, Button} from 'react-weui';
import {GetCookie, SetCookie} from '../../assets/js/common.jsx';
import {ModifyPoolSet} from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import {withRouter, Link} from 'react-router-dom';

class EditPoolKeyWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyWord: '',
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: ''
        }
    }

    componentWillMount() {
        if (this.props.location.query) {
            const keyWord = this.props.location.query.keyWord;
            this.setState({keyWord: keyWord});
        }
    }

    keyWordChange = (e) => {
        this.setState({keyWord: e.target.value});
    };
    //修改关键字
    modiykeyWord = () => {
        const poolInfo = JSON.parse(GetCookie('current_pool'));
        const group_id = poolInfo.id;
        const params = {token: GetCookie('token'), keyWord: this.state.keyWord, group_id };
        this.setState({loadingShow: true});
        ModifyPoolSet(params, res => {
            if (res.errcode == 0) {
                this.setState({
                    loadingShow: false, toptipType: 'primary',
                    showTopTips: true, text: `修改成功`
                });
                poolInfo.keyWord = this.state.keyWord;
                SetCookie('current_pool', JSON.stringify(poolInfo));
                this.stopTopTips();
                this.props.history.push('/manageMent/poolSet')
            }
        }, res => {
            this.setState({
                loadingShow: false, toptipType: 'warn',
                showTopTips: true, text: `修改失败 ${res.errmsg}`
            });
            this.stopTopTips();
        })
    };
    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }

    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <Link to='/manageMent/poolSet' className='hight_color'>矿池设置</Link>&nbsp;|&nbsp;
            <span>关键词</span>
        </span>;
        return (
            <div>
                {
                    this.state.showTopTips ?
                        <TopTip type={this.state.toptipType} show={this.state.showTopTips} text={this.state.text}/> : ''
                }
                {
                    this.state.loadingShow ?
                        <Loading show={this.state.loadingShow}/>
                        : ''
                }
                <Page className="article" title="编辑矿池关键词" subTitle={bread}>
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>矿池关键词</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="输入矿池关键词" value={this.state.keyWord}
                                       onChange={this.keyWordChange}/>
                            </CellBody>
                        </FormCell>
                    </Form>

                    <div className='margin_top_1 page_padding'>
                        <Button onClick={this.modiykeyWord}>提交</Button>
                        <p className='font-size-12 margin_top_1'>多个关键词请用逗号分隔</p>
                    </div>
                </Page>
            </div>
        )
    }
}

export default withRouter(EditPoolKeyWord)