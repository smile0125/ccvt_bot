import React, { Component } from 'react';
import LoginForm from './form.jsx';
import Page from '../../assets/js/page.jsx';
class Index extends Component {
    render() {
        return (
            <div>
                <Page className="article" title="登录"  children={<LoginForm />}></Page>
            </div>
        )
    }
}
export default Index;