import React from 'react';
import './App.css';
import Header from './components/Header';
import TodosContainer from './components/TodosContainer';

function App() {
  return (
    <div className="App">
      <div className='mycontainer'>
          <Header></Header>
          <TodosContainer todos={[]}></TodosContainer>
      </div>
    </div>
  );
}

export default App;
