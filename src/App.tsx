import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodosContainer from "./components/TodosContainer";
import { TDElementTypes } from "./components/TodoElement";
import { SimpleTodo, TodoTypes } from "./shared/todos";

function App() {
  const [todos, setTodos] = useState<TDElementTypes.ParamsType[]>([]);
  const [isAddingTD, setAddingTD] = useState(false);

  const saveTodo = (newTodo: TodoTypes.TodoDTO | null) => {
    if (newTodo === null) setTodos([...todos.slice(1)]);
    else setTodos([...todos.slice(1), { todo: SimpleTodo.fromDTO(newTodo) }]);

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
