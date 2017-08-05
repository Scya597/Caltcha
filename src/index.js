import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './scss/style.scss';
import Routes from './routes';
import Root from './Root';

const rootElement = document.getElementById('root');

const renderApp = appRoutes => {
  render(
    <AppContainer>
      <Root routes={appRoutes} />
    </AppContainer>,
    rootElement,
  );
};

renderApp(Routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    renderApp(newRoutes);
  });
}
