import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodosContainer from "./components/TodosContainer";
import { TodoTypes } from "./shared/todos";

function App() {
  const [todos, setTodos] = useState<TodoTypes.TodoDTO[]>([]);
  const [isAddingTD, setAddingTD] = useState(false);

  const saveTodo = (newTodo: TodoTypes.TodoDTO | null) => {
    if (newTodo === null) setTodos([...todos]);
    else setTodos([...todos, newTodo]);

    setAddingTD(false);
  };

  const createTodo = () => {
    setAddingTD(true);
  };

  return (
    <div className="App">
      <div className="mycontainer">
        <Header addTodoTrigger={createTodo} enabled={!isAddingTD} />
        <TodosContainer
          todos={todos}
          create={isAddingTD}
          creationCallback={saveTodo}
        ></TodosContainer>
      </div>
    </div>
  );
}

export default App;
