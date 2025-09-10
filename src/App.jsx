import "./components/todo/style.css"
import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import Logo from "./assets/react.svg"

const App = () => {

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew />
      <TodoData />

      <div className="todo-image">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    </div >
  )
}

export default App
