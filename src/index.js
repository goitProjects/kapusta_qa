import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { store } from 'redux/store';
import { App } from 'components/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import { Suspense } from 'react';
import Loader from './components/Loader/Loader';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <Suspense fallback={<Loader />}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Suspense>
    {/* </React.StrictMode> */}
  </Provider>
);
