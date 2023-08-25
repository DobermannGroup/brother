import React from 'react';
import TodoList from './components/TodoList';
import Options from './components/Options'; 
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <Options />
      <TodoList />
    </div>
  );
}

export default App;
