import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './redux/store';
import Login from './container/login/login';
import Register from './container/register/register';
import Main from './container/main/main';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route component={Main} />
      </Switch>
    </HashRouter>
  </Provider>

  ,document.getElementById(''));
