import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodosContainer from "./components/TodosContainer";
import { TDElementTypes } from "./components/TodoElement";
import { SimpleTodoFactory, TodoTypes } from "./shared/todos";

function App() {
  const [todos, setTodos] = useState<TDElementTypes.ParamsType[]>([]);
  const [isAddingTD, setAddingTD] = useState(false);

  const saveTodo = (newTodo: TodoTypes.TodoDTO) => {
    setTodos([...todos.slice(1), { todo: SimpleTodoFactory(newTodo) }]);
    setAddingTD(false);
  };

  const createTodo = () => {
    setTodos([{ callback: saveTodo }, ...todos]);
    setAddingTD(true);
  };

  return (
    <div className="App">
      <div className="mycontainer">
        <Header addTodoTrigger={createTodo} enabled={!isAddingTD} />
        <TodosContainer todos={todos}></TodosContainer>
      </div>
    </div>
  );
}

export default App;
