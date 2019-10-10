import React, {Component} from 'react';
import {ButtonArea, Button} from 'react-weui';
import {AddAd} from '../../http/http.jsx';
import {GetCookie, debounce} from '../../assets/js/common.jsx';
import {withRouter} from 'react-router-dom';

class ReleaseSubmit extends Component {
    addAdSubmit = debounce(() => {
        const checkState = this.props.checkState;
        const {time, content, daily_award_amount, tx_content, cycle} = this.props.query;
        if (!time) {
            checkState('请选择时间');
            return;
        }
        if (!content) {
            checkState('请输入广告内容');
            return;
        }
        if (!tx_content) {
            checkState('请输入广告链接或上传广告图片');
            return;
        }
        if (parseInt(daily_award_amount) < 100 || parseInt(daily_award_amount) % 100 !== 0) {
            checkState('奖励费用不正确');
            return;
        }
        let _time = time;
        let h = _time.split(':')[0];
        let m = _time.split(':')[1];
        const new_time = `${parseInt(h)}:${parseInt(m)}`;
        const {releaseState} = this.props;
        const token = GetCookie('token');
        const params = {token, time: new_time, content, daily_award_amount, tx_content, cycle};
        AddAd(params).then(res => {
            const data = res.data;
            if (data.errcode == 0) {
                releaseState('success');
                this.props.history.push({pathname: '/ad/myAdList'});
            } else {
                releaseState(data.errmsg)
            }
        })
    }, 2000);

    render() {
        return (
            <ButtonArea>
                <Button onClick={this.addAdSubmit}>提交</Button>
            </ButtonArea>
        )
    }
}

export default withRouter(ReleaseSubmit);