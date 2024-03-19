import { TodoElement, TDElementTypes } from "./TodoElement";
import NoTodoCard from "../static/NoTodo";

type TodosContainerProps = {
    todos: TDElementTypes.ParamsType[]
}


const TodosContainer: React.FC<TodosContainerProps> = (props)  => {
    return (
        <div className="justify-center flex">
            {
                props.todos.length > 0 ?
                    props.todos.map((td) => {
                        return <TodoElement params={td}></TodoElement>
                    })
                    :
                    <NoTodoCard />
            }
        </div>
    )
}

export default TodosContainer;
