import React, {useState} from 'react';
import {Form, FormCell, CellHeader, Label, CellBody, Input,Button, CellFooter, CellsTips} from 'react-weui';
import Country from '../../assets/js/country.jsx';
import CfmCode from '../../assets/js/cfmCode.jsx';
import GetSmsCodeFun from '../../assets/js/getSmsCode.jsx';
import Submit from './submit.jsx';

const ChangeBindForm = () => {
    const [country_code, setCountryCode] = useState('86');//国家代码
    const [cellphone, setCellphone] = useState('');//手机号码
    const [pass_word_hash, setPasswordHash] = useState('');//登录密码
    const [capital_pass_word_hash, setCapitalPassWordHashChange] = useState('');//资金密码
    const [cfm_code, setCfmCode] = useState('');//验证码
    const [sms_code, setSmsCode] = useState('');//断行验证码
    // 国家代码
    const getCountryCode = (country_code) => {setCountryCode(country_code)};
    //输入手机号
    const phoneChange = (e) => {setCellphone(e.target.value);};
    //登录密码
    const passwordChange = (e) => {setPasswordHash(e.target.value)};
    //资金密码
    const capitalPassWordHashChange = (e) => {setCapitalPassWordHashChange(e.target.value)};
    //资金密码
    const cfmCodeChange = (e) => {setCfmCode(e.target.value)};
    //短信验证码
    const smsCodeInputChange = (e) => {setSmsCode(e.target.value)};
    const params = [country_code,cellphone,pass_word_hash,capital_pass_word_hash,sms_code];
    return (
        <div>
            <Form>
                <Country getCountryCode={getCountryCode}/>
                <FormCell>
                    <CellHeader>
                        <Label>手机号码</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="tel" placeholder="CCVT绑定的手机号码" value={cellphone}
                               onChange={phoneChange}/>
                    </CellBody>
                </FormCell>

                <FormCell>
                    <CellHeader>
                        <Label>登录密码</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="password" value={pass_word_hash} onChange={passwordChange}
                               placeholder="CCVT登录密码"/>
                    </CellBody>
                </FormCell>

                <FormCell>
                    <CellHeader>
                        <Label>资金密码</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="password" value={capital_pass_word_hash} onChange={capitalPassWordHashChange}
                               placeholder="CCVT资金密码"/>
                    </CellBody>
                </FormCell>

                <FormCell vcode>
                    <CellHeader>
                        <Label>验证码</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="phone" value={cfm_code} onChange={cfmCodeChange}
                            placeholder="请输入验证码"/>
                    </CellBody>
                        <CellFooter className='cfm_code_width'>
                        <CfmCode />
                    </CellFooter>
                </FormCell>

                <FormCell vcode>
                    <CellHeader>
                        <Label>短信验证码</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="tel" value={sms_code} onChange={smsCodeInputChange}
                        placeholder="请输入短信验证码"/>
                    </CellBody>
                    <CellFooter>
                        <Button type="vcode">
                            {<GetSmsCodeFun cellphone={cellphone} cfm_code={cfm_code} country_code={country_code}/>}
                        </Button>
                    </CellFooter>
                </FormCell>
            </Form>
            <CellsTips>
                提示：一个微信账号有且只有一个CCVT账号，
                一个CCVT账号不能绑定在多个微信账号上。
            </CellsTips>
            <Submit params={params} />
        </div>
    )
};
export default ChangeBindForm;