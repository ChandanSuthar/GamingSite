import React from 'react';
import { Provider } from 'react-redux';
import { AuthProvider } from '../context/AuthContext';
import store from '../redux/store';

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  );
};

export default Providers; 