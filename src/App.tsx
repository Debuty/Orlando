
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Router } from './router';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
