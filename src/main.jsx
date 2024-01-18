import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { runSaga } from 'redux-saga';
import store from './Redux/redux/store';
import ProtectedProvider from './Context/AuthContext';
import ScrollToTop from './helpers/ScrollToTop';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <ProtectedProvider>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </Provider>
  </ProtectedProvider>,
);
