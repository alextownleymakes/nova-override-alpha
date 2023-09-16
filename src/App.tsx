import React from 'react';  
import { Provider } from 'react-redux';  
import store from './store/store';  
import GameWorld from './components/GameWorld';
import Controller from './components/Controller';
  
const App: React.FC = () => {  
  return (  
    <Provider store={store}>
      <Controller />
      <GameWorld />  
    </Provider>  
  );  
}  
  
export default App;  
