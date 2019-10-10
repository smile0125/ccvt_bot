import React, {Component, Fragment} from 'react';
import {CellsTitle, Form, FormCell, CellBody, TextArea, CellFooter, Radio, Cell, Uploader, CellsTips, Gallery, GalleryDelete, Toast} from 'react-weui';
import {GetCookie} from '../../assets/js/common.jsx';
import {GetKeyCode, UploadImg} from '../../http/http.jsx';
import TopTip from '../../assets/js/topTops.jsx';

export default class AdLinkImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link_img_checked: true,
            gallery: false,
            files: [{url: require('../../assets/img/ccvt-logo.png')}],
            showLoading: false,
            loadingTimer: null,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: 'warn',
            text: '上传成功',
            linkContent: '',
            progress:'0%',
            loadingText:'上传中',
        }
    }

    componentDidMount = () => {
        this.getKeyCodeFuc();
    };
    //获取key_code
    getKeyCodeFuc = () => {
        const token = GetCookie('token');
        this.setState({token: token});
        const params = {token: token};
        GetKeyCode(params, res => {
            this.setState({key_code: res.key_code})
        }, res => {
        });
    };
    //上传图片
    uploadImg = (file, e) => {
        const files = file.nativeFile;
        let size = Math.floor(files.size / 1000);
        if(size >= 1000){
            this.setState({  loadingShow: false, toptipType: 'warn', showTopTips: true, text: '上传图片不能大于1M' });
            this.stopTopTips();
            return;
        }
        let newFiles = [{url: file.data}];

        this.setState({
            files: newFiles
        });
        let formData = new FormData();
        formData.append("file", files);
        formData.append("key_code", this.state.key_code);
        let params = formData;

        this.setState({showLoading: true});
        UploadImg(params, res => {
            if (res.errcode == 0) {
                const files = this.state.files;
                files[0].url = res.url;
                this.setState({
                    files: files,
                    src: res.url,
                    showLoading: false,
                    toptipType: 'primary',
                    showTopTips: true,
                    text: '上传成功'
                });
                this.stopTopTips();
                const {getLinkImgContent} = this.props;
                getLinkImgContent(res.url)
            }
        }, res => {
            this.setState({showLoading: false, toptipType: 'warn', showTopTips: true, text: `上传失败 ${res.errmsg}`});
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

    renderGallery() {
        if (!this.state.gallery) return false;

        let srcs = this.state.files.map(file => file.url);

        return (
            <Gallery
                src={srcs}
                show
                defaultIndex={this.state.gallery.id}
                onClick={e => {
                    //avoid click background item
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState({gallery: false})
                }}
            >

                <GalleryDelete onClick={(e, id) => {
                    this.setState({
                        files: this.state.files.filter((e, i) => i != id),
                        gallery: this.state.files.length <= 1 ? true : false
                    })
                }}/>
            </Gallery>
        )
    }

    imgChecked = () => {
        this.setState({link_img_checked: false})
    };
    linkChecked = () => {
        this.setState({link_img_checked: true})
    };

    //广告链接
    linkContentChanger = (e) => {
        const linkContent = e.target.value;
        this.setState({linkContent: linkContent});
        const {getLinkImgContent} = this.props;
        getLinkImgContent(linkContent)
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
        const { progress, loadingText, showLoading, showTopTips, toptipType, text, link_img_checked, linkContent } = this.state;
        return (
            <Fragment>
                { showLoading ? <Toast icon="loading" show={showLoading} className='upload_loading'>{ loadingText }</Toast> : null }

                { showTopTips ? <TopTip type={toptipType} show={showTopTips} text={text}/> : null }
                <CellsTitle>以下选择二选一</CellsTitle>
                <Form radio>
                    <FormCell radio>
                        <CellBody>广告链接</CellBody>
                        <CellFooter>
                            <Radio name="radio_change" value='6' defaultChecked onClick={this.linkChecked}/>
                        </CellFooter>
                    </FormCell>

                    { link_img_checked ?
                            <FormCell>
                                <CellBody>
                                    <TextArea placeholder="请输入广告链接" rows="3" value={ linkContent }
                                              onChange={this.linkContentChanger}/>
                                </CellBody>
                            </FormCell> : null
                    }

                    <FormCell radio>
                        <CellBody>广告图片</CellBody>
                        <CellFooter>
                            <Radio name="radio_change" value='7' onClick={this.imgChecked}/>
                        </CellFooter>
                    </FormCell>
                    {this.renderGallery()}

                    { link_img_checked ? null :

                            <Form>
                                <Cell>
                                    <CellBody>
                                        <Uploader
                                            title="上传矿池二维码"
                                            multiple={true}
                                            capture={false}
                                            maxCount={1}
                                            files={this.state.files}
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
                                    <CellBody><p className='cus_progress_bar' style={{width: progress}}>{ progress }</p></CellBody>
                                </Cell>
                                <CellsTips>请删除默认图片上传矿池二维码</CellsTips>
                            </Form>

                    }
                </Form>
            </Fragment>
        )
    }
}
