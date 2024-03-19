import { SimpleTodo } from "../shared/todos";
import TodoElement from "./TodoElement";
import NoTodoCard from "../static/NoTodo";

type TodosContainerProps = {
    todos: SimpleTodo[]
}


const TodosContainer: React.FC<TodosContainerProps> = (props)  => {
    return (
        <div className="justify-center flex">
            {
                props.todos.length > 0 ?
                    props.todos.map((td) => {
                        return <TodoElement todo={td}></TodoElement>
                    })
                    :
                    <NoTodoCard />
            }
        </div>
    )
}

export default TodosContainer;
