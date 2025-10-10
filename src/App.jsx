import "./components/todo/style.css"
import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import Logo from "./assets/react.svg"
import { useEffect, useState } from "react"

const App = () => {

  const [todoList, setTodoList] = useState([])

  const name = "Eric";
  const data = {
    address: "123 Main St",
    phone: "555-1234"
  }
  const age = 30;

  const deleteItem = (id) => {
    setTodoList(todoList.filter(item => item.id !== id))
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew setTodoList={setTodoList} />
      {todoList.length > 0 ?
        <TodoData
          todoList={todoList}
          deleteItem={deleteItem}
        />
        :
        <div className="todo-image">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
      }
    </div >

  )
}

export default App
