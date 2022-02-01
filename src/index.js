import React from 'react';
import ReactDOM from 'react-dom';
import i18n from "i18n/config";
import App from './App';
import AppProviders from "components/providers/AppProviders";
// import reportWebVitals from './reportWebVitals';

console.log(process.env.REACT_APP_NODE_ENV);
console.log(process.env.NODE_ENV);

ReactDOM.render(
  <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
