import React, { Component } from 'react';
import Page from '../../assets/js/page.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import { ModifyPoolSet } from '../../http/http.jsx';
import { Gallery, GalleryDelete, Uploader, Form, Cell, CellBody, Button } from 'react-weui';
import { GetCookie, SetCookie, DelCookie } from '../../assets/js/common.jsx';
import { GetKeyCode, UploadImg } from '../../http/http.jsx';
import { Link } from 'react-router-dom';

export default class Qr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qr_code_address: [],
            poolInfo: '',
            src: '',
            gallery: false,
            loadingShow: false,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: '',
            text: '',
            progress:'0%',
            loadingText:'上传中',
        }
    }
    componentDidMount() {
        const poolInfo = JSON.parse(GetCookie('current_pool'));
        const { qr_code_address } = poolInfo;
        const newFiles = [{ url: qr_code_address }];
        this.setState({ qr_code_address: newFiles, poolInfo });
        this.getKeyCodeFuc();
    }
    //获取key_code
    getKeyCodeFuc = () => {
        const token = GetCookie('token');
        this.setState({ token: token });
        const params = { token: token };
        GetKeyCode(params, res => {
            this.setState({ key_code: res.key_code })
        }, res => { });
    };

    //上传图片
    uploadImg = (file) => {
        const files = file.nativeFile;
        let size = Math.floor(files.size / 1000);
        if(size >= 1000){
            this.setState({  loadingShow: false, toptipType: 'warn', showTopTips: true, text: '上传图片不能大于1M' });
            this.stopTopTips();
            return;
        }
        const newFiles = [{ url: file.data }];
        this.setState({
            qr_code_address: newFiles
        });
        let formData = new FormData();
        formData.append("key_code", this.state.key_code);
        formData.append("file", files);

        let params = formData;

        this.setState({ loadingShow: true });
        UploadImg(params, res => {
            if (res.errcode == 0) {
                const qr_code_address = this.state.qr_code_address;
                qr_code_address[0].url = res.url;
                this.setState({ qr_code_address: qr_code_address, src: res.url, loadingShow: false, toptipType: 'primary', showTopTips: true, text: '上传成功' });
                this.stopTopTips();
            }
        }, res => {
            this.setState({ loadingShow: false, toptipType: 'warn', showTopTips: true, text: `上传失败 ${res.errmsg}` });
            this.stopTopTips();
        },(loaded,total) => {
            if(loaded !== total){
                let progress = Math.floor((loaded / total) * 100) + '%';
                this.setState(() => ({ progress: progress, loadingText: '上传中' }))
            }else{
                this.setState(() => ({ progress: '100%', loadingText: '处理中' }))
            }
        })
    };


    modiyQr = () => {
        const params = {
            token: GetCookie('token'),
            src: this.state.src,
            group_id: this.state.poolInfo.id
        };
        this.setState({ loadingShow: true });
        ModifyPoolSet(params, res => {
            if (res.errcode == 0) {
                this.setState({
                    loadingShow: false, toptipType: 'primary',
                    showTopTips: true, text: `修改成功`
                });
                this.stopTopTips();
                const poolInfo = this.state.poolInfo;
                poolInfo.qr_code_address = this.state.src;
                SetCookie('current_pool', JSON.stringify(poolInfo));
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
            this.setState({ showTopTips: false });
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
        DelCookie('qr_code_address');
    }

    renderGallery() {
        if (!this.state.gallery) return false;

        let srcs = this.state.qr_code_address.map(file => file.url);

        return (
            <Gallery
                src={srcs}
                show
                defaultIndex={this.state.gallery.id}
                onClick={e => {
                    //avoid click background item
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState({ gallery: false })
                }}
            >

                <GalleryDelete onClick={(e, id) => {
                    this.setState({
                        qr_code_address: this.state.qr_code_address.filter((e, i) => i != id),
                        gallery: this.state.qr_code_address.length <= 1 ? true : false
                    })
                }} />

            </Gallery>
        )
    }
    render() {
        const bread = <span>
            <Link to='/' className='hight_color'>个人中心</Link>&nbsp;|&nbsp;
            <Link to='/manageMent' className='hight_color'>矿池管理</Link>&nbsp;|&nbsp;
            <Link to='/manageMent/poolSet' className='hight_color'>矿池设置</Link>&nbsp;|&nbsp;
            <span>二维码</span>
        </span>;
        const {showTopTips, toptipType, text, loadingShow, qr_code_address, progress, loadingText} = this.state;
        return (
            <div>
                {
                    showTopTips ? <TopTip type={toptipType} show={this.state.showTopTips} text={text} /> : ''
                }
                {
                    loadingShow ?
                        <Loading show={loadingShow} loadingText={loadingText} />
                        : ''
                }
                <Page className="article" title="矿池二维码" subTitle={bread}  >
                    {this.renderGallery()}
                    <Form>
                        <Cell>
                            <CellBody>
                                <Uploader
                                    title="上传矿池二维码"
                                    multiple={true}
                                    capture={false}
                                    maxCount={1}
                                    files={qr_code_address}
                                    onError={msg => alert(msg)}
                                    onChange={this.uploadImg}

                                    onFileClick={
                                        (e, file, i) => {
                                            console.log('file click', file, i);
                                            this.setState({
                                                gallery: {
                                                    url: file.url,
                                                    id: i
                                                }
                                            })
                                        }
                                    }
                                />
                            </CellBody>
                        </Cell>
                        <Cell>
                            <CellBody><p className='cus_progress_bar' style={{width:progress}}>{progress}</p></CellBody>
                        </Cell>
                    </Form>
                    <div className='margin_top_1 page_padding'>
                        <Button onClick={() => this.modiyQr()}>提交</Button>
                    </div>
                </Page>
            </div>
        )
    }
}
