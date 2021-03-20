import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './Store/reducer';
import Home from './Pages/Home';
import Research from './Pages/Now';
import Future from './Pages/Future';
import { PageURls } from './Utility/Misc';
import Now from './Pages/Now';


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path={PageURls.NOW.url} exact component={Now} />
          <Route path={PageURls.FUTURE.url} exact component={Future} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
