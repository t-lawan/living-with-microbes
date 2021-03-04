import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './Store/reducer';
import Home from './Pages/Home';
import Research from './Pages/Research';
import Proposal from './Pages/Proposal';
import { PageURls } from './Utility/Misc';


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path={PageURls.NOW.url} exact component={Research} />
          <Route path={PageURls.FUTURE.url} exact component={Proposal} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
