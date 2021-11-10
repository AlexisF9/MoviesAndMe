import React from 'react';
import Navigator from './routes/route';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default function App() {
  return (
    <Provider store={Store}>
      <Navigator/>
    </Provider>
    
  );
}