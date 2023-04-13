import React from 'react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers';

export const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk),
    ),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        { component }
      </Provider>
    </Router>,
  ),
  history,
});
