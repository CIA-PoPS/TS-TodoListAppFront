import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import "./Header.css";
import "@heroicons/react/24/outline/PlusCircleIcon";
import { VoidTrigger } from "../shared/utility";

type HeaderProps = {
  addTodoTrigger: VoidTrigger;
  enabled: boolean;
};

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="Header">
      <div id="AppTitle">
        Todo
        <div className="italic inline">CIA</div>
      </div>
      <div id="ButtonsBar">
        <PlusCircleIcon
          className={`AddTodo ${props.enabled ? "AddTodo-Act" : "AddTodo-Dea"}`}
          onClick={() => (props.enabled ? props.addTodoTrigger() : 0)}
        />
      </div>
    </div>
  );
};

export default Header;
