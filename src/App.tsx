
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store';
import HomePage from './modules/home/pages/HomePage';
import { Header } from './modules/layout/components/Header/Header';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container bg-gray-50" dir="rtl">
          <Header />
          <HomePage />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
