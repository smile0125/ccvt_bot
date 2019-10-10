import React, {Fragment, useState} from 'react';
import {Button, ButtonArea} from 'react-weui';
import hex_sha1 from '../../assets/js/sha.jsx';
import {GetCookie, debounce} from "../../assets/js/common.jsx";
import {ChangeBindCcvt} from '../../http/http.jsx';
import Loading from '../../assets/js/loading.jsx';
import TopTip from '../../assets/js/topTops.jsx';
import {withRouter} from 'react-router-dom';

const Submit = (props) => {
    //loading
    const [loadingShow, setLoadingShow] = useState(false);
    //提示
    const [showTopTips, setShowTopTips] = useState(false);
    const [toptipType, setToptipType] = useState('primary');
    const [text, setText] = useState('');

    const [country_code, cellphone, pass_word_hash, capital_pass_word_hash, sms_code] = props.params;
    const _pass_word_hash = hex_sha1(pass_word_hash);
    const _capital_pass_word_hash = hex_sha1(capital_pass_word_hash);

    const submitForm = debounce(() => {
        const params = {
            'token': GetCookie('token'),
            country_code,
            cellphone,
            sms_code,
            'pass_word_hash': _pass_word_hash,
            'capital_pass_word_hash': _capital_pass_word_hash,
        };
        setLoadingShow(true);
        ChangeBindCcvt(params).then(res => {
            setLoadingShow(false);
            const data = res.data;
            if (data.errcode == 0) {
                setShowTopTips(true);
                setText('更换成功');
                setTimeout(() => {
                    setShowTopTips(false)
                }, 2000);
                props.history.push({pathname: '/'});
            } else {
                setShowTopTips(true);
                setToptipType('warn');
                setText(`更换失败 ${data.errmsg}`);
                setTimeout(() => {
                    setShowTopTips(false)
                }, 1000);
            }
        })
    }, 2000);
    return (
        <Fragment>
            {loadingShow ? <Loading show={loadingShow}/> : ''}
            {showTopTips ? <TopTip type={toptipType} show={showTopTips} text={text}/> : ''}
            <ButtonArea>
                <Button onClick={submitForm}>提交</Button>
            </ButtonArea>
        </Fragment>
    )
};
export default withRouter(Submit);