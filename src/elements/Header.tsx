import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import './Header.css';
import '@heroicons/react/24/outline/PlusCircleIcon'

function Header() {
    return (
        <div className="Header">
            <div id='AppTitle'>
                Todo
                <div className='italic inline'>
                    CIA
                </div>
            </div>
            <div id='ButtonsBar'>
                <PlusCircleIcon id='AddTodo'></PlusCircleIcon>
            </div>
        </div>
    )
}

export default Header;
