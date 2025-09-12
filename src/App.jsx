import "./components/todo/style.css"
import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import Logo from "./assets/react.svg"
import { useState } from "react"

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Learning React 111" },
    { id: 2, title: "Learning Java" }
  ])

  const hoidanit = "Eric";
  const data = {
    address: "123 Main St",
    phone: "555-1234"
  }
  const age = 30;

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew setTodoList={setTodoList} />
      <TodoData
        name={hoidanit}
        data={data.address}
        age={age}
        todoList={todoList}
      />

      <div className="todo-image">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    </div >
  )
}

export default App
