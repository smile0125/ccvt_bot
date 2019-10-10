import React, {Component} from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import {GetCookie} from './assets/js/common.jsx';
import RouterList from './routerList.jsx';
import {Share} from './assets/js/share.jsx';

class Router extends Component {
    hashMatch = (hash) => {
        return window.location.hash.match(hash);
    };

    componentWillMount() {
        // 判断是否已登录
        const url = window.location.href;

        if (!GetCookie('token') && !this.hashMatch('#/bindPhone') && !this.hashMatch('#/leaderBoard') && !this.hashMatch('#/selectDomain') && !this.hashMatch('#/login')) {
            window.location.href = `http://wx.fnying.com/ahino/index_login.php?url=${encodeURIComponent(url)}`;
            try {
                throw new Error('Fail:Terminate the front-end program and jump to WeChat login');
            } catch (e) {
                console.log(e);
            }
        }
    }

    componentDidMount() {
        Share();
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        {
                            RouterList.map(({ name, path, component, exact = true }) => {
                                return ( <Route exact={exact} path={path} component={component} key={name} /> )
                            })
                        }
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default Router;