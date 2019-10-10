import React, {Component} from 'react';
import {Form, FormCell, CellHeader, Label, CellBody, Input, TextArea, Button, Cell, Uploader, Toast, GalleryDelete, Gallery, Dialog, CellsTips, ButtonArea} from 'react-weui';
import {GetCookie, SetCookie} from '../../assets/js/common.jsx';
import {GetKeyCode, UploadImg, ApplicationPool, GetInfoBase} from '../../http/http.jsx';
import TopTip from '../../assets/js/topTops.jsx';

export default class ApplicationPoolClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group_name: '',
            keyWord: '',
            group_introduction: '',
            manager_wechat_id: '',
            puid: '',
            key_code: '',
            gallery: false,
            files: [{url: require('../../assets/img/ccvt-logo.png')}],
            showDialog: false,
            showLoading: false,
            loadingTimer: null,
            showTopTips: false,
            toptTipsTimer: null,
            toptipType: 'warn',
            text: '上传成功',
            src: '',
            progress:'0%',
            loadingText:'上传中',
        }
    }

    componentDidMount = () => {
        this.getInfoBaseFun();
        this.getKeyCodeFuc();
    };

    //获取申请信息判断是否已经绑定
    getInfoBaseFun = () => {
        const params = {token: GetCookie('token')};
        GetInfoBase(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                const application_group = data.rows.application_group;
                // if (application_group) {
                //     this.setState({showDialog: true})
                // }
            }
        });
    };

    //获取key_code
    getKeyCodeFuc = () => {
        const token = GetCookie('token');
        const params = {token: token};
        GetKeyCode(params, res => {
            this.setState({key_code: res.key_code});
        }, res => {
        });
    };

    handleInputChange = (e, key) => {
        this.setState({[key]: e.target.value})
    };


    uploadImg = (file) => {
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
            }
        }, res => {
            this.setState({showLoading: false, toptipType: 'warn', showTopTips: true, text: `上传失败${res.errmsg}`});
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

    stopTopTips = () => {
        this.state.toptTipsTimer = setTimeout(() => {
            this.setState({showTopTips: false});
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer);
    }

    //提交申请
    submitApplication = () => {
        const token = GetCookie('token');
        const {group_name, group_introduction, src, keyWord, manager_wechat_id, puid} = this.state;
        if (!group_name) {
            this.setState({toptipType: 'warn', showTopTips: true, text: '请输入矿池名称'});
            this.stopTopTips();
            return;
        }
        if (!keyWord) {
            this.setState({toptipType: 'warn', showTopTips: true, text: '请输入矿池关键字'});
            this.stopTopTips();
            return;
        }
        if (!manager_wechat_id) {
            this.setState({toptipType: 'warn', showTopTips: true, text: '请输入矿主微信号'});
            this.stopTopTips();
            return;
        }

        // if (!puid) {
        //     this.setState({toptipType: 'warn', showTopTips: true, text: '请输入PUID'});
        //     this.stopTopTips();
        //     return;
        // }

        if (!group_introduction) {
            this.setState({toptipType: 'warn', showTopTips: true, text: '请输入矿池介绍'});
            this.stopTopTips();
            return;
        }
        if (!src) {
            this.setState({toptipType: 'warn', showTopTips: true, text: '请上传矿主二维码或者矿池二维码'});
            this.stopTopTips();
            return;
        }
        const params = {
            token: token,
            group_name: group_name,
            keyWord: keyWord,
            manager_wechat_id: manager_wechat_id,
            group_introduction: group_introduction,
            src: src
        };
        this.setState({showLoading: true});

        ApplicationPool(params, res => {
            if (res.errcode == '0') {
                this.setState({showLoading: false, toptipType: 'primary', showTopTips: true, text: '提交成功'});
                this.stopTopTips();
                SetCookie('application_group', this.state.group_name);
                // window.location.hash = '/manageMent/ai';
                window.location.hash = '/poolList';
            }
        }, res => {
            this.setState({showLoading: false, toptipType: 'warn', showTopTips: true, text: `提交失败 ${res.errmsg}`});
            this.stopTopTips();
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

    hideDialog = () => {
        window.location.hash = '/manageMent';
    };

    render() {
        const style1 = { buttons: [{ label: '矿池管理', onClick: this.hideDialog }] };
        const { showDialog, showLoading,loadingText, showTopTips, toptipType, text, group_name, keyWord, manager_wechat_id, puid, group_introduction, files, progress } = this.state;
        return (
            <div>
                { showDialog ? <Dialog type= "ios" title='已有专属矿池' buttons= { style1.buttons } show= { showDialog }>已有专属矿池，无需再次申请</Dialog> : null }

                { showLoading ? <Toast icon="loading" show={ showLoading } className='upload_loading'>{ loadingText }</Toast> : null }

                { showTopTips ? <TopTip type={toptipType} show={showTopTips} text={text}/> : null }
                <CellsTips>申请：荣耀等级Lv.0 Lv.1可申请一个矿池，Lv.2可申请两个矿池，Lv.3可申请三个矿池，以此类推，荣耀等级越高可申请的矿池越多。</CellsTips>
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>矿池名称</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入矿池名称" value={group_name} onChange={(e) => { this.handleInputChange(e, 'group_name') }}/>
                        </CellBody>
                    </FormCell>

                    <FormCell>
                        <CellHeader>
                            <Label>矿池标签</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="矿池标签 如：明星，娱乐，热度" value={ keyWord }
                                   onChange={(e) => { this.handleInputChange(e, 'keyWord') }}/>
                        </CellBody>
                    </FormCell>

                    <FormCell>
                        <CellHeader>
                            <Label>矿主微信号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入矿主微信号" value={ manager_wechat_id }
                                   onChange={(e) => { this.handleInputChange(e, 'manager_wechat_id') }}/>
                        </CellBody>
                    </FormCell>

                    <FormCell>
                        <CellHeader>
                            <Label>PUID</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入PUID/选填" value={ puid } onChange={(e) => {
                                this.handleInputChange(e, 'puid')
                            }}/>
                        </CellBody>
                    </FormCell>
                </Form>
                <CellsTips>PUID获取方式：加机器人为好友，输入'puid'并发送即可，机器人稍后会将puid发送给您。</CellsTips>
                <Form>
                    <FormCell>
                        <CellBody>
                            <TextArea value={ group_introduction } onChange={(e) => { this.handleInputChange(e, 'group_introduction') }}
                                      placeholder="请输入矿池描述" rows="3"/>
                        </CellBody>
                    </FormCell>
                </Form>
                {this.renderGallery()}
                <Form>
                    <Cell>
                        <CellBody>
                            <Uploader
                                title="上传矿池二维码"
                                multiple={true}
                                capture={false}
                                maxCount={1}
                                files={files}
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
                                }/>
                        </CellBody>
                    </Cell>
                    <Cell>
                        <CellBody><p className='cus_progress_bar' style={{width: progress}}>{ progress }</p></CellBody>
                    </Cell>
                </Form>
                <CellsTips>请删除默认图片上传矿池二维码</CellsTips>
                <ButtonArea>
                    <Button onClick={this.submitApplication}>提交</Button>
                </ButtonArea>
            </div>
        )
    }
}
