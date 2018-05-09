import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {  Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory';
import { AppContainer } from "react-hot-loader"
import registerServiceWorker from "service-worker-loader";

const history = createBrowserHistory()


// Wrap the rendering in a function:
const render = Component => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <Router history={history}>
      <App />
    </Router>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Do this once
registerServiceWorker();

// Render once
render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
