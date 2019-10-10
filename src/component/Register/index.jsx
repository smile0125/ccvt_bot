import React, { Component } from 'react';
import RegisterForm from './form.jsx';
import Page from '../../assets/js/page.jsx';

class Index extends Component {
    componentDidMount(){
        document.title="注册-CCVT"
    }
    render() {
        return (
            <div>
                <Page className="article" title="注册"  children={<RegisterForm />}></Page>
            </div>
        )
    }
}
export default Index;